import { View, Text, ScrollView, Image, Pressable, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import LoginForm from '@/components/LoginForm'
import { TouchableOpacity } from 'react-native'
import { Link, useNavigation, Redirect, useRouter } from 'expo-router'

import { useAuthContext } from '@/lib/auth-provider'
const login = () => {
    const router = useRouter();
    const { refetch, loading, isLogged } = useAuthContext();

    if (!loading && isLogged) {
        return <Redirect href="/(root)/(tabs)" />;
    }

    const handleBack = async () => {
        router.push("/(root)/(tabs)");
    };

    return (
        <ScrollView className='w-full' >
            <View className='pb-2 w-full items-center pt-[60px] flex-row bg-primary-300'>
                <Pressable onPress={handleBack}>
                    <Image source={icons.leftarrow} className='size-11' tintColor="white" />
                </Pressable>
                <Text className='text-2xl font-rubik-bold text-white'>Đăng nhập</Text>
            </View>
            <SafeAreaView className='flex-1 px-4'>
                <LoginForm />
                <TouchableOpacity className="bg-black shadow-md  rounded-xl w-full py-4 mt-5" >
                    <View className='flex-row items-center justify-center'>
                        <Image source={icons.google} className="w-6 h-6"
                            resizeMode="contain" />
                        <Text className="text-2xl font-rubik-medium text-white ml-2" >Continue with Google</Text>
                    </View>
                </TouchableOpacity>

                <View className='my-16 flex-row items-center'>
                    <View className='bg-[#ccc] flex-1 h-[1px] mr-1'></View>
                    <Text className='text-center font-rubik text-[#888] text-lg'>Hoặc</Text>
                    <View className='bg-[#ccc] flex-1 h-[1px] ml-1'></View>
                </View>

                <TouchableOpacity>
                    <Link href={"/register"}>
                        <Text className='text-center font-rubik-semibold text-black-200 text-2xl'>Đăng ký tài khoản Beta Cinemas</Text>

                    </Link>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView >

    )
}

export default login