import { FlatList, View } from "react-native";
import { ProductResponse } from "../../../shared/interfaces/http/product-response";

interface ProductListProps {
    products: ProductResponse;
}

export default function ProductList({products}: ProductListProps) {
    return (
        <View className="w-full h-[71px] p-1 gap-1 bg-white">
            
        </View>
    )
}