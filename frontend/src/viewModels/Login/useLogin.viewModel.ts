import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../shared/queries/auth/use-register.mutation";
import { useUserStore } from "../../shared/store/user-store";
import { LoginFormData, loginScheme } from "./login.scheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { useOneSignal } from "../../shared/hooks/useOneSignal";

export default function useLoginViewModel() {
    
    const userLoginMutation = useLoginMutation();

    const { playerId } = useOneSignal();
    

    const { control, handleSubmit, formState: { errors }} = useForm<LoginFormData> ({
        resolver: yupResolver(loginScheme),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = handleSubmit(async (userData) => {
        await userLoginMutation.mutateAsync({
            ...userData,
            notificationToken: playerId,
        });
    })

    

    return {
        control,
        errors,
        onSubmit,
    }

}