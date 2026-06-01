import { useBottomSheetStore } from "../../../../shared/store/bottomsheet-store";

export default function useFilterViewModel() {
    const { close } = useBottomSheetStore();

    return {
        close,
    }
}
