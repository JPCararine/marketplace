import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_KEY = "marketplace-auth"

export async function getAuth() {
    try {
    const userData = await AsyncStorage.getItem(AUTH_KEY);

    if(!userData) {
        throw new Error("Usuário não autenticado");
    }

    const parsedData = JSON.parse(userData);

    return parsedData.state ?? null;
} catch {
    return null;
    }
}
