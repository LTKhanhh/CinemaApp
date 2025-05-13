import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '@/constants/images'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'

import { data } from '../(tabs)/datatest'

interface Film {
    _id: {
        $oid: string;
    };
    title: string;
    description: string;
    releaseDate: string;
    language: string;
    director: string;
    actors: string[];
    duration: number;
    genres: string[];
    ageRating: string;
    posterUrl: string;
    bannerUrl: string;
    trailerUrl: string;
    status: string;
}
const InfoFilm = ({ id }: { id: string }) => {
    const router = useRouter()

    const [film, setFilm] = useState<Film>()

    useEffect(() => {
        setFilm(data.find(item => item._id.$oid == id))
    }, [id])
    return (
        <View>
            <View className='relative'>

                <Image className='w-full resize h-[160px]' source={{ "uri": film?.bannerUrl }} />
                <View className='absolute w-full top-[50px] ' style={{
                    // Shadow không được hỗ trợ trực tiếp bằng class tailwind trong nativewind
                    // shadowColor: '#000',
                    // shadowOffset: { width: 0, height: 2 },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 3.84,
                    // elevation: 5,
                }}>
                    <Text className='text-2xl font-rubik-semibold text-white capitalize text-center '>{film?.title}</Text>
                    <Text className='text-sm font-rubik-semibold text-white capitalize text-center '>{film?.genres} | {film?.duration} phút</Text>
                </View>


                <Image
                    source={images.cardGradient}
                    className="size-full rounded-2xl absolute bottom-0"
                />

            </View>
            <View className=' items-center justify-center flex-row -top-12 '
            // style={{ transform: [{ translateX: 0 }], }}
            >
                <TouchableOpacity onPress={() => router.push({ pathname: "/(root)/(filmDetail)/[id]", params: { id: id } })}>
                    <Text className='text-[13px] text-blue-400 border-blue-400 p-1 border rounded-full font-rubik-semibold'>Chi tiết phim</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default InfoFilm