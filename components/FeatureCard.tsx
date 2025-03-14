import { View, Text } from 'react-native'
import { TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import images from '@/constants/images'
const FeatureCard = ({ id }: { id: number }) => {
    const { width } = useWindowDimensions()
    return (
        <TouchableOpacity className=" bg-gray-400 rounded-lg relative justify-center items-center" style={[{ width: width - 10 }]} >
            <Image source={images.newYork} className='h-40 flex-1 ' style={[{ width }]} resizeMode='contain'></Image>

            <View className='flex-row gap-2 absolute bottom-3 left-9'>
                <View className={`w-2 h-2 rounded-full bg-[#ccc] ${id === 0 ? "bg-blue-400" : ""}`}></View>
                <View className={`w-2 h-2 rounded-full bg-[#ccc] ${id === 1 ? "bg-blue-400" : ""}`}></View>
                <View className={`w-2 h-2 rounded-full bg-[#ccc] ${id === 2 ? "bg-blue-400" : ""}`}></View>
            </View>
        </TouchableOpacity >
    )
}

export default FeatureCard