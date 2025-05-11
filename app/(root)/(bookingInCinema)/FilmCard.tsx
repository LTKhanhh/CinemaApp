import { View, Text, Image, ScrollView, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useRef, useState } from 'react'
import { useGlobalContext } from '@/lib/global-provider'
import TimeCard from '@/components/TimeCard'
import { ChevronLeft } from 'react-native-feather' // Make sure to install this package

const poster = "https://files.betacorp.vn/media%2fimages%2f2025%2f03%2f31%2f400x633%2D24%2D165808%2D310325%2D29.jpg"

interface TimeCardProps {
    isLogged: boolean;
    id: string;
}

const FilmCard: React.FC = () => {
    const { isLogged } = useGlobalContext()
    const [showLeftChevron, setShowLeftChevron] = useState<boolean>(false)
    const scrollViewRef = useRef<ScrollView | null>(null)

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
        const scrollX = event.nativeEvent.contentOffset.x
        if (scrollX > 10) {
            setShowLeftChevron(true)
        } else {
            setShowLeftChevron(false)
        }
    }

    const scrollToStart = (): void => {
        scrollViewRef.current?.scrollTo({ x: 0, animated: true })
    }

    return (
        <View className='px-2 bg-white'>
            <View className='flex-row'>
                <Image
                    className='w-[90px] h-[120px] rounded-lg mr-4 -top-3'
                    source={{ uri: poster }}
                />
                <View className='py-4'>
                    <Text className='text-[14px] font-rubik-bold capitalize'>Thám tử kiên: kỳ án không đầu</Text>
                    <Text className='text-[12px] font-rubik-light'>Kinh dị, trinh thám</Text>
                    <Text className='text-[12px] font-rubik-light'>131 phút</Text>
                </View>
            </View>

            <View className='px-2 pb-8'>
                <Text className='uppercase font-rubik-bold'>2D phụ đề</Text>

                <View className='relative'>
                    {showLeftChevron && (
                        <TouchableOpacity
                            onPress={scrollToStart}
                            className='absolute left-0 top-1/2 z-10'
                            style={{
                                transform: [{ translateY: -15 }],
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: 8,
                                padding: 8,
                                zIndex: 999,
                            }}
                        >
                            <ChevronLeft stroke="white" width={20} height={20} />
                        </TouchableOpacity>
                    )}

                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className='pl-3 mt-3'
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    >
                        <TimeCard isLogged={isLogged} id='1' />
                        <TimeCard isLogged={isLogged} id='2' />
                        <TimeCard isLogged={isLogged} id='3' />
                        <TimeCard isLogged={isLogged} id='4' />
                        <TimeCard isLogged={isLogged} id='5' />
                        <TimeCard isLogged={isLogged} id='6' />
                        <TimeCard isLogged={isLogged} id='7' />
                        <TimeCard isLogged={isLogged} id='8' />
                        <TimeCard isLogged={isLogged} id='9' />
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default FilmCard