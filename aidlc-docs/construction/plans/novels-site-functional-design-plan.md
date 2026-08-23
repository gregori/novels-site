# Functional Design Plan — Unit: novels-site

**Note**: Units Generation was skipped (single simple unit). This plan covers Functional Design for the whole site, building on `aidlc-docs/inception/application-design/`.

## Execution Checklist

- [ ] Step 1: Confirm business rules and domain model decisions (via questions below)
- [ ] Step 2: Generate `aidlc-docs/construction/novels-site/functional-design/domain-entities.md`
- [ ] Step 3: Generate `aidlc-docs/construction/novels-site/functional-design/business-rules.md`
- [ ] Step 4: Generate `aidlc-docs/construction/novels-site/functional-design/business-logic-model.md`
- [ ] Step 5: Generate `aidlc-docs/construction/novels-site/functional-design/frontend-components.md`
- [ ] Step 6: Present completion message and request approval

## Questions

### Question 1 — Status Field Values

What are the canonical values for a title's `status` front-matter field?

A) `ongoing`, `completed`, `paused` (matches requirements.md wording exactly)

B) Other (please describe after [Answer]: tag below)

[Answer]: A + `dropped`

### Question 2 — Category Taxonomy

Should categories/tags be a fixed, predefined list (validated at build time) or free-form (translator can type any category string)?

A) Fixed predefined list, defined in one config file, validated at build time — new categories require adding to that list first

B) Free-form — any string the translator writes in a title's front matter becomes a usable category automatically

C) Other (please describe after [Answer]: tag below)

[Answer]: B

### Question 3 — Chapter Ordering and Slugs

How should chapter order and URL slugs be determined?

A) Order by a required `chapterNumber` front-matter field (numeric); slug derived from the chapter's filename

B) Order by filename (e.g., `chapter-01.md`, `chapter-02.md`) directly, no separate `chapterNumber` field needed; slug derived from filename

C) Other (please describe after [Answer]: tag below)

[Answer]: B

### Question 4 — Home Page "Recent Chapters" Rule

How many recently-updated chapters should the Home page show, and how should they be sorted?

A) Show the 10 most recent chapters, sorted by publish date descending (newest first)

B) Show a different number — specify after [Answer]: tag below (Other)

C) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 5 — Invalid Content Handling

If a title or chapter is missing a required front-matter field, what should happen at build time?

A) Fail the entire build with a clear error message identifying the file and missing field (safest — prevents publishing broken content)

B) Skip that title/chapter (log a warning) and continue building the rest of the site

C) Other (please describe after [Answer]: tag below)

[Answer]: A, but it's interesting to be able to verify the build before pushing the content

### Question 6 — Search Matching Behavior

How should client-side search match the reader's query against titles/authors?

A) Case-insensitive substring match (e.g., "solo" matches "Solo Leveling") — simple and predictable

B) Fuzzy/typo-tolerant matching (more forgiving, more complex to implement)

C) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 7 — Default Typography Values

When a reader has no stored preference yet, what should the default reading typography be?

A) A calm serif or humanist sans-serif font, medium size, comfortable (1.5–1.6) line spacing — exact values decided visually during Code Generation

B) You will specify exact defaults (describe after [Answer]: tag below)

C) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 8 — Frontend Component Granularity

For `frontend-components.md`, what level of component breakdown do you want?

A) Page-level only (Home, Catalog, Category, Title, Chapter, About) plus a short list of shared UI pieces (nav/header, footer, theme toggle, typography panel, chapter-list item, category badge, search box) — recommended for a project this size

B) Full detailed component tree with props/state for every sub-element (more thorough, more overhead for a solo hobby project)

C) Other (please describe after [Answer]: tag below)

[Answer]: A
