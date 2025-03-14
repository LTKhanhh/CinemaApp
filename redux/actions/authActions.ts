import {
    Client,
    Account,
    ID,
    Databases,
    OAuthProvider,
    Avatars,
    Query,
    Storage,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { getCurrentUserOAuthStart, getCurrentUserOAuthSuccess, loginOAuthFailure, loginOAuthStart, loginOAuthSuccess } from "../reducer/authSlice";
import store from "../store";
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export const config = {
    platform: 'com.ltk.learn',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

const client = new Client()

client.setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client)
export const account = new Account(client)

export function loginAppwrite() {
    return async (dispatch: AppDispatch, getState: any) => {
        dispatch(loginOAuthStart())
        try {
            const redirectUri = Linking.createURL("/");
            // console.log(redirectUri)
            const response = await account.createOAuth2Token(
                OAuthProvider.Google,
                redirectUri
            );

            if (!response) throw new Error("Create OAuth2 token failed");

            const browserResult = await openAuthSessionAsync(
                response.toString(),
                redirectUri
            );

            if (browserResult.type !== "success")
                throw new Error("Create OAuth2 token failed");

            const url = new URL(browserResult.url);
            const secret = url.searchParams.get("secret")?.toString();
            const userId = url.searchParams.get("userId")?.toString();
            if (!secret || !userId) throw new Error("Create OAuth2 token failed");

            const session = await account.createSession(userId, secret);
            if (!session) throw new Error("Failed to create session");
            dispatch(loginOAuthSuccess())
            // return true;
        } catch (error) {
            console.log(error)
            dispatch(loginOAuthFailure())
            return false;
        }
    }
}

export function logoutAppwrite() {
    return async (dispatch: AppDispatch, getState: any) => {
        try {
            const result = await account.deleteSession("current");
            return result;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export function getCurrentUserAppwrite() {
    return async (dispatch: AppDispatch, getState: any) => {
        dispatch(getCurrentUserOAuthStart())
        try {
            const result = await account.get();
            if (result.$id) {
                const userAvatar = avatar.getInitials(result.name);

                const user = {
                    ...result,
                    avatar: userAvatar.toString(),
                };

                dispatch(getCurrentUserOAuthSuccess(user))
            }

            dispatch(loginOAuthFailure())
        } catch (error) {
            console.log(error);
            dispatch(loginOAuthFailure())
        }
    }
}