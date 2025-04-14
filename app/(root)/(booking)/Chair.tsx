import { View, Text, Image } from 'react-native'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

const Chair = ({ name, type }: { name: string, type: ImageSourcePropType | undefined }) => {
    return (
        <View className='relative ml-2'>
            <Image className='size-6 ' source={type}></Image>
            <Text className='absolute left-[4px] top-1 text-white text-[8px] font-bold' >{name}</Text>
        </View>
    )
}

export default Chair