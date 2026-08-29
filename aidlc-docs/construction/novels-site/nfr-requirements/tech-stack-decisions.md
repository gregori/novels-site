# Tech Stack Decisions — novels-site

## Static Site Generator: Astro

**Decision**: Astro, using its native Content Collections feature for the Content Layer.

**Rationale**:

- Content Collections provide typed, schema-validated front matter out of the box — directly implements BR-5 (fail-fast build validation) and the domain model in `domain-entities.md` with minimal custom code.
- Zero-JS-by-default architecture (islands) matches NFR-2 (minimal JavaScript) — only Reading UI Runtime and Search ship client-side script.
- Built-in RSS integration (`@astrojs/rss`) and sitemap support cover FR-5 with little custom code.
- First-class TypeScript and Markdown support.
- Straightforward static output + GitHub Actions deployment to GitHub Pages, including custom domain support via a `public/CNAME` file.
- Satisfies Application Design's stated preference (application-design.md, Design Pattern Decision) for using the framework's native content-collection feature over a custom content-loading script.

**Alternative considered**: Eleventy (11ty) — simpler core, but no native typed content-collection system equivalent; would require hand-rolling front-matter validation to match BR-5, adding custom code Astro provides natively.

## Language: TypeScript

**Decision**: TypeScript for all site code (Astro components' script sections, Reading UI Runtime, Search, build scripts).

**Rationale**: Matches the user's standing global development conventions; gives compile-time safety for the domain types (`TitleMetadata`, `ChapterMetadata`, etc.) defined in `component-methods.md`, which will be concretized as TypeScript interfaces in NFR Design.

## Package Manager: npm

**Decision**: npm (`npm install`, `npm run build`, etc.), matching the user's standing convention of never using `ts-node` directly and always going through `npm run`.

## Testing: Vitest + fast-check

**Decision**: Vitest as the test runner; fast-check as the property-based testing library.

**Rationale**:

- Vitest is Vite-native, and Astro's build tooling is Vite-based — minimal configuration friction.
- fast-check is the standard PBT library for JS/TS (per PBT-09's recommended-frameworks table), integrates with Vitest directly, supports custom generators/strategies, automatic shrinking, and seed-based reproducibility — satisfying PBT-07, PBT-08, and PBT-09 for the properties identified in `business-rules.md` BR-8 (category normalization, chapter/recent-chapters sort, search matching invariants).

**Alternative considered**: Jest — more established, but requires extra ESM/Vite interop configuration that Vitest avoids by default.

## Analytics: GoatCounter

**Decision**: GoatCounter, embedded via its lightweight `count.js` snippet.

**Rationale**: Free for non-commercial/hobby projects, fully hosted (no server for the Translator to maintain, consistent with NFR-6/no owned infrastructure), no cookie consent banner required (privacy-respecting by design, satisfying NFR-4), minimal embed footprint (keeps NFR-2's minimal-JS goal intact).

**Alternative considered**: Plausible Cloud — comparable privacy properties but is a paid service; GoatCounter's free tier is sufficient for a hobby project's expected traffic.

## Comments: giscus (carried forward from requirements.md)

No new decision — confirmed compatible with the chosen stack: giscus is a static embed script requiring no server-side integration, dropped into the Chapter page template.

## Images: Astro's built-in image optimization

**Decision**: Use Astro's built-in `<Image />`/image pipeline for cover images (automatic resizing and modern-format output).

**Rationale**: Available natively in the chosen framework with minimal setup, directly satisfies the build-time optimization decision (NFR Requirements plan Q6/A) without adding a separate image-processing dependency.

## Accessibility Target

**Decision**: WCAG 2.1 Level AA as a build-time guideline (not a formal audit/certification requirement).

**Implication for Code Generation**: semantic HTML, sufficient color contrast in both light and dark themes, keyboard-operable theme/typography controls, visible focus states, and appropriate ARIA labeling where native semantics aren't sufficient (e.g., the typography panel's custom controls).
