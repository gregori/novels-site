import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Pixel 7'] } }],
  webServer: {
    // `astro preview` daemonizes and its launching process exits immediately,
    // which Playwright reads as "server exited early" — serve the already
    // built dist/ with a plain foreground static server instead. The CSP is
    // baked into the HTML as a <meta> tag, so any static server behaves
    // identically to `astro preview` for these tests.
    command: 'npm run build && npx serve dist -l 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
