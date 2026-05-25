import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModalConfig {
    animationType?: 'none' | 'slide' | 'fade';
    transparent?: boolean;
    statusBarTranslucent?: boolean;
}

interface ModalStore {
    isOpen: boolean;
    content: React.ReactNode | null;
    config: ModalConfig;
    open: (content: React.ReactNode, config?: ModalConfig) => void;
    close: () => void;
}

export const useModalStore = create<ModalStore>()((set, get) => ({
    isOpen: false,
    content: null,
    config: {
        animationType: 'fade',
        transparent: true,
        statusBarTranslucent: false,
    },
    open: (content: React.ReactNode, config?: ModalConfig) => set({
        isOpen: true,
        content,
        config: { ...get().config, ...config }
    }),
    close: () => set({
        isOpen: false,
        content: null,
    }),

}));