import "react-native-gesture-handler";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../../global.css";
import AppModal from "../shared/components/AppModal";
import ToastManager from "toastify-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <Stack screenOptions={{headerShown:false}}>
                    <Stack.Screen name="(public)"/>
                    <Stack.Screen name="(private)"/>
                </Stack>
                <AppModal />
                <ToastManager useModal={false}/>
            </QueryClientProvider>
        </GestureHandlerRootView>
    )
}
