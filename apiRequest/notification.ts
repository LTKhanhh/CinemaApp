import http from "@/lib/http1";
import { notiBodyType } from "@/schemaValidations/noti.schema";

const notificationApiRequest = {
    get: (offset: string) => http.get<notiBodyType[]>(`notification/user/?offset=${offset}`)
}

export default notificationApiRequest