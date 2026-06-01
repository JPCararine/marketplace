import { QueryClient, useMutation } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import * as productService from "../../services/product.service";
import { ProductRateRequest } from "../../interfaces/product";
import { Toast } from "toastify-react-native";

export function useProductRate () {

    const mutation = useMutation({
        mutationFn: (rateData: ProductRateRequest) => productService.postProductRate(rateData),
        onSuccess: () => {
            Toast.success("Avaliação enviada!")

        }
    })

    return mutation;
}