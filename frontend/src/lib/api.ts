import { Genre, Movie } from "@/types";

const isServer = typeof window === "undefined";
const API_BASE_URL = isServer
    ? process.env.INTERNAL_API_URL || "http://backend:5000" // (Inside Docker)
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"; // (In Browser)

type MoviesQuery = {
    g?: Genre | Genre[];
    q?: string;
};

// Helper to build the URL with multiple 'g' and 'q' params
const buildMoviesUrl = ({ g, q }: MoviesQuery = {}) => {
    const params = new URLSearchParams();

    if (g) {
        const genreArray = Array.isArray(g) ? g : [g];
        genreArray.forEach((g) => params.append("g", g));
    }

    if (q) {
        params.set("q", q);
    }

    const queryString = params.toString();
    return `/api/movies${queryString ? `?${queryString}` : ""}`;
};

export async function fetcherSSR<T>(url: string): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${url}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}

export const moviesApi = {
    // SSR
    getAllSSR: (params?: MoviesQuery) =>
        fetcherSSR<Movie[]>(buildMoviesUrl(params)),

    getByKeySSR: (key: string) => fetcherSSR<Movie>(`/api/movies/${key}`),
};
