# Frontend Summary — novels-site

## Layout & Styles
- `src/layouts/BaseLayout.astro` — shared HTML shell: CSP meta tag, blocking inline theme/typography init script (FOUC prevention), SiteHeader/SiteFooter, GoatCounter snippet (silent-degradation pattern)
- `src/styles/global.css` — design tokens for light/dark themes and font-family/size/line-spacing presets, driven by `data-theme`/`data-font`/`data-font-size`/`data-line-spacing` attributes on `<html>`, mobile-first base styles

## Shared Components (`src/components/`)
`SiteHeader.astro`, `SiteFooter.astro`, `SearchBox.astro`, `ThemeToggle.astro`, `TypographyPanel.astro`, `ChapterListItem.astro`, `TitleCard.astro`, `CategoryBadge.astro`, `CommentsWidget.astro` — matches `frontend-components.md` exactly. All interactive elements carry `data-testid` attributes per the Automation-Friendly Code rule.

## Client Scripts (`src/scripts/`)
`theme.ts`, `typography.ts` (BR-7 pure preference-resolution logic + DOM application), `search-client.ts` (fetches `/search-index.json`, wraps `searchTitles` from `src/lib/search.ts`).

## Pages (`src/pages/`)
- `index.astro` — Home (recent chapters)
- `titles/index.astro` — Catalog
- `categories/index.astro`, `categories/[category].astro` — Category browsing
- `titles/[title]/index.astro` — Title page
- `titles/[title]/[chapter].astro` — Chapter reading page (with prev/next navigation and `CommentsWidget`)
- `about.astro` — About page
- `rss.xml.ts` — RSS feed endpoint (full chapter history, not limited to 10)
- `search-index.json.ts` — build-time search index endpoint consumed by `SearchBox`/`search-client.ts`

All dynamic routes use `getStaticPaths()` (fully static output, matching the GitHub Pages deployment target — no server needed).

## Accessibility Notes (WCAG 2.1 AA guideline)
- Theme toggle and typography panel use native, keyboard-operable elements (`<button>`, `<select>`, `<input type="radio">`) rather than custom widgets
- Visible focus ring defined globally (`:focus-visible`)
- Images require `alt` text (derived from title name); decorative icons marked `aria-hidden`
- Chapter navigation and search box carry `aria-label`s
