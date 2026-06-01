import { Redirect, Stack } from "expo-router";
import { useUserStore } from "../../shared/store/user-store";
import AppBottomSheet from "../../shared/components/AppBottomSheet";

export default function PrivateLayout() {

     const { user, token } = useUserStore();
    
        if(!user || !token) {
            return <Redirect href="/(public)/login" />
        }
        
    return (
        <>
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="profile" />
            <Stack.Screen name="productdetail/[id]" />
            
        </Stack>

        <AppBottomSheet />
        </>
    )
}