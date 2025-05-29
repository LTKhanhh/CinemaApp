import { z } from "zod";

const messageSchema = z.object({
    conversationId: z.string(),
    sender: z.string(),
    text: z.string(),
    createdAt: z.string().datetime(), // hoặc z.string() nếu bạn không cần validate định dạng ISO
    updatedAt: z.string().datetime(),
    id: z.string()
});

export type messageSchemaType = z.TypeOf<typeof messageSchema>


const messagesSchema = z.object({
    conversationId: z.string()
}).catchall(messageSchema);

export type messagesSchemaType = z.TypeOf<typeof messagesSchema>


const sendMessBody = z.object({
    text: z.string(),
    conversationId: z.string()
})

export type sendMessBodyType = z.TypeOf<typeof sendMessBody>