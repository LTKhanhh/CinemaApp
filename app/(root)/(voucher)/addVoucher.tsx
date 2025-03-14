import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
import icons from '@/constants/icons'
import { useNavigation } from 'expo-router'
import InputCard from '@/components/InputCard'
import { useState } from 'react'

const addVoucher = () => {
    const navigate = useNavigation()
    const [voucher, setVoucher] = useState("")
    const [pin, setPin] = useState("")
    return (
        <View className='h-full bg-[#f7f7f7]'>
            <View className='pb-2 w-full items-center pt-[60px] flex-row bg-primary-300'>
                <Pressable onPress={() => navigate.goBack()}>
                    <Image source={icons.leftarrow} className='size-11' tintColor="white" />
                </Pressable>
                <Text className='text-2xl ml-4 font-rubik-bold text-white'>Thêm mới voucher</Text>
            </View>

            <View className='px-4 mt-10'>
                <Text className='text-lg font-rubik-medium text-[#8b8b8b]'>
                    Mã Voucher
                </Text>
                <InputCard value={voucher} setValue={setVoucher} placeholder='' inputClass=' py-2' />
                <Text className='text-lg font-rubik-medium text-[#8b8b8b]'>Mã PIN</Text>
                <InputCard value={pin} setValue={setPin} placeholder='' inputClass=' py-2' />

                <TouchableOpacity className='w-full rounded-md items-center justify-center py-4 bg-orange-100'>
                    <Text className='text-white text-2xl font-rubik'>THÊM MỚI</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default addVoucher