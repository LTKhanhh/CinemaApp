import { View, Text, SafeAreaView, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { Link, useNavigation } from 'expo-router'

const data = [
    {
        id: 1,
        name: 123
    }, {
        id: 2,
        name: 123
    }, {
        id: 3,
        name: 123
    }, {
        id: 4,
        name: 123
    }
]

const Voucher = () => {
    const navigate = useNavigation()
    return (
        <SafeAreaView className='h-full px-1 bg-blue-400'>
            <View className="px-4 pt-4 pb-4 flex w-full border-b bg-blue-400 border-[#eeeeee] flex-row items-center justify-between">
                <View>
                    <Text className='text-xl font-rubik-bold text-white'>Rạp phim NEMUI</Text>
                </View>
                <View className='flex-row items-center'>
                    <Link href={"/(root)/(voucher)/addVoucher"} className='mr-2'>
                        <Image source={icons.plus} className='size-8 ' tintColor={"#fff"} />
                    </Link>
                    <Link href={"/(root)/(voucher)/historyVoucher"}>
                        <Image source={icons.calendar_clock} className='size-7' tintColor={"#fff"} />

                    </Link>
                </View>
            </View>

            <View className='bg-[#f7f7f7] h-full justify-center px-4 items-center'>
                <View className='items-center mb-6'>
                    <Text className='font-rubik text-xl text-primary-300 '>BẠN KHÔNG CÓ VOUCHER NÀO</Text>
                    <Text className='font-rubik text-[15px] text-center'>Bạn có thể tìm kiếm thêm voucher miễn phí hoặc thêm mới voucher của bạn.</Text>
                </View>
                <TouchableOpacity className='p-2 w-full items-center bg-blue-500 rounded-md '>
                    <Text className='capitalize text-xl font-rubik-medium text-white'>voucher miễn phí</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Voucher