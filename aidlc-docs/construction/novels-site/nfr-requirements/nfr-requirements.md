# NFR Requirements — novels-site

## Scalability

- Content scale is small (under ~20 titles, dozens of chapters each) — no pagination/lazy-loading required for Catalog/Category pages at launch. If content grows well beyond this, pagination can be added later without a schema change (deferred, not built now — avoids overengineering for current scale).
- Build performance: not a concern at this scale; a full static rebuild on every push is acceptable.

## Performance

- Minimal JavaScript: only the Reading UI Runtime (theme/typography controls + persistence) and the Search widget ship client-side script; everything else is static HTML/CSS.
- Cover images go through build-time optimization (resizing/modern format conversion) so mobile page weight stays low.

## Availability

- Delegated entirely to GitHub Pages; no owned infrastructure, no uptime SLA is meaningful to define (Resiliency Baseline not enforced per requirements.md).

## Security

- Not enforced (Security Baseline opted out per requirements.md) — static content site, no backend, no user data, no authentication.

## Reliability

- Build validation is fail-fast (BR-5): a broken build never silently deploys broken content.
- Failure visibility: GitHub Actions surfaces build/deploy failures directly in the repo's Actions tab and via GitHub's own notification/email system — no separate alerting infrastructure needed.

## Maintainability

- **Testing**: Vitest as the test runner, paired with **fast-check** for property-based tests, satisfying PBT-09 (framework selection) for the properties identified in business-rules.md BR-8.
- **E2E testing**: added post-launch (not in original scope) after the production CSP was found to silently break client-side interactivity — Astro auto-inlines both small `<style>` and small `<script type="module">` blocks, and the CSP's `default-src 'self'` (no `unsafe-inline`) drops both without any visible error to a casual user. Playwright runs against the real production build (`dist/` served statically, CSP meta tag active — not `astro dev`, which never enforces the policy) so this class of bug is caught automatically. Covers theme toggle persistence, the reading-settings panel, titles-page layout, and comments-widget sizing. Wired into `pr-build-check.yml`.
- **Type safety**: TypeScript throughout, including Astro's typed Content Collections for front-matter validation (ties directly to BR-5's fail-fast build validation).
- **Code style**: Prettier for formatting, ESLint for linting (per the user's standing global development conventions).

## Usability / Accessibility

- Target: WCAG 2.1 Level AA as a practical build guideline (no formal audit/certification) — covers the keyboard-operable, screen-reader-friendly reading controls already required by FR-6/NFR-3.
- Mobile-first responsive layout (already required by NFR-3).

## Tech Stack Selection Summary

See `tech-stack-decisions.md` for the full rationale. Headline decisions:

- **Static site generator**: Astro
- **Language**: TypeScript
- **Package manager**: npm
- **Testing**: Vitest + fast-check
- **Analytics**: GoatCounter
- **Comments**: giscus (already decided in requirements.md)
- **Images**: Astro's built-in image optimization pipeline
