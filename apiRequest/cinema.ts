import http from "@/lib/http"
import { getAllCinemaType, getOneCinemaType } from "@/schemaValidations/cinema.schema"



const cinemaApiRequest = {
    getAll: (controller: AbortController) => http.get<getAllCinemaType>(`/cinema`, { signal: controller.signal }),
    getOne: (id: string, controller: AbortController) => http.get<getOneCinemaType>(`/cinema/${id}`, { signal: controller.signal }),

}

export default cinemaApiRequest