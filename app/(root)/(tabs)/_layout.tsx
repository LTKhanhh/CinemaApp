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
                } text-xs w-full text-center mt-1`}>{title}</Text>
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
                title: 'Home',
                headerShown: false,
                tabBarIcon: (focused) => (
                    <TabIcon focused={focused.focused} icon={icons.home} title='home' />
                ),
            }} />
            <Tabs.Screen name='Address' options={{
                title: 'Address',
                headerShown: false,
                tabBarIcon: (focused) => (
                    <TabIcon focused={focused.focused} icon={icons.location} title='Address' />
                ),
            }} />
            <Tabs.Screen name='Conversation' options={{
                title: 'Conversation',
                headerShown: false,
                tabBarIcon: (focused) => (
                    <TabIcon focused={focused.focused} icon={icons.email} title='Conversation' />
                ),
            }} />
            <Tabs.Screen name='Promotion' options={{
                title: 'Promotion',
                headerShown: false,
                tabBarIcon: (focused) => (
                    <TabIcon focused={focused.focused} icon={icons.gift} title='Promotion' />
                ),
            }} />
            <Tabs.Screen name='Other' options={{
                title: 'Other',
                headerShown: false,
                tabBarIcon: (focused) => (
                    <TabIcon focused={focused.focused} icon={icons.other} title='Other' />
                ),
            }} />



        </Tabs>
    )
}

export default TabsLayout