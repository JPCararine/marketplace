import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function Login() {
    return (
        <View className="flex-1 justify-center">
            <Text className="text-purple">Login</Text>
            <TouchableOpacity onPress={() => router.push("register")}>
                <Text>Registro</Text>
            </TouchableOpacity>
        </View>
    )
}