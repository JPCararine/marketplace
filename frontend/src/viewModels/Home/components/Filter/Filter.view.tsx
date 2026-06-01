import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'


import { colors } from '../../../../styles/colors'
import AppInput from '../../../../shared/components/AppInput'
import useFilterViewModel from './useFilter.viewModel'
import Button from '../../../../shared/components/Button'

export default function FilterView ({ close }: ReturnType<typeof useFilterViewModel>) {
  return (
    <View>
      <View className="flex-row items-center justify-between py-4 px-6">
        <Text className="text-lg font-bold text-gray-900">
          Filtrar anúncios
        </Text>
        <TouchableOpacity onPress={close}>
          <Ionicons name="close" size={20} color={colors['purple-base']} />
        </TouchableOpacity>
      </View>

      <View className="py-4 px-6">
        <Text className="font-semibold text-base text-gray-300">VALOR</Text>
        <View className="flex-row mb-4 w-full">
          <View className="flex-1">
            <AppInput
              placeholder="De"
              keyboardType="numeric"
              containerClassName="w-[90%]"
            />
          </View>
          <View className="flex-1">
            <AppInput
              placeholder="Até"
              keyboardType="numeric"
              containerClassName="w-[90%]"
            />
          </View>
        </View>

        <Text className="font-semibold text-base text-gray-300">CATEGORIA</Text>

        <View className="flex-row gap-3 mt-4 mb-6">
          <View className="flex-1">
            <Button title="Limpar filtro" variant="outline" />
          </View>
          <View className="flex-1">
            <Button title="Filtrar" />
          </View>
        </View>
      </View>
    </View>
  )
}
