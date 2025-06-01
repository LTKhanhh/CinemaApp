import http from "@/lib/http1";
import { loginBodyResType, loginBodyType, registerBodyType } from "@/schemaValidations/auth.schema";
import { getPorfileType } from "@/schemaValidations/user.schema";

interface demo {
    bookingId: string,
    status: string,
}
const paymentApiRequest = {
    demo: (body: demo) => http.post<any>(`/payment/user/demo`, body),

}

export default paymentApiRequest