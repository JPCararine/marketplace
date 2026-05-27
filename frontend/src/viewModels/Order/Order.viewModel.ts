import { useQueries } from "@tanstack/react-query";
import orderQueries from "../../shared/queries/order/use-getOrder.queries"


export default function useOrderViewModel() {
    const { data, isLoading }  = orderQueries();
    


    return {
        data,
        isLoading
    }
        
    
}