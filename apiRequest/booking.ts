import http from "@/lib/http1";
import { BookingResSchemaType } from "@/schemaValidations/booking.schema";
import { seatType } from "@/schemaValidations/seat.schema";

interface bookingBody {
    showtimeId: string,
    seats: seatType[],
    bonusItems?: string,
    totalPay: string,
}

const bookingApiRequest = {
    post: (body: bookingBody) => http.post<BookingResSchemaType>(`/booking/user`, body),
}

export default bookingApiRequest