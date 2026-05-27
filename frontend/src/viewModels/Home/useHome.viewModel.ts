import { baseURL } from "../../shared/api/market-place";
import useProductsInfiniteQuery from "../../shared/queries/product/use-getProducts.queries";
import getProducts from "../../shared/queries/product/use-getProducts.queries";
import { useUserStore } from "../../shared/store/user-store";

export default function useHomeViewModel() {
    const { user, logout } = useUserStore();
    const {  fetchNextPage, hasNextPage, isFetchingNextPage, data, isLoading, refetch, products, isRefetching } = useProductsInfiniteQuery();
    const username = user?.name ?? "Usuário";
    const avatarUrl = user?.avatarUrl
        ? `${baseURL}${user.avatarUrl}`
        : null;
    const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    

    function handleLoadMore () {
        if(hasNextPage && !isFetchingNextPage && !isLoading) {
                fetchNextPage();
            }
    }
    
    async function handleRefresh () {
        await refetch();
    }

    
    return {
        formattedUsername,
        avatarUrl,
        logout,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data,
        products,
        handleLoadMore,
        handleRefresh,
        isRefetching,
        
    }
}