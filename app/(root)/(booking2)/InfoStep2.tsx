import { View, Text } from 'react-native'
import React from 'react'
import InfoFilm from './InfoFilm'
import { seatType } from '@/schemaValidations/seat.schema'
import { filmInListType } from '@/schemaValidations/film.schema'

const InfoStep2 = ({ time, movie, seats, price }: { time: string, movie: filmInListType | null, seats: seatType[], price: number }) => {
    return (
        <View className='rounded-lg overflow-hidden drop-shadow-2xl'>
            <InfoFilm step={2} genres={movie?.genres} name={movie?.title || ""} duration={movie?.duration.toString() || ""} poster={movie?.posterUrl || ""} ></InfoFilm>
            <View className='p-3 bg-white py-4'>
                {/* <View className='flex-row'>
                    <Text className='w-[140px] text-xl font-rubik'>Rạp chiếu</Text>
                    <Text className='text-xl font-rubik-semibold'>Beta Lào Cai</Text>
                </View> */}

                <View className='flex-row mt-4'>
                    <Text className='w-[140px] text-xl font-rubik'>Ngày chiếu</Text>
                    <Text className='text-xl font-rubik-semibold'>{formatDateTime(time).slice(5)}</Text>
                </View>

                <View className='flex-row mt-4'>
                    <Text className='w-[140px] text-xl font-rubik'>Giờ chiếu</Text>
                    <Text className='text-xl font-rubik-semibold'>{formatDateTime(time).slice(0, 5)}</Text>
                </View>

                {/* <View className='flex-row'>
                    <Text className='w-[140px] text-xl font-rubik'>Phòng</Text>
                    <Text className='text-xl font-rubik-semibold'>Beta Lào Cai</Text>
                </View> */}

                <View className='flex-row mt-4'>
                    <Text className='w-[140px] text-xl font-rubik'>Ghế</Text>
                    <Text className='text-xl font-rubik-semibold'>{seats.map(seat => seat.name).join(', ')}</Text>
                </View>
            </View>
        </View>
    )
}


function formatDateTime(isoString?: string): string {
    if (!isoString) {
        return ""
    }
    const cleanInput = isoString.replace(/^"|"$/g, '');

    const [datePart, timePart] = cleanInput.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');

    return `${hour}:${minute} ${day}/${month}/${year}`;
}
export default InfoStep2