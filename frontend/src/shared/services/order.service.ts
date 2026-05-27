import { marketPlaceApiClient } from "../api/market-place"
import { OrderResponse } from "../interfaces/http/order";

export const getOrders = async () => {
    const { data } = await marketPlaceApiClient.get<OrderResponse>("/orders");

    return data;
}