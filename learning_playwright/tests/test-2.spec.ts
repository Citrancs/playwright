import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('button', { name: 'Az összes elfogadása' }).click();
  await page.getByRole('button', { name: 'Jó napom van' }).click();
  await page.getByRole('button', { name: 'OK, got it' }).click();
  await expect(page.getByRole('link', { name: 'World Cup 2026: A Celebration' })).toBeVisible();
});