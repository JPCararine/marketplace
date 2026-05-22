import React from "react";

export default function useRegisterViewModel() {

    const [userData, setUserData] = React.useState({});

    return {
        userData,
        setUserData,
    }
}