# Application Design — Consolidated

This document consolidates `components.md`, `component-methods.md`, `services.md`, and `component-dependency.md` for this project. See those files for full detail; this is the single-page summary.

## Scope Note
This project has no runtime backend or deployed services. "Application design" here means: the boundaries of a static site's build-time content pipeline and its client-side runtime behavior.

## Components (see components.md)
1. **Content Layer** — Markdown + front matter, source of truth
2. **Site Generator / Templating** — renders all pages from Content Layer
3. **Reading UI Runtime** — client-side theme/typography controls and persistence
4. **Search** — build-time index + client-side search widget
5. **Community & Distribution** — giscus comments + RSS feed
6. **Build & Deploy Automation** — GitHub Actions -> GitHub Pages

## Methods (see component-methods.md)
Framework-agnostic pseudocode signatures defined for each component; concrete typing deferred to NFR Requirements/Design once the static site generator is chosen. Detailed business rules deferred to Functional Design.

## Services (see services.md)
Two build-time orchestration services, no runtime services:
- **Site Build Service**: Content Layer -> Site Generator -> Search index -> RSS -> static output
- **Deploy Service**: static output -> GitHub Pages (with custom domain)

## Component Dependencies (see component-dependency.md)
One-directional data flow: Content Layer feeds Site Generator, Search, and Community & Distribution; all feed Build & Deploy Automation; which publishes to GitHub Pages. Reading UI Runtime and giscus/search widgets run client-side in the reader's browser.

## Design Pattern Decision
Per Application Design plan Q5/A: the Site Generator should use the chosen framework's native content-collection/content-schema feature (if available) rather than a fully custom content-loading script, to minimize custom code to maintain. This will be confirmed against the actual framework capabilities during NFR Requirements/NFR Design.

## Carried Forward to Next Stages
- **Functional Design**: detailed front-matter schema/validation rules, category taxonomy rules, chapter ordering rules, PBT property identification for `parseTitleFrontMatter`/`parseChapterFrontMatter` (round-trip/invariant properties per PBT-02/PBT-03)
- **NFR Requirements**: static site generator selection (Astro vs. Eleventy/11ty), search library selection, analytics tool selection
- **NFR Design**: concrete method signatures, theming/typography implementation approach, search and comments/RSS integration patterns in the chosen framework
- **Infrastructure Design**: GitHub Actions workflow, GitHub Pages settings, `CNAME`/DNS for `forgottentranslations.online`
