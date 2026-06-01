import { View, Text, FlatList, TouchableOpacity } from "react-native";
import ProductList from "./ProductList";
import useCartViewModel from "./Cart.viewModel";
import { moneyMapper } from "../../shared/utils/moneyMapper";
import Button from "../../shared/components/Button";

export default function CartView({items, removeItem, updateItemQuantity, clearCart, getTotalPrice}: ReturnType<typeof useCartViewModel>) {
    return (
        <View className="flex-1 p-6 mt-10 gap-5">
            <View className="justify-center w-full  h-[48px]">
                <Text className="text-xl font-semibold text-gray-500">Carrinho</Text>
                <Text className="text-sm text-gray-400">Veja seu carrinho de compras</Text>
            </View>
            <View className="mt-5 flex-1">
                <FlatList data={items} renderItem={({item}) => (
                    <ProductList 
                        product={item} 
                        removeItem={removeItem} 
                        updateItemQuantity={updateItemQuantity} 
                        clearCart={clearCart} 
                        getTotalPrice={getTotalPrice} 
                    />
                )}
                    />
            </View>
            <View className="w-full h-[40%] bg-white rounded-lg p-4">
                    <View className="py-2 gap-4">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-xs text-gray-400 font-semibold">VALOR TOTAL</Text>
                            <Text className="text-lg font-bold text-gray-500">R$ {moneyMapper(getTotalPrice())}</Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-xs text-gray-400 font-semibold">PAGAMENTO</Text>
                            <TouchableOpacity>
                            
                            <Text className="text-sm font-bold text-purple-base">Adicionar forma de pagamento</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity className="bg-purple-base rounded-lg items-center justify-center w-full h-[48px] mt-5">
                            <Text className="text-white font-bold text-base">Finalizar compra</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}