import { View, Text, ScrollView, Image, Button, TextInput, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import LoginForm from '@/components/LoginForm'
import { TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper';
import InputCard from '@/components/InputCard'
import { useNavigation } from 'expo-router'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isValidEmail = (email: string) => {
    return emailRegex.test(email);
};
const register = () => {
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [passWord, setPassWord] = useState("")
    const [passWord2, setPassWord2] = useState("")
    const [phone, setPhone] = useState("")
    const [dob, setDob] = useState("")
    const [sex, setSex] = useState("")
    const [checked, setChecked] = useState(false)
    const navigate = useNavigation()
    const validInfo = () => {
        if (!checked) {
            Alert.alert("Bạn phải đồng ý với điều khoản sử dụng của chúng tôi", "", [{ text: "OK" }])
            return false
        }

        if (!name) {
            Alert.alert("Tên không được trống", "", [{ text: "OK" }])
            return false
        }

        if (!userName) {
            Alert.alert("Email không được trống", "", [{ text: "OK" }])
            return false

        }
        if (!isValidEmail(userName)) {
            Alert.alert("Email không hợp lệ", "", [{ text: "OK" }])
            return false
        }


        if (!passWord) {
            Alert.alert("Mật khẩu không được trống", "", [{ text: "OK" }])
            return false
        }

        if (!passWord2 || passWord2 != passWord) {
            Alert.alert("Mật khẩu không khớp", "", [{ text: "OK" }])
            return false
        }

        if (!phone) {
            Alert.alert("Số điện thoại không được để trống", "", [{ text: "OK" }])
            return false
        }

        return true
    }
    const handleRegister = async () => {
        if (!validInfo()) {
            return
        }

    }
    return (
        <ScrollView className='w-full' >
            <View className='pb-2 w-full items-center pt-[60px] flex-row bg-primary-300'>
                <Pressable onPress={() => navigate.goBack()}>
                    <Image source={icons.leftarrow} className='size-11' tintColor="white" />
                </Pressable>
                <Text className='text-2xl font-rubik-bold text-white'>Đăng ký</Text>
            </View>
            <View className='flex-1 pt-8  px-4'>
                {/* form */}
                <View className=''>
                    <View className='mb-4 relative p-2'>
                        <View className='w-4 h-4 rounded-full absolute bg-red-600'></View>
                        <Text className='font-rubik-medium text-2xl'>Thông tin bắt buộc</Text>
                    </View>
                    <InputCard icons={icons.person} value={name} setValue={setName} placeholder='Họ tên' />

                    <InputCard icons={icons.email} value={userName} setValue={setUserName} placeholder='Email' />

                    <InputCard icons={icons.lock} value={passWord} setValue={setPassWord} placeholder='Mật khẩu' />

                    <InputCard icons={icons.lock} value={passWord2} setValue={setPassWord2} placeholder='Nhập lại mật khẩu' />

                    <InputCard icons={icons.phone} value={phone} setValue={setPhone} placeholder='Nhập lại mật khẩu' />

                    <View className='mb-6'>
                        <Text className='font-rubik-medium text-2xl'>Thông tin bổ sung</Text>
                    </View>

                    <InputCard icons={icons.birthdayCake} value={dob} setValue={setDob} placeholder='Ngày sinh' />

                    <InputCard icons={icons.sex} value={sex} setValue={setSex} placeholder='Giới tính' />

                </View>

                <View className='flex-row mb-6'>
                    {/* <View className='rounded-full h-4 w-4 border border-[#ccc]'>
                        <RadioButton value=""
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(!checked)}></RadioButton>
                    </View> */}
                    <TouchableOpacity onPress={() => setChecked(!checked)} className={`mr-3 rounded-full h-6 w-6 border border-[#ccc] ${checked ? 'bg-blue-600' : ""}`}></TouchableOpacity>

                    <Text className='font-rubik text-[15px]'>
                        Tôi cam kết tuân theo <Text className='text-primary-300 font-rubik-semibold'>Chính sách bảo mật</Text> và {"\n"} <Text className='text-primary-300 font-rubik-semibold'>điều khoản sử dụng</Text> của Betacinemas
                    </Text>

                </View>

                <TouchableOpacity onPress={handleRegister} className='bg-primary-300 p-4 items-center rounded-xl '>
                    <Text className='text-white font-rubik-semibold text-2xl'>Đăng ký</Text>
                </TouchableOpacity>

                {/* <View className='my-16 flex-row items-center'>
                    <View className='bg-[#ccc] flex-1 h-[1px] mr-1'></View>
                    <Text className='text-center font-rubik text-[#888] text-lg'>Hoặc</Text>
                    <View className='bg-[#ccc] flex-1 h-[1px] ml-1'></View>
                </View> */}


            </View>
        </ScrollView >
    )
}

export default register