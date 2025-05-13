import http from "@/lib/http";
import { getPorfileType } from "@/schemaValidations/user.schema";

const userApiRequest = {
    getProfile: () => http.get<getPorfileType>(`/user`),
    changePassword: (body: { oldPassword: string, newPassword: string }) => http.post<any>("/user/changePassword", body)
}

export default userApiRequest