import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const TimeCard = ({ isLogged, id, seats, hour, minute }: { isLogged: boolean, id: string, seats: number, hour: number, minute: number }) => {
    const router = useRouter()
    return (
        <View className='items-center mr-4'>
            <TouchableOpacity onPress={isLogged ? () => router.push({ pathname: "/(root)/(booking2)/[id]", params: { id: id } }) : () => router.navigate("/login")} className='p-2 items-center justify-center px-4 bg-[#ccc] rounded-full'>
                <Text className='font-bold'>{hour}:{minute == 0 ? "00" : minute}</Text>
            </TouchableOpacity>
            <Text className='text-[#444] text-[13px] mt-1'>{seats} trống</Text>
        </View>
    )
}

export default TimeCard