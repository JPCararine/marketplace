import { useMutation } from "@tanstack/react-query"
import * as authService from "../../services/auths.service"
import { RegisterHttpParams } from "../../interfaces/http/register"
import { LoginHttpParams } from "../../interfaces/http/login";
import { useUserStore } from "../../store/user-store";
import { Toast } from "toastify-react-native";

export const useRegisterMutation = () => {
    const { setSession } = useUserStore();

    const mutation = useMutation({
        mutationFn: (userData: RegisterHttpParams) => authService.register(userData),
        onSuccess: (response) => {
            setSession({
            refreshToken: response.refreshToken,
            token: response.token,
            user: response.user,
            });
            Toast.success("Usuário criado com sucesso!", "top");
            console.log(response);
        },
        onError: (error) => {
            console.log(error)
        },
    });

    return mutation;
}

export const useLoginMutation = () => {
    const { setSession } = useUserStore();
    const mutation = useMutation({
        mutationFn: (userData: LoginHttpParams) => authService.login(userData),
        onSuccess: (response) => {
            setSession({
            refreshToken: response.refreshToken,
            token: response.token,
            user: response.user,
            });
            
        },
        onError: (error) => {
            console.log(error)
        },
    });

    return mutation;
}