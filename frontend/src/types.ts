export type Genre =
    | "action"
    | "adventure"
    | "comedy"
    | "crime"
    | "drama"
    | "history"
    | "biography"
    | "mystery"
    | "thriller"
    | "scifi"
    | "sport";

export interface Movie {
    key: string;
    name: string;
    description: string;
    genres: Genre[];
    rate: number;
    length: number;
    img: string;
}
