import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

interface Info {
    image?: string,
    title?: string,
    ageRating?: string,
    director?: string,
    actors?: string[],
    genres?: string[],
    duration?: number,
    language?: string,
    releaseDate?: string,
    description?: string

}
const FilmInfo = ({ image, title, ageRating, director, actors, duration, genres, language, releaseDate, description }: Info) => {
    return (
        <View className='px-2'>

            <View className='flex-row -top-16'>
                <View className='flex-1  '>
                    <Image className='w-full rounded-md  h-48' source={{ "uri": image }} />
                </View>
                <View className='flex-[2] px-2 top-16'>
                    <Text className='font-rubik-bold text-xl my-3 text-[#004477]'>{title}</Text>
                    {
                        ageRating == "C16" &&
                        <Text className='border border-[#ccc] text-[12px] rounded-full px-2 py-1'>Phim chỉ dành cho người trên 16 tuổi</Text>

                    }
                    {
                        ageRating == "C18" &&
                        <Text className='border border-[#ccc] text-[12px] rounded-full px-2 py-1'>Phim chỉ dành cho người trên 18 tuổi</Text>

                    }
                </View>
            </View>

            <View className='-top-12 px-2 border-b border-[#ccc] pb-4'>
                <View className='flex-row mt-2 text-[#03599d]'>
                    <Text className='font-rubik-bold uppercase w-[160px] text-[15px] text-[#004477] '>đạo diễn</Text>
                    <Text className='text-[15px] font-rubik'>{director}</Text>
                </View>
                <View className='flex-row mt-2 text-[#03599d]'>
                    <Text className='font-rubik-bold uppercase w-[160px] text-[15px] text-[#004477]'>diễn viên</Text>
                    <View>
                        {actors?.map((actor, idx) => (
                            <Text key={idx} className='text-[15px] font-rubik'>{actor}</Text>
                        ))}
                    </View>
                </View>
                <View className='flex-row mt-2 text-[#03599d]'>
                    <Text className='font-rubik-bold uppercase w-[160px] text-[15px] text-[#004477]'>thể loại</Text>
                    <Text className='text-[15px] font-rubik'>{genres?.length == 1 ? genres[0] : genres?.join(", ")}</Text>
                </View>

                <View className='flex-row mt-2 text-[#03599d]'>
                    <Text className='font-rubik-bold uppercase w-[160px] text-[15px] text-[#004477]'>thời lượng</Text>
                    <Text className='text-[15px] font-rubik'>{duration} phút</Text>
                </View>

                <View className='flex-row mt-2 text-[#03599d]'>
                    <Text className='font-rubik-bold uppercase w-[160px] text-[15px] text-[#004477]'>ngôn ngữ</Text>
                    <Text className='text-[15px] font-rubik'>{language}</Text>
                </View>

                <View className='flex-row mt-2 text-[#03599d]'>
                    <Text className='font-rubik-bold uppercase w-[160px] text-[15px] text-[#004477]'>ngày khởi chiếu</Text>
                    <Text className='text-[15px] font-rubik'>{releaseDate}</Text>
                </View>
            </View>

            <View className='-top-12 mt-4'>
                <Text className='text-[15px]'>{description}</Text>
            </View>


        </View>
    )
}

export default FilmInfo