import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import { useAuthContext } from '@/lib/auth-provider';

const ProfileCard = () => {
    const { loading, isLogged, user } = useAuthContext();

    return (
        <View className=' relative'>
            <View className='bg-[#3674B5] w-full py-8'></View>

            <View className='rounded-full overflow-hidden left-1/2 top-8  z-50 absolute'
                style={{
                    // Shadow không được hỗ trợ trực tiếp bằng class tailwind trong nativewind
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    transform: [{ translateX: -50 }],
                }}
            >
                <Image source={images.avatar} />
            </View>

            <View className='px-2 '>
                <View className='bg-white rounded-md pt-[70px] '>
                    <Text className='text-center text-2xl font-semibold'>{user?.name}</Text>
                    <View className='flex-row justify-between items-center my-3 px-2'>
                        <Text className='text-[#666] text-[14px]'>Thẻ thành viên</Text>

                        <Text className='text-2xl'>
                            1234567800000
                        </Text>
                    </View>

                    <View className='flex-row justify-between border-t border-[#ccc]  border-b'>
                        <View className='border-r py-3 flex-1 items-center  border-[#ccc]  justify-center'>
                            <Text className='text-[#666] mb-4 text-[14px]'>Tổng chi tiêu</Text>
                            <Text className='text-2xl text-[#29588a] font-bold '>{user?.price || 0}đ</Text>
                        </View>
                        <View className='py-3 flex-1 items-center justify-center'>
                            <Text className='text-[#666] mb-4 text-[14px]'>Điểm thưởng</Text>
                            <Text className='text-2xl text-[#29588a] font-bold '>9800</Text>
                        </View>
                    </View>

                    <View className='my-6'>
                        <Text className='text-center font-bold text-[13px]'>Bạn cần tích lũy thêm <Text className='text-red-600'>2.7620.000vnđ</Text></Text>
                        <Text className='text-center font-bold text-[13px]'>để nâng hạng Vip</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default ProfileCard