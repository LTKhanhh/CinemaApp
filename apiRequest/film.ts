import http from "@/lib/http"
import { getAllFilmResType, getOneFilmResType } from "@/schemaValidations/film.schema"



const filmApiRequest = {
    getAll: (controller: AbortController) => http.get<getAllFilmResType>(`/film`, { signal: controller.signal }),
    getOne: (id: string, controller: AbortController) => http.get<getOneFilmResType>(`/film/${id}`, { signal: controller.signal }),

}

export default filmApiRequest