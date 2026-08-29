# Requirements Document — Novels Site

## Intent Analysis Summary

- **User Request**: Build a static frontend/site to publish personal Japanese-to-English translations of webnovels/light novels, replacing an existing Blogspot blog. Content authored as Markdown files organized in per-title folders, with category tagging, a calm reading-focused design, light/dark theme, reader-adjustable typography, and mobile-first layout. Must be deployable on GitHub Pages.
- **Request Type**: New Project (Greenfield)
- **Scope Estimate**: System-wide (entire new site: content pipeline, navigation, theming, deployment)
- **Complexity Estimate**: Moderate (static site generator + build automation + custom reading UI, no backend/database)

## Functional Requirements

### FR-1: Content Authoring

- Content is authored as Markdown files, one folder per title, one Markdown file per chapter (e.g., `content/title-slug/chapter-01.md`).
- Each title folder has a metadata/front matter definition including: title, original author, categories/tags, status (ongoing/completed/paused), synopsis, cover image, and translation credits/disclaimer (e.g., link to the original work, fan-translation notice).
- Each chapter file includes its own front matter (chapter number/title, publish date) and body content in Markdown.

### FR-2: Site Structure & Navigation

- **Home page**: highlights/recently updated chapters.
- **Catalog page**: full list of titles.
- **Category browse page**: list of categories, each showing titles tagged with it.
- **Title page**: shows title metadata (synopsis, cover, status, disclaimer) and its chapter list.
- **Chapter reading page**: renders the translated chapter content.
- **About page**: information about the translator and general disclaimer/contact.

### FR-3: Search

- Client-side (no backend) search across titles and authors, usable entirely on GitHub Pages static hosting.

### FR-4: Reader Comments

- Comments on chapter pages via a GitHub-Discussions-backed embeddable widget (e.g., giscus). Requires the site's repository to be public.

### FR-5: Content Updates Feed

- An RSS feed is generated automatically listing newly published chapters.

### FR-6: Reading Preferences

- Readers can adjust: theme (light/dark), font family, font size, and line/paragraph spacing.
- Preferences persist across visits via browser `localStorage`.
- Theme additionally respects the OS/browser preference as the initial default when no stored preference exists.

### FR-7: Content Language

- Both the site UI (menus, buttons, fixed text) and the translated chapter content are in English.
- Pages declare `lang="en"`.

### FR-8: Content Migration (Deferred)

- Existing Blogspot posts will be migrated into the new Markdown structure as a separate follow-up effort after the site is functional. Not part of this initial build.

## Non-Functional Requirements

### NFR-1: Hosting & Deployment

- Must be fully served as a static site compatible with GitHub Pages.
- Deployed via an automated build (GitHub Actions) that builds the static site from Markdown source and publishes to GitHub Pages on push.
- Served under a custom domain: `forgottentranslations.online` (GitHub Pages `CNAME` configuration required).

### NFR-2: Performance

- Minimal JavaScript; content pages should be fast-loading and lightweight, consistent with a static-first architecture.

### NFR-3: Accessibility & Usability

- Mobile-first responsive layout.
- Calm, reading-focused visual design.
- Typography controls (font/size/spacing) must be usable via keyboard and screen-reader friendly controls.

### NFR-4: Analytics

- A lightweight, privacy-respecting analytics tool (e.g., Plausible, GoatCounter, or self-hosted Umami) may be integrated; exact tool selection deferred to the technical/NFR design stage.

### NFR-5: Security

- Security Baseline extension: **not enforced** (static content site, no backend, no user data, no authentication).

### NFR-6: Resiliency

- Resiliency Baseline extension: **not enforced** (no owned infrastructure; hosting/availability is delegated to GitHub Pages).

### NFR-7: Testing

- Property-Based Testing extension: **Partial enforcement** — only rules PBT-02 (round-trip), PBT-03 (invariants), PBT-07 (generator quality), PBT-08 (shrinking/reproducibility), and PBT-09 (framework selection) apply, scoped to pure functions such as front-matter parsing and content-list generation. Other PBT rules (stateful testing, oracle testing, etc.) are not applicable given the site has no stateful or algorithmic components.

## Deferred Technical Decisions

The following are intentionally left open for the Application Design / NFR Requirements stages, since they don't block requirements approval:

- Exact static site generator/framework choice (candidates: Astro, Eleventy/11ty) — user approved the general direction of "modern static site generator with GitHub Actions build," final selection to happen during technical design.
- Exact analytics tool selection (Plausible vs GoatCounter vs Umami).
- Exact client-side search library/approach.

## Key Assumptions

- The site's GitHub repository is public (required for giscus/GitHub Discussions-based comments).
- The user already owns and controls DNS for `forgottentranslations.online` and can add the DNS records GitHub Pages requires for a custom domain.
- No user accounts, authentication, or backend database are in scope.
