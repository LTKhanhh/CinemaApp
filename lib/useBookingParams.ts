// types/bookingParams.ts
import { filmInListType } from "@/schemaValidations/film.schema";

export type BookingParams = {
    movie: string; // JSON string của FilmInListType
    id: string;
    time: string
};

// hooks/useBookingParams.ts
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';


export const useBookingParams = (): { movie: filmInListType | null; id: string, time: string } => {
    const params = useLocalSearchParams() as Partial<BookingParams>;

    const movie: filmInListType | null = useMemo(() => {
        try {
            return params.movie ? JSON.parse(params.movie) : null;
        } catch {
            return null;
        }
    }, [params.movie]);

    const id = params.id ?? "";
    const time = params.time ?? "";
    return { movie, id, time };
};

