import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


// Định nghĩa kiểu dữ liệu cho User
interface User {
    $id?: string;
    id?: string;
    name: string;
    email: string;
    avatar?: string;
}

// Định nghĩa kiểu dữ liệu cho trạng thái xác thực
interface AuthState {
    user: User | null;
    loading: boolean;
    isLogged: boolean;
    authMethod: "google" | "backend" | null; // Phương thức đăng nhập
}

// Trạng thái ban đầu của xác thực
const initialState: AuthState = {
    user: null,
    loading: false,
    isLogged: false,
    authMethod: null,
};

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginOAuthStart: (state) => {
            state.loading = true;
            state.isLogged = false;
        },
        loginOAuthSuccess: (state) => {
            state.isLogged = true;
            state.loading = false;
        },
        loginOAuthFailure: (state) => {
            state.isLogged = false;
            state.loading = false;
        },
        getCurrentUserOAuthStart: (state) => {
            state.loading = true;
            state.isLogged = false;
        },
        getCurrentUserOAuthSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.isLogged = true;
            state.user = action.payload
        }
    },

});

export const { loginOAuthStart, loginOAuthFailure, loginOAuthSuccess, getCurrentUserOAuthStart, getCurrentUserOAuthSuccess } = authReducer.actions;
export default authReducer.reducer;