import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshTokenResType } from '@/schemaValidations/auth.schema';

// HTTP Error class for error handling
export class HttpError extends Error {
    status: number;
    payload: any;
    constructor({ status, payload }: { status: number, payload: any }) {
        super('Http Error');
        this.status = status;
        this.payload = payload;
    }
}

// Create Axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
    // baseURL: process.env.EXPO_PUBLIC_API_ENDPOINT,
    baseURL: "http://10.0.2.2",
    headers: {
        'Content-Type': 'application/json',
    },
    // For React Native, we need to handle cookies differently
});

// Helper to manage auth tokens with AsyncStorage
export const TokenManager = {
    async getToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem('accessToken');
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    },

    async setToken(token: string): Promise<void> {
        try {
            await AsyncStorage.setItem('accessToken', token);
        } catch (error) {
            console.error('Error setting token:', error);
        }
    },

    async getRefreshToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem('refreshToken');
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    },

    async setRefreshToken(token: string): Promise<void> {
        try {
            await AsyncStorage.setItem('refreshToken', token);
        } catch (error) {
            console.error('Error setting token:', error);
        }
    },

    async removeToken(): Promise<boolean> {
        try {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');

            return true
        } catch (error) {
            console.error('Error removing token:', error);
            return false
        }
    },


};

// Request interceptor to add auth token to each request
apiClient.interceptors.request.use(
    async (config) => {
        const token = await TokenManager.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling auth errors
apiClient.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        // Tránh lặp vô hạn khi refreshToken cũng bị lỗi
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("re")
            try {
                const refreshToken = await TokenManager.getRefreshToken();
                const accessToken = await TokenManager.getToken();
                console.log(refreshToken)
                console.log(accessToken)

                if (!accessToken) {
                    return
                }
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                const refreshResponse = await http.put<refreshTokenResType>('/auth/refresh', null, {
                    headers: {
                        'x-refresh-token': `Bearer ${refreshToken}`,
                    }
                });

                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.payload.data;

                await TokenManager.setToken(newAccessToken);
                await TokenManager.setRefreshToken(newRefreshToken);

                // Gắn token mới vào headers và gửi lại request cũ
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                await TokenManager.removeToken();
                // Nếu cần chuyển hướng về login có thể gọi thêm hàm navigate ở đây
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


// Generic request function
const request = async <Response>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    options?: AxiosRequestConfig | undefined
): Promise<{ status: number, payload: Response }> => {
    try {
        const isFormData = options?.data instanceof FormData;
        const headers = {
            ...(!isFormData && { 'Content-Type': 'application/json' }),
            ...options?.headers
        };

        // Perform the request
        const response: AxiosResponse<Response> = await apiClient.request({
            ...options,
            method,
            headers,
            url,
            signal: options?.signal,
        });

        return {
            status: response.status,
            payload: response.data,
        };
    } catch (error: any) {
        console.log(error)
        // Throw the error data directly as in the original code
        throw error.response?.data || new HttpError({
            status: error.response?.status || 500,
            payload: error.response?.data || { message: 'Network error' },
        });
    }
};

// HTTP methods
const http = {
    get<Response>(
        url: string,
        options?: Omit<AxiosRequestConfig, 'data'> | undefined
    ) {
        return request<Response>('GET', url, options);
    },
    post<Response>(
        url: string,
        data: any,
        options?: Omit<AxiosRequestConfig, 'data'> | undefined
    ) {
        return request<Response>('POST', url, { ...options, data });
    },
    put<Response>(
        url: string,
        data: any,
        options?: Omit<AxiosRequestConfig, 'data'> | undefined
    ) {
        return request<Response>('PUT', url, { ...options, data });
    },
    delete<Response>(
        url: string,
        data?: any,
        options?: Omit<AxiosRequestConfig, 'data'> | undefined
    ) {
        return request<Response>('DELETE', url, { ...options, data });
    },
    patch<Response>(
        url: string,
        data: any,
        options?: Omit<AxiosRequestConfig, 'data'> | undefined
    ) {
        return request<Response>('PATCH', url, { ...options, data });
    },
};

export default http;