import { View, Text, SafeAreaView, Image, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import icons from '@/constants/icons'
import { Link, useNavigation } from 'expo-router'
import MessagesScreen, { MessageHeader, MessageInput } from '@/components/Message'
import { messageSchemaType } from '@/schemaValidations/chat.schema'
import chatApiRequest from '@/apiRequest/chat'
import MessageItem from '@/components/MessageItem'

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
    // const navigate = useNavigation()

    // const [messagesList, setMessagesList] = useState<messageSchemaType[]>([])
    // const [conversationId, setConversationId] = useState("")
    // const [loading, setLoading] = useState(false)
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true)

    //         try {
    //             const res = await chatApiRequest.get("0")
    //             const data = res.payload
    //             setConversationId(data.conversationId);

    //             // Lọc ra các tin nhắn (bỏ qua key 'conversationId')
    //             const messages = Object.entries(data)
    //                 .filter(([key]) => key !== "conversationId")
    //                 .map(([_, value]) => value as messageSchemaType); // Ép kiểu nếu đã có định nghĩa

    //             setMessagesList(messages);
    //         } catch (error) {

    //         }
    //         setLoading(false)
    //     }
    //     fetchData()
    // }, [])

    return (
        <SafeAreaView className='h-full bg-white '>
            {/* <View className="px-4 pt-4 pb-4 flex w-full border-b bg-white border-[#999] flex-row items-center justify-between">
                <View>
                    <Text className='text-xl font-rubik-bold '>Rạp phim NEMUI</Text>
                </View>
            </View> */}
            <View className='h-[50px] pl-[10px] w-full  border-b border-[#999]'>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 10
                    }}
                >
                    <Text
                        style={{
                            color: '#202020',
                            marginLeft: 10,
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}
                    >
                        Tin nhắn
                    </Text>
                </View>
            </View>

            <View className=' flex-1 px-4 '>
                <MessageItem isChat={true} />
                <MessageItem isChat={false} />
            </View>

            {/* {loading && (
                <View className="absolute inset-0 bg-gray-500/50 justify-center items-center z-50">
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )} */}
        </SafeAreaView>
    )
}

export default Conversation