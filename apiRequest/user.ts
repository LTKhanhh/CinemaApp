import http from "@/lib/http";
import { getPorfileType } from "@/schemaValidations/user.schema";

const userApiRequest = {
    getProfile: (controller: AbortController) => http.get<getPorfileType>(`/film`, { signal: controller.signal }),

}

export default userApiRequest