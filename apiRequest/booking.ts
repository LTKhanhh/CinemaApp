import http from "@/lib/http1";
import { seatType } from "@/schemaValidations/seat.schema";

interface bookingBody {
    showtimeId: string,
    seats: seatType[],
    bonusItems?: string,
    totalPay: string,
}

const bookingApiRequest = {
    post: (body: bookingBody) => http.post<any>(`/booking/user`, body),
}

export default bookingApiRequest