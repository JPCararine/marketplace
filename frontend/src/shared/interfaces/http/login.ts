import { UserInterface } from "../user";

export interface LoginHttpParams {
    email: string;
    password: string;
}


export interface LoginHttpResponse {
    user: UserInterface;
    token: string;
    refreshToken: string;
}