import http from "@/lib/http1";
import { loginBodyResType, loginBodyType, registerBodyType } from "@/schemaValidations/auth.schema";
import { messagesSchemaType, sendMessBodyType } from "@/schemaValidations/chat.schema";
import { getPorfileType } from "@/schemaValidations/user.schema";

const chatApiRequest = {
    get: (offset: string) => http.get<messagesSchemaType>(`chat/message/user/?offset=${offset}`),
    send: (body: sendMessBodyType) => http.post<any>(`chat/message/user/`, body),
}

export default chatApiRequest