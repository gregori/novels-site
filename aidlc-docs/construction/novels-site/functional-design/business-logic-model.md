# Business Logic Model — novels-site

Technology-agnostic description of the build-time and runtime processes. Concrete implementation (framework APIs, file I/O calls) is decided in NFR Design / Code Generation.

## Process 1: Content Ingestion (build-time)

1. For each folder under the content directory:
   1. Parse the folder's front matter into a `Title` record.
   2. Validate the `Title` record against BR-1 (status), BR-2 (non-empty categories) and required-field checks. On failure: apply BR-5 (fail build, identify file + field).
   3. For each Markdown file inside the folder:
      1. Parse its front matter + body into a `Chapter` record, with `chapterSlug` and order derived per BR-3.
      2. Validate required fields per BR-5.
   4. Sort the Title's chapters per BR-3 and attach them to the `Title` record.
2. Output: an in-memory collection of fully-populated `Title` records (each with its ordered `Chapter` list), or a build failure with a precise error.

## Process 2: Category Derivation (build-time)

1. Collect every `category` string across all Titles.
2. Normalize each per BR-2 (trim + lowercase) to produce a `Category.key`/`label`.
3. Group Titles under each normalized key.
4. Output: a list of `Category` records, each with its member Titles — used to render the Category Index and per-Category pages.

## Process 3: Home Page "Recent Chapters" Selection (build-time)

1. Flatten all Chapters across all Titles into one list.
2. Sort by `publishDate` descending, with the BR-4 tiebreak (`titleSlug` then `chapterSlug` ascending).
3. Take the first 10.
4. Output: the ordered list rendered on the Home page.

## Process 4: Search Index Generation (build-time)

1. Map each `Title` to a `SearchIndexEntry` (`slug`, `title`, `originalAuthor`).
2. Serialize the list to a static JSON asset shipped with the site.
3. At runtime, the Search widget loads this asset and matches queries per BR-6.

## Process 5: RSS Feed Generation (build-time)

1. Take the same flattened, sorted Chapter list used in Process 3 (not limited to 10 — full history).
2. Map each Chapter to a feed item: chapter title + parent Title's title, link to the chapter page, `publishDate` as `pubDate`.
3. Serialize to `feed.xml`.

## Process 6: Reading Preferences Application (client-side runtime)

1. On page load: read `theme`, `fontFamily`, `fontSize`, `lineSpacing` from `localStorage`.
2. For any preference not present: apply the BR-7 default (`theme` falls back to `prefers-color-scheme`; typography falls back to the calm preset).
3. Apply the resolved preferences to the page (CSS custom properties/classes).
4. When the reader changes a control (theme toggle, font/size/spacing panel): update the applied value immediately and persist just that value to `localStorage`.

## Process 7: Build Validation Gate (build-time, both local and CI)

1. Process 1 (Content Ingestion) is the single source of validation — both the local build command and the GitHub Actions PR check invoke the same ingestion/validation logic, so there is no risk of the two environments disagreeing.
2. On any validation failure, the process halts (non-zero exit code) with the offending file path and field named in the error — this is what both the local terminal and the CI check surface to the translator.
3. Only a push to `main` proceeds past a successful build into the Deploy Service (see application-design/services.md); PR builds stop after validation + full build, without deploying.

## Process 8: Comments and External Integration (client-side runtime)

1. Each rendered Chapter page includes the giscus embed configuration (repository, category, mapping) pointing at this project's GitHub Discussions.
2. No data flows back into the Content Layer or build process from comments — this is a one-way, third-party embed.
