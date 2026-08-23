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
- `frame-src https://giscus.app` (giscus renders its comment UI in an iframe)
- `connect-src 'self' https://giscus.app https://gc.zgo.at` (giscus's API calls, GoatCounter's ping)
- `img-src 'self' data: https://avatars.githubusercontent.com` (giscus renders commenter avatars from GitHub)
- No `unsafe-inline`/`unsafe-eval` — all site JS ships as bundled files, not inline scripts, per Astro's default output.

This is a best-effort hygiene measure, not a certified security control (Security Baseline extension remains not enforced per requirements.md).
