import {test, expect} from "@playwright/test";

test.describe("Order", () => {
  test.use({ storageState: ".auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("Order a product, pay later", async ({ page }) => {
    await page.getByAltText("Combination Pliers").click();
    await page.getByTestId("add-to-cart").click();
    await page.getByTestId("nav-cart").click();
    await page.getByTestId("proceed-1").click();
    await page.getByTestId("proceed-2").click();

    await page.getByTestId("postal_code").fill("12345");
    await page.getByTestId("house_number").fill("67");
    await page.getByTestId("proceed-3").click();

    await page.getByTestId("payment-method").selectOption("buy-now-pay-later");
    await page.getByTestId("monthly_installments").selectOption("3");
    await page.getByTestId("finish").click();

    await expect(page.getByTestId("payment-success-message")).toBeVisible();
    await page.getByTestId("finish").click();
    await expect(page.locator("#order-confirmation")).toContainText(
      "Thanks for your order",
    );
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("order-confirmation.png", {
      mask: [page.locator("#order-confirmation")],
    });
  });
});