import { z } from "zod"

export const getOneFilmRes = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    releaseDate: z.string().optional(), // ISO date string
    language: z.string().default("Tiếng Việt"),
    director: z.string().optional(),
    actors: z.array(z.string()).default([]),
    duration: z.number(),
    genres: z.array(z.string()).default([]),
    ageRating: z.enum(["P", "C13", "C16", "C18"]).default("P"),
    posterUrl: z.string().optional(),
    trailerUrl: z.string().optional(),
    status: z.enum(["coming_soon", "now_showing", "ended"]).default("coming_soon"),
    createdAt: z.string(), // ISO date string
    updatedAt: z.string()  // ISO date string
}).strict()

export type getOneFilmResType = z.TypeOf<typeof getOneFilmRes>


const filmInList = z.object({
    id: z.string(),
    title: z.string(),
    ageRating: z.string(),
    posterUrl: z.string(),
    releaseDate: z.string()
})

export const getAllFilmRes = z.array(
    filmInList
)

export type getAllFilmResType = z.TypeOf<typeof getAllFilmRes>

