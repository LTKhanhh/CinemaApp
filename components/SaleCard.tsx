import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import { Link, useNavigation } from 'expo-router'

const SaleCard = () => {
    const navigate = useNavigation()


    return (
        <TouchableOpacity className='px-6 py-2'>
            <Link href={"/(root)/(promotion)/PromotionItem"}>
                <View className='w-full flex-row mb-6 justify-between rounded-md bg-white'>
                    <Image className='flex-1 h-[100px] rounded-md translate-x-[-8px] translate-y-[-8px]' source={images.newYork}></Image>
                    <View className='py-6 px-4 flex-1'>
                        <Text className='font-rubik-semibold text-lg uppercase'>say yes là iu - ưu đãi cực nhìu</Text>
                    </View>
                </View>
            </Link>

        </TouchableOpacity>

    )
}

export default SaleCard