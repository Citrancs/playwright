import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'How to open the HTML test' }).click();
  await expect(page.getByRole('img', { name: 'HTML Report' })).toBeVisible();
});