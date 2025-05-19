// socket.ts
import { seatType } from '@/schemaValidations/seat.schema';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://10.0.2.2'; // ví dụ: http://192.168.1.10:3000


let socket: Socket | null = null;

export const connectSocket = (accessToken: string, showtimeId: string): Socket => {
    if (socket && socket.connected) {
        return socket;
    }

    socket = io(SOCKET_URL, {
        transports: ['websocket'], // tối ưu cho mobile
    });

    socket.on('connect', () => {
        console.log('🟢 Socket connected:', socket?.id);
        socket?.emit('join', { accessToken, showtimeId });
    });

    socket.on('unauthorized', () => {
        console.warn('❌ Unauthorized, disconnecting...');
        socket?.disconnect();
    });

    socket.on('seatPicked', (seat: seatType) => {
        console.log('📥 Ghế đã được chọn:', seat);
    });

    socket.on('seatUnPicked', (seat: seatType) => {
        console.log('📤 Ghế đã bị bỏ chọn:', seat);
    });

    socket.on('disconnect', () => {
        console.log('🔌 Socket disconnected');
    });

    return socket;
};

export const getSocket = (): Socket | null => socket;
