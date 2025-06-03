import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import Voucher from '../(tabs)/Conversation'
import { useNavigation, useRouter } from 'expo-router'
// import { Link } from 'expo-router'
const LinkItem = ({ title, link }: { title: string, link?: string }) => {
    const router = useRouter()
    const handleNavigate = () => {
        if (link == "password") {
            router.push("/(root)/(profile)/changePassword")
        }
        if (link == "booking") {
            router.push("/(root)/(bookingList)")
        }
    }
    return (
        <TouchableOpacity onPress={handleNavigate} className='py-3 mt-4  px-2 flex-row bg-white mx-2 justify-between items-center'>
            <Text className='text-[16px]'>{title}</Text>

            <View className='bg-[#ccc] p-1 justify-center items-center rounded-full'>
                <Image className='size-7' source={icons.rightArrow} />

            </View>
        </TouchableOpacity>
    )
}

export default LinkItem