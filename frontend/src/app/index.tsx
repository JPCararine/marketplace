import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Redirect } from "expo-router";
import React from "react";

export default function App() {
    const [loading, setLoading] = React.useState(true);

    const userData = {
        token: "asdasdasd",
        name: "User teste",
    }

    if(userData) {
        return <Redirect href={"/(private)/home"}/>
    } else {

    }

    return (
        <Redirect href={"/login"} /> 
    )
}