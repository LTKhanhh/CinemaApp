// socket.ts
import { seatType } from '@/schemaValidations/seat.schema';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://10.0.2.2:3012'; // ví dụ: http://192.168.1.10:3000


let socket: Socket | null = null;

export const connectSocketChat = (conversationId: string, text: string): Socket => {
    if (socket && socket.connected) {
        return socket;
    }

    socket = io(SOCKET_URL, {
        transports: ['websocket'], // tối ưu cho mobile
    });

    socket.on("connect_error", (err) => {
        console.error("❌ Socket connect error:", err.message);
    });
    socket.on('disconnect', () => {
        console.log('🔌 Socket disconnected');
    });

    return socket;
};

export const getSocketChat = (): Socket | null => socket;
