import { View, Text, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const MessageItem = ({ isChat }: { isChat: boolean }) => {
    const router = useRouter()

    const handleNavigate = () => {
        if (isChat) {
            router.push("/(root)/(chat)")
        } else {
            router.push("/(root)/(chatbot)")
        }
    }
    return (
        <TouchableOpacity onPress={handleNavigate} className='w-full flex-row mt-4'>
            <Image source={{ uri: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg' }}
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: '#e0e0e0'
                }}
            />
            <Text className='ml-4 font-rubik-semibold text-[16px] pt-4'>
                {isChat ? "Admin" : "Chatbot hệ thống"}
            </Text>
        </TouchableOpacity>
    )
}

export default MessageItem