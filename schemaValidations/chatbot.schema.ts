import { z } from "zod";

const sendBody = z.object({
    response: z.string(),
    session_id: z.string()
});

export type sendBodyType = z.TypeOf<typeof sendBody>

const message = z.object({
    user: z.string(),
    bot: z.string()
})

export type messageChatbotType = z.TypeOf<typeof message>

const getBody = z.object({
    session_id: z.string(),
    messages: z.array(message)
})

export type getBodyType = z.TypeOf<typeof getBody>