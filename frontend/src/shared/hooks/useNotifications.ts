import { useEffect } from "react"
import { localNotificationsService } from "../services/local-notifications.service";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import * as Linking from "expo-linking";
export function useNotifications () {
    
    useEffect(() => {
        localNotificationsService.requestPermissions();
        localNotificationsService.setNotificationChannel();

        const lastResponse = Notifications.getLastNotificationResponse();

        if(lastResponse) {
            const deepLink = lastResponse.notification.request.content.data.deepLink;


            if (typeof deepLink === "string" && deepLink.startsWith("marketplace://")) {
            Linking.openURL(deepLink);
            }
        }

        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
        const deepLink = response.notification.request.content.data.deepLink;


        if (typeof deepLink === "string" && deepLink.startsWith("marketplace://")) {
            Linking.openURL(deepLink);
        }
        });

        return () => subscription.remove();
    }, []);
    
    return {

    }
}