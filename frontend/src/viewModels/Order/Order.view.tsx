import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import useOrderViewModel from "./Order.viewModel";
import ListOrders from "./ListOrders";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import Button from "../../shared/components/Button";
import { router } from "expo-router";

export default function OrderView({data, isLoading}: ReturnType<typeof useOrderViewModel>) {

    return (
        <View className="flex-1 p-6 mt-10">
            <View className="justify-center w-full  h-[48px]">
                <Text className="text-xl font-semibold text-gray-500">Pedidos</Text>
                <Text className="text-sm text-gray-400">Confira sua lista de produtos comprados</Text>
            </View>
            <View className="mt-5">
                {isLoading ? (
                    <View className="items-center justify-center">
                    <ActivityIndicator color={colors["purple-base"]} />
                    </View>
                ) : (
            <FlatList 
            keyExtractor={(item) => item.id.toString()} 
            data={data?.orders ?? []} 
            renderItem={({item}) => (
                <ListOrders order={item} />
            )} 
            ListEmptyComponent={
                                <View className="justify-center items-center mt-10">
                                    <Ionicons name="clipboard-outline"  size={36} color={colors.gray[200]}/>
                                    <View className="gap-2 items-center mt-7">
                                    <Text className="text-sm font-semibold text-gray-500">Você ainda não possui pedidos</Text>
                                    <Text className="text-sm text-gray-400 leading-6 max-w-[210px] text-center">Explore o catálogo de produtos e faça sua primeira compra!</Text>
                                    </View>
                                    <View className="mt-10 ">
                                    <TouchableOpacity className="w-[180px] h-[40px] rounded-lg border-purple-base border items-center justify-between flex-row p-2 px-3" onPress={() => router.push("/(private)/home")}>
                                            <Ionicons name="storefront-outline" size={20} color={colors["purple-base"]}/>
                                            <Text className="text-base font-semibold text-purple-base">Explorar produtos</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                }
            />
                            )}
            </View>
        </View>
    )
}