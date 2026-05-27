import orderQueries from "../../shared/queries/use-getOrder.queries"


export default function useOrderViewModel() {
    const {data, isLoading} = orderQueries();


    return {
        data,
        isLoading,
    }
        
    
}