# Domain Entities — novels-site

## Title

The aggregate root for a novel/light novel being translated. Backed by one folder in the Content Layer.

| Field            | Type              | Required                 | Notes                                                                                |
| ---------------- | ----------------- | ------------------------ | ------------------------------------------------------------------------------------ |
| `slug`           | string            | derived                  | From the folder name (not a front-matter field)                                      |
| `title`          | string            | yes                      | Display title                                                                        |
| `originalAuthor` | string            | yes                      | Original (Japanese) author's name                                                    |
| `categories`     | string[]          | yes (may be empty array) | Free-form; see BR-2 for normalization                                                |
| `status`         | enum              | yes                      | One of `ongoing`, `completed`, `paused`, `dropped` (see BR-1)                        |
| `synopsis`       | string            | yes                      | Short description, plain text or inline Markdown                                     |
| `coverImage`     | string (path/URL) | yes                      | Cover image asset reference                                                          |
| `credits`        | string            | yes                      | Translation credits/disclaimer (e.g., link to original work, fan-translation notice) |

**Relationships**: A Title has many Chapters (one-to-many, ordered).

## Chapter

A single translated chapter, backed by one Markdown file inside a Title's folder.

| Field          | Type            | Required | Notes                                       |
| -------------- | --------------- | -------- | ------------------------------------------- |
| `titleSlug`    | string          | derived  | Parent Title's slug                         |
| `chapterSlug`  | string          | derived  | From the chapter's filename (see BR-3)      |
| `chapterTitle` | string          | yes      | Display title of the chapter                |
| `publishDate`  | date            | yes      | Used for ordering on Home page and RSS feed |
| `content`      | Markdown string | yes      | The translated chapter body                 |

**Relationships**: Belongs to exactly one Title. Order within a Title is determined by filename (BR-3), not a separate field.

## Category (derived, not authored directly)

A virtual entity computed from all Titles' `categories` fields — there is no separate category content file.

| Field    | Type    | Notes                                                     |
| -------- | ------- | --------------------------------------------------------- |
| `key`    | string  | Normalized (trimmed, lowercased) grouping key — see BR-2  |
| `label`  | string  | Display label (same as `key`, per BR-2)                   |
| `titles` | Title[] | All titles whose normalized categories include this `key` |

## SearchIndexEntry (build-time generated)

One entry per Title, used by the client-side Search widget.

| Field            | Type   |
| ---------------- | ------ |
| `slug`           | string |
| `title`          | string |
| `originalAuthor` | string |

## ReaderPreferences (client-side only, not content)

Not part of the Content Layer — lives entirely in the reader's browser `localStorage`.

| Field         | Type                  | Default when unset                                                      |
| ------------- | --------------------- | ----------------------------------------------------------------------- |
| `theme`       | `"light"` \| `"dark"` | OS/browser `prefers-color-scheme`                                       |
| `fontFamily`  | string                | Calm serif/humanist sans preset (exact value chosen in Code Generation) |
| `fontSize`    | string/number         | Medium preset                                                           |
| `lineSpacing` | string/number         | 1.5–1.6 preset                                                          |
