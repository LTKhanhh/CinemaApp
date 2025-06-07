import { View, Text, Pressable, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import icons from '@/constants/icons'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { Download, Smartphone } from 'react-native-feather'
import { useAuthContext } from '@/lib/auth-provider'
import paymentApiRequest from '@/apiRequest/payment'
import { GetOneBookingResSchemaType } from '@/schemaValidations/booking.schema'
import bookingApiRequest from '@/apiRequest/booking'

const index = () => {
    const navigation = useNavigation()
    const router = useRouter()

    const { user } = useAuthContext();

    const { bookingId, totalPay } = useLocalSearchParams<{ bookingId: string, totalPay: string }>()

    const [data, setData] = useState<GetOneBookingResSchemaType>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const res = await bookingApiRequest.getOne(bookingId || "")
                setData(res.payload)
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [bookingId])

    const payment = async () => {
        const body = {
            bookingId: bookingId,
            status: "confirmed"
        }
        try {
            await paymentApiRequest.demo(body)
            Alert.alert(
                "Thanh toán thành công",
                "Cảm ơn bạn đã sử dụng dịch vụ!",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            router.push("/(root)/(tabs)");
                        }
                    }
                ]
            );

        } catch (error) {
            Alert.alert("Lỗi payment", "Có lỗi xảy ra, xin thử lại.");
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            payment();
        }, 1 * 60 * 1000); // 2 phút = 120000 ms

        return () => clearTimeout(timer); // Xoá timer nếu component unmount
    }, []);
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
                            <Pressable onPress={() => router.push("/(root)/(tabs)")}>
                                <Image source={icons.leftarrow} className='size-9 mr-4' tintColor={'white'}></Image>
                            </Pressable>
                            <Text className='text-2xl font-rubik-semibold text-white'>Xác nhận đặt vé</Text>
                        </View>
                    </View>

                </LinearGradient>
            </View>

            <ScrollView className="flex-1 bg-gray-100">
                <View className="bg-white mx-4 my-4 rounded-xl shadow-lg">
                    {/* Header */}
                    <View className="bg-gray-50 py-3 px-4 border-b border-dashed border-gray-300">
                        <View className="flex-row justify-center items-center">
                            <Text className="text-blue-600 font-semibold text-lg mr-4">OnePay</Text>
                            <Text className="text-red-500 font-semibold text-lg">Vietor</Text>
                        </View>
                    </View>

                    {/* QR Code Section */}
                    <View className="p-4">
                        <View className="items-center mb-6">
                            {/* Placeholder for QR Code */}
                            <View >
                                <Text className="text-gray-600 font-medium">QR CODE</Text>
                            </View>
                            <Image
                                source={{ uri: data?.qrcode }}
                                className='w-48 h-48'
                                style={{ resizeMode: 'contain' }}
                            />
                        </View>

                        {/* Payment Details */}
                        <View className="">
                            <View className="flex-row mb-1 justify-between items-start">
                                <Text className="text-gray-600 text-md flex-1">Tên khách hàng:</Text>
                                <Text className="text-green-600 font-medium text-md flex-1 text-right">{user?.name}</Text>
                            </View>

                            <View className="flex-row mb-1 justify-between items-start">
                                <Text className="text-gray-600 text-md ">Mã đơn hàng:</Text>
                                <Text className="text-gray-900 font-medium text-md flex-1 text-right">{bookingId}</Text>
                            </View>

                            <View className="flex-row mb-1 justify-between items-start">
                                <Text className="text-gray-600 text-md flex-1">Số điện thoại:</Text>
                                <Text className="text-gray-900 font-medium text-md flex-1 text-right">{user?.phone}</Text>
                            </View>

                            <View className="flex-row mb-1 justify-between items-start">
                                <Text className="text-gray-600 text-md flex-1">Email:</Text>
                                <Text className="text-gray-900 font-medium text-md flex-1 text-right">{user?.email}</Text>
                            </View>

                            {/* <View className="flex-row mb-1 justify-between items-start">
                                <Text className="text-gray-600 text-md flex-1">Địa chỉ:</Text>
                                <Text className="text-gray-900 font-medium text-xs flex-1 text-right">
                                    ĐẠI HỌC QUỐC GIA HÀ NỘI
                                </Text>
                            </View> */}

                            <View className="flex-row mb-1 justify-between items-start">
                                <Text className="text-gray-600 text-md flex-1">Trạng thái:</Text>
                                <Text className="text-red-500 font-medium text-md flex-1 text-right">Chưa thanh toán</Text>
                            </View>

                            <View className="flex-row mb-1 justify-between items-start pt-3 mt-2 border-t border-gray-200">
                                <Text className="text-gray-600 text-md flex-1">Tổng giá trị đơn hàng:</Text>
                                <Text className="text-gray-900 font-bold text-lg flex-1 text-right">{totalPay}Đ</Text>
                            </View>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="p-4 space-y-3">
                        {/* <TouchableOpacity className="bg-green-500 flex-row items-center justify-center py-3 px-4 rounded-lg active:bg-green-600">
                            <Smartphone color="#fff" />
                            <Text className="text-white font-medium text-sm ml-2">
                                Quét mã thanh toán qua Mobile Banking
                            </Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity className="bg-white flex-row items-center justify-center py-3 px-4 rounded-lg border border-gray-300 active:bg-gray-50">
                            <Download color="#22c55e" />
                            <Text className="text-gray-700 font-medium text-sm ml-2">
                                Lưu ảnh vào thư viện
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default index