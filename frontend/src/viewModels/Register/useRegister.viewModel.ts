import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, registerScheme } from "./register.scheme";
import { useRegisterMutation } from "../../shared/queries/auth/use-register.mutation";
import { RegisterHttpParams } from "../../shared/interfaces/http/register";
import { useUserStore } from "../../shared/store/user-store";
import useImage from "../../shared/hooks/useImage";
import { uploadAvatar } from "../../shared/services/auths.service";

export default function useRegisterViewModel() {

    const userRegisterMutation = useRegisterMutation();
    const { imageUri: avatarUri, openImageOptions: handleSelectImage } = useImage();

    

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

        let avatarUrl: string | undefined;

        if(avatarUri) {
            const uploadResponse = await uploadAvatar(avatarUri);
            avatarUrl = uploadResponse.url;
        }

        const payload: RegisterHttpParams = {
            ...registerData,
            avatarUrl,
        }
        await userRegisterMutation.mutateAsync(payload);

    });

    

    return {
        control,
        errors,
        onSubmit,
        avatarUri,
        handleSelectImage,
    }
}