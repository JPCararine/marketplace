import { marketPlaceApiClient } from "../api/market-place";
import { FavoritesPostParams, FavoritesResponse } from "../interfaces/http/favorites";

export const getFavorites = async () => {
    const { data } = await marketPlaceApiClient.get<FavoritesResponse[]>("/favorites");

    return data;
}

export const postFavorites = async (params: FavoritesPostParams) => {
    const { data } = await marketPlaceApiClient.post<FavoritesResponse>("/favorites", params);

    return data;
}

export const deleteFavorites = async (productId: string) => {
    return marketPlaceApiClient.delete(`/favorites/${productId}`);
}