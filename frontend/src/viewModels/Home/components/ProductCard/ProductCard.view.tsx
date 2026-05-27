import { View, Text, Image, TouchableOpacity } from "react-native";
import { ProductInterface } from "../../../../shared/interfaces/product";
import useProductCardViewModel from "./useProductCard.viewmodel";
import useHomeViewModel from "../../useHome.viewModel";
import { baseURL } from "../../../../shared/api/market-place";
import { moneyMapper } from "../../../../shared/utils/moneyMapper";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { router } from "expo-router";

interface ProductCardViewProps {
    data: ProductInterface;
    cardWidth: number;
}


export default function ProductCardView({ data, cardWidth }: ProductCardViewProps) {

    return (
        <TouchableOpacity 
        className="h-[152px] p-1 gap-1 bg-white rounded-xl shadow-sm" 
        style={{ width: cardWidth }} 
        onPress={() => router.push({pathname: 
            "/(private)/productdetail/[id]", 
            params: { 
                id: data.id, 
            },
            })} 
            >
            <View className="w-full h-[96px] rounded-md overflow-hidden">
                <Image 
                    className="w-full h-full" 
                    source={{ uri: data.photo }} 
                    resizeMode="cover" 
                />
                <View className="flex-row items-center gap-1 px-2 py-1 bg-white "
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: 10,
                    elevation: 10,
                    borderBottomLeftRadius: 6
                }}>
                    <Ionicons name="star" size={10} color={colors["blue-base"]} />
                    <Text className="text-gray-500 text-sm">{Number(data.averageRating).toFixed(1).replace(".", ",")}</Text>
                </View>
            </View>
            
            <View className="gap-1 p-1 ">
            <Text className="text-xs text-gray-400" numberOfLines={1}>{data.name}</Text>
            <Text className="text-sm font-semibold text-gray-500">R$ {moneyMapper(Number(data.value))}</Text>
            </View>

        </TouchableOpacity>
    )
}