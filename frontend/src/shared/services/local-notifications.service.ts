import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { colors } from "../../styles/colors";

const DEFAULT_CHANNEL = "default";

export const NOTIFICATION_IDS = {
   CART_REMINDER: "cart-reminder",
   PURCHASE_FEEDBACK: "purchase-feedback",
}

const DEEP_LINK_BASE_URL = "marketplace://";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldShowBanner: true,
        shouldSetBadge: false,
        shouldShowList: true,
    })
})

const requestPermissions = async (): Promise<boolean> => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === "granted") {
        return true;
    }

    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    return newStatus === "granted";
}

async function cancelNotifications (notificationId: string) {
    try {
    await Notifications.cancelScheduledNotificationAsync(notificationId)
    } catch (error) {
        console.log("[Local notifications] Erro: " + JSON.stringify(error))
    }
}

async function setNotificationChannel () {
    if(Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync(DEFAULT_CHANNEL, {
            name: "Notificações do Marketplace",
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: colors["purple-base"],
        });
    }
}

interface ScheduleNotificationParams {
    productName: string;
    productId: number;
    delayInMinutes: number;
}

async function scheduleCartReminder ({productName, delayInMinutes, productId}: ScheduleNotificationParams) {
    const hasPermission = await requestPermissions();

    if(!hasPermission) {
        return;
    }

    await setNotificationChannel();

    const notification = await Notifications.scheduleNotificationAsync({
        identifier: `${NOTIFICATION_IDS.CART_REMINDER}-${productId}`,
        content: {
            title: " Você esqueceu algo no carrinho! ",
            body: `O produto ${productName} ainda está te esperando. Volte para finalizar sua compra!`,
            data: {
                type: "cart-reminder",
                productId: String(productId),
                deepLink: `${DEEP_LINK_BASE_URL}cart`
            },
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: delayInMinutes * 60,
            },
    });

    return notification;
}

async function scheduleFeedbackNotification ({productName, productId, delayInMinutes}: ScheduleNotificationParams) {
  const hasPermission = await requestPermissions()

  if (!hasPermission) {
    console.log('[LocalNotifications] - Permission not granted')
    return
  }

  await Notifications.scheduleNotificationAsync({
    identifier: `${NOTIFICATION_IDS.PURCHASE_FEEDBACK}-${productId}`,
    content: {
      title: 'Como foi a sua compra?',
      body: `Você realizou o pedido do produto "${productName}". Envie um feedback do que achou do produto!`,
      data: {
        type: 'purchase_feedback',
        productId: String(productId),
        deepLink: `${DEEP_LINK_BASE_URL}productdetail/${productId}?openFeedbackBottomSheet=true`
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: delayInMinutes * 60,
    },
  })

  console.log('[LocalNotifications] - Feedback notification scheduled')
}

export const localNotificationsService = {
    scheduleCartReminder,
    requestPermissions,
    setNotificationChannel,
    scheduleFeedbackNotification,
    cancelNotifications,
}
