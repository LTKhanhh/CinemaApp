import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import { useRouter } from 'expo-router';

interface Props {
    onPress?: () => void;
    title: string,
    posterUrl: string,
    ageRating?: string,
    duration: number,
    id: string
}


export const Card = ({ onPress, title, posterUrl, ageRating, duration, id }: Props) => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.push({ pathname: "/(root)/(booking)/[id]", params: { id: id } })} className="w-[32%]  relative ">
            <View
                className={`${ageRating == "P" && "bg-green-500"} px-3 py-1 rounded-lg absolute top-1 left-2 z-50 ${ageRating == "C16" && "bg-yellow-400"} ${ageRating == "C18" && "bg-red-400"}`}>
                <Text className="text-white font-rubik-semibold">{ageRating}</Text>
            </View>
            <Image source={{ uri: posterUrl }} className="w-full h-56 rounded-lg" />

            <View className="mt-8">
                <Text className="font-rubik-bold text-lg capitalize text-primary-300 text-center">{title}</Text>
            </View>
            <View>
                <Text className="font-rubik-medium text-md capitalize text-[#ccc] text-center">{duration} phút</Text>
            </View>
        </TouchableOpacity>
    );
};