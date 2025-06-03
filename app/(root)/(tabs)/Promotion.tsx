import { View, Text, SafeAreaView, Image, Pressable, ScrollView, Animated, ActivityIndicator, FlatList } from 'react-native'

import React, { useState, useRef } from 'react'
import SaleCard from '@/components/SaleCard'
import { notiBodyType } from '@/schemaValidations/noti.schema'
import notificationApiRequest from '@/apiRequest/notification'


function NotiItem({ item, index }: { item: notiBodyType; index: number }): JSX.Element | null {

    return (
        <View className='w-full flex-row items-start bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100'>
            <Image
                source={{ uri: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg' }}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: '#e0e0e0'
                }}
                className='mr-3'
            />
            <View className='flex-1'>
                <Text className='text-gray-900 font-semibold text-base leading-5 mb-1'>
                    {item.title}
                </Text>
                <Text className='text-gray-600 text-sm leading-4 line-clamp-2'>
                    {item.description}
                </Text>
                <View className='mt-2'>
                    <Text className='text-gray-400 text-xs'>
                        Vừa xong
                    </Text>
                </View>
            </View>

            {/* Dot indicator for unread */}
            <View className='ml-2'>
                <View className='w-2 h-2 bg-blue-500 rounded-full'></View>
            </View>
        </View>
    )
}

const Promotion = () => {
    const [sales, setSales] = useState(true)
    const underlineAnim = useRef(new Animated.Value(0)).current;

    // const handlePress = (isSales: boolean) => {
    //     setSales(isSales);
    //     Animated.timing(underlineAnim, {
    //         toValue: isSales ? 0 : 1,
    //         duration: 200,
    //         useNativeDriver: false,
    //     }).start();
    // };const [messages, setMessages] = useState<messageSchemaType[]>(messagesList)
    const [notiList, setNotiList] = useState<notiBodyType[]>([])
    const [offset, setOffset] = useState(notiList.length)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    const fetchOlderMessages = async () => {
        if (isLoadingMore || !hasMore) return;

        setIsLoadingMore(true)
        try {
            const res = await notificationApiRequest.get(offset.toString())
            const data = res.payload



            if (data.length === 0) {
                setHasMore(false)
            } else {
                setNotiList(prev => [...prev, ...data])
                setOffset(prev => prev + data.length)
            }
        } catch (error) {
            console.error("Lỗi tải thêm:", error)
        }
        setIsLoadingMore(false)
    }

    const renderItem = ({ item, index }: { item: notiBodyType; index: number }) => {
        return (
            <NotiItem
                index={index}
                item={item}
            />
        )
    }

    const keyExtractor = (item: notiBodyType): string => {
        return item.id.toString()
    }

    return (
        <View style={{ flex: 1 }}>
            <View className="px-4 pt-4 pb-4 flex w-full border-b bg-blue-400 border-[#eeeeee] flex-row items-center justify-between">
                <View>
                    <Text className='text-xl font-rubik-bold text-white'>Thông báo</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    automaticallyAdjustKeyboardInsets={true}
                    contentContainerStyle={{
                        paddingTop: 10,
                        paddingBottom: 10
                    }}
                    data={[...notiList]}
                    inverted={true}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    onEndReached={fetchOlderMessages}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={
                        isLoadingMore ? (
                            <View style={{ padding: 10, alignItems: 'center' }}>
                                <ActivityIndicator size="small" color="#666" />
                            </View>
                        ) : null
                    }
                />
            </View>
        </View>
    )
    // return (
    //     <SafeAreaView className='h-full  bg-blue-400'>
    //         <View className="px-4 pt-4 pb-4 flex w-full border-b bg-blue-400 border-[#eeeeee] flex-row items-center justify-between">
    //             <View>
    //                 <Text className='text-xl font-rubik-bold text-white'>Thông báo</Text>
    //             </View>

    //         </View>
    //         {/* <View className='bg-[#f7f7f7]'>
    //             <View className='flex-row justify-between py-4'>
    //                 <Pressable className='items-center flex-1' onPress={() => handlePress(true)}>
    //                     <Text className={`uppercase text-xl font-rubik ${sales ? "" : "text-[#ccc]"}`}>khuyến mãi lớn</Text>
    //                 </Pressable>
    //                 <Pressable className='flex-1 items-center' onPress={() => handlePress(false)}>
    //                     <Text className={`uppercase text-xl font-rubik ${sales ? "text-[#ccc]" : ""}`}>tin bên lề</Text>
    //                 </Pressable>
    //                 <Animated.View
    //                     style={{
    //                         position: "absolute",
    //                         bottom: 0,
    //                         left: underlineAnim.interpolate({
    //                             inputRange: [0, 1],
    //                             outputRange: ["20%", "72%"], // Điều chỉnh vị trí của gạch chân
    //                         }),
    //                         width: "10%", // Độ rộng của gạch chân
    //                         height: 4,
    //                         backgroundColor: "#000",
    //                         borderRadius: 2,
    //                     }}
    //                 />
    //             </View>
    //         </View> */}

    //         <ScrollView className='flex-1 bg-[#f7f7f7] pt-6'>

    //         </ScrollView>

    //         <View className='mb-12'></View>
    //     </SafeAreaView>
    // )
}

export default Promotion
