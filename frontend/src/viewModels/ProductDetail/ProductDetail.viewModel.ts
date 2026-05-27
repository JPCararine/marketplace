import { useLocalSearchParams } from "expo-router";
import useProductByIdQuery from "../../shared/queries/product/use-getProductById";
import useProductsInfiniteQuery from "../../shared/queries/product/use-getProducts.queries"
import BuildImageUrl from "../../shared/helpers/buildImageUrl";

export default function useProductDetailViewModel() {
    const { id } = useLocalSearchParams();
    const productId = Number(id);

    const { data, isLoading, isError } = useProductByIdQuery(productId);

    const productPhoto = BuildImageUrl(data?.photo ?? "");

    return {
        data, isLoading, isError,
        productPhoto,
    }
}