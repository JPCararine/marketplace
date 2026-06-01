import ReviewBottomSheetView from "./ReviewBottomSheet";
import { useReviewBottomSheetViewModel } from "./useReviewBottomSheet.viewModel";

interface ReviewBottomSheetParams {
    productId: number;
}

export default function ReviewBottomSheet ({productId}: ReviewBottomSheetParams) {
    const viewModel = useReviewBottomSheetViewModel(productId);
    return (
        <ReviewBottomSheetView {...viewModel} />
    )
}