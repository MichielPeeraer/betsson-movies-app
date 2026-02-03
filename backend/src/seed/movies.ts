import Movie from "../models/movie";
import moviesData from "../../data/movie.mock-data.json";

export const seedMovies = async () => {
    await Movie.deleteMany({});
    await Movie.insertMany(moviesData);
};
