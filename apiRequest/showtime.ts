import http from "@/lib/http"
import { getShowTimeByCinemaType, getShowTimeByFilmType } from "@/schemaValidations/showTime.schema"



const showtimeApiRequest = {
    getByFilm: (filmId: string, page: number, controller: AbortController) => http.get<getShowTimeByFilmType>(`/showtime/user/film=${filmId}?page=${page}`, { signal: controller.signal }),
    getByCinema: (cinemaId: string, page: number, controller: AbortController) => http.get<getShowTimeByCinemaType>(`/showtime/user/cinema=${cinemaId}?page=${page}`, { signal: controller.signal }),


}

export default showtimeApiRequest