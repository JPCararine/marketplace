import { TouchableOpacity, View, Text, FlatList, useWindowDimensions, ActivityIndicator, RefreshControl } from "react-native";
import HomeHeader from "./components/HomeHeader";
import { useUserStore } from "../../shared/store/user-store";
import useHomeViewModel from "./useHome.viewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "./components/SearchInput";
import ProductCardView from "./components/ProductCard/ProductCard.view";
import { colors } from "../../styles/colors";

export default function HomeView({ isRefetching,formattedUsername, avatarUrl, logout, fetchNextPage, hasNextPage, isFetchingNextPage,  products, handleLoadMore, handleRefresh}: ReturnType<typeof useHomeViewModel>) {
   const { width } = useWindowDimensions();
   const listPadding = 16;
   const gap = 12;

    const cardWidth = (width - listPadding * 2 - gap) / 2;

    const footerComponent = isFetchingNextPage ? (
        <View className="items-center justify-center py-4">
            <ActivityIndicator color={colors["purple-base"]} />
        </View>
        ) : !hasNextPage && products.length > 0 ? (
        <View className="items-center justify-center py-4">
            <Text className="text-base font-semibold text-purple-base">
            Você chegou ao fim dos produtos!
            </Text>
        </View>
) : null
    return (
        
            <SafeAreaView edges={["top"]} className="flex-1 pt-8">
        <FlatList 
        data={products}
        keyExtractor={(item) => item.id.toString()} 
        numColumns={2}
        columnWrapperStyle={{ gap }}
        contentContainerStyle={{
            paddingHorizontal: listPadding,
            paddingBottom: 120,
            gap: 12,
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        refreshControl={<RefreshControl 
            refreshing={isRefetching}
            colors={[colors["purple-base"]]} 
            tintColor={colors["purple-base"]} 
            onRefresh={handleRefresh}
            />}
        renderItem={({item}) => 
        <ProductCardView data={item} cardWidth={cardWidth}
        />}
        ListHeaderComponent={() => (
            <>
                <HomeHeader username={formattedUsername} avatarUrl={avatarUrl ?? undefined} />
                <SearchInput />
            </>
        )}
        /> 
        ListFooterComponent={footerComponent}
            </SafeAreaView>
       
    )
}