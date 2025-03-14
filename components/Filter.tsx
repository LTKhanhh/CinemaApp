import { View, Text, Touchable, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'

const types = [
    {
        name: "Sắp chiếu",
        id: "1"
    },
    {
        name: "Đang chiếu",
        id: "2"
    },
    {
        name: "Suất chiếu sớm",
        id: "3"
    }
]



const Filter = () => {
    const [curVal, setCurVal] = useState("2")
    return (
        <View className='flex-row justify-between px-4 py-5 border-b border-[#eeeeee] drop-shadow-sm bg-[#ffffff]'>
            {types.map((type) => (
                <TouchableWithoutFeedback key={type.id} onPress={() => setCurVal(type.id)} className='hover:bg-none'>
                    <Text className={`text-md  font-rubik-bold uppercase ${curVal == type.id ? "text-primary-300" : ""} `}>{type.name}</Text>
                </TouchableWithoutFeedback>
            ))}
        </View>
    )
}

export default Filter