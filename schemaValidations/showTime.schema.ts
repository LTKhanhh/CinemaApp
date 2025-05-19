import { z } from "zod";

export const showTime = z.object({
    hour: z.number(),
    minute: z.number(),
    id: z.string(),
    time: z.string(),
    seats: z.number()
})

export type showTimeType = z.TypeOf<typeof showTime>

// 2. Định nghĩa schema cho kết quả trả về
export const getShowTimeByFilm = (z.record(z.string(), z.array(showTime)));

export type getShowTimeByFilmType = z.TypeOf<typeof getShowTimeByFilm>

export const filmInShowTimeCinema = z.object({
    title: z.string(),
    ageRating: z.string(),
    posterUrl: z.string().url(),
    trailerUrl: z.string().url(),
    duration: z.number(),
    genres: z.array(z.string()),
});

export type filmInShowTimeCinemaType = z.TypeOf<typeof filmInShowTimeCinema>

export const getShowTimeByCinema = z.object({
    // Mỗi key là ID phim, mỗi value là mảng suất chiếu
    films: z.record(z.string(), filmInShowTimeCinema),

    // Các key khác (ngoài "films") là các ID phim, value là danh sách suất chiếu
}).catchall(z.array(showTime));

export type getShowTimeByCinemaType = z.TypeOf<typeof getShowTimeByCinema>