import request from "supertest";
import app from "../src/app";

describe("Movies API (integration)", () => {
    describe("GET /api/movies", () => {
        it("returns a list of movies", async () => {
            const res = await request(app).get("/api/movies");

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);

            const movie = res.body[0];
            expect(movie).toEqual(
                expect.objectContaining({
                    key: expect.any(String),
                    name: expect.any(String),
                    genres: expect.any(Array),
                    rate: expect.any(Number),
                    length: expect.any(Number),
                }),
            );
        });

        it("filters movies by a single genre", async () => {
            const res = await request(app).get("/api/movies?g=action");

            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);

            res.body.forEach((movie: any) => {
                expect(
                    movie.genres.map((g: string) => g.toLowerCase()),
                ).toContain("action");
            });
        });

        it("filters movies by multiple genres using AND logic", async () => {
            // Testing both Action AND Adventure
            const res = await request(app).get(
                "/api/movies?g=action&g=adventure",
            );

            expect(res.status).toBe(200);

            // If your seed data has a movie with both, expect results
            // Otherwise, we just verify the logic on whatever is returned
            res.body.forEach((movie: any) => {
                const normalizedGenres = movie.genres.map((g: string) =>
                    g.toLowerCase(),
                );
                expect(normalizedGenres).toContain("action");
                expect(normalizedGenres).toContain("adventure");
            });
        });

        it("combines search query and multiple genres", async () => {
            const res = await request(app).get(
                "/api/movies?q=deadpool&g=action&g=adventure",
            );

            expect(res.status).toBe(200);

            res.body.forEach((movie: any) => {
                expect(movie.name.toLowerCase()).toContain("deadpool");
                const normalizedGenres = movie.genres.map((g: string) =>
                    g.toLowerCase(),
                );
                expect(normalizedGenres).toContain("action");
                expect(normalizedGenres).toContain("adventure");
            });
        });
    });

    describe("GET /api/movies/:key", () => {
        it("returns a single movie by key", async () => {
            const res = await request(app).get("/api/movies/deadpool");

            expect(res.status).toBe(200);
            expect(res.body).toEqual(
                expect.objectContaining({
                    key: "deadpool",
                    name: expect.any(String),
                    genres: expect.arrayContaining(["action"]),
                }),
            );
        });

        it("returns 404 when movie does not exist", async () => {
            const res = await request(app).get("/api/movies/does-not-exist");

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty("message");
        });
    });
});
