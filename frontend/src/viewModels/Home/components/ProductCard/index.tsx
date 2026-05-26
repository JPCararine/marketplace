import { View } from "react-native";
import { ProductInterface } from "../../../../shared/interfaces/product";
import useProductCardViewModel from "./useProductCard.viewmodel";
import ProductCardView from "./ProductCard.view";

interface ProductCardParams {
    product: ProductInterface;
}

export default function ProductCard({product}: ProductCardParams) {

    const props = useProductCardViewModel({ product });
    return (
        <ProductCardView {...props} />
    )
}