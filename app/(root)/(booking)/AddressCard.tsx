import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'
import Voucher from '../(tabs)/Voucher'
import { useRouter } from 'expo-router'
import { useGlobalContext } from '@/lib/global-provider'
// import { Link } from 'expo-router'
const AddressCard = ({ title, link, id }: { title: string, link?: string, id: string }) => {
    const { isLogged } = useGlobalContext()
    const [more, setMore] = useState(false)
    console.log(more)
    const router = useRouter()
    return (
        <View className='px-3'>
            <TouchableOpacity onPress={() => setMore(!more)} className='py-2 mt-6  px-2 pl-4 flex-row bg-white  justify-between items-center'>
                <Text className='text-[15px] text-[#444]'>{title}</Text>
                <View className='bg-[#e4e3e3] p-1 justify-center items-center rounded-full'>
                    <Image className={!more ? 'size-7' : 'size-7'} source={!more ? icons.arrowDown : icons.rightArrow} />
                </View>
            </TouchableOpacity>
            <View className='mb-3'>
                <Text className='font-bold text-lg my-3'>2D phụ đề</Text>

                <ScrollView className='pl-3' showsHorizontalScrollIndicator={false} horizontal={true} >
                    <View className='items-center mr-4'>
                        <TouchableOpacity onPress={isLogged ? () => router.push({ pathname: "/(root)/(booking2)/[id]", params: { id: id } }) : () => router.navigate("/login")} className='p-2 items-center justify-center px-4 bg-[#ccc] rounded-full'>
                            <Text className='font-bold'>19:00</Text>
                        </TouchableOpacity>
                        <Text className='text-[#444] text-[13px] mt-1'>35 trống</Text>
                    </View>

                    <View className='items-center mr-4'>
                        <TouchableOpacity onPress={isLogged ? () => router.push({ pathname: "/(root)/(booking2)/[id]", params: { id: id } }) : () => router.navigate("/login")} className='p-2 items-center justify-center px-4 bg-[#ccc] rounded-full'>
                            <Text className='font-bold'>19:00</Text>
                        </TouchableOpacity>
                        <Text className='text-[#444] text-[13px] mt-1'>35 trống</Text>
                    </View>

                    <View className='items-center mr-4'>
                        <TouchableOpacity onPress={isLogged ? () => router.push({ pathname: "/(root)/(booking2)/[id]", params: { id: id } }) : () => router.navigate("/login")} className='p-2 items-center justify-center px-4 bg-[#ccc] rounded-full'>
                            <Text className='font-bold'>19:00</Text>
                        </TouchableOpacity>
                        <Text className='text-[#444] text-[13px] mt-1'>35 trống</Text>
                    </View>

                    <View className='items-center mr-4'>
                        <TouchableOpacity onPress={isLogged ? () => router.push({ pathname: "/(root)/(booking2)/[id]", params: { id: id } }) : () => router.navigate("/login")} className='p-2 items-center justify-center px-4 bg-[#ccc] rounded-full'>
                            <Text className='font-bold'>19:00</Text>
                        </TouchableOpacity>
                        <Text className='text-[#444] text-[13px] mt-1'>35 trống</Text>
                    </View>

                </ScrollView>
            </View>
        </View>

    )
}

export default AddressCard