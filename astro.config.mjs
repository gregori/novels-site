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
  // Astro also auto-inlines small component <script type="module"> blocks
  // straight into the HTML (no src) to cut requests. Same problem as CSS:
  // the CSP's script-src has no unsafe-inline/hash, so those get silently
  // dropped too. assetsInlineLimit: 0 forces every script (and other asset)
  // to always be emitted as its own linked file instead.
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
