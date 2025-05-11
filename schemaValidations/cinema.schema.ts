import { z } from "zod";


const CinemaAddressSchema = z.object({
    street: z.string().optional(),
    ward: z.string().optional(),
    district: z.string().optional(),
    city: z.string(),
    full: z.string().optional()
});

const CinemaLocationSchema = z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([z.number(), z.number()]) // [longitude, latitude]
});
// 1. Định nghĩa schema cho Cinema
const CinemaSchema = z.object({
    _id: z.string(),
    name: z.string(),
    address: CinemaAddressSchema,
    phone: z.string().regex(/^\d{9,11}$/),
    location: CinemaLocationSchema.optional(),
    avatar: z.string().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
});


// 2. Định nghĩa schema cho kết quả trả về
export const getAllCinema = z.record(z.string(), z.array(CinemaSchema));

export type getAllCinemaType = z.TypeOf<typeof getAllCinema>

export type getOneCinemaType = z.TypeOf<typeof CinemaSchema>
