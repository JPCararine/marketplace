import { UserInterface } from "../user";

export interface LoginHttpParams {
    email: string;
    password: string;
    notificationToken?: string;
}


export interface LoginHttpResponse {
    user: UserInterface;
    token: string;
    refreshToken: string;
}