import { View, Text, Image, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'
import CinemaCard from './CinemaCard'

interface cinema {
    name: string,
    distance: string
}

interface cityListCinema {
    city: string,
    cinemas: cinema[]
}
const CinemaCity = ({ city, cinemas }: cityListCinema) => {
    const [show, setShow] = useState(false)
    return (
        <View className='px-4'>
            <View className='flex-row px-2 py-4 mb-[5px] rounded-lg bg-white justify-between'>
                <View>
                    <Text className='text-lg'>{city}</Text>
                </View>
                <View className='flex-row items-center'>
                    <Text className='text-lg'>{cinemas.length}</Text>
                    <Pressable onPress={() => setShow(!show)}>
                        {show ?
                            <Image source={icons.arrowDown} className='size-6 ml-2 bg-gray-500 rounded-full'></Image> :
                            <Image source={icons.rightArrow} className='size-6 ml-2 p-1 bg-gray-500 rounded-full'></Image>
                        }
                    </Pressable>
                </View>
            </View>

            {show &&
                <FlatList
                    data={cinemas}
                    renderItem={({ item }) => (
                        <CinemaCard id='1' name={item.name} distance={item.distance}
                        />
                    )}
                    // keyExtractor={(item) => item.toString()}
                    numColumns={2}

                    columnWrapperStyle={{
                        justifyContent: "flex-start",
                        gap: 7,
                        marginBottom: 10,
                    }}


                    scrollEnabled={false}
                />
            }

        </View>
    )
}

export default CinemaCity