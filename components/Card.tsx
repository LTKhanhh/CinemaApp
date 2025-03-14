import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";


interface Props {
    onPress?: () => void;
}


export const Card = ({ onPress }: Props) => {
    return (
        <TouchableOpacity className="w-[32%]  relative ">
            <View className="bg-red-300 px-3 py-1 rounded-lg absolute top-1 left-2 z-50">
                <Text className="text-white font-rubik-semibold">T18</Text>
            </View>
            <Image source={images.japan} className="w-full h-56 rounded-lg" />

            <View className="mt-8">
                <Text className="font-rubik-bold text-lg capitalize text-primary-300 text-center">Nhà gia tiên</Text>
            </View>
            <View>
                <Text className="font-rubik-medium text-md capitalize text-[#ccc] text-center">117 phút</Text>
            </View>
        </TouchableOpacity>
    );
};