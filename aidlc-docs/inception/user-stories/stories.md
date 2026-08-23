# User Stories

**Breakdown approach**: Hybrid — grouped by feature area, each story tagged with its persona(s).
**Acceptance criteria style**: Concise checklist.
**Granularity**: Coarse (one story per feature area from requirements.md).
**Priority labels**: None — all stories are in scope for the initial build.

---

## Feature Area: Authoring & Content Structure

### Story 1 — Publish a title and its chapters via Markdown
**Persona**: Translator
**As a** translator, **I want** to organize each novel as a folder containing per-chapter Markdown files plus a metadata front matter (title, author, categories/tags, status, synopsis, cover image, credits/disclaimer), **so that** I can publish new content by writing a Markdown file and pushing to Git, with no manual site-wiring.

**Acceptance Criteria**:
- [x] Creating a new folder under the content directory with the required front matter fields is sufficient to register a new title
- [x] Adding a new chapter Markdown file to a title's folder is sufficient to publish a new chapter, with no other file to edit
- [x] Missing required front matter fields are surfaced clearly (build fails or warns) rather than silently producing a broken page
- [x] Referencing FR-1 of requirements.md

---

## Feature Area: Browsing & Discovery

### Story 2 — Discover titles and updates
**Persona**: Reader
**As a** reader, **I want** a home page showing recently updated chapters, a full catalog of titles, and category-based browsing, **so that** I can find new releases and discover titles matching my interests.

**Acceptance Criteria**:
- [x] Home page lists the most recently published chapters across all titles
- [x] Catalog page lists all titles (title, cover, status at a glance)
- [x] Category page lists all categories, and selecting one shows only titles tagged with it
- [x] Referencing FR-2 (home, catalog, category browse) of requirements.md

### Story 3 — View a title's details and chapter list
**Persona**: Reader
**As a** reader, **I want** a title page showing synopsis, cover, status, translation credits/disclaimer, and the ordered list of chapters, **so that** I can decide whether to start reading and easily jump to any chapter.

**Acceptance Criteria**:
- [x] Title page displays all front matter metadata (synopsis, cover, status, categories, credits/disclaimer)
- [x] Chapters are listed in reading order with clear labeling
- [x] Each chapter links directly to its reading page
- [x] Referencing FR-2 (title page) of requirements.md

### Story 4 — Search titles and authors
**Persona**: Reader
**As a** reader, **I want** to search by title or author name, **so that** I can quickly find a specific novel without browsing the full catalog.

**Acceptance Criteria**:
- [x] Search works entirely client-side (no backend required, compatible with GitHub Pages)
- [x] Search matches on title and author fields
- [x] Results update as the reader types (or on submit, per final UX design) and link to the correct title page
- [x] Referencing FR-3 of requirements.md

### Story 5 — Learn about the translator and site
**Persona**: Reader
**As a** reader, **I want** an About page describing the translator and general disclaimer, **so that** I understand the nature of the site (fan translations, non-commercial) and how to reach out.

**Acceptance Criteria**:
- [x] About page is reachable from the site's main navigation
- [x] Includes a general disclaimer and (optional) contact information
- [x] Referencing FR-2 (About page) of requirements.md

---

## Feature Area: Reading Experience

### Story 6 — Read a chapter comfortably
**Persona**: Reader
**As a** reader, **I want** a clean, distraction-free chapter reading page with calm visual design, **so that** I can focus on the translated text.

**Acceptance Criteria**:
- [x] Chapter page renders the translated Markdown content clearly, with readable default typography
- [x] Layout is mobile-first and works well on small screens as the primary target
- [x] Referencing FR-2 (chapter reading page) and NFR-3 of requirements.md

### Story 7 — Customize reading appearance
**Persona**: Reader
**As a** reader, **I want** to toggle light/dark theme and adjust font family, font size, and line/paragraph spacing, with my choices remembered on my next visit, **so that** I can read in the way that's most comfortable for me over time.

**Acceptance Criteria**:
- [x] Reader can switch between light and dark theme
- [x] Reader can change font family, font size, and spacing independently
- [x] Preferences persist across visits via browser storage (no account needed)
- [x] When no stored preference exists, theme defaults to the reader's OS/browser preference
- [x] All controls are usable via keyboard and are screen-reader friendly
- [x] Referencing FR-6 and NFR-3 of requirements.md

---

## Feature Area: Community & Distribution

### Story 8 — Discuss chapters
**Persona**: Reader
**As a** reader, **I want** to comment on a chapter, **so that** I can share reactions or feedback with the translator and other readers.

**Acceptance Criteria**:
- [x] Each chapter page includes an embedded comments widget backed by GitHub Discussions
- [x] Commenting requires a GitHub account (no separate site accounts to build/maintain)
- [x] Referencing FR-4 of requirements.md

### Story 9 — Follow new releases via RSS
**Persona**: Reader
**As a** reader, **I want** an RSS feed of newly published chapters, **so that** I can be notified through my feed reader without manually checking the site.

**Acceptance Criteria**:
- [x] Feed is generated automatically from published chapters (no manual step)
- [x] Feed includes chapter title, title name, publish date, and a link to the chapter
- [x] Referencing FR-5 of requirements.md

---

## Feature Area: Publishing & Operations

### Story 10 — Publish automatically on push
**Persona**: Translator
**As a** translator, **I want** pushing new/updated Markdown content to the repository to automatically rebuild and redeploy the site, **so that** publishing requires nothing beyond a normal Git workflow.

**Acceptance Criteria**:
- [x] Pushing to the main branch triggers an automated build and deploy (GitHub Actions to GitHub Pages)
- [x] The site is served under the custom domain `forgottentranslations.online`
- [x] Referencing NFR-1 of requirements.md

### Story 11 — See readership without invasive tracking
**Persona**: Translator
**As a** translator, **I want** lightweight, privacy-respecting visit analytics, **so that** I can see how many people read the site without compromising reader privacy.

**Acceptance Criteria**:
- [x] Analytics tool does not require a cookie consent banner (privacy-respecting by design)
- [x] Translator can view basic visit/page metrics
- [x] Referencing NFR-4 of requirements.md

---

## Out of Scope for This Story Set
- **Blogspot content migration** (FR-8): explicitly deferred to a follow-up effort after the initial site is live; no story generated for it in this pass.

---

## Persona-to-Story Map

| Persona | Stories |
|---|---|
| Reader | 2, 3, 4, 5, 6, 7, 8, 9 |
| Translator | 1, 10, 11 |
