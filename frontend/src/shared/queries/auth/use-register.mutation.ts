import { useMutation } from "@tanstack/react-query"
import * as authService from "../../services/auths.service"
import { RegisterHttpParams } from "../../interfaces/http/register"
import { LoginHttpParams } from "../../interfaces/http/login";

export const useRegisterMutation = () => {
    const mutation = useMutation({
        mutationFn: (userData: RegisterHttpParams) => authService.register(userData),
        onSuccess: (response) => {
            console.log(response);
        },
        onError: (error) => {
            console.log(error)
        },
    });

    return mutation;
}

export const useLoginMutation = () => {
    const mutation = useMutation({
        mutationFn: (userData: LoginHttpParams) => authService.login(userData),
        onSuccess: (response) => {
            console.log(response);
        },
        onError: (error) => {
            console.log(error)
        },
    });

    return mutation;
}