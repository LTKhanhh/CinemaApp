import { View, Text, Pressable, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import icons from '@/constants/icons'
import { useNavigation, useRouter } from 'expo-router'
import InfoFilm from './InfoFilm'
import InfoStep2 from './InfoStep2'
import PayCard from './PayCard'
import { seatType } from '@/schemaValidations/seat.schema'
import bookingApiRequest from '@/apiRequest/booking'
import { filmInListType } from '@/schemaValidations/film.schema'
import paymentApiRequest from '@/apiRequest/payment'
import { ActivityIndicator } from 'react-native';

const NextStep = ({ time, movie, seats, price, timeRemaining, id, setStep }: { time: string, movie: filmInListType | null, id: string, seats: seatType[], price: number, timeRemaining: number, setStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const navigate = useNavigation()
    const router = useRouter()
    const [curType, setCurType] = useState("noidia")
    // const [bookingId, setBookingId] = useState("")
    const [loading, setLoading] = useState(false);

    const handleBooking = async () => {
        const body = {
            showtimeId: id,
            seats: seats,
            totalPay: price.toString(),
        }
        try {
            const res = await bookingApiRequest.post(body)

            // setBookingId(res.payload.id)

            router.push({ pathname: "/(root)/(payment)", params: { bookingId: res.payload.id, totalPay: price.toString() } })
            // Alert.alert(
            //     "Xác nhận thanh toán",
            //     "Bạn có chắc chắn muốn thanh toán đơn hàng này không?",
            //     [
            //         { text: "Huỷ", style: "cancel" },
            //         {
            //             text: "Đồng ý",
            //             onPress: async () => {
            //                 setLoading(true);
            //                 // await payment();
            //                 setLoading(false);
            //             },
            //         },
            //     ],
            //     { cancelable: false }
            // );
        } catch (error) {
            Alert.alert("Lỗi booking", "Có lỗi xảy ra, xin thử lại.");
        }
    }


    return (
        <View className='flex-1'>
            <View className='h-[70px]'>
                <LinearGradient
                    colors={['#3674B5', '#A1E3F9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View className='w-full h-full justify-end pl-2 pb-2'>
                        <View className='flex-row items-center justify-between pr-4'>
                            <View className='flex-row items-center'>
                                <Pressable onPress={() => setStep(1)} >
                                    <Image source={icons.leftarrow} className='size-9 mr-4' tintColor={'white'}></Image>
                                </Pressable>
                                <Text className='text-2xl font-rubik-semibold text-white'>Thanh toán</Text>
                            </View>

                        </View>
                    </View>
                </LinearGradient>
            </View>

            <ScrollView className='flex-1 p-3 '>
                <InfoStep2 time={time} movie={movie} seats={seats} price={price}></InfoStep2>

                <View className='mt-4'>
                    <Text className='font-rubik text-[26px]'>Phương thức giảm giá</Text>

                    <View className='px-6'>
                        <View className='flex-row items-center mb-4'>
                            <Text className='text-xl font-[360] flex-1 '>Tổng tiền</Text>
                            <Text className='text-red-500 font-rubik-bold text-[22px]'>{price}đ</Text>
                        </View>

                        <View className='flex-row items-center mb-4'>
                            <Text className='text-xl font-[360] flex-1 '>Số tiền được giảm</Text>
                            <Text className='text-sky-600 font-rubik-bold text-[22px]'>0đ</Text>
                        </View>

                        <View className='flex-row items-center'>
                            <Text className='text-xl font-[360] flex-1 '>Số tiền cần thanh toán</Text>
                            <Text className='text-red-500 font-rubik-bold text-[22px]'>{price}đ</Text>
                        </View>
                    </View>
                </View>

                <View className='mt-4'>
                    <Text className='font-rubik text-[26px]'>Thanh toán</Text>

                    <Text className='font-rubik text-[18px]'>Chọn thẻ thanh toán</Text>

                    <Pressable onPress={() => setCurType('noidia')}>
                        <PayCard text='thẻ nội địa' type='noidia' curType={curType}></PayCard>

                    </Pressable>
                    <Pressable onPress={() => setCurType('quocte')}>
                        <PayCard text='thẻ quốc tế' type='quocte' curType={curType}></PayCard>

                    </Pressable>


                </View>


                <View className='mt-4 mb-4'>
                    <Text className='font-rubik text-[26px]'>Thời gian còn lại</Text>

                    <View className='justify-center items-center mb-8 mt-4'>
                        <Text className='font-rubik text-[26px]'>{formatTime(timeRemaining)}</Text>
                    </View>

                    <Text className='text-[16px] font-rubik'>
                        Nhấn "THANH TOÁN" đồng nghĩa với việc bạn đồng ý với <Text className='text-sky-800 font-rubik-semibold'>Điều khoản sử dụng</Text> và đang mua vé cho người có độ tuổi phù hợp
                    </Text>

                </View>

                <View className='h-[70px] rounded-md overflow-hidden'>
                    <LinearGradient
                        colors={['#3674B5', '#A1E3F9']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <TouchableOpacity onPress={handleBooking} className='w-full h-full justify-center items-center '>
                            <View className='flex-row items-center justify-between '>
                                <Text className='text-2xl font-rubik text-white'>Thanh toán</Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                {loading && (
                    <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 justify-center items-center z-50">
                        <ActivityIndicator size="large" color="#ffffff" />
                        <Text className="mt-2 text-white font-rubik">Đang xử lý thanh toán...</Text>
                    </View>
                )}
                <View className='mb-10'></View>
            </ScrollView>
        </View>
    )
}

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default NextStep