# Forgotten Translations

A calm, mobile-first static site for publishing fan translations of Japanese webnovels and light novels, built from Markdown and deployed to GitHub Pages.

Built with [Astro](https://astro.build) + TypeScript. This project was developed following the [AI-DLC](https://github.com/aws-samples) workflow — see `aidlc-docs/` for the full requirements, design, and decision history.

## Local Development

```bash
npm install
npm run dev       # start the local dev server
npm run build     # type-check (astro check) + production build
npm run preview   # preview the production build locally
npm run test      # run unit tests (Vitest + fast-check)
npm run lint      # ESLint
npm run format    # Prettier (writes changes)
```

## Adding a New Title

1. Create a new folder under `src/content/titles/`, named with your title's slug (lowercase, hyphens), e.g. `src/content/titles/my-new-title/`.
2. Add an `index.md` inside it with front matter for all required fields:

   ```md
   ---
   title: 'My New Title'
   originalAuthor: 'Original Author Name'
   categories:
     - Fantasy
   status: 'ongoing' # ongoing | completed | paused | dropped
   synopsis: 'A short description of the story.'
   coverImage: './cover.jpg' # place the image file in the same folder
   credits: 'Translation credits / disclaimer, e.g. a link to the original work.'
   ---
   ```

3. Add a cover image file in the same folder (referenced by `coverImage` above).

## Adding a New Chapter

Add a Markdown file inside the title's folder, named so it sorts in reading order — **zero-pad chapter numbers** so ordering stays correct past chapter 9 (e.g. `chapter-01.md`, `chapter-02.md`, ..., `chapter-10.md`):

```md
---
chapterTitle: 'Chapter Title Here'
publishDate: 2026-01-01
---

Chapter content goes here, as regular Markdown.
```

That's it — no other file needs to be touched. The Home page, RSS feed, and search index all update automatically from this content at build time.

## Verifying a Build Before Pushing

Run `npm run build` locally before pushing — it type-checks the content (catching missing/invalid front-matter fields immediately) and produces the production build. The same build also runs automatically as a GitHub Actions check on every Pull Request (without deploying), so a broken PR is flagged even if you forget to check locally. Only a push to `main` triggers an actual deploy.

## Deployment

Pushing to `main` automatically builds and deploys to GitHub Pages at `forgottentranslations.online`, via `.github/workflows/deploy.yml`. See `aidlc-docs/construction/novels-site/code/deployment-notes.md` for one-time setup steps (giscus, GoatCounter, DNS).
