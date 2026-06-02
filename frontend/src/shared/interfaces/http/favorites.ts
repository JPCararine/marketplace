export interface FavoritesResponse {
    id: number;
    productId: number;
    product: string;
    createdAt: string;
}

export interface FavoritesPostParams {
    productId: number;
}