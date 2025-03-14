import { configureStore, applyMiddleware, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { rootReducer } from "./reducer/rootReducer";


const store = configureStore({
    reducer: rootReducer, // Kết hợp các reducer của bạn
    // redux-thunk đã được tích hợp mặc định trong `configureStore`, vì vậy bạn không cần phải cấu hình nó
    devTools: process.env.NODE_ENV !== 'production', // Kích hoạt Redux DevTools trong môi trường phát triển
});

export default store;
