import { View, Text } from 'react-native'
import React from 'react'

const PayCard = ({ text, type, curType }: { text: string, type: string, curType: string }) => {

    return (
        <View className={`flex-row rounded-lg ${type == curType ? "border border-sky-800 border-double " : ""}  py-5 px-2`}>
            <Text className={` ${type == curType ? " text-sky-800 border-dashed " : "text-[#555]"} flex-1 text-xl uppercase`}>{text}</Text>
        </View>
    )
}

export default PayCard