import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';

import icons from '@/constants/icons';
import InfoFilm from './InfoFilm';
import AddressCard from './AddressCard';
import Chair from './Chair';
const chairRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const chairCol = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const SecondBookingPage = () => {
    const navigation = useNavigation()

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
                <InfoFilm />

                <View className='px-3 py-4 border-b flex-row justify-between pr-5'>
                    <View>
                        <View className='flex-row mb-4 items-center'>
                            <Image className='size-8' tintColor={"#ccc"} source={icons.chair} />
                            <Text className='ml-2'>Ghế trống</Text>
                        </View>
                        <View className='flex-row mb-4 items-center'>
                            <Image className='size-8' tintColor={"blue"} source={icons.chair} />
                            <Text className='ml-2'>Ghế đang <Text>đươc giữ</Text></Text>
                        </View>
                        <View className='flex-row mb-4 items-center'>
                            <Image className='size-8' tintColor={"violet"} source={icons.chair} />
                            <Text className='ml-2'>Ghế đang chọn</Text>
                        </View>
                        <View className='flex-row mb-4 items-center'>
                            <Image className='size-8' tintColor={"red"} source={icons.chair} />
                            <Text className='ml-2'>Ghế đã bán</Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Image className='size-8' tintColor={"yellow"} source={icons.chair} />
                            <Text className='ml-2'>Ghế đã đặt trước</Text>
                        </View>
                    </View>

                    <View className='justify-between items-end pr-8'>
                        <View className='flex-row mb-4 items-center'>
                            <Image className='size-8' tintColor={"#ccc"} source={icons.chair3} />
                            <View className='ml-2'>
                                <Text className=' font-semibold'>Ghế thường</Text>
                                <Text className='font-bold text-[13px]'>85.000đ</Text>
                            </View>
                        </View>
                        <View className='flex-row mb-4 items-center'>
                            <Image className='size-8' tintColor={"#ccc"} source={icons.chair} />
                            <View className='ml-2'>
                                <Text className=' font-semibold'>Ghế Vip</Text>
                                <Text className='font-bold text-[13px]'>85.000đ</Text>
                            </View>
                        </View>
                        <View className='flex-row mb-4 items-center'>
                            <Image resizeMode='cover' className='h-8 w-16' tintColor={"#ccc"} source={icons.chair2} />
                            <View className='ml-2'>
                                <Text className=' font-semibold'>Ghế đôi</Text>
                                <Text className='font-bold text-[13px]'>85.000đ</Text>
                            </View>
                        </View>
                    </View>


                </View>

                <View className='px-6 py-4'>
                    <Text className='text-lg text-center text-[#666]'>Màn hình chiếu</Text>

                    {chairRow.map((row, idx) => (
                        <View className='flex-row mb-2' key={idx}>
                            {
                                chairCol.map((col, idx) => (
                                    <Chair key={idx} name={row + col} type={icons.chair3} />
                                ))
                            }
                        </View>
                    ))}


                </View>


            </ScrollView>
        </View>
    )
}

export default SecondBookingPage