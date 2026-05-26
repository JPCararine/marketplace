import { TouchableOpacity, View, Text, FlatList } from "react-native";
import HomeHeader from "./components/HomeHeader";
import { useUserStore } from "../../shared/store/user-store";
import useHomeViewModel from "./useHome.viewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "./components/SearchInput";

export default function HomeView({ formattedUsername, avatarUrl, logout }: ReturnType<typeof useHomeViewModel>) {
   
    return (
        
            <SafeAreaView edges={["top"]} className="flex-1 p-2 pt-8">
        <FlatList 
        data={[]} 
        renderItem={() => <></>}
        ListHeaderComponent={() => (
            <>
                <HomeHeader username={formattedUsername} avatarUrl={avatarUrl ?? undefined} />
                <SearchInput />
            </>
        )}
        contentContainerClassName="px-[16px] pb-[120px]"
        />
            </SafeAreaView>
       
    )
}