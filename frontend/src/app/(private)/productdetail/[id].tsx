import ProductDetailView from "../../../viewModels/ProductDetail/ProductDetail.view";
import useProductDetailViewModel from "../../../viewModels/ProductDetail/ProductDetail.viewModel";


export default function ProductDetail () {
    const props = useProductDetailViewModel();
    return (
        <ProductDetailView {...props}/>
    )
}