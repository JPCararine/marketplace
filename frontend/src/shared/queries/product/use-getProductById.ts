import { useQuery } from "@tanstack/react-query";
import * as productService from "../../services/product.service";
export default function useProductByIdQuery (id: number) {
    
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => productService.getProductById(id),
        enabled: !!id,
    })
}