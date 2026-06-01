import { useState } from "react";
import { useBottomSheetStore } from "../../../shared/store/bottomsheet-store";

export function useReviewBottomSheetViewModel(productId: number) {
    const { close } = useBottomSheetStore(); 
    const [rating, setRating] = useState(0);
    return {
        rating, setRating, close
    }
}