import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import * as productService from "../../services/product.service";
import { ProductHttpRequest } from "../../interfaces/product";
import { VideoExportPreset } from "expo-image-picker";
import BuildImageUrl from "../../helpers/buildImageUrl";

export default function useProductsInfiniteQuery () {
    
    const query = useInfiniteQuery({
        queryKey: ["products"],
        staleTime: 1000 * 60 * 1,
        initialPageParam: 1,

        queryFn: async ({ pageParam }) => {
            try {
                return productService.getProducts({
                    pagination: {
                        page: pageParam,
                        perPage: 10,
                    }
                })
            } catch (error) {
                throw error;
            }
        },
        
        getNextPageParam: (lastPage) => {
            if (lastPage.page >= lastPage.totalPages) {
                return undefined;
            }

            return lastPage.page + 1;

           
        }
        
    }
)   

    const products = query.data?.pages?.flatMap((page) => page.data).map((product) => ({
        ...product,
        photo: BuildImageUrl(product.photo) ?? product.photo,
    })) ?? [];

    return {
        ...query,
        products
    };
}


