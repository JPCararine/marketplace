import { ImagePickerOptions } from "expo-image-picker";
import React, { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";
import { useModalStore } from "../store/modal-store";

export default function useGallery (pickerOptions: ImagePickerOptions) {
    const [loading, setLoading] = React.useState(false);

    const requestGalleryPermission = useCallback(async (): Promise<boolean> => {
        try {
            const {status, accessPrivileges}  = await ImagePicker.requestMediaLibraryPermissionsAsync();

            const currentStatus = status === "granted" || accessPrivileges === "limited";

            if(!currentStatus) {
                 Toast.error("Permissão de galeria negada. Por favor, permita o acesso à galeria para usar esta funcionalidade.", "top");
            }

            return currentStatus;
        } catch (error) {
            Toast.error("Erro ao solicitar permissão de galeria", "top");
            return false;
        }
    }, [])

    const openGallery = useCallback(async(): Promise<string | null> => {
        setLoading(true)
        try {
            const hasPermission = await requestGalleryPermission();

            if(!hasPermission) {
                return null;
            }

            const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);

            if(!result.canceled && result.assets.length > 0) {
                Toast.success("Foto selecionada com sucesso!", "top");
                return result.assets[0].uri;
            }

            return null;
        } catch (error) {
            Toast.error("Erro ao abrir galeria", "top");
            return null;
        } finally {
            setLoading(false);
        }
    }, [])

    return {
        openGallery,
        loading,
        requestGalleryPermission,
    }
}