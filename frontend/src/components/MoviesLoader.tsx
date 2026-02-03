import { moviesApi } from "@/lib/api";
import { MoviesList } from "@/components/MoviesList";
import { Genre } from "@/types";
import { Text, Center, Stack, Button } from "@mantine/core";
import { IconMovieOff, IconServerOff } from "@tabler/icons-react";

export function NoMoviesFound() {
    return (
        <Center h="60vh" w="100%">
            <Stack align="center" gap="xs">
                <IconMovieOff
                    size={48}
                    stroke={1.5}
                    color="var(--mantine-color-dimmed)"
                />
                <Text size="xl" fw={700}>
                    No movies found
                </Text>
                <Text size="sm" c="dimmed" ta="center">
                    Try adjusting your filters or search terms.
                </Text>
            </Stack>
        </Center>
    );
}

export function NoConnection() {
    return (
        <Center h="60vh" w="100%">
            <Stack align="center" gap="xs">
                <IconServerOff
                    size={48}
                    stroke={1.5}
                    color="var(--mantine-color-red-6)"
                />
                <Text size="xl" fw={700}>
                    Unable to reach the server
                </Text>
                <Text size="sm" c="dimmed" ta="center" maw={400}>
                    The backend might be offline. Please check your connection
                    or try again later.
                </Text>
            </Stack>
        </Center>
    );
}

export async function MoviesLoader({ q, g }: { q?: string; g?: Genre[] }) {
    try {
        const movies = await moviesApi.getAllSSR({ q, g });

        if (!movies || movies.length === 0) {
            return <NoMoviesFound />;
        }

        return <MoviesList movies={movies} />;
    } catch (error) {
        return <NoConnection />;
    }
}
