import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Voucher from '../(tabs)/Conversation';
import icons from '@/constants/icons';
import { useNavigation } from 'expo-router';
const SettingPage = () => {
    const navigation = useNavigation()
    return (
        <View>
            <View className='h-[100px]'>
                <LinearGradient
                    colors={['#3674B5', '#A1E3F9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}

                >
                    <View className='w-full h-full justify-end pl-2 pb-2'>
                        <View className='flex-row items-center'>
                            <Pressable onPress={navigation.goBack}>
                                <Image source={icons.leftarrow} className='size-9 mr-4' tintColor={'white'}></Image>

                            </Pressable>
                            <Text className='text-2xl font-rubik-semibold text-white'>Cài đặt</Text>

                        </View>
                    </View>

                </LinearGradient>
            </View>
        </View>

    )
}

export default SettingPage
