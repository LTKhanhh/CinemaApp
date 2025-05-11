import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, Redirect } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
import icons from '@/constants/icons';
import FilterTime from './filterTime';
import FilmCard from './FilmCard';

const Page = () => {
    const navigation = useNavigation()
    const { cinemaId } = useLocalSearchParams<{ cinemaId: string }>();


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
                            <Text className='text-2xl font-rubik-semibold text-white'>Đặt vé theo rạp</Text>

                        </View>
                    </View>

                </LinearGradient>
            </View>

            <ScrollView className='flex-1 mb-10 bg-[#f7f7f7]'>

                <View className='py-6 border-b border-[#ccc] mx-6'>
                    <Text className='font-rubik-semibold text-[18px]  text-center'>Nemui Thanh Xuân</Text>
                </View>

                <FilterTime />

                <View className='px-3'>
                    <FilmCard />

                </View>
            </ScrollView>
        </View>
    )
}

export default Page