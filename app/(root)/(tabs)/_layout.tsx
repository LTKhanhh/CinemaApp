import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from '@/constants/icons'
const TabIcon = ({
    focused,
    icon,
    title,
}: {
    focused: boolean,
    icon: any,
    title: string,
}) => {
    return (
        <View className='flex-1 items-center mt-3'>
            <Image resizeMode="contain"
                className="size-6" tintColor={focused ? "#0061FF" : "#666876"} source={icon} />
            <Text className={`${focused
                ? "text-primary-300 font-rubik-medium"
                : "text-black-200 font-rubik"
                } text-xs w-full text-center mt-1 `}>{title}</Text>
        </View>
    )
}
const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={
                {
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#f6f6f6',
                        position: 'absolute',
                        borderTopColor: "#a7a7a7",
                        borderTopWidth: 1,
                        minHeight: 70
                    }
                }
            }
        >
            <Tabs.Screen name='index' options={{
                title: 'Lịch chiếu theo phim',
                headerShown: false,
                tabBarIcon: (focused) => (
                    <TabIcon focused={focused.focused} icon={icons.home} title='Trang chủ' />
                ),
            }} />
            <Tabs.Screen name='Address' options={{
                title: 'Lịch chiếu theo rạp',
                headerShown: false,
                tabBarIcon: (focused) => (
                    <TabIcon focused={focused.focused} icon={icons.location} title='Lịch chiếu theo rạp' />
                ),
            }} />
            <Tabs.Screen name='Conversation' options={{
                title: 'Tin nhắn',
                headerShown: false,
                tabBarIcon: (focused) => (
                    <TabIcon focused={focused.focused} icon={icons.email} title='Tin nhắn' />
                ),
            }} />
            <Tabs.Screen name='Promotion' options={{
                title: 'Thông báo',
                headerShown: false,
                tabBarIcon: (focused) => (
                    <TabIcon focused={focused.focused} icon={icons.noti} title='Thông báo' />
                ),
            }} />
            <Tabs.Screen name='Other' options={{
                title: 'Khác',
                headerShown: false,
                tabBarIcon: (focused) => (
                    <TabIcon focused={focused.focused} icon={icons.other} title='Khác' />
                ),
            }} />



        </Tabs>
    )
}

export default TabsLayout