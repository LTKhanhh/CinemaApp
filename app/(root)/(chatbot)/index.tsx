import { View, Text, SafeAreaView, Image, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import icons from '@/constants/icons'
import { Link, useNavigation } from 'expo-router'
import MessagesScreen, { MessageHeader, MessageInput } from '@/components/ChatBotMessage'
import { messageSchemaType } from '@/schemaValidations/chat.schema'
import chatApiRequest from '@/apiRequest/chat'
import MessageItem from '@/components/MessageItem'
import chatbotApiRequest from '@/apiRequest/chatbot'
import axios from 'axios'
import { getBodyType, messageChatbotType } from '@/schemaValidations/chatbot.schema'

interface data {
    id: string
    role: string,
    message: string
}

const Conversation = () => {
    const navigate = useNavigation()

    const [messagesList, setMessagesList] = useState<data[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get<getBodyType>('http://10.0.2.2:8000/sessions/');
                const sessionId = res.data.session_id;
                const result: data[] = res.data.messages.flatMap((item, index) => [
                    {
                        id: `${sessionId}-user-${index}`,
                        role: "user",
                        message: item.user
                    },
                    {
                        id: `${sessionId}-bot-${index}`,
                        role: "bot",
                        message: item.bot
                    }
                ]);
                setMessagesList(result)
            } catch (error) {

            }
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <SafeAreaView className='h-full bg-white '>
            <View className='h-[50px] pl-[10px] w-full  border-b border-[#999]'>
                <MessageHeader avatar='https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg' name='Admin rạp phim' />
            </View>

            <View className=' flex-1  '>
                <MessagesScreen messagesList={messagesList} />


            </View>

            {loading && (
                <View className="absolute inset-0 bg-gray-500/50 justify-center items-center z-50">
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </SafeAreaView>
    )
}

export default Conversation