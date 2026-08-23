# Frontend Components — novels-site

Per Functional Design plan Q8/A: page-level components plus a short list of shared UI pieces (not a full prop/state tree for every sub-element).

## Pages

| Page | Route (indicative) | Renders |
|---|---|---|
| Home | `/` | `RecentChaptersList` (Process 3 output) |
| Catalog | `/titles/` | `TitleCard` grid for all Titles |
| Category Index | `/categories/` | `CategoryBadge` list for all Categories |
| Category | `/categories/{key}/` | `TitleCard` grid filtered to one Category |
| Title | `/titles/{titleSlug}/` | Title header (synopsis, cover, status, credits, categories) + `ChapterList` |
| Chapter | `/titles/{titleSlug}/{chapterSlug}/` | Rendered chapter Markdown + `ReadingControls` + `CommentsWidget` |
| About | `/about/` | Static translator/disclaimer content |

## Shared UI Pieces

- **SiteHeader/Nav**: site name/logo, links to Catalog/Categories/About, hosts `SearchBox`
- **SiteFooter**: credits line, link to RSS feed, (optional) link to the site's GitHub repo
- **SearchBox**: text input + results dropdown; wraps the Search component's runtime widget (business-logic-model.md, Process 4)
- **ThemeToggle**: light/dark switch button; calls `setTheme()` (component-methods.md)
- **TypographyPanel**: font family select, font size control, line-spacing control; calls `setFontFamily()`/`setFontSize()`/`setLineSpacing()`
- **ChapterListItem**: chapter title + publish date + link; reused in `ChapterList` (Title page) and `RecentChaptersList` (Home page)
- **TitleCard**: cover thumbnail, title, status badge, category badges; reused on Catalog and Category pages
- **CategoryBadge**: small pill/link showing a category's normalized label (BR-2), used on Title pages, TitleCard, and Category Index
- **CommentsWidget**: giscus embed wrapper (Process 8)

## User Interaction Flows

- **Theme switch**: reader clicks `ThemeToggle` → `setTheme()` applies + persists → page re-renders with new theme instantly (no reload)
- **Typography change**: reader adjusts a `TypographyPanel` control → corresponding `set*()` method applies + persists that one value → text re-renders with new typography instantly
- **Search**: reader types in `SearchBox` → `searchTitles()` runs against the loaded index (BR-6) → matching results shown as links → clicking a result navigates to that Title page
- **Browse by category**: reader clicks a `CategoryBadge` → navigates to that Category page → sees filtered `TitleCard` grid
- **Read next chapter**: reader on a Chapter page uses a "next/previous chapter" affordance within `ChapterList`/chapter navigation (ordering per BR-3) to move through a Title sequentially

## Form Validation
There are no data-submission forms in this site (no accounts, no login, no comment form of our own — comments are handled entirely by the third-party giscus embed). `SearchBox` has no "validation" beyond BR-6's empty-query rule (no results shown for an empty query).

## API Integration Points
None — this is a fully static site. The only network calls a reader's browser makes beyond loading the static assets are to the third-party giscus/GitHub Discussions embed on Chapter pages.
