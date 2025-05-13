import { z } from "zod"


export const registerBody = z.object({
    email: z.string(),
    password: z.string(),
    birthday: z.string(),
    name: z.string()
}).strict()

export type registerBodyType = z.TypeOf<typeof registerBody>

export const loginBody = z.object({
    email: z.string(),
    password: z.string(),

}).strict()

export type loginBodyType = z.TypeOf<typeof loginBody>

export const loginBodyRes = z.object({
    message: z.string(),
    data: z.object({
        accessToken: z.string(),
        refreshToken: z.string(),
        name: z.string()
    })

}).strict()

export type loginBodyResType = z.TypeOf<typeof loginBodyRes>

export const refreshTokenRes = z.object({
    message: z.string(),
    data: z.object({
        accessToken: z.string(),
        refreshToken: z.string(),
    })
}).strict()

export type refreshTokenResType = z.TypeOf<typeof refreshTokenRes>
