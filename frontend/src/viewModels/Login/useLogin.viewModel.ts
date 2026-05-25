import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../shared/queries/auth/use-register.mutation";
import { useUserStore } from "../../shared/store/user-store";
import { LoginFormData, loginScheme } from "./login.scheme";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useLoginViewModel() {
    
    const userLoginMutation = useLoginMutation();
    const { setSession } = useUserStore();

    const { control, handleSubmit, formState: { errors }} = useForm<LoginFormData> ({
        resolver: yupResolver(loginScheme),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = handleSubmit(async (userData) => {
        const mutationResponse = await userLoginMutation.mutateAsync(userData);

        setSession({
            refreshToken: mutationResponse.refreshToken,
            token: mutationResponse.token,
            user: mutationResponse.user,
        })
    })

    

    return {
        control,
        errors,
        onSubmit,
    }

}