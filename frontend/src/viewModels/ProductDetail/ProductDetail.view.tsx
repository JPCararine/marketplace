import { View, Text, TouchableOpacity, Image } from "react-native";
import useProductDetailViewModel from "./ProductDetail.viewModel";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { ProductResponse } from "../../shared/interfaces/http/product-response";
import { router } from "expo-router";
import { moneyMapper } from "../../shared/utils/moneyMapper";



export default function ProductDetailView({ data, productPhoto }: ReturnType<typeof useProductDetailViewModel>) {

    return (
        <View className="p-6 mt-8 flex-1">
            <TouchableOpacity className="flex-row gap-2" onPress={() => router.back()}>
                    <Ionicons name="arrow-back-outline" size={20} color={colors["purple-base"]} />
                    <Text className="text-base text-purple-base font-semibold">Voltar</Text>
            </TouchableOpacity>
            <View className="w-full h-[200px] rounded-md overflow-hidden mt-6">
                <Image source={{ uri: productPhoto }} className="w-full h-full" resizeMode="cover"/>
                <View className="flex-row items-center gap-1 px-2 py-1 "
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 165,
                    zIndex: 10,
                    elevation: 10,
                    borderBottomLeftRadius: 6,
                    backgroundColor: "#D7DDF9"
                }}>
                    <Ionicons name="star" size={14} color={colors["blue-base"]} />
                    <Text className="text-gray-500 text-base font-semibold">{Number(data?.averageRating).toFixed(1).replace(".", ",")} / 5</Text>
                </View>
            </View>
            <View className="flex-row justify-between items-center mt-4">
                <Text className="text-lg font-semibold text-gray-500">{data?.name}</Text>
                <Text className="text-lg font-semibold text-gray-500">R$ {moneyMapper(Number(data?.value))}</Text>
            </View>
            <View className="w-full p-3 gap-12 flex-row rounded-xl mt-3" style={{ backgroundColor: "#D7DDF9", height: 60}}>
                <View className="rounded-md bg-blue-dark items-center justify-center" style={{ width: 36, height: 36}}>
                    <Ionicons name="analytics-outline" size={20} color={colors.white} />
                </View>
                <Text className="text-gray-400 text-xs ml-5">{data?.views} {data?.views?? 0 > 1 ? "pessoas visualizaram este produto nos últimos 7 dias." : "pessoa visualizou este produto nos últimos 7 dias."}</Text>
            </View>
        </View>
    )
}