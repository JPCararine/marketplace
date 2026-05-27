import { Ionicons } from "@expo/vector-icons";
import { useModalStore } from "../store/modal-store";
import { createElement } from "react";
import SelectionModal, { SelectionModalProps } from "../components/Modals/SelectionModal";

export type SelectionVariants = "primary" | "secondary" | "danger";

export interface SelectionOption {
    text: string;
    onPress: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
    variant?: SelectionVariants;
}

export default function useAppModal() {
    
    const { open, close } = useModalStore();

    function showSelection(config: {
        title: string;
        message?: string;
        options: SelectionOption[];
    }){
        open(createElement(SelectionModal, {
            
            title: config.title,
            message: config.message,
            options: config.options,
        } as SelectionModalProps));
    }

    return {
        showSelection,
    }
}