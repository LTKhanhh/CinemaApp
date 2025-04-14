import icons from '@/constants/icons';
import { useNavigation } from 'expo-router';
import React from 'react'
import { View, Text, Image, Touchable, Pressable } from 'react-native';
import { ImageSourcePropType } from 'react-native'

interface otherCard {
    name?: string,
    color?: string,
    icon?: ImageSourcePropType,
    iconColor?: string,
    classMore?: string
}

function OtherCard({ name, color, icon, iconColor, classMore }: otherCard) {
    return (
        <View className={`w-[160px] h-[160px] ${classMore} p-2 bg-white rounded-lg items-center justify-center`}
            style={{
                // Shadow không được hỗ trợ trực tiếp bằng class tailwind trong nativewind
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}>
            <View
                className={`bg-[${color}] p-3 rounded-md mb-3`}
            >
                <Image
                    source={icon}
                    className={`h-10 w-10`}
                    tintColor={iconColor}
                    resizeMode="contain"

                />
            </View>
            {/* <Text className="mt-2 text-lg font-medium">abc123</Text> */}
            <Text className="mt-2 text-xl text-[#4b6776] font-rubik-medium">{name}</Text>
        </View>
    )
}

export default OtherCard