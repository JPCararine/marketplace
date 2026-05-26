import React from "react";
import useAppModal from "./useAppModal";
import useCamera from "./useCamera";
import useGallery from "./useGalery";
import { useModalStore } from "../store/modal-store";

export default function useImage () {
    const modals = useAppModal();
    const {close} = useModalStore();
    const {openCamera} = useCamera({});
    const {openGallery} = useGallery({});
    
    const [imageUri, setImageUri] = React.useState<string | null>(null);

    async function selectFromGallery() {
        close();
        const uri = await openGallery();

        if (uri) {
        setImageUri(uri);
        }

    } 

  async function selectFromCamera() {
        close();
        const uri = await openCamera();

        if (uri) {
        setImageUri(uri);
        }
    }
    
    function openImageOptions () {
    
        modals.showSelection({
            title: "Selecionar foto",
            message: "Escolha uma opção:",
            options: [
                {
                    text: "Galeria",
                    icon: "images",
                    variant: "primary",
                    onPress: selectFromGallery,
                },
                {
                    text: "Câmera",
                    icon: "camera",
                    variant: "primary",
                    onPress: selectFromCamera,
                },
            ],
        });
    }
    return {
        imageUri,
        setImageUri,
        openImageOptions,
        
    }
}

