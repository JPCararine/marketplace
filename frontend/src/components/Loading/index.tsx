import { View, Text, Image } from "react-native";
import LogoIcon from "../../../assets/icons/Logo (1).png";
export default function Loading() {
    return (
        <View className="w-full h-[125] gap-6 items-center justify-center">
            <Image source={LogoIcon} style={{ width: 96, height: 72 }} resizeMode="contain"/>
            <Text className="text-2xl text-gray-500">Marketplace</Text>
        </View>
    )
}