import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import MessageItem from '@/components/MessageItem'


const Conversation = () => {
    return (
        <SafeAreaView className='h-full bg-white '>

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

        </SafeAreaView>
    )
}

export default Conversation