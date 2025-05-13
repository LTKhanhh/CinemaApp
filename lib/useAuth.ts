import { useEffect, useState } from "react";

interface UseAuthOptions<T, V> {
    fn: (vars: V) => Promise<T>;
    variables?: V;
    skip?: boolean;
    deps?: any[];
}

interface UseAuthResult<T> {
    data: T | null;
    loading: boolean;
    error: any; // vẫn giữ cho các use case khác nếu cần
    refetch: () => void;
}

export function useAuth<T, V = void>({
    fn,
    variables,
    skip = false,
    deps = [],
}: UseAuthOptions<T, V>): UseAuthResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [trigger, setTrigger] = useState(0);

    const refetch = () => setTrigger((t) => t + 1);

    useEffect(() => {
        let isMounted = true;

        if (skip) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await fn(variables!);
                if (isMounted) setData(result);
            } catch (err) {
                console.warn("useAuth fetch error (suppressed):", err);
                if (isMounted) setData(null); // chỉ đơn giản clear data
                // KHÔNG gọi setError => không ảnh hưởng UI
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [trigger, skip, fn, variables, ...deps]);

    return { data, loading, error: null, refetch }; // error luôn là null trong bối cảnh này
}
