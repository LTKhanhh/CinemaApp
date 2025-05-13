import { View, Text, Pressable, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import icons from '@/constants/icons'
import { useNavigation } from 'expo-router'
import InputCard from '@/components/InputCard'
import userApiRequest from '@/apiRequest/user'

const index = () => {
    const navigation = useNavigation()
    const [curPass, setCurPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [cfPass, setCfPass] = useState("")
    const [loading, setLoading] = useState(false)
    const handleChange = async () => {
        if (loading) return
        if (newPass !== cfPass) {
            Alert.alert("Mật khẩu mới không đồng nhất", "", [{ text: "OK" }])
            return false
        }
        setLoading(true)
        try {
            const res = userApiRequest.changePassword({ oldPassword: curPass, newPassword: newPass })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
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
                            <Text className='text-2xl font-rubik-semibold text-white'>Thay đổi mật khẩu</Text>

                        </View>
                    </View>

                </LinearGradient>
            </View>
            <ScrollView className=' w-full flex-1 pt-10 px-6'>
                <View>
                    <Text className='text-[15px] mb-2'>Nhập mật khẩu hiện tại</Text>
                    <InputCard icons={icons.lock} value={curPass} placeholder='Mật khẩu hiện tại' setValue={setCurPass} password={true} />
                </View>

                <View>
                    <Text className='text-[15px] mb-2'>Nhập mật khẩu hiện tại</Text>
                    <InputCard icons={icons.lock} value={newPass} placeholder='Mật khẩu mới' setValue={setNewPass} password={true} />
                    <InputCard icons={icons.lock} value={cfPass} placeholder='Nhập lại mật khẩu mới' setValue={setCfPass} password={true} />
                </View>

                <TouchableOpacity onPress={handleChange} className='mt-4 bg-orange-500 w-full py-4 rounded-xl justify-center items-center'>
                    <Text className='text-2xl font-rubik-medium text-white'>Cập nhật</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default index