import axios, { AxiosInstance } from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "./auth-storage";
import { useUserStore } from "../store/user-store";

const getBaseUrl = () => {
    return Platform.select({
        ios: "http://localhost:3001",
        android: "http://10.0.2.2:3001",
    });
}

export const baseURL = getBaseUrl();

export class MarketPlaceApiClient {
    private instance: AxiosInstance;
    private isRefreshing = false;

    constructor() {
        this.instance = axios.create({
            baseURL,
        });

        this.setupInterceptors();
    }
        
    getInstance() {
        return this.instance;
    }

    

    private setupInterceptors() {
        this.instance.interceptors.request.use(async (config) => {
            const auth = await getAuth();

            const token = auth?.token;

            if(token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
        this.instance.interceptors.response.use((response) => response,
        async (error) => {
            const originalRequest = error.config;

            if(error.response?.status === 401 && error.response?.data.message === "Token expirado" && !this.isRefreshing) {
                
                this.isRefreshing = true;

                try {
                    
                const auth = await getAuth();
                
                const refreshToken = auth?.refreshToken;

                if(!refreshToken) {
                    throw new Error("Refresh token não encontrado");
                }

                const { data } = await this.instance.post("/auth/refresh", {
                    refreshToken,
                });

                const newAuth = {
                    ...auth,
                    token: data.token,
                    refreshToken: data.refreshToken,
                };

                await AsyncStorage.setItem("marketplace-auth", JSON.stringify({
                    state: newAuth,
                    version: 0
                }));

                originalRequest.headers.Authorization = `Bearer ${data.token}`

                return this.instance(originalRequest);
                } catch (error) {
                    this.handleUnauthorized();
                    return Promise.reject(new Error("Sessão expirada, faça o login novamente."));
                } finally {
                    this.isRefreshing = false;
                }
            }

            if(error.response && error.response.data) {
                return Promise.reject(new Error(error.response.data.message));
            } else {
                return Promise.reject(new Error("Falha na requisição"));
            }
        })
    }
    private async handleUnauthorized() {

        const { logout } = useUserStore.getState();

        delete this.instance.defaults.headers.common["Authorization"];
        logout();
    }
}

export const marketPlaceApiClient = new MarketPlaceApiClient().getInstance();
