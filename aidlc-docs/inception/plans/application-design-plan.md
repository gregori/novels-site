# Application Design Plan

**Role**: Software Architect

## Execution Checklist

- [ ] Step 1: Confirm component boundaries and design approach (via questions below)
- [ ] Step 2: Generate `aidlc-docs/inception/application-design/components.md`
- [ ] Step 3: Generate `aidlc-docs/inception/application-design/component-methods.md`
- [ ] Step 4: Generate `aidlc-docs/inception/application-design/services.md`
- [ ] Step 5: Generate `aidlc-docs/inception/application-design/component-dependency.md`
- [ ] Step 6: Generate `aidlc-docs/inception/application-design/application-design.md` (consolidated)
- [ ] Step 7: Present completion message and request approval

## Proposed Component Breakdown (for confirmation)

Since this project has no runtime backend, "components" here are logical/build-time concerns rather than deployed services:

1. **Content Layer** — Markdown files + front matter (titles, chapters); the schema/conventions authors must follow
2. **Site Generator / Templating** — consumes Content Layer, renders pages (home, catalog, category, title, chapter, about)
3. **Reading UI Runtime** — client-side behavior: theme toggle, font/size/spacing controls, preference persistence
4. **Search** — client-side search index built from Content Layer metadata, plus the search UI
5. **Community & Distribution** — giscus comments integration, RSS feed generation
6. **Build & Deploy Automation** — GitHub Actions workflow orchestrating build + deploy to GitHub Pages

## Questions

### Question 1 — Component Boundaries

Does the proposed 6-component breakdown above match how you want the design organized?

A) Yes, use this breakdown as-is

B) Mostly, but merge Search into Site Generator / Templating (treat search index generation as part of the build, not a separate component)

C) Mostly, but merge Reading UI Runtime into Site Generator / Templating (treat client-side theme/typography as part of templating, not separate)

D) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 2 — Component Methods Detail Level

The static site generator framework (Astro vs. Eleventy/11ty) hasn't been chosen yet — that happens in NFR Requirements (next stage after this one). How should `component-methods.md` describe method signatures?

A) Language/framework-agnostic pseudocode (e.g., `parseFrontMatter(file) -> TitleMetadata`) — concrete typing happens later once the framework is chosen

B) Wait until after NFR Requirements to write concrete method signatures in the chosen framework's language

C) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 3 — Service Layer Interpretation

This project has no runtime backend/API — "services" would represent build-time orchestration rather than deployed services. Which interpretation should `services.md` use?

A) Build-time orchestration services only (e.g., "Site Build Service" coordinates Content Layer -> Site Generator -> output; "Feed Service" coordinates Content Layer -> RSS output) — no runtime/deployed services exist

B) Skip services.md entirely — not applicable for a static site with no service layer

C) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 4 — Component Dependency Direction

Confirm the intended data flow: Content Layer is the single source of truth, and Site Generator, Search, and Community & Distribution all read from it (one-directional, no component writes back to Content Layer at build time).

A) Confirmed — one-directional flow from Content Layer outward, no write-back

B) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 5 — Design Pattern Preference

Any preference for how the Site Generator should structure content (e.g., using the target framework's native "content collections" feature if available, vs. a fully custom content-loading script)?

A) Prefer the framework's native content-collection/content-schema feature if the chosen framework offers one (recommended — less custom code to maintain)

B) Prefer a fully custom content-loading script regardless of framework features

C) No preference — let this be decided during NFR Design once the framework is chosen

[Answer]: A
