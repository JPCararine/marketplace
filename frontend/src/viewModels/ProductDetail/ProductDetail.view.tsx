import { FlatList, Text, TouchableOpacity, View } from "react-native";
import useProductDetailViewModel from "./ProductDetail.viewModel";
import Comments from "./Comments";
import ProductDetailHeader from "./ProductDetailHeader";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { moneyMapper } from "../../shared/utils/moneyMapper";

export default function ProductDetailView({
  data,
  productPhoto,
  products,
  userComment,
}: ReturnType<typeof useProductDetailViewModel>) {
  return (
    <View className="flex-1">
    <FlatList
      
      contentContainerStyle={{
        padding: 24,
        paddingTop: 32,
      }}
      data={products ?? []}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <ProductDetailHeader
          data={data}
          productPhoto={productPhoto ?? ""}
        />
      }
      renderItem={({ item }) => (
        <Comments
          data={item}
          userComment={userComment?.data ?? null}
        />
      )}
      ListEmptyComponent={() => (
        <Text className="text-gray-400 text-sm">
          Nenhum comentário encontrado.
        </Text>
      )}
      
    />
        <View className="w-full h-[96px] p-8 bg-white justify-between items-center flex-row">
            <View className="flex-row items-center gap-1">
                <Text className="text-gray-500 font-semibold text-xs mt-3">R$</Text>
                <Text className="text-gray-500 font-semibold text-2xl">{moneyMapper(Number(data?.value))}</Text>
            </View>
            <TouchableOpacity className="bg-purple-base rounded-lg items-center flex-row gap-2 px-4 w-[120px] h-[40px]">
                <View className="flex-row items-center gap-2">
                <Ionicons name="cart-outline" size={20} color={colors.white} />
                <Text className="text-sm text-white">Adicionar</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    </View>
  );
}