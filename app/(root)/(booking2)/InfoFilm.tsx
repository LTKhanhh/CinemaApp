import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '@/constants/images'


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
const InfoFilm = ({ id, step }: { id: string | string[], step?: number }) => {

    const [film, setFilm] = useState<Film>()

    useEffect(() => {
        setFilm(data.find(item => item._id.$oid == id))
    }, [id])
    return (
        <View>
            <View className='relative'>

                <Image className={`w-full resize ${step == 2 ? 'h-[260px]' : "h-[160px]"} `} source={{ "uri": film?.bannerUrl }} />
                <View className='absolute w-full top-[50px] ' style={{
                    // Shadow không được hỗ trợ trực tiếp bằng class tailwind trong nativewind
                    // shadowColor: '#000',
                    // shadowOffset: { width: 0, height: 2 },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 3.84,
                    // elevation: 5,
                }}>
                    <Text className='text-2xl font-rubik-semibold text-white capitalize text-center '>{film?.title}</Text>
                    <Text className='text-sm font-rubik-semibold text-white capitalize text-center '>{film?.genres.join(", ")} | {film?.duration} phút</Text>
                </View>


                <Image
                    source={images.cardGradient}
                    className="size-full rounded-2xl absolute bottom-0"
                />

            </View>
        </View>
    )
}

export default InfoFilm