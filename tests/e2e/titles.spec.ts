import { test, expect } from '@playwright/test';

test('titles page lists each title as a cover + title + author + status card', async ({ page }) => {
  await page.goto('/titles/');

  const cards = page.getByTestId('title-card');
  await expect(cards).toHaveCount(2);

  const first = cards.first();
  await expect(first.locator('img')).toBeVisible();
  await expect(first.getByTestId('title-card-link')).toBeVisible();

  // BR: cover and text sit side by side as a row, not stacked full-width blocks.
  const box = await first.boundingBox();
  const imgBox = await first.locator('img').boundingBox();
  expect(imgBox!.width).toBeLessThan(box!.width * 0.6);
});
