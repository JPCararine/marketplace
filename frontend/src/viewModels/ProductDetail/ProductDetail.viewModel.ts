import { useLocalSearchParams } from "expo-router";
import useProductByIdQuery from "../../shared/queries/product/use-getProductById";
import useProductsInfiniteQuery, { useProductCommentsInfiniteQuery, useProductUserComment } from "../../shared/queries/product/use-getProducts.queries"
import BuildImageUrl from "../../shared/helpers/buildImageUrl";
import { useUserStore } from "../../shared/store/user-store";
import { useCartStore } from "../../shared/store/cart-store";
import { useState } from "react";
import { useModalStore } from "../../shared/store/modal-store";
import { useBottomSheetStore } from "../../shared/store/bottomsheet-store";

export default function useProductDetailViewModel() {
    const { id } = useLocalSearchParams();
    const { open, close } = useModalStore();
    const { open: openBottomSheet, close: closeBottomSheet } = useBottomSheetStore();
    const productId = Number(id);
    const { data: comment, products } = useProductCommentsInfiniteQuery();
    const { userComment } = useProductUserComment(productId.toString());
    const { data, isLoading, isError } = useProductByIdQuery(productId);
    const productPhoto = BuildImageUrl(data?.photo ?? "");
    const { addItem } = useCartStore();
    const [isPressed, setIsPressed] = useState(false);

    function handleIsPressed() {
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
        }, 1000);
    }

    

    return {
        data, isLoading, isError,
        productPhoto,
        comment,
        products,
        userComment,
        addItem,
        isPressed,
        handleIsPressed
    }
}