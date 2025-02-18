import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { ImageSourcePropType } from 'react-native'
interface Props {
    icons: ImageSourcePropType | undefined,
    value: string,
    placeholder: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const InputCard = ({ icons, value, placeholder, setValue }: Props) => {
    return (
        <View className='flex-row border border-[#ccc] rounded-xl p-2 items-center mb-6'>
            <Image source={icons} className='size-8 ' tintColor="#999" />
            {/* <View className='ml-2 mr-2 border-r border-[#999]'></View> */}
            <Text className='text-[36px] relative top-[-2px] block ml-1 mr-1 text-[#ccc] font-extralight'>|</Text>
            <TextInput value={value} onChangeText={e => setValue(e)} placeholder={placeholder} className='flex-1 text-xl font-rubik text-black' placeholderTextColor="#ccc" />

        </View>
    )
}

export default InputCard