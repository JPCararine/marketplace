import { View, Text, Image } from "react-native";
import { Order } from "../../../shared/interfaces/http/order";
import { moneyMapper } from "../../../shared/utils/moneyMapper";
interface ListOrdersProps {
    order: Order;
}

export default function ListOrders ({order}: ListOrdersProps) {
    return (
        <View className="w-full h-[90px] p-1 gap-1 flex-row bg-white mt-2">
            <Image source={{ uri: order.productPhoto }} className="w-[88px] h-[81px] rounded-md" resizeMode="cover"/>
            <View className="gap-3 p-2 flex-1">
                <View className="flex-row items-center justify-between w-full">
                <Text className="text-sm font-semibold text-gray-500">{order.productName}</Text>
                <Text className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString("pt-BR")}</Text>
                </View>
                <View className="gap-1">
                <View className="flex flex-row items-center">
                    <Text className="text-xs text-gray-400">{order.quantity} {order.quantity > 1 ? "unidades" : "unidade"}</Text>
                    <Text className="text-xs text-gray-400"> • R$ {moneyMapper(order.totalPrice)}</Text>
                </View>
                    <Text className="text-xs text-gray-400">Cartão final {order.creditCard.maskedNumber}</Text>
                </View>

            </View>
        </View>
    )
}