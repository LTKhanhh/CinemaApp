import { View, Text, Pressable, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import icons from '@/constants/icons'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { GetOneBookingResSchemaType } from '@/schemaValidations/booking.schema'
import bookingApiRequest from '@/apiRequest/booking'
import BookingDetail from '@/components/BookingDetail'

const index = () => {
    const navigation = useNavigation()
    const params = useLocalSearchParams() as Partial<{ id: string }>

    const [data, setData] = useState<GetOneBookingResSchemaType>()
    const [loading, setLoading] = useState(false)
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
            case 'paid':
                return { bg: 'bg-green-500', text: 'text-white' };
            case 'pending':
                return { bg: 'bg-yellow-500', text: 'text-white' };
            case 'cancelled':
                return { bg: 'bg-red-500', text: 'text-white' };
            default:
                return { bg: 'bg-gray-500', text: 'text-white' };
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatDateTime = (timeString: string) => {
        const date = new Date(timeString);
        return {
            date: date.toLocaleDateString('vi-VN'),
            time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const statusColors = getStatusColor(data?.booking.status || "");
    const { date, time } = formatDateTime(data?.showtime.time || "");

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const res = await bookingApiRequest.getOne(params.id || "")
                setData(res.payload)
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [params.id])
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
                            <Text className='text-2xl font-rubik-semibold text-white'>Chi tiết giao dịch</Text>

                        </View>
                    </View>

                </LinearGradient>
            </View>

            <ScrollView className='flex-1 bg-gray-50'>
                {/* Header với poster phim */}
                <View className='relative'>
                    <Image
                        source={{ uri: data?.film.poster }}
                        className='w-full h-64'
                        style={{ resizeMode: 'cover' }}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        className='absolute bottom-0 left-0 right-0 h-32'
                    />
                    <View className='absolute bottom-4 left-4 right-4'>
                        <Text className='text-white text-2xl font-bold mb-2'>
                            {data?.film.title}
                        </Text>
                        <View className={`self-start px-3 py-1 rounded-full ${statusColors.bg}`}>
                            <Text className={`text-sm font-semibold ${statusColors.text} capitalize`}>
                                {data?.booking.status}
                            </Text>
                        </View>
                    </View>
                </View>

                <View className='p-4'>
                    {/* Thông tin suất chiếu */}
                    <View className='bg-white rounded-xl p-4 mb-4 shadow-sm'>
                        <Text className='text-gray-600 text-sm font-medium mb-3'>THÔNG TIN SUẤT CHIẾU</Text>

                        <View className='flex-row items-center mb-3'>
                            <View className='w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3'>
                                <Text className='text-blue-600 text-lg'>🎬</Text>
                            </View>
                            <View className='flex-1'>
                                <Text className='text-gray-900 font-semibold'>{data?.cinema.name}</Text>
                                <Text className='text-gray-600 text-sm'>{data?.cinema.address}</Text>
                            </View>
                        </View>

                        <View className='flex-row items-center justify-between'>
                            <View className='flex-row items-center'>
                                <View className='w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3'>
                                    <Text className='text-green-600 text-lg'>📅</Text>
                                </View>
                                <View>
                                    <Text className='text-gray-900 font-semibold'>{time}</Text>
                                    <Text className='text-gray-600 text-sm'>{date}</Text>
                                </View>
                            </View>
                            <View className='bg-purple-100 px-3 py-1 rounded-full'>
                                <Text className='text-purple-800 text-sm font-medium'>{data?.showtime.type}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Thông tin ghế */}
                    <View className='bg-white rounded-xl p-4 mb-4 shadow-sm'>
                        <Text className='text-gray-600 text-sm font-medium mb-3'>THÔNG TIN GHẾ</Text>

                        <View className='flex-row flex-wrap'>
                            {data?.booking.seats.map((seat, index) => (
                                <View key={seat.id} className='bg-blue-50 rounded-lg p-3 mr-2 mb-2'>
                                    <Text className='text-blue-800 font-bold text-center'>{seat.name}</Text>
                                    <Text className='text-blue-600 text-xs text-center mt-1'>{seat.type}</Text>
                                    <Text className='text-blue-800 text-sm font-semibold text-center mt-1'>
                                        {formatCurrency(seat.price)}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <View className='mt-3 pt-3 border-t border-gray-200'>
                            <Text className='text-gray-600 text-sm'>
                                Tổng cộng: <Text className='font-bold'>{data?.booking.seats.length} ghế</Text>
                            </Text>
                        </View>
                    </View>

                    {/* Bonus Items */}
                    {data?.booking.bonusItems && data?.booking.bonusItems.length > 0 && (
                        <View className='bg-white rounded-xl p-4 mb-4 shadow-sm'>
                            <Text className='text-gray-600 text-sm font-medium mb-3'>ƯU ĐÃI KÈM THEO</Text>
                            <View className='bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3'>
                                <Text className='text-yellow-800 font-semibold'>
                                    🎁 {data?.booking.bonusItems.length} ưu đãi đặc biệt
                                </Text>
                                <Text className='text-yellow-700 text-sm mt-1'>
                                    Xem chi tiết tại quầy vé
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Thanh toán */}
                    <View className='bg-white rounded-xl p-4 mb-4 shadow-sm'>
                        <Text className='text-gray-600 text-sm font-medium mb-3'>THÔNG TIN THANH TOÁN</Text>

                        <View className='space-y-2'>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-gray-600'>Tiền vé</Text>
                                <Text className='text-gray-900 font-medium'>
                                    {
                                        data &&
                                        formatCurrency(data?.booking.seats.reduce((sum, seat) => sum + seat.price, 0))
                                    }
                                </Text>
                            </View>

                            {data && data?.booking.bonusItems.length > 0 && (
                                <View className='flex-row justify-between items-center'>
                                    <Text className='text-green-600'>Ưu đãi</Text>
                                    <Text className='text-green-600 font-medium'>Miễn phí</Text>
                                </View>
                            )}

                            <View className='border-t border-gray-200 pt-2'>
                                <View className='flex-row justify-between items-center'>
                                    <Text className='text-gray-900 font-bold text-lg'>Tổng thanh toán</Text>
                                    <Text className='text-blue-600 font-bold text-xl'>
                                        {data && formatCurrency(data?.booking.totalPay)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* QR Code */}
                    <View className='bg-white rounded-xl p-4 mb-4 shadow-sm items-center'>
                        <Text className='text-gray-600 text-sm font-medium mb-3'>MÃ QR CHECK-IN</Text>
                        <View className='bg-gray-100 p-4 rounded-xl'>
                            <Image
                                source={{ uri: data?.qrcode }}
                                className='w-32 h-32'
                                style={{ resizeMode: 'contain' }}
                            />
                        </View>
                        <Text className='text-gray-500 text-xs mt-2 text-center'>
                            Vui lòng xuất trình mã QR này tại quầy vé
                        </Text>
                    </View>

                    {/* Action Buttons */}
                    <View className='flex-row space-x-3 mb-6'>
                        <TouchableOpacity className='flex-1 bg-blue-600 rounded-xl py-4'>
                            <Text className='text-white font-semibold text-center'>Tải xuống vé</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex-1 bg-gray-200 rounded-xl py-4'>
                            <Text className='text-gray-700 font-semibold text-center'>Chia sẻ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {loading && (
                <View className="absolute inset-0 bg-gray-500/50 justify-center items-center z-50">
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </View>
    )
}

export default index