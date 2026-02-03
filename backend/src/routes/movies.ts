import { Router } from "express";
import { Genre } from "../models/genre";
import Movie from "../models/movie";

const router = Router();

// Helper to generate full image URL
const getImageUrl = (req: any, img: string) => {
    //return `${req.protocol}://${req.get("host")}/images/${img}`;
    return `/images/${img}`;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - key
 *         - name
 *         - description
 *         - genres
 *         - rate
 *         - length
 *         - img
 *       properties:
 *         key:
 *           type: string
 *           example: deadpool
 *         name:
 *           type: string
 *           example: Deadpool
 *         description:
 *           type: string
 *           example: A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelrated healing powers, adopting the alter ego Deadpool.
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - action
 *               - adventure
 *               - comedy
 *               - crime
 *               - drama
 *               - biography
 *               - history
 *               - sport
 *               - mystery
 *               - thriller
 *               - scifi
 *         rate:
 *           type: number
 *           example: 8.6
 *         length:
 *           type: number
 *           example: 108
 *         img:
 *           type: string
 *           example: /images/deadpool.jpg
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     description: Returns movies matching ALL selected genres and search query.
 *     parameters:
 *       - in: query
 *         name: g
 *         description: Filter by one or more genres.
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             enum: [action, adventure, comedy, crime, drama, biography, history, sport, mystery, thriller, scifi]
 *       - in: query
 *         name: q
 *         description: Search by name.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid genre provided.
 */
router.get("/", async (req, res) => {
    // 1. Destructure BOTH 'g' and 'q'
    const { g, q } = req.query;

    const filter: any = {};

    // 2. Genre Filter Logic
    if (g) {
        const genreList = Array.isArray(g) ? (g as string[]) : [g as string];
        const isValid = genreList.every((val) =>
            Object.values(Genre).includes(val as Genre),
        );

        if (!isValid) {
            return res.status(400).json({ message: "Invalid genre provided" });
        }

        filter.genres = { $all: genreList };
    }

    // 3. Search Filter Logic (The missing part!)
    if (q && typeof q === "string") {
        // $regex: matches partial text
        // $options: "i" makes it case-insensitive
        filter.name = { $regex: q, $options: "i" };
    }

    const movies = await Movie.find(filter);

    const moviesWithUrls = movies.map((m) => {
        const movieObj = m.toObject();
        movieObj.img = getImageUrl(req, movieObj.img);
        return movieObj;
    });

    res.json(moviesWithUrls);
});

/**
 * @swagger
 * /api/movies/{key}:
 *   get:
 *     summary: Get movie by key
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *           example: deadpool
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 */
router.get("/:key", async (req, res) => {
    const movie = await Movie.findOne({ key: req.params.key });

    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    const movieObj = movie.toObject();
    movieObj.img = getImageUrl(req, movieObj.img);

    res.json(movieObj);
});

export default router;
