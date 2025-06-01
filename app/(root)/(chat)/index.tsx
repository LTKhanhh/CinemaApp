import { View, Text, SafeAreaView, Image, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import icons from '@/constants/icons'
import { Link, useNavigation } from 'expo-router'
import MessagesScreen, { MessageHeader, MessageInput } from '@/components/Message'
import { messageSchemaType } from '@/schemaValidations/chat.schema'
import chatApiRequest from '@/apiRequest/chat'
import MessageItem from '@/components/MessageItem'


const Conversation = () => {
    const navigate = useNavigation()

    const [messagesList, setMessagesList] = useState<messageSchemaType[]>([])
    const [conversationId, setConversationId] = useState("")
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await chatApiRequest.get("0")
                const data = res.payload
                console.log(data)
                setConversationId(data.conversationId);

                // Lọc ra các tin nhắn (bỏ qua key 'conversationId')
                const messages = Object.entries(data)
                    .filter(([key]) => key !== "conversationId")
                    .map(([_, value]) => value as messageSchemaType); // Ép kiểu nếu đã có định nghĩa

                setMessagesList(messages);
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
                <MessagesScreen conversationId={conversationId} messagesList={messagesList} />


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