import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'
import InputCard from './InputCard'
import authApiRequest from '@/apiRequest/auth'
import { TokenManager } from '@/lib/http1'
import { useAuthContext } from '@/lib/auth-provider'

const LoginForm = () => {
    const [userName, setUserName] = useState("")
    const [passWord, setPassWord] = useState("")
    const { refetch, loading, isLogged } = useAuthContext();
    const handleLogin = async () => {
        const body = {
            email: userName,
            password: passWord
        }
        try {
            const res = await authApiRequest.login(body)
            TokenManager.setToken(res.payload.data.accessToken)
            TokenManager.setRefreshToken(res.payload.data.refreshToken)
            refetch()

        } catch (error) {
            console.log("lỗi")
            console.log(error)
        }
    }
    return (
        <View className=''>
            {/* <View className='flex-row border border-[#ccc] rounded-xl p-3 items-center mb-6'>
                <Image source={icons.email} className='size-8 ' tintColor="#999" />
                <Text className='text-[36px] relative top-[-2px] block ml-1 mr-1 text-[#ccc] font-extralight'>|</Text>
                <TextInput value={userName} onChangeText={e => setUserName(e)} className='flex-1 text-xl font-rubik text-[#999]' placeholder='Email hoặc Tên đăng nhập' />

            </View> */}
            <InputCard icons={icons.email} value={userName} setValue={setUserName} placeholder='Email hoặc Tên đăng nhập' />
            {/* <View className='flex-row border border-[#ccc] rounded-xl mb-6 p-3 items-center'>
                <Image source={icons.lock} className='size-8 ' tintColor="#999" />
                <Text className='text-[36px] relative top-[-2px] block ml-1 mr-1 text-[#ccc] font-extralight'>|</Text>
                <TextInput textContentType='password' value={passWord} onChangeText={e => setPassWord(e)} className='flex-1 text-xl font-rubik text-[#999]' placeholder='Email hoặc Tên đăng nhập' />

            </View> */}
            <InputCard password={true} icons={icons.lock} value={passWord} setValue={setPassWord} placeholder='Nhập mật khẩu' />

            <View className='mb-6'>
                <Text className='text-primary-300 underline text-lg'>Quên mật khẩu?</Text>
            </View>

            <TouchableOpacity onPress={handleLogin} className='bg-orange-600 p-4 items-center rounded-xl '>
                <Text className='text-white font-rubik-semibold text-2xl'>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginForm