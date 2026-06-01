import { useState } from "react";
import { baseURL } from "../../shared/api/market-place";
import useProductsInfiniteQuery from "../../shared/queries/product/use-getProducts.queries";
import getProducts from "../../shared/queries/product/use-getProducts.queries";
import { useFilterStore } from "../../shared/store/use-filter-store";
import { useUserStore } from "../../shared/store/user-store";
import { useDebounce } from "../../shared/hooks/useDebounce";

export default function useHomeViewModel() {
    const { appliedFilterState } = useFilterStore();
    const { user, logout } = useUserStore();
    const [searchInputText, setSearchInputText] = useState('')
    const currentSearchText = useDebounce(searchInputText);
    const {  fetchNextPage, hasNextPage, isFetchingNextPage, data, isLoading, refetch, products, isRefetching } = useProductsInfiniteQuery({ filters: {...appliedFilterState, searchText: currentSearchText } });
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

    function handleEndReached () {
        handleLoadMore();
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
        handleEndReached,
        searchInputText,
        setSearchInputText,
        
    }
}