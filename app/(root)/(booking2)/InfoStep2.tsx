import { View, Text } from 'react-native'
import React from 'react'
import InfoFilm from './InfoFilm'
import { seatType } from '@/schemaValidations/seat.schema'

const InfoStep2 = ({ seats, price }: { seats: seatType[], price: number }) => {
    return (
        <View className='rounded-lg overflow-hidden drop-shadow-2xl'>
            <InfoFilm step={2} id={"67f4163a6ba6b5592cd2e5cf"}></InfoFilm>
            <View className='p-3 bg-white py-4'>
                <View className='flex-row'>
                    <Text className='w-[140px] text-xl font-rubik'>Rạp chiếu</Text>
                    <Text className='text-xl font-rubik-semibold'>Beta Lào Cai</Text>
                </View>

                <View className='flex-row'>
                    <Text className='w-[140px] text-xl font-rubik'>Ngày chiếu</Text>
                    <Text className='text-xl font-rubik-semibold'>17/05/2025</Text>
                </View>

                <View className='flex-row'>
                    <Text className='w-[140px] text-xl font-rubik'>Giờ chiếu</Text>
                    <Text className='text-xl font-rubik-semibold'>Beta Lào Cai</Text>
                </View>

                <View className='flex-row'>
                    <Text className='w-[140px] text-xl font-rubik'>Phòng</Text>
                    <Text className='text-xl font-rubik-semibold'>Beta Lào Cai</Text>
                </View>

                <View className='flex-row'>
                    <Text className='w-[140px] text-xl font-rubik'>Ghế</Text>
                    <Text className='text-xl font-rubik-semibold'>{seats.map(seat => seat.name).join(', ')}</Text>
                </View>
            </View>
        </View>
    )
}

export default InfoStep2