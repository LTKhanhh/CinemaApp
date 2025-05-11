import { View, Text, SafeAreaView, Image, Pressable, ScrollView, Animated } from 'react-native'

import React, { useState, useRef } from 'react'
import SaleCard from '@/components/SaleCard'

const Promotion = () => {
    const [sales, setSales] = useState(true)
    const underlineAnim = useRef(new Animated.Value(0)).current;

    const handlePress = (isSales: boolean) => {
        setSales(isSales);
        Animated.timing(underlineAnim, {
            toValue: isSales ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };
    return (
        <SafeAreaView className='h-full  bg-blue-400'>
            <View className="px-4 pt-4 pb-4 flex w-full border-b bg-blue-400 border-[#eeeeee] flex-row items-center justify-between">
                <View>
                    <Text className='text-xl font-rubik-bold text-white'>Tin mới và Ưu đãi</Text>
                </View>

            </View>
            <View className='bg-[#f7f7f7]'>
                <View className='flex-row justify-between py-4'>
                    <Pressable className='items-center flex-1' onPress={() => handlePress(true)}>
                        <Text className={`uppercase text-xl font-rubik ${sales ? "" : "text-[#ccc]"}`}>khuyến mãi lớn</Text>
                    </Pressable>
                    <Pressable className='flex-1 items-center' onPress={() => handlePress(false)}>
                        <Text className={`uppercase text-xl font-rubik ${sales ? "text-[#ccc]" : ""}`}>tin bên lề</Text>
                    </Pressable>
                    <Animated.View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: underlineAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ["20%", "72%"], // Điều chỉnh vị trí của gạch chân
                            }),
                            width: "10%", // Độ rộng của gạch chân
                            height: 4,
                            backgroundColor: "#000",
                            borderRadius: 2,
                        }}
                    />
                </View>
            </View>

            <ScrollView className='flex-1 bg-[#f7f7f7] pt-6'>
                <SaleCard />
                <SaleCard />
                <SaleCard />
                <SaleCard />
                <SaleCard />
                <SaleCard />
            </ScrollView>

            <View className='mb-12'></View>
        </SafeAreaView>
    )
}

export default Promotion