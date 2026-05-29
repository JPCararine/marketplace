import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import * as productService from "../../services/product.service";
import BuildImageUrl from "../../helpers/buildImageUrl";
import { useLocalSearchParams } from "expo-router";

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

export function useProductCommentsInfiniteQuery () {
    const { id } = useLocalSearchParams();
    const query = useInfiniteQuery({
        queryKey: ["product-comments", Number(id)],
        initialPageParam: 1,

        queryFn: async ({ pageParam }) => {
            try {
                return productService.getProductsComments({
                    productId: Number(id), 
                    pagination: {
                        page: pageParam,
                        perPage: 10,
                    }
                })
            } catch (error) {
                throw error;
            }
        },
        getNextPageParam (lastPage) {
            if(lastPage.page >= lastPage.totalPages) {
                return undefined;
            }

            return lastPage.page + 1;
        }

    })

    const products = query.data?.pages.flatMap((page) => page.data) ?? [];
    
    return {
        ...query,
        products
    }
}

export function useProductUserComment (productId: string) {

    const userComment = useQuery({
        queryKey: ["products-user-comment", productId],
        queryFn: () => productService.getProductUserComment(productId),
        enabled: !!productId,
    });
    
    return {
        userComment,
    }
}


