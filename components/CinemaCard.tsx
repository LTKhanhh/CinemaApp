import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import { useRouter } from 'expo-router'
const CinemaCard = ({ name, distance, id }: { name: string, distance: string, id: string }) => {
    const router = useRouter()
    console.log(id)
    return (
        <TouchableOpacity onPress={() => router.push({ pathname: "/(root)/(bookingInCinema)/[cinemaId]", params: { cinemaId: id } })} className='w-[49%] bg-white rounded-lg overflow-hidden'>
            {/* <TouchableOpacity onPress={() => router.push(`/bookingByCinema/${id}`)} className='w-[49%] bg-white rounded-lg overflow-hidden'> */}

            <Image source={{ uri: "https://static.vinwonders.com/production/rap-phim-ha-noi-2.jpg" }} className='w-full h-[130px] ' />

            <View className=' justify-center items-center py-3'>
                <Text className='text-md font-rubik-bold'>{name}</Text>
                <Text className='font-rubik-light text-xs'>{distance}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CinemaCard