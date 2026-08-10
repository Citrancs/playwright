import { test, expect } from "@playwright/test";

test.describe("Home page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });
  
  test("Check sign in", async ({ page }) => {
    // Ensure the sign-in link is present on the home page
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("Validate page title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0",
    );
  })
  
  test("Grid loads with 9 items", async ({ page }) => {
    // Check the count of items displayed
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    expect(await productGrid.getByRole("link").count()).toBe(9);
  })
  
  test("Search for Thor Hammer", async ({ page }) => {
    // Search for Thor Hammer and check the result
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  })
  
});
