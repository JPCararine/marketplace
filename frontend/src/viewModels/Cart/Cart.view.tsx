import { View, Text, FlatList } from "react-native";
import ProductList from "./ProductList";
import useCartViewModel from "./Cart.viewModel";

export default function CartView({}: ReturnType<typeof useCartViewModel>) {
    return (
        <View className="flex-1 p-6 mt-10">
            <View className="justify-center w-full  h-[48px]">
                <Text className="text-xl font-semibold text-gray-500">Carrinho</Text>
                <Text className="text-sm text-gray-400">Veja seu carrinho de compras</Text>
            </View>
            <View className="mt-5">
                <FlatList data={[]} renderItem={({item}) => (
                    <></>
                )}
                    />
            </View>
        </View>
    )
}