import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import useRegisterViewModel from "./useRegister.viewModel";

export default function RegisterView({userData, setUserData}: ReturnType<typeof useRegisterViewModel>) {
    return (
        <View className="flex-1 justify-center">
            <TouchableOpacity onPress={() => router.back()}>
            <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}