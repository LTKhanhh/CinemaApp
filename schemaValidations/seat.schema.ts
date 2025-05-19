import { z } from "zod";

export const seat = z.object({
    showtimeId: z.string(),
    name: z.string(),
    status: z.string(),
    type: z.string(),
    price: z.number(),
    userId: z.number()
})

export type seatType = z.TypeOf<typeof seat>

