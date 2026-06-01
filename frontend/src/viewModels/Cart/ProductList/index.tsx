import { View, Image, Text, TouchableOpacity } from "react-native";
import { ProductInterface } from "../../../shared/interfaces/product";
import { moneyMapper } from "../../../shared/utils/moneyMapper";
import { CartItem } from "../../../shared/store/cart-store";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";

interface ProductListProps {
    product: CartItem;
    
    removeItem: (productId: number) => void
    updateItemQuantity: (params: { productId: number; quantity: number }) => void
    clearCart: () => void
    getTotalPrice: () => number
}

export default function ProductList({product, removeItem, updateItemQuantity, clearCart, getTotalPrice}: ProductListProps) {
    
    return (
        <View className="w-full h-[71px] p-1 gap-1 bg-white rounded-lg items-center flex-row mt-2 ">
            <Image source={{ uri: product.image}} className="rounded-md" resizeMode="cover" style={{ width: 64, height: 64}}/>
            <View className="flex-row justify-between items-center flex-1 min-w-0 ">
                <View className="gap-2 justify-center px-2 flex-1">
                    <Text className="text-sm text-gray-400" numberOfLines={2} ellipsizeMode="tail">{product.name}</Text>
                    <Text className="text-sm text-gray-500 font-semibold">R$ {moneyMapper(Number(product.price))}</Text>
                </View>
                <View className="flex-row items-center gap-2 mr-2">
                    <TouchableOpacity className="border-purple-base border-2 rounded-lg items-center justify-center size-[20px]" 
                    onPress={() => updateItemQuantity({ productId: product.id, quantity: product.quantity - 1})}>
                        <Ionicons name="remove" size={12} color={colors["purple-base"]} />
                    </TouchableOpacity>
                    <View className=" w-[20px] h-[20px] border-b border-gray-100 items-center justify-center">
                    <Text className="text-sm font-semibold ">{product.quantity}</Text>
                    </View>
                    <TouchableOpacity className="border-purple-base border-2 rounded-lg items-center justify-center size-[20px]" 
                    onPress={() => updateItemQuantity({ productId: product.id, quantity: product.quantity + 1})}>
                        <Ionicons name="add" size={12} color={colors["purple-base"]} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}