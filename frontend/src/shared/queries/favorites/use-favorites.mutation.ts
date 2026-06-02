import {  QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import * as favoriteService from "../../services/favorites.service";
import { FavoritesPostParams } from "../../interfaces/http/favorites";
import { Toast } from "toastify-react-native";
import { useLocalSearchParams } from "expo-router";

export function favoritePost () {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (params: FavoritesPostParams) => favoriteService.postFavorites(params),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"]
            })
            Toast.success("Produto adicionado aos favoritos!", "bottom");
        }
    })
    return mutation;
}

export function favoriteDelete () {
    
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (productId: number) => favoriteService.deleteFavorites(productId.toString()),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"]
            })
            Toast.success("Produto removido dos favoritos!", "bottom");
        }
    })
    return mutation;
}