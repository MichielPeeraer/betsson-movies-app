import { moviesApi } from "@/lib/api";
import { MoviesList } from "@/components/MoviesList";
import { Genre } from "@/types";
import { GlobalError } from "./GlobalError";
import { IconMovieOff } from "@tabler/icons-react";

export async function MoviesLoader({ q, g }: { q?: string; g?: Genre[] }) {
    try {
        const movies = await moviesApi.getAllSSR({ q, g });

        if (!movies || movies.length === 0) {
            return (
                <GlobalError
                    title="No movies found"
                    desc="Try adjusting your filters or search terms."
                    Icon={IconMovieOff}
                />
            );
        }

        return <MoviesList movies={movies} />;
    } catch (error: any) {
        throw error;
    }
}
