# Business Logic Summary — novels-site

## Content Layer
- `src/content.config.ts` — two Astro Content Collections sharing `base: './src/content/titles'`:
  - `titles`: loader pattern `*/index.md`, schema implements BR-1 (status enum), BR-2 (non-empty category strings), and all required fields from `domain-entities.md`
  - `chapters`: loader pattern `['*/*.md', '!*/index.md']`, schema implements required chapter fields
  - Astro's schema validation IS the BR-5 fail-fast build-validation mechanism — an invalid/missing field fails `astro check`/`astro build` with a file-specific error.

## Pure Logic Modules
- `src/lib/categories.ts` — `normalizeCategory` (BR-2), `deriveCategories` (generic over any `{id, data.categories}` shape)
- `src/lib/chapters.ts` — `parseChapterId`, `getChaptersForTitle` (BR-3), `getRecentChapters` (BR-4)
- `src/lib/search.ts` — `buildSearchIndex`, `searchTitles` (BR-6)

All three modules use generic type parameters constrained to minimal structural shapes, so they work with both real Astro `CollectionEntry` values (in pages) and plain object literals (in tests), without duplicating Astro's content types.

## Tests
- `tests/unit/categories.test.ts`, `tests/unit/chapters.test.ts`, `tests/unit/search.test.ts`
- Vitest + `@fast-check/vitest`'s `test.prop`, implementing the properties identified in `business-rules.md` BR-8:
  - Category normalization: trim/lowercase invariant (blocking, PBT-03) + idempotence (advisory)
  - Chapter selection: size/subset invariants and descending-sort invariant (PBT-03)
  - Search matching: case-insensitivity invariant and exact-match-set invariant against the BR-6 definition (PBT-03)
- Each property test also has at least one companion example-based test pinning a concrete scenario (PBT-10).
- Generators use domain-appropriate shapes (slug-like strings via `fc.stringMatching`, bounded date ranges) rather than raw unconstrained primitives (PBT-07).
- fast-check's built-in shrinking and seed reporting on failure satisfy PBT-08; `@fast-check/vitest` + Vitest satisfy PBT-09 (framework selection, per `tech-stack-decisions.md`).
