import { View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView, Image, KeyboardAvoidingView, Platform } from "react-native";
import useRegisterViewModel from "./useRegister.viewModel";
import React from "react";
import AppInputController from "../../shared/components/AppInputController";
import AuthHeader from "../../shared/components/AuthHeader";
import Button from "../../shared/components/Button";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterView({onSubmit, control, handleSelectImage, avatarUri}: ReturnType<typeof useRegisterViewModel>) {


    return (
        <KeyboardAvoidingView style={{ flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
        <View className="p-10 flex-1">
            <AuthHeader
            title="Crie sua conta"
            subtitle="Informe os seus dados pessoais e de acesso"
            logoWidth={64}
            logoHeight={48}
            />
            <View className="justify-center items-center">
            {avatarUri ? 
                <TouchableOpacity onPress={handleSelectImage} className="mt-10  justify-center items-center rounded-lg bg-slate-300 w-[120px] h-[120px]">
                    <Image className="w-full h-full rounded-lg" resizeMode="cover" source={{ uri: avatarUri }}/>
                </TouchableOpacity>
                
             : 
            <TouchableOpacity onPress={handleSelectImage} className="mt-10  justify-center items-center rounded-lg bg-slate-300 w-[120px] h-[120px]">
               <Ionicons name="cloud-upload-outline" size={32} />
            </TouchableOpacity>
            }
            <AppInputController control={control} name="name" leftIcon="person-outline" label="NOME" placeholder="Seu nome completo"/>
            <AppInputController control={control} name="phone" leftIcon="call-outline" label="TELEFONE" placeholder="(00) 00000-0000"/>
            </View>
            <View className="mt-5">
                <Text className="text-base text-gray-500 font-medium">Acesso</Text>
            <AppInputController control={control} name="email" leftIcon="mail-outline" label="E-MAIL" placeholder="mail@exemplo.br"/>
            <AppInputController control={control} name="password" leftIcon="lock-closed-outline" label="SENHA" placeholder="Sua senha" secureTextEntry={true}/>
            <AppInputController control={control} name="confirmPassword" leftIcon="lock-closed-outline" label="CONFIRMAR SENHA" placeholder="Confirme a senha" secureTextEntry={true}/>
            <View className="mt-6">
            <Button title="Cadastrar" variant="fill" icon={"arrow-forward"} onPress={onSubmit}/>
            </View>
            <View className="justify-center mt-12 gap-6">
                <Text className="text-base text-gray-300">Já possui uma conta?</Text>
                <Button title="Acessar" variant="outline" icon={"arrow-forward"} onPress={() => router.push("/(public)/login")}/>
            </View>
            </View>
            
        </View>
        </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}