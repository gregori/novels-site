# Business Rules — novels-site

## BR-1: Title Status Values

`status` MUST be one of: `ongoing`, `completed`, `paused`, `dropped`. Any other value is a validation error (see BR-5).

## BR-2: Category Normalization

Categories are free-form text (translator's choice), but to avoid accidental duplicate category pages (e.g., "Fantasy" vs "fantasy" vs " Fantasy "):

- The grouping/display **key** for a category is `trim(categoryString).toLowerCase()`.
- The same normalized key is used both for grouping titles and for the label shown on the category page and category badges — there is no separate "pretty" display casing.
- An empty string (after trim) is not a valid category value and is a validation error (see BR-5).

**Rationale**: A single deterministic normalization avoids ambiguity about which casing "wins" when multiple titles use different casing for the same category, without requiring a maintained predefined list.

## BR-3: Chapter Ordering and Slugs

- Chapter order within a Title is the ascending lexicographic sort of the chapter file's name (without extension).
- **Authoring convention** (documented for the Translator persona): filenames MUST use zero-padded numbers so lexicographic order matches numeric order — e.g., `chapter-01.md`, `chapter-02.md`, ..., `chapter-10.md`. Two-digit padding supports up to 99 chapters per title; if a title exceeds that, the translator must re-pad existing filenames to 3 digits (this is a known, acceptable manual step for a hobby project).
- `chapterSlug` is the filename without extension (e.g., `chapter-01`).

## BR-4: Home Page "Recent Chapters" Selection

- Select the 10 most recently published chapters across all titles, sorted by `publishDate` descending.
- **Tiebreak** (chapters with identical `publishDate`): sort by `titleSlug` ascending, then `chapterSlug` ascending, for deterministic output.

## BR-5: Build Validation (Fail-Fast)

- Any Title or Chapter with a missing required field (per domain-entities.md), or an invalid `status` value (BR-1), or an empty-after-trim category (BR-2), MUST cause the build to fail with an error message identifying the file path and the specific missing/invalid field.
- This validation runs identically in two contexts (per Functional Design clarification):
  1. **Local build**: the translator runs the build command on their machine before pushing, to catch errors early.
  2. **Pull Request CI check**: GitHub Actions runs the same build (without deploying) on every Pull Request, so a broken PR is flagged even if not checked locally.
- Only a push to `main` triggers the build-and-deploy workflow; PRs only trigger build validation, no deploy.

## BR-6: Search Matching

- Search matches the reader's query against `title` and `originalAuthor` fields only (not synopsis or chapter content) using a case-insensitive substring match.
- An empty/whitespace-only query returns no results (the search widget does not dump the entire catalog by default).

## BR-7: Reading Preferences Defaults and Persistence

- **Theme**: if no stored preference exists, default to the OS/browser `prefers-color-scheme` setting. Once the reader explicitly picks a theme, that choice is persisted to `localStorage` and takes precedence over the OS preference on future visits.
- **Typography** (font family, font size, line spacing): if no stored preference exists, default to a calm serif/humanist sans preset at medium size and 1.5–1.6 line-height (exact values finalized visually during Code Generation). Once the reader changes any one of these, that specific preference is persisted independently.

## BR-8: Testable Properties for Pure Functions (PBT scope)

Per the Property-Based Testing extension (Partial enforcement — PBT-02, PBT-03, PBT-07, PBT-08, PBT-09 are blocking; others advisory), the following pure functions have identifiable properties to carry into Code Generation planning:

| Function                                                                  | Property                                                                                                                                              | Category                              |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Category normalization (`normalizeCategory`)                              | `normalizeCategory(normalizeCategory(x)) == normalizeCategory(x)` (idempotence, advisory) and output is always trimmed/lowercased (invariant, PBT-03) | Invariant / Idempotence               |
| Chapter/recent-chapters sort                                              | Output preserves the same set of input elements, reordered; output size never exceeds input size or the requested limit (PBT-03)                      | Invariant (size/element preservation) |
| Search matching (`searchTitles`)                                          | `matches(query, target) == matches(query.toLowerCase(), target.toLowerCase())` — matching is case-insensitive regardless of input casing (PBT-03)     | Invariant                             |
| Front-matter parsing (`parseTitleFrontMatter`, `parseChapterFrontMatter`) | No natural round-trip (front matter is hand-authored, not generated then re-serialized by this system) — **PBT-02 marked N/A with rationale**         | N/A                                   |

Generator quality (PBT-07), shrinking/reproducibility (PBT-08), and framework selection (PBT-09) are addressed during Code Generation planning once the JS/TS testing framework is selected in NFR Requirements.
