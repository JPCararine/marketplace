import axios, { AxiosInstance } from "axios";

export class MarketPlaceApiClient {
    private instance: AxiosInstance;
    private isRefreshing = false;

    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:3001",
        });
    }
        
    getInstance() {
        return this.instance;
    }
}

export const marketPlaceApiClient = new MarketPlaceApiClient().getInstance();
