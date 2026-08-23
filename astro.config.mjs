import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://forgottentranslations.online',
  integrations: [sitemap()],
  // Always emit CSS as linked files, never inline <style> — the site's CSP
  // has no style-src (falls back to default-src 'self') and no unsafe-inline,
  // so an inlined stylesheet is silently dropped by the browser.
  build: {
    inlineStylesheets: 'never',
  },
});
