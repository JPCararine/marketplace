import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { colors } from "../../styles/colors";

const DEFAULT_CHANNEL = "default";

const NOTIFICATION_IDS = {
   CART_REMINDER: "cart-reminder",
   PURCHASE_FEEDBACK: "purchase-feedback",
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldShowBanner: true,
        shouldSetBadge: false,
        shouldShowList: true,
    })
})

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
    const hasPermission = await Notifications.requestPermissionsAsync();

    if(!hasPermission.granted) {
        return;
    }

    await setNotificationChannel();

    const notification = await Notifications.scheduleNotificationAsync({
        identifier: NOTIFICATION_IDS.CART_REMINDER,
        content: {
            title: " Você esqueceu algo no carrinho! ",
            body: `O produto ${productName} ainda está te esperando. Volte para finalizar sua compra!`,
            data: {
                type: "cart-reminder",
                productId: String(productId),
                deepLink: ""
            },
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: 5,
            },
    });

    return notification;
}

export const localNotificationsService = {
    scheduleCartReminder,
    
}