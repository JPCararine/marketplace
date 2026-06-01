import { View, Text, Image, TouchableOpacity } from "react-native";
import { useReviewBottomSheetViewModel } from "./useReviewBottomSheet.viewModel";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import AppInput from "../../../shared/components/AppInput";
import App from "../../../app";
import Button from "../../../shared/components/Button";

export default function ReviewBottomSheetView({rating, setRating, close}: ReturnType<typeof useReviewBottomSheetViewModel>) {
    
    return (
        <View className="px-6 py-8 gap-10">
            <View className="flex-row items-center justify-between">
                <View>
                <Text className="text-base font-semibold">Avaliar Produto</Text>
                </View>
                <TouchableOpacity className="items-center justify-center border border-gray-400 rounded-lg border-width-2 w-[24px] h-[24px]">
                <Ionicons name="close" size={20} color="#A0AEC0" />
                </TouchableOpacity>
            </View>
            <View>
                <Text className="text-sm text-gray-200 font-semibold">NOTA</Text>
                <View className="flex-row items-center gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity key={star} onPress={() => setRating(star)}>
                            <Ionicons name="star" size={32} color={rating >= star ? "#FBBF24" : "#A0AEC0"} />
                        </TouchableOpacity>
                    ))}
                </View>
                <AppInput 
                label="COMENTÁRIO" 
                labelClassName="text-sm text-gray-200 font-semibold" 
                placeholder="Descreva sua avaliação" 
                containerClassName="mt-5 mb-8" 
                multiline 
                textAlignVertical="top"
                className="h-[150px] "
                />
            </View>
            <View className="flex-row gap-3 mb-10">
            <TouchableOpacity className="flex-1 border border-purple-base rounded-lg items-center justify-center h-[48px]" onPress={() => close()}>
                <Text className="text-base font-semibold text-purple-base">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-purple-base rounded-lg items-center justify-center h-[48px]">
                <Text className="text-base font-semibold text-white">Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}