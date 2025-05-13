import http from "@/lib/http";
import { loginBodyResType, loginBodyType, registerBodyType } from "@/schemaValidations/auth.schema";
import { getPorfileType } from "@/schemaValidations/user.schema";

const authApiRequest = {
    register: (body: registerBodyType) => http.post<any>(`/auth/register`, body),
    login: (body: loginBodyType) => http.post<loginBodyResType>(`/auth/login`, body),
}

export default authApiRequest