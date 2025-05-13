import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CinemaCity from '@/components/CinemaCity'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'
import { getAllCinemaType } from '@/schemaValidations/cinema.schema'
import cinemaApiRequest from '@/apiRequest/cinema'
const datas = [
    {
        city: "Hà Nội",
        cinemas: [
            {
                name: "Nemui 1",
                distance: "11 km"
            },
            {
                name: "Nemui 2",
                distance: "11 km"
            },
            {
                name: "Nemui 3",
                distance: "11 km"
            },
            {
                name: "Nemui 4",
                distance: "11 km"
            },
            {
                name: "Nemui 5",
                distance: "11 km"
            },
            {
                name: "Nemui 6",
                distance: "11 km"
            }
        ]
    },
    {
        city: "TP.Hồ Chí Minh",
        cinemas: [
            {
                name: "Nemui 1",
                distance: "11 km"
            },
            {
                name: "Nemui 2",
                distance: "11 km"
            },
            {
                name: "Nemui 3",
                distance: "11 km"
            },
        ]
    },
    {
        city: "Bắc Giang",
        cinemas: [
            {
                name: "Nemui 1",
                distance: "11 km"
            },
        ]
    }
]
const Address = () => {
    const [cinemas, setCinemas] = useState<getAllCinemaType>({})
    const navigation = useNavigation()

    useEffect(() => {
        const controller = new AbortController()

        const getData = async () => {
            try {
                const res = await cinemaApiRequest.getAll(controller)
                console.log(res)
                setCinemas(res.payload)
            } catch (error) {

            }
        }
        getData()
    }, [])
    return (
        <View className='h-full  bg-[#ffffff]'>

            <LinearGradient
                colors={['#3674B5', '#A1E3F9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}

            >
                <View className="px-4 pt-14 pb-4 flex w-full border-b bg-[#ffffff] border-[#eeeeee] flex-row items-center justify-between">
                    <Text className='text-xl font-rubik-bold '>Rạp phim NEMUI</Text>
                </View>
            </LinearGradient>




            <View className='bg-[#f7f7f7] px-2'>
                <Text className='text-xl font-rubik-semibold capitalize my-2 text-[#6e6e6e]'>Chọn rạp theo khu vực</Text>
            </View>

            <ScrollView className='bg-[#f7f7f7] '>
                {datas.map((data, idx) => (
                    <CinemaCity city={data.city} cinemas={data.cinemas} key={idx} />
                ))}
                <View className='mb-32'></View>
            </ScrollView>
        </View>
    )
}

export default Address