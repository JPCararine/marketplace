import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_KEY = "marketplace-auth"

export async function GetToken() {
    try {
    const userData = await AsyncStorage.getItem(AUTH_KEY);

    if(!userData) {
        return null;
    }

    const parsedData = JSON.parse(userData);

    return parsedData.state?.token ?? null;
} catch {
    return null;
}
}