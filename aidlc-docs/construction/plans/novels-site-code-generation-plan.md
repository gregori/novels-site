# Code Generation Plan — Unit: novels-site

**Workspace root**: `D:\novels-site` (application code here; documentation stays under `aidlc-docs/`)
**Project type**: Greenfield, single unit — Astro + TypeScript static site

## Unit Context
- **Stories implemented**: All 11 stories in `aidlc-docs/inception/user-stories/stories.md`
- **Dependencies**: None (single unit, no other services)
- **Design inputs**: `application-design/`, `functional-design/`, `nfr-requirements/`, `nfr-design/`, `infrastructure-design/` (all under `aidlc-docs/`)

## Confirmed Tech Stack (from NFR Requirements/Design)
Astro 7 (Content Layer API, `src/content.config.ts`), TypeScript, npm, Vitest + fast-check, GoatCounter, giscus, withastro/action for GitHub Pages deploy.

## Content Layer Mapping Decision
To satisfy "one folder per title, one file per chapter" (FR-1) using Astro's native Content Collections (Application Design's stated preference):
- `src/content/titles/<title-slug>/index.md` → **Title** metadata (one `titles` collection, pattern `*/index.md`)
- `src/content/titles/<title-slug>/<chapter-slug>.md` → **Chapter** content (one `chapters` collection, pattern `['*/*.md', '!*/index.md']`)

Both collections share the same `base: './src/content/titles'`, so a title's folder is the single unit of organization the Translator persona interacts with — exactly matching Story 1's acceptance criteria.

## Steps

- [x] **Step 1 — Project Structure Setup** (greenfield)
  `package.json`, `tsconfig.json`, `astro.config.mjs`, `.gitignore` (update), ESLint flat config, Prettier config, folder skeleton (`src/`, `public/`, `tests/`).
  *Traceability*: enables all stories.

- [x] **Step 2 — Content Layer & Business Logic Generation**
  `src/content.config.ts` (titles/chapters collections + Zod schemas implementing BR-1, BR-2, BR-5 required-field/status validation), `src/lib/categories.ts` (`normalizeCategory`, category derivation — BR-2), `src/lib/chapters.ts` (chapter ordering/slug — BR-3, `getRecentChapters` — BR-4), `src/lib/search.ts` (`buildSearchIndex`, `searchTitles` — BR-6).
  *Traceability*: Story 1, Story 2, Story 3, Story 4, Story 9; BR-1 to BR-6, BR-8.

- [x] **Step 3 — Business Logic Unit Testing**
  `tests/unit/categories.test.ts`, `tests/unit/chapters.test.ts`, `tests/unit/search.test.ts` — Vitest + fast-check property tests for the properties identified in BR-8 (PBT-02/03/07/08/09 scope).
  *Traceability*: BR-8, NFR Requirements (Vitest + fast-check decision).

- [x] **Step 4 — Business Logic Summary**
  `aidlc-docs/construction/novels-site/code/business-logic-summary.md`.

- [x] **Step 5 — Layout & Global Styles Generation**
  `src/layouts/BaseLayout.astro` (theme init script, CSP meta tag, GoatCounter snippet), `src/styles/global.css` (light/dark design tokens, calm typography scale, mobile-first base styles).
  *Traceability*: Story 6, Story 7; NFR Design (CSP, silent-degradation), NFR Requirements (WCAG 2.1 AA).

- [x] **Step 6 — Shared UI Components Generation**
  `src/components/SiteHeader.astro`, `SiteFooter.astro`, `SearchBox.astro`, `ThemeToggle.astro`, `TypographyPanel.astro`, `ChapterListItem.astro`, `TitleCard.astro`, `CategoryBadge.astro`, `CommentsWidget.astro` (giscus).
  *Traceability*: Story 2, Story 3, Story 4, Story 6, Story 7, Story 8; frontend-components.md.

- [x] **Step 7 — Reading UI Runtime Client Scripts**
  `src/scripts/theme.ts` (BR-7 theme logic), `src/scripts/typography.ts` (BR-7 typography logic), `src/scripts/search-client.ts` (loads `search-index.json`, wires `SearchBox`).
  *Traceability*: Story 7, Story 4; BR-6, BR-7.

- [x] **Step 8 — Frontend Unit Testing**
  `tests/unit/theme.test.ts`, `tests/unit/typography.test.ts` — test the pure preference-resolution logic (default fallback, persistence value shape) independent of the DOM.
  *Traceability*: BR-7.

- [x] **Step 9 — Pages Generation**
  `src/pages/index.astro` (Home), `src/pages/titles/index.astro` (Catalog), `src/pages/categories/index.astro`, `src/pages/categories/[category].astro`, `src/pages/titles/[title]/index.astro`, `src/pages/titles/[title]/[chapter].astro`, `src/pages/about.astro`, `src/pages/rss.xml.js`, `public/search-index.json` generation via a build-time endpoint (`src/pages/search-index.json.ts`).
  *Traceability*: Story 2, Story 3, Story 4, Story 5, Story 6, Story 8, Story 9.

- [x] **Step 10 — Frontend Summary**
  `aidlc-docs/construction/novels-site/code/frontend-summary.md`.

- [x] **Step 11 — Sample Content Creation**
  Two example titles under `src/content/titles/` (one `ongoing`, one `completed`), 2–3 chapters each, so Build & Test has real content to verify against and the Translator has a working template to copy.
  *Traceability*: Story 1 (validates the authoring convention end-to-end).

- [x] **Step 12 — Documentation Generation**
  `README.md` (project overview, local dev commands, how to add a title/chapter, how the PR build-check works per Functional Design clarification), `aidlc-docs/construction/novels-site/code/deployment-notes.md` (giscus/GoatCounter one-time setup reminders from `deployment-architecture.md`).

- [x] **Step 13 — Deployment Artifacts Generation**
  `.github/workflows/pr-build-check.yml` (build-only, per Infrastructure Design), `.github/workflows/deploy.yml` (build + deploy via `withastro/action` + `actions/deploy-pages`, per Infrastructure Design), `public/CNAME` (`forgottentranslations.online`), `public/robots.txt`.

## Database Migration Scripts
Not applicable — no database (Infrastructure Design: Storage N/A).

## Story Coverage
All 11 stories in `stories.md` are covered across Steps 2, 5–9, 13. Story 10 (auto-deploy on push) and Story 11 (analytics) are covered by Steps 13 and 5 respectively.

---
**Total steps**: 13. This plan is the single source of truth for Code Generation — execution will follow this exact sequence.
