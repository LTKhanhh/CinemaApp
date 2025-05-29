import http from "@/lib/http1"
import { seatType } from "@/schemaValidations/seat.schema"



const seatApiRequest = {
    get: (showtimeId: string, controller: AbortController) => http.get<seatType[]>(`/seat/user/${showtimeId}`, { signal: controller.signal }),

}

export default seatApiRequest