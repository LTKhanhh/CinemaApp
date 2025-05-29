import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import { ActivityIndicator, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, Redirect } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
import icons from '@/constants/icons';
import InfoFilm from './InfoFilm';
import AddressCard from './AddressCard';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getShowTimeByFilmType, showTimeType } from '@/schemaValidations/showTime.schema';
import showtimeApiRequest from '@/apiRequest/showtime';
import FilterTime from '../(bookingInCinema)/filterTime';
import { filmInListType } from '@/schemaValidations/film.schema';
const BookingPage = () => {
    const navigation = useNavigation()
    const params = useLocalSearchParams<{ film: string }>();

    // Dùng useMemo để parse 1 lần duy nhất, tránh lỗi performance
    const movie: filmInListType | null = useMemo(() => {
        try {
            return params.film ? JSON.parse(params.film as string) : null;
        } catch {
            return null;
        }
    }, [params.film]);
    // console.log(movie)
    const [showTime, setShowTime] = useState<getShowTimeByFilmType>({})
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const fetchData = useCallback(
        async (abortController?: AbortController): Promise<void> => {
            setIsLoading(true);
            try {
                const controller = abortController || new AbortController();
                const res = await showtimeApiRequest.getByFilm(movie?.id || "", page, controller);
                setShowTime(res.payload);
                // console.log(showTime)
            } catch (error) {
                // setError("Không thể tải dữ liệu công việc. Vui lòng thử lại sau.")
            } finally {
                setIsLoading(false);
            }
        },
        [movie, page]
    );
    const refetchData = (): void => {
        fetchData();
    };
    useEffect(() => {
        const controller = new AbortController();

        fetchData(controller)

        return () => controller.abort();
    }, [page]);

    // if (isLoading) {
    //     return (
    //         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    //             <SafeAreaView className="h-full flex justify-center items-center">
    //                 <ActivityIndicator className="text-primary-300" size="large" />
    //             </SafeAreaView>
    //         </TouchableWithoutFeedback>
    //     );
    // }
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
                            <Text className='text-2xl font-rubik-semibold text-white'>Đặt vé theo phim</Text>

                        </View>
                    </View>

                </LinearGradient>
            </View>

            <ScrollView className='flex-1 mb-10'>
                <InfoFilm film={movie} />

                <FilterTime setPage={setPage} />
                {
                    Object.entries(showTime).map(([key, value]) => (
                        <AddressCard key={key} name={key} list={value} film={movie} />
                    ))
                }




            </ScrollView>

            {isLoading && (
                <View className="absolute inset-0 bg-gray-500/50 justify-center items-center z-50">
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </View>
    )
}

export default BookingPage