import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
import icons from '@/constants/icons'
import { useNavigation } from 'expo-router'
import InputCard from '@/components/InputCard'
import { useState } from 'react'


const historyVoucher = () => {
    const navigate = useNavigation()
    return (
        <View className='h-full bg-[#f7f7f7]'>
            <View className='pb-2 w-full items-center pt-[60px] flex-row bg-primary-300'>
                <Pressable onPress={() => navigate.goBack()}>
                    <Image source={icons.leftarrow} className='size-11' tintColor="white" />
                </Pressable>
                <Text className='text-2xl ml-4 font-rubik-bold text-white'>Lịch sử sử dụng voucher</Text>
            </View>
        </View>
    )
}

export default historyVoucher