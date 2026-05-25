import { View, Text, Pressable, TextInput, TouchableOpacity, TextInputProps } from "react-native";
import { appInputVariants, AppInputVariantsProps } from "./input.variants";
import { Ionicons } from "@expo/vector-icons";
import useAppInputViewModel from "./useAppInputViewModel";
import { colors } from "../../../styles/colors";

export interface AppInputProps extends TextInputProps, AppInputVariantsProps {
    label?: string;
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: boolean;
    containerClassName?: string;
    mask?: (value: string) => void | string;
    error?: string;
}  

export default function AppInput({
    label, leftIcon, rightIcon, containerClassName, 
    mask, className, value, isError, 
    secureTextEntry, onBlur, onFocus,
    onChangeText, error, isDisabled, ...textInputProps
}: AppInputProps) {
    
    const {
        getIconColor, 
        handleBlur, 
        handleFocus, 
        handlePasswordToggle, 
        handleWrapperPress, 
        showPassword, 
        isFocused, 
        inputRef, 
        handleTextChange} = useAppInputViewModel({
        mask, value, isError: !!error || isError, 
        secureTextEntry, onBlur, onFocus,
        onChangeText, error, ...textInputProps,

    });
    const styles = appInputVariants({
        isFocused,
        isDisabled,
        isError: !!error,

    })

    return (
        <View className={styles.container({className: containerClassName})}>
            <Text className={styles.label()}>{label}</Text>
            <Pressable className={styles.wrapper()} onPress={handleWrapperPress}>
                {leftIcon && (
                <Ionicons
                    color={getIconColor()}
                    className="mr-3"
                    size={22}
                    name={leftIcon}
                />
                )}
                <TextInput 
                ref={inputRef} 
                value={value} 
                onChangeText={handleTextChange} 
                className={styles.input()} 
                onFocus={handleFocus} 
                onBlur={handleBlur}
                placeholderTextColor={colors.gray[200]}
                secureTextEntry={secureTextEntry ? showPassword : false}
                {...textInputProps} 
                />
                {secureTextEntry && (
                    <TouchableOpacity activeOpacity={0.7} onPress={handlePasswordToggle}>
                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color={colors.gray[300]}/>
                    </TouchableOpacity>
                )}
            </Pressable>
            {error && (
                <Text className={styles.error()}>
                    <Ionicons name="alert-circle-outline" /> {error}
                </Text>
            )}
        </View>
    )
}