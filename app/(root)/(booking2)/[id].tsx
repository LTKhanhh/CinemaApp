import { View, Text, Pressable, Image, ScrollView, Alert, TouchableWithoutFeedback, Keyboard, ActivityIndicator, AppState } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, Redirect, useGlobalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import icons from '@/constants/icons';
import InfoFilm from './InfoFilm';
import { useAuthContext } from '@/lib/auth-provider';
import NextStep from './nextStep';
import { seatType } from '@/schemaValidations/seat.schema';
import seatApiRequest from '@/apiRequest/seat';
import SeatMap from './SeatMap';
import { connectSocket, getSocket } from '@/lib/socket';
import { TokenManager } from '@/lib/http1';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { useBookingParams } from '@/lib/useBookingParams';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export type BookingParams = {
    movie: string; // JSON string của FilmInListType
    showtimeId: string;
};

const SecondBookingPage = () => {
    const { isLogged } = useAuthContext();
    const { id, movie, time } = useBookingParams();
    const navigation = useNavigation<any>();
    const [timeRemaining, setTimeRemaining] = useState<number>(600); // 10 phút tính bằng giây
    const [selectedChairs, setSelectedChairs] = useState<seatType[]>([]); // Mảng lưu ghế đã chọn
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [step, setStep] = useState(1);
    const [data, setData] = useState<seatType[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const total = selectedChairs.reduce((sum, chair) => sum + chair.price, 0);
        setTotalPrice(total);
    }, [selectedChairs]);

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const res = await seatApiRequest.get(id || "", controller);
                setData(res.payload);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        return () => controller.abort();
    }, [id]);

    useEffect(() => {
        const initSocket = async () => {
            const token = await TokenManager.getToken();
            if (!token) {
                console.warn('❌ No access token found in storage.');
                return;
            }
            console.log("token" + token)
            console.log("id" + id)

            const socket = connectSocket(token, id || "");
            return () => socket.disconnect();
        };
        initSocket();


        return () => {
            const socket = getSocket();
            if (socket?.connected) {
                console.log("👋 Cleanup: disconnecting socket");
                // socket.emit("disconnect");
                socket.disconnect();
            }
        };
    }, [id]);



    const handlePick = (seat: seatType) => {
        const socket = getSocket();
        if (socket?.connected) {
            socket.emit('pick', seat);
        }
    };

    const handleUnPick = (seat: seatType) => {
        const socket = getSocket();
        if (socket?.connected) socket.emit('unpick', seat);
    };

    const cleanupBooking = async () => {
        if (timerRef.current) clearInterval(timerRef.current);
        await AsyncStorage.multiRemove([
            'bookingEndTime',
            'currentBookingId',
            'selectedChairs',
        ]);
        selectedChairs.forEach(handleUnPick);
    };

    useEffect(() => {
        let endTime: number;
        const setupTimer = async () => {
            const existingEndTime = await AsyncStorage.getItem('bookingEndTime');
            const existingBookingId = await AsyncStorage.getItem('currentBookingId');
            const now = new Date().getTime();
            if (existingEndTime && existingBookingId === id) {
                endTime = parseInt(existingEndTime);
            } else {
                endTime = now + 600_000;
                await AsyncStorage.multiSet([
                    ['bookingEndTime', endTime.toString()],
                    ['currentBookingId', id || ""],
                ]);
            }

            timerRef.current = setInterval(() => {
                const remaining = Math.floor((endTime - new Date().getTime()) / 1000);
                setTimeRemaining(remaining > 0 ? remaining : 0);
                if (remaining <= 0) {
                    clearInterval(timerRef.current!);
                    cleanupBooking();
                    Alert.alert("⏰ Hết thời gian", "Bạn đã hết thời gian đặt vé.", [
                        { text: "Quay lại trang chủ", onPress: () => router.push("/(root)/(tabs)") }
                    ]);
                }
            }, 1000);
        };

        setupTimer();

        const appListener = AppState.addEventListener('change', async (nextState) => {
            if (nextState === 'background') {
                const now = new Date().getTime();
                const endTime = now + timeRemaining * 1000;
                await AsyncStorage.setItem('bookingEndTime', endTime.toString());
            }
        });

        return () => {
            cleanupBooking();
            appListener.remove();
        };
    }, [id]);

    useEffect(() => {
        const updateSelectedChairs = async () => {
            if (selectedChairs.length > 0) {
                await AsyncStorage.setItem('selectedChairs', JSON.stringify(selectedChairs));
            } else {
                await AsyncStorage.removeItem('selectedChairs');
            }
        };
        updateSelectedChairs();
    }, [selectedChairs]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleChairSelect = (chairs: seatType[]): void => {
        setSelectedChairs(prev => {
            const allSelected = chairs.every(chair =>
                prev.some(sel => sel.name === chair.name)
            );
            let newSelected: seatType[];
            if (allSelected) {
                newSelected = prev.filter(sel => !chairs.some(c => c.name === sel.name));
                chairs.forEach(handleUnPick);
            } else {
                newSelected = [...prev, ...chairs.filter(c => !prev.some(sel => sel.name === c.name))];
                chairs.forEach(handlePick);
            }
            return newSelected;
        });
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    const handleContinue = async (): Promise<void> => {
        if (selectedChairs.length === 0) {
            Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 ghế!");
            return;
        }
        try {
            setStep(2);
        } catch (error) {
            console.error("Lỗi khi chuyển trang:", error);
            Alert.alert("Lỗi", "Không thể tiếp tục. Vui lòng thử lại sau.");
        }
    };


    return (
        <View className='flex-1'>
            {step == 1 && (
                <>
                    <View className='h-[70px]'>
                        <LinearGradient
                            colors={['#3674B5', '#A1E3F9']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}>
                            <View className='w-full h-full justify-end pl-2 pb-2'>
                                <View className='flex-row items-center justify-between pr-4'>
                                    <View className='flex-row items-center'>
                                        <Pressable onPress={navigation.goBack}>
                                            <Image source={icons.leftarrow} className='size-9 mr-4' tintColor={'white'} />
                                        </Pressable>
                                        <Text className='text-2xl font-rubik-semibold text-white'>Đặt vé theo phim</Text>
                                    </View>
                                    <View className='bg-white p-2 rounded-lg'>
                                        <Text className='text-red-500 font-bold'>{formatTime(timeRemaining)}</Text>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>

                    <ScrollView className='flex-1 mb-24'>
                        <InfoFilm time={time} name={movie?.title || ""} duration={movie?.duration.toString() || ""} poster={movie?.posterUrl || ""} />

                        <View className='px-3 py-4 border-b flex-row justify-between pr-5'>
                            <View>
                                <View className='flex-row mb-4 items-center'>
                                    <Image className='size-8' tintColor={"#ccc"} source={icons.chair} />
                                    <Text className='ml-4'>Ghế trống</Text>
                                </View>
                                <View className='flex-row mb-4 items-center'>
                                    <Image className='size-8' tintColor={"#3D90D7"} source={icons.chair} />
                                    <Text className='ml-4'>Ghế đang <Text>được giữ</Text></Text>
                                </View>
                                <View className='flex-row mb-4 items-center'>
                                    <Image className='size-8' tintColor={"#205781"} source={icons.chair} />
                                    <Text className='ml-4'>Ghế đang chọn</Text>
                                </View>
                                <View className='flex-row mb-4 items-center'>
                                    <Image className='size-8' tintColor={"red"} source={icons.chair} />
                                    <Text className='ml-4'>Ghế đã bán</Text>
                                </View>
                            </View>

                            <View className='justify-between items-start pr-8'>
                                <View className='flex-row mb-4 items-center'>
                                    <View className='w-16 items-center'>
                                        <Image className='size-8' tintColor={"#ccc"} source={icons.chair3} />

                                    </View>
                                    <View className='ml-4'>
                                        <Text className=' font-semibold'>Ghế thường</Text>
                                        <Text className='font-bold text-[13px]'>85.000đ</Text>
                                    </View>
                                </View>
                                <View className='flex-row mb-4 items-center'>
                                    <View className='w-16 items-center'>
                                        <Image className='size-8' tintColor={"#ccc"} source={icons.chair} />

                                    </View>
                                    <View className='ml-4'>
                                        <Text className=' font-semibold'>Ghế Vip</Text>
                                        <Text className='font-bold text-[13px]'>85.000đ</Text>
                                    </View>
                                </View>
                                <View className='flex-row mb-4 items-center'>
                                    <Image resizeMode='cover' className='h-8 w-16' tintColor={"#ccc"} source={icons.chair2} />
                                    <View className='ml-4'>
                                        <Text className=' font-semibold'>Ghế đôi</Text>
                                        <Text className='font-bold text-[13px]'>85.000đ</Text>
                                    </View>
                                </View>
                            </View>
                        </View>



                        <View className='px-6 py-4'>
                            <Text className='text-lg text-center text-[#666]'>Màn hình chiếu</Text>
                            <SeatMap seats={data} selectedSeats={selectedChairs} onSelect={handleChairSelect} />
                        </View>
                    </ScrollView>

                    {selectedChairs.length > 0 && (
                        <View className='absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300 py-3 px-4 flex-row justify-between items-center'>
                            <View>
                                <Text className='font-medium'>Ghế đã chọn: {selectedChairs.map(seat => seat.name).join(', ')}</Text>
                                <Text className='font-bold text-blue-600'>Tổng tiền: {formatPrice(totalPrice)}</Text>
                            </View>
                            <Pressable onPress={handleContinue} className='bg-blue-500 py-2 px-4 rounded-lg'>
                                <Text className='font-bold text-white'>Tiếp tục</Text>
                            </Pressable>
                        </View>
                    )}
                </>
            )}

            {step == 2 && (
                <NextStep time={time} movie={movie} id={id} seats={selectedChairs} price={totalPrice} setStep={setStep} timeRemaining={timeRemaining} />
            )}


            {loading && (
                <View className="absolute inset-0 bg-gray-500/50 justify-center items-center z-50">
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </View>
    );
};

export default SecondBookingPage;
