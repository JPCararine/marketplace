import axios, { AxiosInstance } from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetToken } from "./auth-storage";

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
            const token = await GetToken();

            if(token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
    }
}

export const marketPlaceApiClient = new MarketPlaceApiClient().getInstance();
