import { View, Text, Touchable, TouchableWithoutFeedback, Pressable } from 'react-native'
import React, { useState } from 'react'

const types = [
    {
        name: "Đang chiếu",
        id: "1"
    },
    {
        name: "Sắp chiếu",
        id: "2"
    },

]



const Filter = ({ curVal, setCurVal }: { curVal: string, setCurVal: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <View className='flex-row justify-between px-4 py-5 border-b border-[#eeeeee] drop-shadow-sm bg-[#ffffff]'>
            {types.map((type) => (
                <Pressable key={type.id} onPress={() => setCurVal(type.id)} className='hover:bg-none flex-1 items-center'>
                    <Text className={`text-md text-center  font-rubik-bold uppercase ${curVal == type.id ? "text-primary-300" : ""} `}>{type.name}</Text>
                </Pressable>
            ))}
        </View>
    )
}

export default Filter