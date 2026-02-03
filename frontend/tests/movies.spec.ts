import { test, expect, Locator } from "@playwright/test";

const BASE_URL = "http://localhost:3000";
const BACKEND_URL = "http://localhost:5000";

// Selectors
const UI = {
    card: ".movie-card",
    title: ".movie-title",
    genre: ".movie-genre",
    image: "img",
};

/** * Helper to verify a movie card contains all expected genres
 */
async function expectMovieToHaveGenres(
    card: Locator,
    expectedGenres: string[],
) {
    const badgeTexts = await card.locator(UI.genre).allTextContents();
    const actualGenres = badgeTexts.map((g) => g.toLowerCase().trim());

    for (const genre of expectedGenres) {
        expect(actualGenres).toContain(genre.toLowerCase());
    }
}

test.describe("betssonMovies App E2E", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test("should display movies with correct backend image paths", async ({
        page,
    }) => {
        const firstImage = page.locator(`${UI.card} ${UI.image}`).first();
        await expect(firstImage).toBeVisible();

        const imgSrc = await firstImage.getAttribute("src");
        expect(imgSrc).toContain(BACKEND_URL);
    });

    test("should filter by multiple genres (AND logic)", async ({ page }) => {
        const genres = ["action", "adventure"];
        const params = new URLSearchParams();
        genres.forEach((g) => params.append("g", g));

        await page.goto(`${BASE_URL}/?${params.toString()}`);

        const firstCard = page.locator(UI.card).first();
        await expect(firstCard).toBeVisible();
        await expectMovieToHaveGenres(firstCard, genres);
    });

    test("should handle complex filtering regardless of param order", async ({
        page,
    }) => {
        const testCases = [
            "g=action&g=adventure&q=deadpool",
            "q=deadpool&g=adventure&g=action",
        ];

        for (const queryString of testCases) {
            await page.goto(`${BASE_URL}/?${queryString}`);

            const title = page.locator(UI.title);
            await expect(title).toContainText("Deadpool", { ignoreCase: true });
            await expect(page.locator(UI.card)).toHaveCount(1);

            // Also verify the genres match even in the combined search
            await expectMovieToHaveGenres(page.locator(UI.card).first(), [
                "action",
                "adventure",
            ]);
        }
    });
});
