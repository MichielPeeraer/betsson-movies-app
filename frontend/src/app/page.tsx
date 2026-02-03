import { Metadata } from "next";
import { Overview } from "@/components/Overview";
import { MoviesLoader } from "@/components/MoviesLoader";
import { isValidGenre, formatGenreLabel } from "@/lib/genres";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getSanitizedParams(params: PageProps["searchParams"]) {
    const p = await params;
    const q = typeof p.q === "string" ? p.q.trim() : undefined;
    const g = p.g;

    const validGenres = [p.g].flat().filter(isValidGenre);

    return { q, validGenres };
}

export async function generateMetadata({
    searchParams,
}: PageProps): Promise<Metadata> {
    const { q, validGenres } = await getSanitizedParams(searchParams);

    let title = "Explore Movies";

    if (q && validGenres.length > 0) {
        title = `"${q}" in ${validGenres.map(formatGenreLabel).join(", ")}`;
    } else if (q) {
        title = `Search: ${q}`;
    } else if (validGenres.length > 0) {
        title = validGenres.map(formatGenreLabel).join(", ");
    }

    return {
        title,
        description: `Browse movies. Currently viewing ${title}.`,
    };
}

export default async function HomePage({ searchParams }: PageProps) {
    const { q, validGenres } = await getSanitizedParams(searchParams);

    return (
        <Overview genreList={validGenres} searchQuery={q}>
            <MoviesLoader q={q} g={validGenres} />
        </Overview>
    );
}
