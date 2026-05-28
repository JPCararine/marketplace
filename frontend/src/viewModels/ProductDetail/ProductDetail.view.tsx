import { View, Text, TouchableOpacity, Image, Touchable, ScrollView, FlatList } from "react-native";
import useProductDetailViewModel from "./ProductDetail.viewModel";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { ProductResponse } from "../../shared/interfaces/http/product-response";
import { router } from "expo-router";
import { moneyMapper } from "../../shared/utils/moneyMapper";
import Comments from "./Comments";



export default function ProductDetailView({ data, productPhoto, comment, products, userComment}: ReturnType<typeof useProductDetailViewModel>) {
    
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
                    backgroundColor: "#D7DDF9",
                }}>
                    <Ionicons name="star" size={14} color={colors["blue-base"]} />
                    <Text className="text-gray-500 text-base font-semibold">{Number(data?.averageRating).toFixed(1).replace(".", ",")} / 5</Text>
                </View>
            </View>
            <View className="flex-row justify-between items-center mt-4">
                <Text className="text-lg font-semibold text-gray-500">{data?.name}</Text>
                <Text className="text-lg font-semibold text-gray-500">R$ {moneyMapper(Number(data?.value))}</Text>
            </View>
            <View className="w-full p-3 gap-3 flex-row rounded-xl mt-3 truncate" style={{ backgroundColor: "#D7DDF9", height: 60}}>
                <View className="rounded-md bg-blue-dark items-center justify-center" style={{ width: 36, height: 36}}>
                    <Ionicons name="analytics-outline" size={20} color={colors.white} />
                </View>
                <Text className="text-gray-400 text-sm mr-4" numberOfLines={2}>
                    <Text className="font-semibold">{data?.views} {data?.views?? 0 > 1 ? "pessoas" : "pessoa"}</Text>
                    {" "}{data?.views === 1 ? "visualizou este produto nos últimos 7 dias." : "visualizaram este produto nos últimos 7 dias."}
                </Text>
            </View>
            <View className="justify-center mt-4 truncate items-start flex-col gap-2">
                <Text className="text-sm text-gray-300 mr-2 ">{data?.description}</Text>
                <Text className="text-sm text-gray-300 font-semibold ">Largura: {data?.weight ? data.weight : "não definida pelo usuário."}</Text>
                <Text className="text-sm text-gray-300 font-semibold ">Altura do chão: {data?.height ?  data.height : "não definida pelo usuário."}</Text>
                {data?.weight ? (
                    <Text className="text-sm text-gray-300 font-semibold ">Peso: {data.weight}</Text>
                ) : (
                    <></>
                )}
            </View>
            <View className="justify-center mt-4 items-start flex-col gap-2">
                <Text className="text-sm font-gray-500 font-semibold">Categoria</Text>
                <Text className="text-sm font-gray-300 ">{data?.category.name}</Text>
            </View>
            <View className="justify-between flex-row items-center mt-10">
                <Text className="text-sm font-gray-500 font-semibold">Avaliações</Text>
                <TouchableOpacity className="items-center justify-center">
                        <Text className="text-sm font-semibold text-purple-base">Avaliar</Text>
                </TouchableOpacity>
            </View>
            <View className="w-full h-[300px] mt-2">
                <FlatList 
                data={products ?? []} 
                keyExtractor={(item) => item.id.toString()} 
                renderItem={({item}) => (
                        <Comments data={item} userComment={userComment.data ?? null}/>
                )}
                 ListEmptyComponent={() => (
      <Text className="text-gray-400 text-sm">
        Nenhum comentário encontrado.
      </Text> )}
                />
            </View>
        </View>
    )
}