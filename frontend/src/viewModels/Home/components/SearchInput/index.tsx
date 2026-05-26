import { View, Text, TouchableOpacity } from "react-native";
import AppInput from "../../../../shared/components/AppInput";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";

export default function SearchInput () {
    return (
        <View>
            <Text className="text-lg text-gray-500 font-semibold mt-6 mb-4">Explore produtos</Text>
            <View className="flex-row">
            <View className="flex-1">
                <AppInput leftIcon="search-outline" placeholder="Pesquisar" />
            </View>
                <TouchableOpacity className="ml-5 mt-8 items-center justify-center rounded-xl border-[2px] h-[48px] w-[48px] border-purple-base">
                    <Ionicons name="filter-outline" size={24} color={colors["purple-base"]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}