import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

interface ChairProps {
    name: string;
    type: ImageSourcePropType | undefined;
    double?: boolean;
    status?: string;
    isSelected?: boolean
}

const Chair: React.FC<ChairProps> = ({ name, type, double, status, isSelected }) => {
    return (
        // <View className='relative ml-2'>
        //     <Image className={`${double ? 'w-12 h-6' : "size-6"}`} source={type} tintColor={tintColor}></Image>
        //     <Text className='absolute left-[4px] top-1 text-white text-[8px] font-bold'>{name}</Text>
        // </View>

        <ImageBackground
            source={type} // hoặc dùng { uri: 'https://link.to/image.jpg' }
            className={`${double ? 'w-12 h-6' : "size-6"} justify-center items-center  `}
            resizeMode="cover" // cover | contain | stretch | repeat | center
            tintColor={isSelected ? "#205781" : status == "booking" ? "#3D90D7" : status == "booked" ? "red" : "#ccc"}
        >
            {/* <View className="absolute inset-0 bg-red-500/50 rounded" /> */}
            <Text className='text-white text-[8px] font-bold -top-[2px]'>{name}</Text>

            {/* </View> */}
        </ImageBackground>
    )
}

export default Chair