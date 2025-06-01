import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '@/constants/images'


import { data } from '../(tabs)/datatest'


const InfoFilm = ({ name, duration, poster, step, genres, time }: { time?: string, genres?: string[], name: string, duration: string, poster: string, step?: number }) => {


    return (
        <View>
            <View className='relative'>

                <Image className={`w-full resize ${step == 2 ? 'h-[180px]' : "h-[140px]"} `} source={{ "uri": poster }} />
                <View className='absolute w-full top-[80px] ' >
                    <Text className='text-2xl font-rubik-semibold text-white capitalize text-center '>{name}</Text>
                    <Text className='text-sm font-rubik-medium text-white capitalize text-center '>{"2D"} | {step == 2 && genres?.join(", ")}{step != 2 && formatDateTime(time)} | {duration} phút</Text>
                </View>


                <Image
                    source={images.cardGradient}
                    className="size-full rounded-2xl absolute bottom-0"
                />

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

export default InfoFilm