# NFR Requirements Plan — Unit: novels-site

## Execution Checklist

- [ ] Step 1: Confirm NFR decisions and tech stack choices (via questions below)
- [ ] Step 2: Generate `aidlc-docs/construction/novels-site/nfr-requirements/nfr-requirements.md`
- [ ] Step 3: Generate `aidlc-docs/construction/novels-site/nfr-requirements/tech-stack-decisions.md`
- [ ] Step 4: Present completion message and request approval

## Context Already Settled (not re-asked)

- No backend, no database, no authentication (requirements.md)
- Security Baseline and Resiliency Baseline: not enforced (requirements.md)
- Property-Based Testing: Partial — PBT-02, 03, 07, 08, 09 enforced (requirements.md); scoped properties already identified in business-rules.md BR-8
- Hosting: GitHub Pages, custom domain `forgottentranslations.online`, GitHub Actions build (requirements.md, execution-plan.md)
- Language/tooling default: TypeScript + npm (per the user's standing global development conventions)

## Questions

### Question 1 — Static Site Generator

Application Design deferred the exact framework choice. Given the requirements (Markdown content collections, minimal JS, calm reading UI, RSS, GitHub Pages), here is a recommendation:

A) **Astro** (recommended) — native typed Content Collections fit the front-matter schema directly, ships zero JS by default (only the Reading UI Runtime's small islands run client-side), built-in RSS/sitemap integrations, first-class TypeScript and Markdown, straightforward GitHub Pages deployment

B) **Eleventy (11ty)** — simpler/more minimal core, very mature, but no native typed content-collection system (would need a custom data-loading layer to get the same validation Functional Design requires)

C) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 2 — Testing Framework (for PBT-09 + general unit tests)

Given the recommended Astro/Vite-based toolchain, which JS/TS testing stack should be used?

A) **Vitest** (recommended) — Vite-native, fast, integrates cleanly with Astro's build tooling, pairs with **fast-check** for property-based tests (satisfies PBT-09)

B) **Jest** — more established, but needs extra config to work smoothly with Vite/Astro's ESM tooling; would still pair with fast-check

C) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 3 — Analytics Tool Selection

NFR-4 (requirements.md) called for a privacy-respecting analytics tool, exact tool deferred to this stage. Since there's no owned server infrastructure (NFR-6: resiliency not enforced, no infra to maintain), which fits best?

A) **GoatCounter** — free for non-commercial/hobby use, no server to maintain (hosted for you), no cookie banner needed, simple embed script

B) **Plausible Cloud** — paid hosted service, no server to maintain, polished dashboard

C) No analytics for now (defer/skip entirely)

D) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 4 — Accessibility Target

FR-6/NFR-3 require keyboard-operable, screen-reader-friendly reading controls. What formal accessibility target should guide Code Generation?

A) Follow WCAG 2.1 Level AA as a practical guideline (no formal audit/certification, just design/build to that bar) — recommended given the explicit typography/keyboard requirements already in scope

B) No formal target — just "reasonably accessible," judged case by case

C) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 5 — Expected Content Scale

This affects whether the Catalog/Category pages need pagination or can list everything on one page, and whether build time is a concern.

A) Small scale — a handful of titles (under ~20), each with dozens of chapters at most; a single unpaginated catalog page is fine

B) Larger scale expected over time (50+ titles) — Catalog/Category pages should be designed with pagination or lazy-loading from the start

C) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 6 — Cover Image Handling

Should cover images go through build-time optimization (resizing/format conversion, e.g., to WebP) or be used as-is from the source files?

A) Build-time optimization (recommended if using Astro — its built-in image pipeline handles this with little extra setup, keeps pages fast on mobile)

B) Use images as-is, no build-time processing (simpler, but risks large unoptimized images on mobile)

C) Other (please describe after [Answer]: tag below)

[Answer]: A
