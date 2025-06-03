import { View, Text, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import icons from '@/constants/icons';
import { data } from '../(tabs)/datatest';
import images from '@/constants/images';
import FilmInfo from './FilmInfo';
import { useLocalSearchParams } from 'expo-router';

import { useState, useEffect } from 'react';
import { getOneFilmResType } from '@/schemaValidations/film.schema';
import filmApiRequest from '@/apiRequest/film';
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
const DetailPage = () => {
    const navigation = useNavigation()
    const { id } = useLocalSearchParams<{ id: string }>();

    const [film, setFilm] = useState<Film>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setFilm(data.find(item => item._id.$oid == id))
    }, [id])

    const [filmInfo, setFilmInfo] = useState<getOneFilmResType>()

    useEffect(() => {
        const controller = new AbortController()

        const getData = async () => {
            setLoading(true)
            try {
                const res = await filmApiRequest.getOne(id, controller)
                console.log(res)
                setFilmInfo(res.payload)
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [id])
    return (
        <View className='flex-1'>
            <View className='h-[100px]'>
                <LinearGradient
                    colors={['#3674B5', '#A1E3F9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}

                >
                    <View className='w-full h-full justify-end pl-2 pb-2'>
                        <View className='flex-row items-center'>
                            <Pressable onPress={navigation.goBack}>
                                <Image source={icons.leftarrow} className='size-9 mr-4' tintColor={'white'}></Image>
                            </Pressable>
                            <Text className='text-2xl font-rubik-semibold text-white'>Chi tiết phim</Text>
                        </View>
                    </View>

                </LinearGradient>
            </View>

            <ScrollView className='flex-1 mb-10'>
                <View>
                    <Image className='w-full h-[160px]' source={{ uri: film?.posterUrl }} />
                </View>

                <FilmInfo
                    image={film?.posterUrl}
                    title={film?.title}
                    ageRating={film?.ageRating}
                    director={film?.director}
                    actors={film?.actors}
                    duration={film?.duration}
                    genres={film?.genres}
                    language={film?.language}
                    releaseDate={film?.releaseDate}
                    description={film?.description}
                />

            </ScrollView>

            {loading && (
                <View className="absolute inset-0 bg-gray-500/50 justify-center items-center z-50">
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </View>
    )
}

export default DetailPage