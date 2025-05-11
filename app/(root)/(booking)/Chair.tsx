import { View, Text, Image } from 'react-native'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

interface ChairProps {
    name: string;
    type: ImageSourcePropType | undefined;
    tintColor?: string;
}

const Chair: React.FC<ChairProps> = ({ name, type, tintColor = "#ccc" }) => {
    return (
        <View className='relative ml-2'>
            <Image className='size-6' source={type} tintColor={tintColor}></Image>
            <Text className='absolute left-[4px] top-1 text-white text-[8px] font-bold'>{name}</Text>
        </View>
    )
}

export default Chair