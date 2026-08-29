# Build Instructions

## Prerequisites

- **Build Tool**: Astro 7.2.4 (static site generator), Node.js
- **Node.js**: v24 (CI pins `node-version: 24` in `.github/workflows/pr-build-check.yml`; local dev used v24.1.0)
- **Package Manager**: npm
- **Dependencies**: see `package.json` (Astro, `@astrojs/rss`, `@astrojs/sitemap`; dev: `@astrojs/check`, TypeScript, Vitest, fast-check, ESLint, Prettier)
- **Environment Variables**: none required
- **System Requirements**: no special OS/memory/disk requirements — static site build

## Build Steps

### 1. Install Dependencies

```bash
npm install
```

CI uses `npm ci` (see `.github/workflows/pr-build-check.yml` and `deploy.yml`).

### 2. Configure Environment

No environment configuration needed — the site has no backend, no secrets, no runtime env vars.

### 3. Build All Units

```bash
npm run build
```

This runs `astro check && astro build`: type-checks Astro/TypeScript files first (fail-fast per BR-5), then produces the static production build.

### 4. Verify Build Success

- **Expected Output**: `astro check` reports `0 errors`; `astro build` reports `N page(s) built` and `Complete!`
- **Build Artifacts**: static site output in `dist/` (HTML pages, `rss.xml`, `search-index.json`, `sitemap-index.xml`, optimized images under `dist/_astro/`)
- **Common Warnings**: `astro check` may emit non-blocking hints (e.g. `is:inline` script directive hint on `CommentsWidget.astro`) — these do not fail the build. An `eslint.config.mjs` deprecation warning from `tseslint.config` is also expected and non-blocking.

## Troubleshooting

### Build Fails with Dependency Errors

- **Cause**: `npm install` can fail with `ERESOLVE` if `typescript`'s version doesn't satisfy `@astrojs/check`'s peer dependency range (`^5.0.0 || ^6.0.0`). As of this build, `@astrojs/check@0.9.10` does not yet support TypeScript 7.
- **Solution**: keep `typescript` pinned to the latest `^6.x` release (currently `^6.0.3`) until `@astrojs/check` publishes TS 7 support. Do not use `--legacy-peer-deps`/`--force` to bypass — that resolution warning reflects a real incompatibility, not npm being overly strict.

### Build Fails with Compilation/Type Errors

- **Cause**: invalid content-collection front-matter, or a TypeScript type error in `src/`.
- **Solution**: run `npm run build` locally, read the `astro check` diagnostic (file:line + message), fix the source, rerun until `0 errors`.
