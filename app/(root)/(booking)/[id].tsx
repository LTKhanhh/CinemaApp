import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
import icons from '@/constants/icons';
import InfoFilm from './InfoFilm';
import AddressCard from './AddressCard';
const BookingPage = () => {
    const navigation = useNavigation()
    const { id } = useLocalSearchParams();
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
                            <Text className='text-2xl font-rubik-semibold text-white'>Đặt vé theo phim</Text>

                        </View>
                    </View>

                </LinearGradient>
            </View>

            <ScrollView className='flex-1 mb-10'>
                <InfoFilm id={id} />

                <AddressCard title='Giải phóng' />
                <AddressCard title='Giải phóng' />
                <AddressCard title='Giải phóng' />
                <AddressCard title='Giải phóng' />

            </ScrollView>
        </View>
    )
}

export default BookingPage