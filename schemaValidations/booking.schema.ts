import { z } from "zod";

const SeatSchema = z.object({
    name: z.string(),
    type: z.string(), // nếu có thêm loại thì thêm vào đây
    price: z.number(),
    // _id: z.string(),
    // id: z.string(),
});

const BookingResSchema = z.object({
    userId: z.string(),
    showtimeId: z.string(),
    seats: z.array(SeatSchema),
    bonusItems: z.array(z.any()), // nếu biết rõ kiểu bonusItems thì thay thế z.any()
    totalPay: z.number(),
    status: z.string(), // cập nhật theo trạng thái thực tế
    method: z.string(), // thêm các phương thức nếu cần
    // createdAt: z.string().datetime(),
    // updatedAt: z.string().datetime(),
    id: z.string(),
});

export type BookingResSchemaType = z.TypeOf<typeof BookingResSchema>
