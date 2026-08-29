import { test, expect } from '@playwright/test';

test('comments widget spans the reading column width, not a cramped default iframe box', async ({
  page,
}) => {
  await page.goto('/titles/gariben-kun-to-uraaka-san/chapter-01/');

  const widget = page.getByTestId('comments-widget');
  await expect(widget).toBeVisible();

  const widgetBox = await widget.boundingBox();
  const readingBox = await page.locator('.reading-content, main').first().boundingBox();
  // Container itself must not be the old unstyled default (roughly a third of the page).
  expect(widgetBox!.width).toBeGreaterThan(readingBox!.width * 0.9);

  const iframe = widget.locator('iframe.giscus-frame');
  if (await iframe.count()) {
    const iframeBox = await iframe.boundingBox();
    expect(iframeBox!.width).toBeGreaterThan(widgetBox!.width * 0.9);
  }
});
