import { yupResolver } from "@hookform/resolvers/yup";
import { baseURL } from "../../shared/api/market-place";
import { useUserStore } from "../../shared/store/user-store";
import { ProfileFormData, profileScheme } from "./profile.scheme";
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../../shared/queries/auth/use-register.mutation";
import React from "react";
import { Toast } from "toastify-react-native";
import { uploadAvatar } from "../../shared/services/auths.service";
import { UserUpdateRequest } from "../../shared/interfaces/http/userUpdate";
import useImage from "../../shared/hooks/useImage";

export default function useProfileViewModel() {
    const { user, logout} = useUserStore();
    const [loading, setLoading] = React.useState(false);
    const { imageUri: avatarUri, openImageOptions: handleSelectImage } = useImage();
    const UpdateProfileMutation = useUpdateProfileMutation();
    const currentAvatarUrl = user?.avatarUrl ? `${baseURL}${user.avatarUrl}` : null;
    const displayedAvatarUrl = avatarUri ?? currentAvatarUrl;

    const { control, handleSubmit, formState: {errors} } = useForm<ProfileFormData>({
            resolver: yupResolver(profileScheme),
            defaultValues: {
                name: user?.name ?? "",
                email: user?.email ?? "",
                phone: user?.phone ?? "",
                password: "",
                newPassword: "",
                
            },
        });

    const onSubmit = handleSubmit(async (userData) => {
        try {
            setLoading(true);
            let newAvatarUrl: string | undefined;

            if(avatarUri) {
                const response = await uploadAvatar(avatarUri);
                newAvatarUrl = response.url;
            }
            
           await UpdateProfileMutation.mutateAsync({...userData, avatarUrl: newAvatarUrl});

            
            Toast.success("Dados atualizados com sucesso!", "top");
            if(userData.newPassword) {
                logout();
            }
        } finally {
            setLoading(false);
        }
        
    })

    return {
        user,
        currentAvatarUrl,
        avatarUrl: displayedAvatarUrl,
        onSubmit,
        control,
        errors,
        loading,
        logout,
        handleSelectImage,
    }
}