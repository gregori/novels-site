import { test, expect } from '@playwright/test';

test('reading settings panel changes the chapter text size and font family', async ({ page }) => {
  await page.goto('/titles/gariben-kun-to-uraaka-san/chapter-01/');

  const reading = page.locator('.reading-content');
  const initialSize = await reading.evaluate((el) => getComputedStyle(el).fontSize);
  const initialFamily = await reading.evaluate((el) => getComputedStyle(el).fontFamily);

  await page.getByTestId('typography-panel').locator('summary').click();
  await page.getByTestId('font-size-xl').check();
  await page.getByTestId('font-family-select').selectOption('sans');

  await expect(reading).not.toHaveCSS('font-size', initialSize);
  const newFamily = await reading.evaluate((el) => getComputedStyle(el).fontFamily);
  expect(newFamily).not.toBe(initialFamily);
  expect(newFamily).toContain('system-ui');

  await page.reload();
  await expect(page.getByTestId('font-size-xl')).toBeChecked();
});
