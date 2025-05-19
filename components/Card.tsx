import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import { useRouter } from 'expo-router';
import { filmInListType } from "@/schemaValidations/film.schema";

interface Props {
    onPress?: () => void;
    film: filmInListType
}


export const Card = ({ onPress, film }: Props) => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.push({ pathname: "/(root)/(booking)/[id]", params: { film: JSON.stringify(film) } })} className="w-[32%]  relative ">
            <View
                className={`${film.ageRating == "P" && "bg-green-500"} px-3 py-1 rounded-lg absolute top-1 left-2 z-50 ${film.ageRating == "C16" && "bg-yellow-400"} ${film.ageRating == "C18" && "bg-red-400"}`}>
                <Text className="text-white font-rubik-semibold">{film.ageRating}</Text>
            </View>
            <Image source={{ uri: film.posterUrl }} className="w-full h-56 rounded-lg" />

            <View className="mt-8">
                <Text className="font-rubik-bold text-lg capitalize text-primary-300 text-center">{film.title}</Text>
            </View>
            <View>
                <Text className="font-rubik-medium text-md capitalize text-[#ccc] text-center">{120} phút</Text>
            </View>
        </TouchableOpacity>
    );
};