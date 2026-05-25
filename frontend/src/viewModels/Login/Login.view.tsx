import { Keyboard, TouchableWithoutFeedback, View, Text } from "react-native";
import AuthHeader from "../../shared/components/AuthHeader";
import useLoginViewModel from "./useLogin.viewModel";
import AppInputController from "../../shared/components/AppInputController";
import Button from "../../shared/components/Button";
import { router } from "expo-router/build/exports";


export default function LoginView({onSubmit, control}: ReturnType<typeof useLoginViewModel>) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="p-10 flex-1">
        <AuthHeader title="Acesse sua conta" subtitle="Informe seu e-mail e senha para continuar"/>
        <View className="mt-10">
            <AppInputController control={control} name="email" leftIcon="mail-outline" label="E-MAIL" placeholder="mail@exemplo.br" />
            <AppInputController control={control} name="password" leftIcon="lock-closed-outline" label="SENHA" placeholder="Sua senha" secureTextEntry />
            <View className="mt-6">
            <Button title="Acessar" variant="fill" icon={"arrow-forward"} onPress={onSubmit}/>
            </View>
        </View>
            <View className="flex-1 justify-end mt-12 gap-6">
            <Text className="text-base text-gray-300">Ainda não possui uma conta?</Text>
            <Button title="Cadastrar" variant="outline" icon={"arrow-forward"} onPress={() => router.push("register")}/>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}