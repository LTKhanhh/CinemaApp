import { View, Text, Image, Pressable, ScrollView, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Voucher from '../(tabs)/Voucher';
import icons from '@/constants/icons';
import { useNavigation } from 'expo-router';
import ProfileCard from './ProfileCard';
import LinkItem from './LinkItem';
// import { logout } from "@/lib/appwrite";
import { logoutAppwrite } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';

const ProfilePage = () => {
    const navigation = useNavigation()
    const { user, refetch } = useGlobalContext();
    const handleLogout = async () => {
        console.log(1)
        const result = await logoutAppwrite();
        if (result) {
            Alert.alert("Success", "Logged out successfully");
            refetch();
        } else {
            Alert.alert("Error", "Failed to logout");
        }
    }
    return (
        <View className='flex-1'>
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
                            <Text className='text-2xl font-rubik-semibold text-white'>Thành viên Beta</Text>

                        </View>
                    </View>

                </LinearGradient>
            </View>
            <ScrollView className=' w-full flex-1 '>
                <ProfileCard />

                <LinkItem title='Điểm beta' />
                <LinkItem title='Lịch sử giao dịch' />
                <LinkItem title='Thông tin tài khoản' />
                <LinkItem title='Thay đổi mật khẩu' />
                <LinkItem title='Xóa tài khoản' />

                <TouchableOpacity onPress={handleLogout} className='mt-4 w-full pb-10 pl-3'>
                    <Text className='text-xl text-red-600'>Đăng xuất</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>

    )
}

export default ProfilePage
