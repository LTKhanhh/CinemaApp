import { View, Text, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import icons from '@/constants/icons'
import { useNavigation, useRouter } from 'expo-router'
import { BookingResSchemaType } from '@/schemaValidations/booking.schema'
import bookingApiRequest from '@/apiRequest/booking'
import BookingItem from '@/components/BookingItem'

const index = () => {
    const navigation = useNavigation()
    const [bookingList, setBookingList] = useState<BookingResSchemaType[]>([])
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const res = await bookingApiRequest.getAll()
                setBookingList(res.payload)
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])

    const handlePress = (id: string) => {
        router.push(`/(root)/(bookingList)/(bookingInfo)/${id}`);
    };
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
                            <Text className='text-2xl font-rubik-semibold text-white'>Lịch sử giao dịch</Text>

                        </View>
                    </View>

                </LinearGradient>
            </View>

            <ScrollView className='flex-1 w-full'>
                {
                    bookingList.map((item, idx) => (
                        <BookingItem item={item} key={idx} />
                    ))
                }
            </ScrollView>

            {loading && (
                <View className="absolute inset-0 bg-gray-500/50 justify-center items-center z-50">
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </View>
    )
}

export default index