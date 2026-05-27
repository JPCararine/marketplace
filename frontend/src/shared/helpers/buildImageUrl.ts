import Contants from "expo-constants";
import { Platform } from "react-native";

export default function BuildImageUrl (originalUrl: string) {
    if(Boolean(Contants.expoConfig?.extra?.isProduction)) {
        return originalUrl;
    }

    return Platform.select({
        android: originalUrl.replace("localhost", "10.0.2.2"),
        ios: originalUrl,
    });
};