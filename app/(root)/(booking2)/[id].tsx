import { View, Text, Pressable, Image, ScrollView, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, Redirect, useGlobalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import icons from '@/constants/icons';
import InfoFilm from './InfoFilm';
import Chair from '../(booking)/Chair';
const chairRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const chairCol = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
import { useGlobalContext } from '@/lib/global-provider';

// Define interfaces for chair selection
interface SelectedChair {
    name: string;
    price: number;
}

// Định nghĩa tên cho background task
const BOOKING_TIMER_TASK = 'booking-timer-task';

// Cấu hình notifications
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

// Định nghĩa tác vụ nền cho bộ đếm thời gian
TaskManager.defineTask(BOOKING_TIMER_TASK, async ({ data, error }) => {
    if (error) {
        console.error("Lỗi khi xử lý tác vụ nền:", error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }

    try {
        // Lấy thời gian kết thúc từ AsyncStorage
        const endTimeStr = await AsyncStorage.getItem('bookingEndTime');
        const bookingId = await AsyncStorage.getItem('currentBookingId');

        if (!endTimeStr || !bookingId) {
            console.log("Không tìm thấy thông tin đặt vé.");
            return BackgroundFetch.BackgroundFetchResult.NoData;
        }

        const endTime = parseInt(endTimeStr);
        const currentTime = new Date().getTime();
        const timeRemaining = Math.floor((endTime - currentTime) / 1000);

        console.log(`Thời gian còn lại: ${timeRemaining} giây cho đặt vé ${bookingId}`);

        // Nếu thời gian đã hết
        if (timeRemaining <= 0) {
            // Thông báo cho người dùng
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Hết thời gian đặt vé",
                    body: "Thời gian giữ ghế của bạn đã hết.",
                    data: { bookingId },
                },
                trigger: null, // Gửi ngay lập tức
            });

            // Xóa dữ liệu đặt vé
            await AsyncStorage.removeItem('bookingEndTime');
            await AsyncStorage.removeItem('currentBookingId');
            await AsyncStorage.removeItem('selectedChairs');

            return BackgroundFetch.BackgroundFetchResult.NewData;
        }

        // Nếu sắp hết thời gian (ví dụ: còn 1 phút)
        if (timeRemaining <= 60) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Sắp hết thời gian đặt vé",
                    body: "Bạn còn 1 phút để hoàn tất việc đặt vé.",
                    data: { bookingId },
                },
                trigger: null,
            });
        }

        return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch (err) {
        console.error("Lỗi trong task chạy ngầm:", err);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

// Đăng ký task nền
async function registerBackgroundFetchAsync() {
    try {
        await BackgroundFetch.registerTaskAsync(BOOKING_TIMER_TASK, {
            minimumInterval: 30, // Chạy cứ mỗi 30 giây
            stopOnTerminate: false, // Tiếp tục chạy khi app bị đóng
            startOnBoot: true, // Chạy ngay cả sau khi thiết bị khởi động lại
        });
        console.log("Đã đăng ký tác vụ nền thành công");
    } catch (err) {
        console.error("Lỗi khi đăng ký tác vụ nền:", err);
    }
}

// Hủy đăng ký task nền
async function unregisterBackgroundFetchAsync() {
    try {
        await BackgroundFetch.unregisterTaskAsync(BOOKING_TIMER_TASK);
        console.log("Đã hủy đăng ký tác vụ nền");
    } catch (err) {
        console.error("Lỗi khi hủy đăng ký tác vụ nền:", err);
    }
}

const SecondBookingPage = () => {
    const { isLogged } = useGlobalContext();
    const { id } = useGlobalSearchParams<{ id: string }>();
    const navigation = useNavigation<any>();
    const [timeRemaining, setTimeRemaining] = useState<number>(600); // 10 phút tính bằng giây
    const [selectedChairs, setSelectedChairs] = useState<SelectedChair[]>([]); // Mảng lưu ghế đã chọn
    const [totalPrice, setTotalPrice] = useState<number>(0); // Tổng giá tiền
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Khởi tạo bộ đếm thời gian và lưu thời gian kết thúc
    useEffect(() => {
        const setupBookingTimer = async () => {
            try {
                // Kiểm tra xem có đang có phiên đặt vé nào không
                const existingEndTimeStr = await AsyncStorage.getItem('bookingEndTime');
                const existingBookingId = await AsyncStorage.getItem('currentBookingId');

                // Nếu đã có phiên đặt vé và đang đặt vé cho phim khác thì hủy phiên cũ
                if (existingEndTimeStr && existingBookingId && existingBookingId !== id) {
                    await AsyncStorage.removeItem('bookingEndTime');
                    await AsyncStorage.removeItem('currentBookingId');
                    await AsyncStorage.removeItem('selectedChairs');
                }

                let endTime: number;

                // Nếu có phiên đặt vé cũ và đúng phim hiện tại thì tiếp tục
                if (existingEndTimeStr && existingBookingId === id) {
                    endTime = parseInt(existingEndTimeStr);
                    const now = new Date().getTime();
                    const remaining = Math.floor((endTime - now) / 1000);

                    // Nếu thời gian còn lại hợp lệ
                    if (remaining > 0) {
                        setTimeRemaining(remaining);

                        // Khôi phục ghế đã chọn
                        const savedChairsStr = await AsyncStorage.getItem('selectedChairs');
                        if (savedChairsStr) {
                            const savedChairs = JSON.parse(savedChairsStr);
                            setSelectedChairs(savedChairs);
                            // Tính tổng tiền
                            const total = savedChairs.reduce((sum: number, chair: SelectedChair) => sum + chair.price, 0);
                            setTotalPrice(total);
                        }
                    } else {
                        // Thời gian đã hết, tạo mới
                        endTime = new Date().getTime() + 600 * 1000; // Thêm 10 phút
                        await AsyncStorage.setItem('bookingEndTime', endTime.toString());
                        await AsyncStorage.setItem('currentBookingId', id);
                    }
                } else {
                    // Tạo mới phiên đặt vé
                    endTime = new Date().getTime() + 600 * 1000; // Thêm 10 phút
                    await AsyncStorage.setItem('bookingEndTime', endTime.toString());
                    await AsyncStorage.setItem('currentBookingId', id);
                }

                // Đăng ký task nền
                await registerBackgroundFetchAsync();

                // Khởi tạo interval trong foreground
                timerRef.current = setInterval(() => {
                    const now = new Date().getTime();
                    const remaining = Math.floor((endTime - now) / 1000);

                    setTimeRemaining(prevTime => {
                        if (remaining <= 0) {
                            if (timerRef.current !== null) {
                                clearInterval(timerRef.current);
                            }
                            Alert.alert("Hết thời gian", "Thời gian chọn ghế đã hết!", [
                                { text: "OK", onPress: () => navigation.goBack() }
                            ]);
                            return 0;
                        }
                        return remaining;
                    });
                }, 1000);

            } catch (error) {
                console.error("Lỗi khi thiết lập bộ đếm thời gian:", error);
            }
        };

        setupBookingTimer();

        // Dọn dẹp khi component unmount
        return () => {
            if (timerRef.current !== null) {
                clearInterval(timerRef.current);
            }
        };
    }, [id, navigation]);

    // Lưu ghế đã chọn mỗi khi thay đổi
    useEffect(() => {
        const saveSelectedChairs = async () => {
            try {
                await AsyncStorage.setItem('selectedChairs', JSON.stringify(selectedChairs));
            } catch (error) {
                console.error("Lỗi khi lưu ghế đã chọn:", error);
            }
        };

        if (selectedChairs.length > 0) {
            saveSelectedChairs();
        }
    }, [selectedChairs]);

    // Format thời gian còn lại dưới dạng MM:SS
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Xử lý việc chọn ghế
    const handleChairSelect = (chairName: string, price: number = 85000): void => {
        setSelectedChairs(prev => {
            // Kiểm tra xem ghế đã được chọn chưa
            const chairIndex = prev.findIndex(chair => chair.name === chairName);

            if (chairIndex !== -1) {
                // Bỏ chọn ghế nếu đã chọn
                const newSelectedChairs = [...prev];
                newSelectedChairs.splice(chairIndex, 1);
                // Cập nhật tổng giá tiền
                setTotalPrice(prevPrice => prevPrice - price);
                return newSelectedChairs;
            } else {
                // Thêm ghế nếu chưa chọn
                const newSelectedChairs = [...prev, { name: chairName, price }];
                // Cập nhật tổng giá tiền
                setTotalPrice(prevPrice => prevPrice + price);
                return newSelectedChairs;
            }
        });
    };

    // Format giá tiền theo VND
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    // Xử lý khi nhấn nút tiếp tục
    const handleContinue = async (): Promise<void> => {
        if (selectedChairs.length === 0) {
            Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 ghế!");
            return;
        }

        // Lưu thông tin đặt vé để dùng ở trang tiếp theo
        try {
            // Điều hướng đến trang thanh toán
            // navigation.navigate("payment", { 
            //     selectedChairs, 
            //     totalPrice,
            //     filmId: id 
            // });

            // Tạm thời hiển thị thông báo
            Alert.alert("Thông báo", `Đã chọn ${selectedChairs.length} ghế với tổng tiền ${formatPrice(totalPrice)}`);
        } catch (error) {
            console.error("Lỗi khi chuyển trang:", error);
            Alert.alert("Lỗi", "Không thể tiếp tục. Vui lòng thử lại sau.");
        }
    };

    // Khi thoát khỏi trang đặt vé
    useEffect(() => {
        return () => {
            // Không hủy task ngầm khi thoát khỏi trang
            // Để task ngầm tiếp tục chạy
        };
    }, []);

    // if (!isLogged) {
    //     return <Redirect href="/login" />;
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
                        <View className='flex-row items-center justify-between pr-4'>
                            <View className='flex-row items-center'>
                                <Pressable onPress={navigation.goBack}>
                                    <Image source={icons.leftarrow} className='size-9 mr-4' tintColor={'white'}></Image>
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
                <InfoFilm id={id} />

                <View className='px-3 py-4 border-b flex-row justify-between pr-5'>
                    <View>
                        <View className='flex-row mb-4 items-center'>
                            <Image className='size-8' tintColor={"#ccc"} source={icons.chair} />
                            <Text className='ml-2'>Ghế trống</Text>
                        </View>
                        <View className='flex-row mb-4 items-center'>
                            <Image className='size-8' tintColor={"blue"} source={icons.chair} />
                            <Text className='ml-2'>Ghế đang <Text>được giữ</Text></Text>
                        </View>
                        <View className='flex-row mb-4 items-center'>
                            <Image className='size-8' tintColor={"violet"} source={icons.chair} />
                            <Text className='ml-2'>Ghế đang chọn</Text>
                        </View>
                        <View className='flex-row mb-4 items-center'>
                            <Image className='size-8' tintColor={"red"} source={icons.chair} />
                            <Text className='ml-2'>Ghế đã bán</Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Image className='size-8' tintColor={"yellow"} source={icons.chair} />
                            <Text className='ml-2'>Ghế đã đặt trước</Text>
                        </View>
                    </View>

                    <View className='justify-between items-end pr-8'>
                        <View className='flex-row mb-4 items-center'>
                            <Image className='size-8' tintColor={"#ccc"} source={icons.chair3} />
                            <View className='ml-2'>
                                <Text className=' font-semibold'>Ghế thường</Text>
                                <Text className='font-bold text-[13px]'>85.000đ</Text>
                            </View>
                        </View>
                        <View className='flex-row mb-4 items-center'>
                            <Image className='size-8' tintColor={"#ccc"} source={icons.chair} />
                            <View className='ml-2'>
                                <Text className=' font-semibold'>Ghế Vip</Text>
                                <Text className='font-bold text-[13px]'>85.000đ</Text>
                            </View>
                        </View>
                        <View className='flex-row mb-4 items-center'>
                            <Image resizeMode='cover' className='h-8 w-16' tintColor={"#ccc"} source={icons.chair2} />
                            <View className='ml-2'>
                                <Text className=' font-semibold'>Ghế đôi</Text>
                                <Text className='font-bold text-[13px]'>85.000đ</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className='px-6 py-4'>
                    <Text className='text-lg text-center text-[#666]'>Màn hình chiếu</Text>

                    {chairRow.map((row, idx) => (
                        <View className='flex-row mb-2' key={idx}>
                            {
                                chairCol.map((col, colIdx) => {
                                    const chairName = row + col;
                                    const isSelected = selectedChairs.some(chair => chair.name === chairName);

                                    return (
                                        <Pressable
                                            key={colIdx}
                                            onPress={() => handleChairSelect(chairName)}
                                        >
                                            <Chair
                                                name={chairName}
                                                type={icons.chair3}
                                                tintColor={isSelected ? "violet" : "#ccc"}
                                            />
                                        </Pressable>
                                    );
                                })
                            }
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Fixed bottom section for selected seats info */}
            {selectedChairs.length > 0 && (
                <View className='absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300 py-3 px-4 flex-row justify-between items-center'>
                    <View>
                        <Text className='font-medium'>Ghế đã chọn: {selectedChairs.map(chair => chair.name).join(', ')}</Text>
                        <Text className='font-bold text-blue-600'>Tổng tiền: {formatPrice(totalPrice)}</Text>
                    </View>
                    <Pressable
                        onPress={handleContinue}
                        className='bg-blue-500 py-2 px-4 rounded-lg'
                    >
                        <Text className='font-bold text-white'>Tiếp tục</Text>
                    </Pressable>
                </View>
            )}
        </View>
    )
}

export default SecondBookingPage