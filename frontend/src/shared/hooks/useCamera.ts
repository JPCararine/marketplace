import React, { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";

interface UseCameraOptions {
    aspect?: [number, number];
    quality?: number;
    allowsEditing?: boolean;
    exif?: boolean;
}

export default function useCamera ({ aspect, quality, allowsEditing, exif }: UseCameraOptions){

    const [isLoading, setIsLoading] = React.useState(false);

    const requestCameraPermission = useCallback(async (): Promise<boolean> => {
    try {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        const currentStatus = status === "granted";

        if(!currentStatus) {
            Toast.error("Permissão de câmera negada. Por favor, permita o acesso à câmera para usar esta funcionalidade.", "top");
        }

        return currentStatus;
    } catch (error) {
        Toast.error("Erro ao solicitar permissão de câmera", "top");
        return false;
    }
    }, []);

    const openCamera = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);

    try {
        const hasPermission = await requestCameraPermission();

        if (!hasPermission) {
            return null;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing,
            aspect,
            exif,
            quality,
        });

        if (!result.canceled && result.assets.length > 0) {
            Toast.success("Foto capturada com sucesso!", "top");
            return result.assets[0].uri;
        }

        return null;
    } catch (error) {
        Toast.error("Erro ao abrir câmera", "top");
        return null;
    } finally {
        setIsLoading(false);
    }
}, []);

    return {
        requestCameraPermission,
        isLoading,
        openCamera,
    }
}