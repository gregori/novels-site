# Components

**Note**: This project has no runtime backend. Components represent build-time and client-side concerns, not deployed services.

## 1. Content Layer

**Purpose**: Source of truth for all site content — Markdown files with front matter, organized one folder per title, one file per chapter.

**Responsibilities**:

- Define the front-matter schema for titles (title, original author, categories/tags, status, synopsis, cover image, credits/disclaimer)
- Define the front-matter schema for chapters (chapter number, chapter title, publish date)
- Provide the folder/file naming convention translators follow to publish
- Validate front matter at build time and surface clear errors for missing/invalid required fields

**Interface**: Read-only at build time. Exposes a collection of Title records (each with its ordered Chapter records) to all other components.

## 2. Site Generator / Templating

**Purpose**: Transform Content Layer records into the site's static pages.

**Responsibilities**:

- Render Home (recent chapters), Catalog (all titles), Category Index, Category page, Title page, Chapter page, About page
- Apply the calm, mobile-first visual design
- Generate routing/URLs for all pages

**Interface**: Consumes the Content Layer's Title/Chapter collection; produces static HTML/CSS output.

## 3. Reading UI Runtime

**Purpose**: Client-side behavior that lets readers customize their reading experience.

**Responsibilities**:

- Theme toggle (light/dark), defaulting to OS/browser preference when no stored preference exists
- Font family, font size, and line/paragraph spacing controls
- Persist all preferences in `localStorage`
- Keyboard-operable and screen-reader-friendly controls

**Interface**: Client-side script(s) injected into rendered pages; reads/writes browser `localStorage`; toggles CSS custom properties/classes on the page.

## 4. Search

**Purpose**: Client-side search across titles and authors.

**Responsibilities**:

- Build a search index artifact from Content Layer metadata at build time
- Provide the search input UI and render matching results client-side (no backend calls)

**Interface**: Build-time index generator consuming the Title collection and producing a static JSON index asset; runtime widget consuming that index.

## 5. Community & Distribution

**Purpose**: Reader engagement and update notification.

**Responsibilities**:

- Embed a giscus (GitHub Discussions-backed) comments widget on each chapter page
- Generate an RSS feed listing newly published chapters

**Interface**: giscus embed config per chapter page (client-side, third-party script); RSS feed generator consuming the Chapter collection (with publish dates) and producing `feed.xml` at build time.

## 6. Build & Deploy Automation

**Purpose**: Continuous delivery of the site to GitHub Pages.

**Responsibilities**:

- On push to the main branch: install dependencies, run the Site Generator build (including Search index and RSS generation), and deploy the static output to GitHub Pages
- Serve the site under the custom domain `forgottentranslations.online`

**Interface**: GitHub Actions workflow; GitHub Pages configuration; `CNAME` file in the build output.
