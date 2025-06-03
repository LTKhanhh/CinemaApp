import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import OtherCard from '@/components/OtherCard'
import icons from '@/constants/icons'
import { Link } from 'expo-router'

import { useAuthContext } from '@/lib/auth-provider'
const Other = () => {
    const { loading, isLogged } = useAuthContext();

    return (
        <SafeAreaView className='bg-white px-3 h-full'>
            <Text className='font-rubik-bold text-[#2f4b68] text-3xl mb-10'>Khác</Text>

            <View className='items-center '>
                <View className='flex-row space-x-4 mb-8'>
                    <Link className='mr-8' href={'/(root)/(bookingList)'}>
                        <OtherCard name='Lịch sử giao dịch' icon={icons.voucher} iconColor='#2187eb' color='#e2f3fc' />
                    </Link>
                    <Link href={'/(root)/(tabs)/Address'}>
                        <OtherCard name='Rạp phim beta' icon={icons.film} color='#e7f9fc' iconColor='#40bec6' />
                    </Link>
                </View>

                <View className='flex-row space-x-4 mb-8'>
                    <Link href={isLogged ? '/(root)/(profile)/ProfilePage' : '/login'} className='mr-8'>
                        <OtherCard name='Thành viên Beta' icon={icons.person} iconColor='#87c041' color='#f1f8eb' />
                    </Link>
                    <Link href={'/(root)/(tabs)/Promotion'}>
                        <OtherCard name='Thông báo' iconColor='#e57b2a' icon={icons.bell} color='#fdf2ea' />
                    </Link >
                </View>

                <View className='flex-row space-x-4 mb-8'>
                    <Pressable className='mr-8'>
                        <OtherCard icon={icons.document} iconColor='#d0237c' name='Trợ lý ảo' color='#fbe7f3' />
                    </Pressable>
                    <Link href={'/(root)/(setting)/page'}>
                        <OtherCard name='Cài đặt' icon={icons.setting} iconColor='#b287e6' color='#f8f1fe' />
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Other