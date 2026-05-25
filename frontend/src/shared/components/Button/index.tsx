import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, Text, ColorValue, TextProps, TouchableOpacityProps } from "react-native";
import { buttonVariants } from "./button.variants";
import clsx from "clsx";
import { colors } from "../../../styles/colors";

interface ButtonProps extends TouchableOpacityProps{
    title: string;
    variant?: "fill" | "outline";
    icon?: keyof typeof Ionicons.glyphMap;
}

export default function Button({title, variant, icon, ...rest}: ButtonProps) {

    const styles = buttonVariants({ variant });

    

    return (
        <TouchableOpacity className={clsx(styles.container(), icon ? "justify-between" : "justify-center")} {...rest}> 
            <Text className={styles.text()}>
                {title}
             </Text>
              {icon && (
                <Ionicons
                name={icon}
                size={24}
                color={styles.icon()}
                />
            )}
        </TouchableOpacity>
    )
}