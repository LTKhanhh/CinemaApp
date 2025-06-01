import { z } from 'zod'

// Định nghĩa schema cho địa chỉ
const AddressSchema = z.object({
    street: z.string(),
    ward: z.string(),
    district: z.string(),
    city: z.string(),
    full: z.string(),
})

export type AddressSchemaType = z.TypeOf<typeof AddressSchema>

// Định nghĩa schema cho tọa độ địa lý
const LocationSchema = z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([z.number(), z.number()]), // [longitude, latitude]
})

export type LocationSchema = z.TypeOf<typeof LocationSchema>

// Schema cho một cụm rạp
const CinemaSchema = z.object({
    address: AddressSchema,
    location: LocationSchema,
    name: z.string(),
    phone: z.string(),
    _id: z.string(),
})

export type CinemaSchemaType = z.TypeOf<typeof CinemaSchema>

// Schema tổng thể: Record<ProvinceName, Cinema[]>
const CinemaListSchema = z.record(z.string(), z.array(CinemaSchema))

export type CinemaListSchemaType = z.TypeOf<typeof CinemaListSchema>
