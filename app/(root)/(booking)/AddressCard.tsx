import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'
import Voucher from '../(tabs)/Voucher'
import { useRouter } from 'expo-router'
import { useAuthContext } from '@/lib/auth-provider'
import { showTimeType } from '@/schemaValidations/showTime.schema'
import { filmInListType } from '@/schemaValidations/film.schema'
// import { Link } from 'expo-router'
const AddressCard = ({ name, list, film }: { name: string, list: showTimeType[], film: filmInListType | null }) => {
    const { isLogged } = useAuthContext()
    const [more, setMore] = useState(true)
    const router = useRouter()
    return (
        <View className='px-3'>
            <TouchableOpacity onPress={() => setMore(!more)} className='py-2 mt-6  px-2 pl-4 flex-row bg-white  justify-between items-center'>
                <Text className='text-[15px] text-[#444]'>{name}</Text>
                <View className='bg-[#e4e3e3] p-1 justify-center items-center rounded-full'>
                    <Image className={!more ? 'size-7' : 'size-7'} source={!more ? icons.arrowDown : icons.rightArrow} />
                </View>
            </TouchableOpacity>
            {more &&
                <View className='mb-3'>
                    <Text className='font-bold text-lg my-3'>2D phụ đề</Text>

                    <ScrollView className='pl-3' showsHorizontalScrollIndicator={false} horizontal={true} >


                        {list.map((item, idx) => (
                            <View key={idx} className='items-center mr-4'>
                                <TouchableOpacity onPress={isLogged ? () => router.push({ pathname: "/(root)/(booking2)/[id]", params: { id: item.id, movie: JSON.stringify(film) } }) : () => router.navigate("/login")} className='p-2 items-center justify-center px-4 bg-[#ccc] rounded-full'>
                                    <Text className='font-bold'>{item.hour}:{item.minute == 0 ? "00" : item.minute}</Text>
                                </TouchableOpacity>
                                <Text className='text-[#444] text-[13px] mt-1'>{item.seats} trống</Text>
                            </View>
                        ))}



                    </ScrollView>
                </View>
            }

        </View>

    )
}

export default AddressCard