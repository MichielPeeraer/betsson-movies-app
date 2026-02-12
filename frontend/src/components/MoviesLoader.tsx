import { moviesApi } from "@/lib/api";
import { MoviesList } from "@/components/MoviesList";
import { Genre } from "@/types";
import { GlobalError } from "./GlobalError";

interface MoviesLoaderProps {
    q?: string;
    g?: Genre[];
}

export async function MoviesLoader({ q, g }: MoviesLoaderProps) {
    try {
        const movies = await moviesApi.getAllSSR({ q, g });

        if (!movies || movies.length === 0) {
            return (
                <GlobalError
                    title="No movies found"
                    desc="Try adjusting your filters or search terms."
                    icon="movie-off"
                />
            );
        }

        return <MoviesList movies={movies} />;
    } catch (error: any) {
        throw error;
    }
}
