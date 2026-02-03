import { Genre } from "@/types";

export const GENRES = [
    "action",
    "adventure",
    "comedy",
    "crime",
    "drama",
    "history",
    "biography",
    "mystery",
    "thriller",
    "scifi",
    "sport",
];

export function isValidGenre(value: unknown): value is Genre {
    return typeof value === "string" && GENRES.includes(value as Genre);
}

// Helper to capitalize (action -> Action)
export function formatGenreLabel(genre: string) {
    return genre.charAt(0).toUpperCase() + genre.slice(1);
}
