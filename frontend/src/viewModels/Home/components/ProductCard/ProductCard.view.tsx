import { View, Text, Image } from "react-native";
import { ProductInterface } from "../../../../shared/interfaces/product";
import useProductCardViewModel from "./useProductCard.viewmodel";



export default function ProductCardView({ product }: ReturnType<typeof useProductCardViewModel>) {
    return (
        <View className="h-[152px] p-1 gap-1">
            <Image className="w-full h-[96px] rounded-md" source={{ uri: product.photo }}/>
            <View className="gap-1 p-1">
            <Text className="text-xs text-gray-400">{product.name}</Text>
            <Text>R$ {product.value}</Text>
            </View>

        </View>
    )
}