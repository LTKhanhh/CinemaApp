import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        'Content-Type': 'application/json',
    },
    // For React Native, we need to handle cookies differently
});

// Helper to manage auth tokens with AsyncStorage
export const TokenManager = {
    async getToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem('auth_token');
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    },

    async setToken(token: string): Promise<void> {
        try {
            await AsyncStorage.setItem('auth_token', token);
        } catch (error) {
            console.error('Error setting token:', error);
        }
    },

    async removeToken(): Promise<void> {
        try {
            await AsyncStorage.removeItem('auth_token');
            await AsyncStorage.removeItem('isLogin');
        } catch (error) {
            console.error('Error removing token:', error);
        }
    },

    async isLoggedIn(): Promise<boolean> {
        try {
            const value = await AsyncStorage.getItem('isLogin');
            return value === 'true';
        } catch (error) {
            console.error('Error checking login status:', error);
            return false;
        }
    },

    async setIsLoggedIn(isLoggedIn: boolean): Promise<void> {
        try {
            await AsyncStorage.setItem('isLogin', isLoggedIn ? 'true' : 'false');
        } catch (error) {
            console.error('Error setting login status:', error);
        }
    }
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
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error (e.g., token expired)
            await TokenManager.removeToken();
            // You might want to redirect to login screen here
            // For example: navigation.navigate('Login');
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