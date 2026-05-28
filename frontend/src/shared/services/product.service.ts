import { marketPlaceApiClient } from "../api/market-place";
import { ProductResponse } from "../interfaces/http/product-response"
import { ProductCommentsHttpRequest, ProductCommentsResponse, ProductHttpRequest, ProductInterface, ProductUserCommentResponse } from "../interfaces/product";



export const getProducts = async (params: ProductHttpRequest) => {
    const { data } = await marketPlaceApiClient.post<ProductResponse>("/products", params)

    return data;
}

export const getProductById = async (id: number) => {
  const { data } = await marketPlaceApiClient.get<ProductInterface>(`/products/${id}`);

  return data;
}

export const getProductsComments = async (params: ProductCommentsHttpRequest) => {
  const { data } = await marketPlaceApiClient.post<ProductCommentsResponse>("/products/comments", params)

  return data;
}

export const getProductUserComment = async (productId: string) => {
  const { data } = await marketPlaceApiClient.get<ProductUserCommentResponse>(`/products/${productId}/user-comment`);

  return data;
}