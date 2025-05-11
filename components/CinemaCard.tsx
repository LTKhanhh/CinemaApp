import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import { useRouter } from 'expo-router'
const CinemaCard = ({ name, distance, id }: { name: string, distance: string, id: string }) => {
    const router = useRouter()
    return (
        <TouchableOpacity onPress={() => router.push({ pathname: "/(root)/(bookingInCinema)/[cinemaId]", params: { cinemaId: id } })} className='w-[49%] bg-white rounded-lg overflow-hidden'>
            <Image source={images.japan} className='w-full h-[130px] ' />

            <View className=' justify-center items-center py-3'>
                <Text className='text-md font-rubik-bold'>{name}</Text>
                <Text className='font-rubik-light text-xs'>{distance}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CinemaCard