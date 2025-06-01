import { Animated, FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";

import icons from "@/constants/icons";
import { Link, useNavigation } from "expo-router";
import Filter from "@/components/Filter";
import FeatureCard from "@/components/FeatureCard";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useState, useRef, useEffect } from "react";
import { blue300 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { data, dataBanner } from './datatest'
import { getAllFilmResType } from "@/schemaValidations/film.schema";
import filmApiRequest from "@/apiRequest/film";
import { useAuthContext } from "@/lib/auth-provider";

export default function Index() {
  const [films, setFilms] = useState<getAllFilmResType>([])
  const { loading, isLogged, user } = useAuthContext();

  const [activeIndex, setActiveIndex] = useState(0)
  const { width } = useWindowDimensions()
  const scrollX = useRef(new Animated.Value(0)).current
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
          },
        },
      },
    ], {
      useNativeDriver: false,
    })(event)
  }

  const handleOnViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {

    if (viewableItems && viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current

  useEffect(() => {
    const controller = new AbortController()
    const getFilms = async () => {
      try {
        const res = await filmApiRequest.getAll(controller)
        // console.log(res)
        setFilms(res.payload)
      } catch (error) {
        console.log(error)
      }
    }
    getFilms()
  }, [])

  return (
    < SafeAreaView className="h-full px-1 bg-[#ffffff]" >
      <View>
        <View className="px-4 pb-4 flex w-full border-b bg-[#ffffff] border-[#eeeeee] flex-row items-center justify-between">
          {
            !isLogged ?
              <TouchableOpacity className=" p-2 mb-2 rounded-lg flex-row items-center border border-[#06599d] justify-between">
                <Link href={"/login"} >
                  <Image source={icons.person} tintColor="#06599d" className="size-6 mr-2" />
                  <View>
                    <Text className="font-rubik-semibold text-primary-300">Đăng nhập</Text>
                  </View>
                </Link>
              </TouchableOpacity> :
              <View className="flex-row pt-3">
                <Link href={'/(root)/(profile)/ProfilePage'} className="  mr-2">
                  <Image className="border rounded-full size-11" source={icons.person} />
                </Link>
                <View className="justify-between">
                  <Text className="text-[13px]">Chào, <Text className="font-semibold">{user?.name}</Text></Text>

                  <View className="flex-row">
                    <View className="flex-row items-center">
                      <Image source={icons.person} className="size-4" tintColor={"blue"} />
                      <Text className="uppercase text-blue-950 text-[12px] font-semibold">Member</Text>
                    </View>
                  </View>
                </View>
              </View>
          }



          <Image source={icons.people} className="size-6" />
        </View>
        <Filter />
      </View>

      <ScrollView className="bg-[#f7f7f7]">
        <FlatList
          data={dataBanner}
          renderItem={({ item }) => (
            <FeatureCard id={item.id} image={item.bannerUrl}
            />
          )}
          keyExtractor={(item) => item.id}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="my-5 gap-1"
          pagingEnabled
          onScroll={handleScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}

        />


        <FlatList
          data={films}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 7,
            // paddingRight: 5,
            // paddingLeft: 5,
            marginBottom: 10,
          }}
          className="mt-2 pb-32 px-[5px]"
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Card film={item} />
          )}


        />
      </ScrollView>
    </ SafeAreaView>
  );
}
