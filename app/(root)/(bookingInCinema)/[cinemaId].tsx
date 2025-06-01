import { View, Text, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, Redirect } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
import icons from '@/constants/icons';
import FilterTime from './filterTime';
import FilmCard from './FilmCard';
import { useCallback, useEffect, useState } from 'react';
import { getShowTimeByCinemaType, showTimeType } from '@/schemaValidations/showTime.schema';
import showtimeApiRequest from '@/apiRequest/showtime';

const Page = () => {
    const navigation = useNavigation()
    const { cinemaId } = useLocalSearchParams<{ cinemaId: string }>();
    const [page, setPage] = useState(0)
    const [films, setFilms] = useState<getShowTimeByCinemaType>()
    const [isLoading, setIsLoading] = useState(false)
    const fetchData = useCallback(
        async (abortController?: AbortController): Promise<void> => {
            setIsLoading(true);

            try {
                const controller = abortController || new AbortController();
                const res = await showtimeApiRequest.getByCinema(cinemaId, page, controller);

                setFilms(res.payload);
                // console.log(showTime)
            } catch (error) {
                // console.error("Error fetching job data:", error)
                // setError("Không thể tải dữ liệu công việc. Vui lòng thử lại sau.")
            } finally {
                setIsLoading(false);
            }
        },
        [cinemaId, page]
    );

    const refetchData = (): void => {
        fetchData();
    };
    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller)

        return () => controller.abort();
    }, [page]);
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
                            <Text className='text-2xl font-rubik-semibold text-white'>Đặt vé theo rạp</Text>

                        </View>
                    </View>

                </LinearGradient>
            </View>

            <ScrollView className='flex-1 mb-10 bg-[#f7f7f7]'>

                <View className='py-6 border-b border-[#ccc] mx-6'>
                    <Text className='font-rubik-semibold text-[18px]  text-center'>Nemui Thanh Xuân</Text>
                </View>

                <FilterTime setPage={setPage} />

                {films &&
                    Object.entries(films)
                        .filter(([key]) => key !== "films")
                        .map(([filmId, showTimes], idx) => {
                            const film = films.films[filmId];
                            if (!film) return null; // tránh lỗi nếu filmId không có trong films

                            return (
                                <View key={filmId} className='px-3'>

                                    <FilmCard
                                        key={idx}
                                        film={film}
                                        showTimes={showTimes as showTimeType[]}
                                    />
                                </View>

                            );
                        })}
            </ScrollView>

            {isLoading && (
                <View className="absolute inset-0 bg-gray-500/50 justify-center items-center z-50">
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </View>
    )
}

export default Page