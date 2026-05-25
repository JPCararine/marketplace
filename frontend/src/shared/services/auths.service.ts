import { marketPlaceApiClient } from "../api/market-place";
import { LoginHttpParams, LoginHttpResponse } from "../interfaces/http/login";
import { RegisterHttpParams, RegisterHttpResponse } from "../interfaces/http/register";


export const register = async (userData: RegisterHttpParams) => {
    const { data } = await marketPlaceApiClient.post<RegisterHttpResponse>("/auth/register", userData);

    return data;
}

export const login = async (userData: LoginHttpParams) => {
    const { data } = await marketPlaceApiClient.post<LoginHttpResponse>("/auth/login", userData);

    return data;
}