import { View, Text, SafeAreaView, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { Link, useNavigation } from 'expo-router'
import MessagesScreen, { MessageHeader, MessageInput } from '@/components/Message'

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

const Conversation = () => {
    const navigate = useNavigation()
    return (
        <SafeAreaView className='h-full bg-white '>
            {/* <View className="px-4 pt-4 pb-4 flex w-full border-b bg-white border-[#999] flex-row items-center justify-between">
                <View>
                    <Text className='text-xl font-rubik-bold '>Rạp phim NEMUI</Text>
                </View>
            </View> */}
            <View className='h-[50px] pl-[10px] w-full  border-b border-[#999]'>
                <MessageHeader avatar='https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg' name='Admin rạp phim' />
            </View>

            <View className=' flex-1  mb-[70px] '>
                <MessagesScreen />
            </View>
        </SafeAreaView>
    )
}

export default Conversation