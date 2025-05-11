import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootState } from "@/redux/actions/authActions";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch } from "@/redux/actions/authActions";
import { getCurrentUserAppwrite } from "@/redux/actions/authActions";
import { useGlobalContext } from "@/lib/global-provider";

export default function AppLayout() {
    const { loading, isLogged } = useGlobalContext();
    // const { user, isLogged, loading } = useSelector(
    //     (state: RootState) => state.auth
    // );
    // const dispatch = useDispatch<AppDispatch>()


    // useEffect(() => {
    //     dispatch(getCurrentUserAppwrite())
    // }
    //     , [dispatch])

    if (loading) {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView className="h-full flex justify-center items-center">
                    <ActivityIndicator className="text-primary-300" size="large" />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }

    // if (!isLogged) {
    //     return <Redirect href="/login" />;
    // }

    return <Slot />;
}