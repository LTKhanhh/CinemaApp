import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const TimeCard = ({ isLogged, id }: { isLogged: boolean, id: string }) => {
    const router = useRouter()
    return (
        <View className='items-center mr-4'>
            <TouchableOpacity onPress={isLogged ? () => router.push({ pathname: "/(root)/(booking2)/[id]", params: { id: id } }) : () => router.navigate("/login")} className='p-2 items-center justify-center px-4 bg-[#ccc] rounded-full'>
                <Text className='font-bold'>19:00</Text>
            </TouchableOpacity>
            <Text className='text-[#444] text-[13px] mt-1'>35 trống</Text>
        </View>
    )
}

export default TimeCard