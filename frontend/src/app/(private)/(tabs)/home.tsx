import { useEffect } from "react";
import { useUserStore } from "../../../shared/store/user-store";
import HomeView from "../../../viewModels/Home/Home.view";
import useHomeViewModel from "../../../viewModels/Home/useHome.viewModel";
import { marketPlaceApiClient } from "../../../shared/api/market-place";

export default function Home() {

    const { logout } = useUserStore();

    const props = useHomeViewModel();

    return (
        
            <HomeView {...props}/>
            
    )
}