"use client";
import { Movie } from "@/types";
import { SimpleGrid } from "@mantine/core";
import { MovieCard } from "@/components/MovieCard";

interface MoviesListProps {
    movies: Movie[];
}

export function MoviesList({ movies }: MoviesListProps) {
    return (
        <SimpleGrid
            cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
            spacing="lg"
            mt="lg"
        >
            {movies.map((movie) => (
                <MovieCard key={movie.key} movie={movie} />
            ))}
        </SimpleGrid>
    );
}
