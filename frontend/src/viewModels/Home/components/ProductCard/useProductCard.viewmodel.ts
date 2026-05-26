import { ProductInterface } from "../../../../shared/interfaces/product"

interface useProductCardViewModelParams {
    product: ProductInterface;
}

export default function useProductCardViewModel({product}: useProductCardViewModelParams) {
    return {
        product,
    }
}