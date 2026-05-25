import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, registerScheme } from "./register.scheme";
import { useRegisterMutation } from "../../shared/queries/auth/use-register.mutation";
import { RegisterHttpParams } from "../../shared/interfaces/http/register";
import { useUserStore } from "../../shared/store/user-store";
import useAppModal from "../../shared/hooks/useAppModal";

export default function useRegisterViewModel() {

    const userRegisterMutation = useRegisterMutation();
    const { setSession, user } = useUserStore();
    const modals = useAppModal();

    function handleSelectionAvatar () {
        modals.showSelection({
            title: "Selecionar foto",
            message: "Escolha uma opção:",
            options: [
                {
                    text: "Galeria",
                    icon: "images",
                    variant: "primary",
                    onPress: () => alert("Funcionou"),
                },
                {
                    text: "Câmera",
                    icon: "camera",
                    variant: "primary",
                    onPress: () => alert("Câmera"),
                },
            ],
        });
    }

    const { control, handleSubmit, formState: {errors} } = useForm<RegisterFormData>({
        resolver: yupResolver(registerScheme),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
        },
    });

    const onSubmit = handleSubmit( async (userData) => {
        const { confirmPassword, ...registerData } = userData;
        const mutationResponse = await userRegisterMutation.mutateAsync(registerData);
        
        
        setSession({
            refreshToken: mutationResponse.refreshToken,
            token: mutationResponse.token,
            user: mutationResponse.user,
        });
    });

    

    return {
        control,
        errors,
        onSubmit,
        handleSelectionAvatar,
    }
}