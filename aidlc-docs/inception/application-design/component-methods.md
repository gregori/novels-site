# Component Methods

**Note**: Signatures are language/framework-agnostic pseudocode (per Application Design plan Q2/A). Concrete typing happens once the framework is selected in NFR Requirements/NFR Design. Detailed business rules (validation logic, sorting rules, etc.) are defined later in Functional Design — this document only establishes method purpose and input/output shape.

## Content Layer

- `parseTitleFrontMatter(titleFolderPath) -> TitleMetadata`
  Reads a title folder's front matter into a structured record.
- `parseChapterFrontMatter(chapterFilePath) -> ChapterMetadata`
  Reads a chapter file's front matter into a structured record.
- `listTitles() -> TitleMetadata[]`
  Returns all known titles.
- `listChaptersForTitle(titleSlug) -> ChapterMetadata[]`
  Returns a title's chapters in reading order.
- `validateFrontMatter(metadata, schema) -> ValidationResult`
  Checks required fields are present and well-formed; used to fail the build clearly on bad content.

**Key types** (conceptual, refined in Functional Design):

- `TitleMetadata`: slug, title, originalAuthor, categories[], status, synopsis, coverImage, credits
- `ChapterMetadata`: titleSlug, chapterNumber, chapterTitle, publishDate

## Site Generator / Templating

- `renderHomePage(recentChapters) -> HTMLPage`
- `renderCatalogPage(titles) -> HTMLPage`
- `renderCategoryIndexPage(categories) -> HTMLPage`
- `renderCategoryPage(category, titlesInCategory) -> HTMLPage`
- `renderTitlePage(title, chapters) -> HTMLPage`
- `renderChapterPage(title, chapter, chapterContent) -> HTMLPage`
- `renderAboutPage() -> HTMLPage`
- `getRecentChapters(allChapters, limit) -> ChapterMetadata[]`
  Selects the most recently published chapters across all titles, for the Home page.

## Reading UI Runtime

- `initThemeControl() -> void`
  On page load, applies stored theme preference or falls back to OS/browser preference.
- `setTheme(theme: "light" | "dark") -> void`
  Applies and persists the chosen theme.
- `initTypographyControls() -> void`
  On page load, applies stored font/size/spacing preferences.
- `setFontFamily(family) -> void`
- `setFontSize(size) -> void`
- `setLineSpacing(spacing) -> void`

## Search

- `buildSearchIndex(titles) -> SearchIndexEntry[]`
  Build-time: produces a flat, search-friendly index (title, author, slug) from the Title collection.
- `initSearchWidget(index) -> void`
  Runtime: wires up the search input to the loaded index.
- `searchTitles(query, index) -> SearchIndexEntry[]`
  Runtime: returns titles/authors matching the query.

## Community & Distribution

- `renderCommentsWidget(chapterId) -> HTMLFragment`
  Produces the giscus embed configuration/markup for a given chapter page.
- `generateRSSFeed(chapters) -> XMLDocument`
  Build-time: produces `feed.xml` listing chapters with title, chapter name, publish date, and link.

## Build & Deploy Automation

- `runBuild() -> StaticOutputDirectory`
  Orchestrates: Content Layer parsing -> Site Generator rendering -> Search index generation -> RSS generation -> static output directory.
- `deployToPages(staticOutputDirectory) -> void`
  Publishes the static output to GitHub Pages under the custom domain.
