import http from "@/lib/http"
import { CinemaListSchemaType } from "@/schemaValidations/cinema.schema"
// import { getAllCinemaType, getOneCinemaType } from "@/schemaValidations/cinema.schema"



const cinemaApiRequest = {
    getAll: (controller: AbortController) => http.get<CinemaListSchemaType>(`/cinema`, { signal: controller.signal }),
    // getOne: (id: string, controller: AbortController) => http.get<getOneCinemaType>(`/cinema/${id}`, { signal: controller.signal }),

}

export default cinemaApiRequest