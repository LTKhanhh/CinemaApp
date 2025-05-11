import { z } from "zod"


export const getProfile = z.object({
    id: z.string(),
    price: z.number(),
    name: z.string(),
    avatar: z.string().optional(),
    email: z.string().email({ message: 'Email không hợp lệ' }),
    birthday: z.string().or(z.date()).optional(),
    phone: z.string().regex(/^\d{9,11}$/, { message: 'Số điện thoại không hợp lệ' }).optional(),
    gender: z.enum(['male', 'female', 'other']).default('other')
}).strict()

export type getPorfileType = z.TypeOf<typeof getProfile>