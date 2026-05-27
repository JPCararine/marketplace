import { marketPlaceApiClient } from "../api/market-place";
import { ProductResponse } from "../interfaces/http/product-response"
import { ProductHttpRequest, ProductInterface } from "../interfaces/product";



export const getProducts = async (params: ProductHttpRequest) => {
    const { data } = await marketPlaceApiClient.post<ProductResponse>("/products", params)

    return data;
}

export const getProductById = async (id: number) => {
  const { data } = await marketPlaceApiClient.get<ProductInterface>(`/products/${id}`);

  return data;
}