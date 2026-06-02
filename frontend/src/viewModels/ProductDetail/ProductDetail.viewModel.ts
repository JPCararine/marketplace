import { useLocalSearchParams } from "expo-router";
import useProductByIdQuery from "../../shared/queries/product/use-getProductById";
import useProductsInfiniteQuery, { useProductCommentsInfiniteQuery, useProductUserComment } from "../../shared/queries/product/use-getProducts.queries"
import BuildImageUrl from "../../shared/helpers/buildImageUrl";
import { useUserStore } from "../../shared/store/user-store";
import { useCartStore } from "../../shared/store/cart-store";
import { useEffect, useMemo, useState } from "react";
import { useModalStore } from "../../shared/store/modal-store";
import { useBottomSheetStore } from "../../shared/store/bottomsheet-store";
import { localNotificationsService, NOTIFICATION_IDS } from "../../shared/services/local-notifications.service";
import { useFavoritesQuery } from "../../shared/queries/favorites/use-getFavorites.queries";
import { favoriteDelete, favoritePost } from "../../shared/queries/favorites/use-favorites.mutation";

export default function useProductDetailViewModel() {
    const { id } = useLocalSearchParams<{id: string}>();
    const { open, close } = useModalStore();
    const { open: openBottomSheet, close: closeBottomSheet } = useBottomSheetStore();
    const productId = Number(id);
    const { data: comment, products } = useProductCommentsInfiniteQuery();
    const { userComment } = useProductUserComment(productId.toString());
    const { data, isLoading, isError } = useProductByIdQuery(productId);
    const productPhoto = BuildImageUrl(data?.photo ?? "");
    const { addItem } = useCartStore();
    const [isPressed, setIsPressed] = useState(false);
    const { data: favorites, isLoading: isLoadingFavorites } = useFavoritesQuery();
    const addFavoriteMutation = favoritePost();
    const removeFavoriteMutation = favoriteDelete();

const isFavorite: boolean | undefined = useMemo(() => {
    return favorites?.some((favorite) => {
        return favorite.productId === productId;
    }
)
}, [favorites, productId]);
    function handleIsPressed() {
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
        }, 1000);
    }

    async function addItemToCart() {
        
        if(!data) {
            
            return;
        }

        addItem({
                id: data?.id,
                name: data?.name,
                price: data?.value,
                image: productPhoto,
            })

            

    await localNotificationsService.scheduleCartReminder({
        delayInMinutes: 1,
        productId,
        productName: data.name,
        });
    }  
    // Códgo pra rodar depois que compra for feita, cancelar as notificações programadas para lembrar do carrinho.
    localNotificationsService.cancelNotifications(`${NOTIFICATION_IDS.CART_REMINDER}-${id}`);

    async function handleToogleFavorite () {
        if(isLoadingFavorites) {
            return;
        }

        if(isFavorite) {
           await removeFavoriteMutation.mutateAsync(productId);
           return;
        }

        await addFavoriteMutation.mutateAsync({
            productId: productId
        });
    }

    const loading = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

    

    return {
        data, isLoading, isError,
        productPhoto,
        comment,
        products,
        userComment,
        addItem,
        isPressed,
        handleIsPressed,
        addItemToCart,
        isFavorite,
        handleToogleFavorite,
        loading,
    }
}