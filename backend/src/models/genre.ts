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
] as const;

export type Genre = (typeof GENRES)[number];
