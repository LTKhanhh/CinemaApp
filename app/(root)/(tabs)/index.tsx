import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";

import icons from "@/constants/icons";
import { Link, useNavigation } from "expo-router";
export default function Index() {

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={[1, 2, 3]}
        numColumns={3}
        renderItem={({ item }) => (
          <Card />
        )}
        ListHeaderComponent={() => (
          <View className="px-5 flex w-full border-b border-[#ccc] flex-row items-center justify-between">
            <TouchableOpacity className=" p-2 mb-2 rounded-lg flex-row items-center border border-[blue] justify-between">
              <Link href={"/login"} >
                <Image source={icons.person} className="size-6 mr-2" />
                <View>
                  <Text className="font-rubik-semibold">Đăng nhập</Text>
                </View>
              </Link>
            </TouchableOpacity>
            <Image source={icons.people} className="size-6" />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
