import { test, expect } from '@playwright/test';

test('theme toggle switches the page between light and dark and persists across reload', async ({ page }) => {
  await page.goto('/');

  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'light');
  const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

  await page.getByTestId('theme-toggle-button').click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(darkBg).not.toBe(lightBg);

  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'dark');
});
