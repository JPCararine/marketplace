import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Redirect } from "expo-router";
import React from "react";
import { useUserStore } from "../shared/store/user-store";

export default function App() {
    const [loading, setLoading] = React.useState(true);
    const { user, token } = useUserStore();
    if(user && token) {
        return <Redirect href="/(private)/home" />
    }


    return (
        <Redirect href={"/(public)/login"} /> 
    )
}