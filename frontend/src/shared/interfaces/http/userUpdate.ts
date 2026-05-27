import { UserInterface } from "../user";

export interface UserUpdateRequest {
    name: string;
    email: string;
    phone: string;
    avatarUrl?: string;
    password?: string;
    newPassword?: string;
}

export interface UserUpdateResponse {
    user: UserInterface;
}