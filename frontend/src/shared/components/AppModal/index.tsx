import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { useModalStore } from "../../store/modal-store";

export default function AppModal() {

    const { isOpen, content, config, close } = useModalStore();

    if(!isOpen || !content) return null;

    return (
        <Modal
            visible={isOpen}
            animationType={config.animationType}
            transparent={config.transparent}
            statusBarTranslucent={config.statusBarTranslucent}
            onRequestClose={close}
        >
            <TouchableWithoutFeedback onPress={close}>
                <View className="flex-1 justify-center items-center bg-black/50 px-6">
                    <TouchableWithoutFeedback onPress={() => {}}>
                        {content}
                    </TouchableWithoutFeedback>
                </View>    
            </TouchableWithoutFeedback>
        </Modal>
    )
}