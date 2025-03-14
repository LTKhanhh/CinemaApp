import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import icons from '@/constants/icons'
import { useNavigation } from 'expo-router'
import React from 'react'

const PromotionItem = () => {
    const navigate = useNavigation()
    return (
        <ScrollView className='h-full bg-[#f7f7f7]'>
            <View className='pb-2 w-full items-center pt-[60px] flex-row bg-primary-300'>
                <Pressable onPress={() => navigate.goBack()}>
                    <Image source={icons.leftarrow} className='size-11' tintColor="white" />
                </Pressable>
                <Text className='text-2xl ml-4 font-rubik-bold text-white'>Tin mới và Ưu đãi</Text>
            </View>
        </ScrollView>

    )
}

export default PromotionItem