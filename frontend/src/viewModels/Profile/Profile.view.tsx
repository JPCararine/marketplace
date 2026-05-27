import { TouchableOpacity, View, Text, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import useProfileViewModel from "./useProfile.viewModel";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { router } from "expo-router";
import AppInput from "../../shared/components/AppInput";
import AppInputController from "../../shared/components/AppInputController";
import Button from "../../shared/components/Button";
import { useEffect } from "react";



export default function ProfileView({user, avatarUrl, control, loading, onSubmit, logout, handleSelectImage}: ReturnType<typeof useProfileViewModel>) {

    return (
         <KeyboardAvoidingView style={{ flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
        <View className="p-4 pt-14 flex-1">
            <View className="flex-row justify-between items-center ">
                <TouchableOpacity className="w-[70px] h-[24px] gap-2 flex-row" onPress={() => router.back()}>
                    <Ionicons name="arrow-back-outline" size={20} color={colors["purple-base"]} />
                    <Text className="text-sm text-purple-base font-semibold">Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-[70px] h-[24px] gap-2 flex-row" onPress={logout}>
                    <Text className="text-sm text-danger font-semibold ml-5">Sair</Text>
                    <Ionicons name="arrow-forward-outline" size={20} color={colors.danger} />
                </TouchableOpacity>
            </View>
            <View className="p-8 flex-1">
                <View className="items-center">
                <TouchableOpacity onPress={handleSelectImage}
                className="w-[120px] h-[120px] bg-slate-300 rounded-xl justify-center items-center overflow-hidden"
                >
                {avatarUrl ? (
                    <Image
                    source={{ uri: avatarUrl }}
                    className="w-full h-full rounded-xl"
                    resizeMode="cover"
                    />
                ) : (
                    <Ionicons name="person-circle-outline" size={70} />
                )}
                </TouchableOpacity>
                </View>
                <View className="justify-center">
                <Text className="text-base font-semibold text-gray-500 mt-4">Dados pessoais</Text>
                <AppInputController control={control} name="name" leftIcon="person-outline" label="NOME" placeholder="Seu nome completo" />
                <AppInputController control={control} name="phone" leftIcon="call-outline" label="TELEFONE" placeholder="(00) 00000-0000" />
                <View className="mt-5">
                                <Text className="text-base text-gray-500 font-medium">Acesso</Text>
                <AppInputController control={control} name="email" leftIcon="mail-outline" label="E-MAIL" placeholder="mail@exemplo.br"/>
                <AppInputController control={control} name="password" leftIcon="lock-closed-outline" label="SENHA ATUAL" placeholder="Sua senha" secureTextEntry={true}/>
                <AppInputController control={control} name="newPassword" leftIcon="lock-closed-outline" label="NOVA SENHA" placeholder="Sua nova senha" secureTextEntry={true}/>
                {!loading ? (
                    <Button title="Atualizar cadastro" onPress={onSubmit} />
                ) : (
                    <ActivityIndicator />
                )}
                
                </View>
            </View>

        </View>
        </View>
        </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}