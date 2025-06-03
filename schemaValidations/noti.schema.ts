import { z } from "zod"

const notiBody = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    type: z.string()
})

export type notiBodyType = z.TypeOf<typeof notiBody>