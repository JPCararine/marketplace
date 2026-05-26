import { baseURL } from "../../shared/api/market-place";
import { useUserStore } from "../../shared/store/user-store";

export default function useHomeViewModel() {
    const { user, logout } = useUserStore();
    
    const username = user?.name ?? "Usuário";
    const avatarUrl = user?.avatarUrl
        ? `${baseURL}${user.avatarUrl}`
        : null;
    const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);

    return {
        formattedUsername,
        avatarUrl,
        logout,
    }
}