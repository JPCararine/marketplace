import { useQueries, useQuery } from "@tanstack/react-query";
import * as orderService from "../../services/order.service";
export default function orderQueries () {
    
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => orderService.getOrders(),
    })
}