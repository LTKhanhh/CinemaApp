import http from "@/lib/http1";
import { BookingResSchemaType, GetOneBookingResSchemaType } from "@/schemaValidations/booking.schema";
import { seatType } from "@/schemaValidations/seat.schema";

interface bookingBody {
    showtimeId: string,
    seats: seatType[],
    bonusItems?: string,
    totalPay: string,
}

const bookingApiRequest = {
    post: (body: bookingBody) => http.post<BookingResSchemaType>(`/booking/user`, body),
    getAll: () => http.get<BookingResSchemaType[]>(`/booking/user`),
    getOne: (id: string) => http.get<GetOneBookingResSchemaType>(`/booking/user/booking=${id}`)
}

export default bookingApiRequest