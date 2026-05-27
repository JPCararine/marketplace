import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { colors } from "../../../../styles/colors";
import { router } from "expo-router";

interface HomeHeaderProps {
    avatarUrl?: string;
    username: string;
}

export default function HomeHeader({avatarUrl, username}: HomeHeaderProps) {
    return (
        <View className="w-full h-[56px] gap-5 flex-row items-center">
            {avatarUrl ? (
                <TouchableOpacity className="w-[56px] h-[56px] rounded-lg" onPress={() => router.push("/(private)/profile")}>
                    <Image source={{ uri: avatarUrl }} className="w-full h-full rounded-xl" resizeMode="cover" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity className="justify-center items-center rounded-lg bg-slate-300 w-[56px] h-[56px]" onPress={() => router.push("/(private)/profile")}>
                    <Ionicons name="person-circle-outline" size={40}/>
                </TouchableOpacity>
            )}
            <View className="flex flex-col gap-1">
                <Text className="text-base text-gray-500 font-semibold">Olá, {username}</Text>
                <TouchableOpacity className="flex-row items-center gap-2" onPress={() => router.push("/(private)/profile")}>
                    <Text className="text-purple-base text-sm font-semibold">Ver perfil</Text>
                    <Ionicons name="arrow-forward" size={20} color={colors["purple-base"]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}