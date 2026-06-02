import React from "react";
import { useEffect } from "react";
import { NotificationClickEvent, OneSignal } from "react-native-onesignal";

const ONESIGNAL_APP_ID = process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID;

export function useOneSignal () {

    const [playerId, setPlayerId] = React.useState<string | undefined>(undefined);
    useEffect(() => {
        if(!ONESIGNAL_APP_ID) return;

        OneSignal.Notifications.addEventListener("click", (event: NotificationClickEvent) => {
            const url = event.notification.launchURL;
        })

        OneSignal.initialize(ONESIGNAL_APP_ID);

    
        (async () => {
            const playerId = await OneSignal.User.pushSubscription.getIdAsync()
            if(playerId) {
                setPlayerId(playerId);
            }
            
        })()
        
    }, [])
    return {
        playerId,
    };
}