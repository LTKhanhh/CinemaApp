import { Animated, FlatList, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";

import icons from "@/constants/icons";
import { Link, useNavigation } from "expo-router";
import Filter from "@/components/Filter";
import FeatureCard from "@/components/FeatureCard";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useState, useRef } from "react";
export default function Index() {
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
      console.log(viewableItems);
      setActiveIndex(viewableItems[0].index);
    }
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current
  return (
    < SafeAreaView className="h-full px-1 bg-[#ffffff]" >
      <View>
        <View className="px-4 pb-4 flex w-full border-b bg-[#ffffff] border-[#eeeeee] flex-row items-center justify-between">
          <TouchableOpacity className=" p-2 mb-2 rounded-lg flex-row items-center border border-[#06599d] justify-between">
            <Link href={"/login"} >
              <Image source={icons.person} tintColor="#06599d" className="size-6 mr-2" />
              <View>
                <Text className="font-rubik-semibold text-primary-300">Đăng nhập</Text>
              </View>
            </Link>
          </TouchableOpacity>
          <Image source={icons.people} className="size-6" />
        </View>
        <Filter />
      </View>

      <ScrollView className="bg-[#f7f7f7]">
        <FlatList
          data={[1, 2, 3]}
          renderItem={({ item }) => (
            <FeatureCard id={activeIndex}
            />
          )}
          keyExtractor={(item) => item.toString()}
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
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
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
            <Card />
          )}
        //   <View>

        //     <View className="px-4 pb-4 flex w-full border-b border-[#f0f0f0] flex-row items-center justify-between">
        //       <TouchableOpacity className=" p-2 mb-2 rounded-lg flex-row items-center border border-[#06599d] justify-between">
        //         <Link href={"/login"} >
        //           <Image source={icons.person} tintColor="#06599d" className="size-6 mr-2" />
        //           <View>
        //             <Text className="font-rubik-semibold text-primary-300">Đăng nhập</Text>
        //           </View>
        //         </Link>
        //       </TouchableOpacity>
        //       <Image source={icons.people} className="size-6" />
        //     </View>
        //     <Filter />


        //      
        //   </View>

        // )}      // ListHeaderComponent={() => (

        />
      </ScrollView>


    </ SafeAreaView>
  );
}
