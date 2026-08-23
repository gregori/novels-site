# NFR Design Patterns — novels-site

## Resilience Pattern: Silent Degradation for Third-Party Embeds

**Decision** (plan Q1/A): giscus (comments) and GoatCounter (analytics) must never block or break the rest of the page if they fail to load.

**Pattern**:
- Both scripts are loaded as independent, non-blocking `<script>` tags (`async`/`defer`), never awaited by any other page logic.
- Neither script's failure is caught or reported to the reader — this is the browser's natural behavior for a blocked/failed external script tag (no extra error-handling code needed), which is exactly what "fail silently" requires.
- The comments widget occupies a normal content area of the Chapter page; if giscus's iframe never mounts, that area is simply empty — no reserved error state, no layout shift needed since giscus lazy-loads into its own container.
- The Reading UI Runtime (theme/typography) and Search have zero dependency on either third-party script — they must keep working even if both are blocked.

## Performance Pattern: Default HTTP Caching, No Service Worker

**Decision** (plan Q2/A): rely on GitHub Pages' default caching headers and the browser's native HTTP cache; no service worker, no offline mode.

**Pattern**:
- Astro's production build fingerprints static asset filenames (content-hashed), so redeploys naturally invalidate stale cached assets without needing custom cache-busting logic.
- HTML pages are served with GitHub Pages' default (short/no-cache) headers, so readers always get the latest content on navigation; hashed assets (CSS/JS/images) can be cached aggressively by the browser since their URL changes whenever their content changes.
- No service worker is registered — avoids the added complexity of cache invalidation across deploys and the risk of readers being stuck on a stale cached version after a content update.

## Security Pattern: Lightweight Content-Security-Policy

**Decision** (plan Q3/A): add a basic CSP via a `<meta http-equiv="Content-Security-Policy">` tag (GitHub Pages doesn't support custom HTTP response headers, so a meta tag is the only available mechanism).

**Pattern** (finalized exact origins during Code Generation once GoatCounter's account subdomain is known):
- `default-src 'self'`
- `script-src 'self' https://giscus.app https://gc.zgo.at` (GoatCounter's default script host; adjust if a custom subdomain is used)
- `style-src 'self' https://giscus.app` (giscus's client.js loads its own `default.css` into the parent document, not just its iframe)
- `frame-src https://giscus.app` (giscus renders its comment UI in an iframe)
- `connect-src 'self' https://giscus.app https://gc.zgo.at` (giscus's API calls, GoatCounter's ping)
- `img-src 'self' data: https://avatars.githubusercontent.com` (giscus renders commenter avatars from GitHub)
- No `unsafe-inline`/`unsafe-eval`. This requires more than "don't hand-write inline scripts" — Astro's own build optimizations auto-inline small `<style>` blocks (always in dev, and per-component in prod) and small `<script type="module">` blocks the same way, silently, with no error. `astro.config.mjs` must force both off (`build.inlineStylesheets: 'never'`, `vite.build.assetsInlineLimit: 0`) or this CSP silently breaks the site's own styling and interactivity. Learned the hard way post-launch (see Build and Test docs); any future config change touching Vite/Astro's build output must re-verify this against a real production build with the CSP active, not `astro dev` (which never enforces the policy).
- The one script that must render before first paint (the theme/typography FOUC-prevention bootstrap) can't be a normal Astro-processed script either — it lives at `public/theme-init.js` and is referenced via `<script is:inline src="/theme-init.js">`, which is Astro's documented way to pass an external `public/` asset through untouched (same-origin, satisfies `script-src 'self'`, and stays render-blocking since it has no `type="module"`/`async`/`defer`).

This is a best-effort hygiene measure, not a certified security control (Security Baseline extension remains not enforced per requirements.md).
