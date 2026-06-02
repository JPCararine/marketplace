import { useQuery } from "@tanstack/react-query";
import * as favoriteService from "../../services/favorites.service";

export function useFavoritesQuery () {

    return useQuery({
        queryKey: ["favorites"],
        queryFn: () => favoriteService.getFavorites(),
    })
}