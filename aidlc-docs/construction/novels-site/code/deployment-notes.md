# Deployment Notes — novels-site

One-time manual setup steps required before the site is fully functional in production (from `infrastructure-design/deployment-architecture.md`).

## 1. GitHub Pages

- Repo Settings → Pages → Source: **GitHub Actions**
- Custom domain: `forgottentranslations.online`
- Enforce HTTPS: enabled (after DNS is verified)

## 2. DNS (at the registrar for forgottentranslations.online)

Add the records listed in `infrastructure-design/deployment-architecture.md` (4 `A` + 4 `AAAA` records for the apex, 1 `CNAME` for `www` → `gregori.github.io`).

## 3. giscus (comments)

1. Enable **Discussions** on the `gregori/novels-site` repo (Settings → General → Features).
2. Install the [giscus app](https://github.com/apps/giscus) on the repo.
3. Go to https://giscus.app, fill in the repo, choose a Discussion category (e.g. "Comments"), and copy the generated `data-repo-id` and `data-category-id`.
4. Replace `REPLACE_WITH_REPO_ID` and `REPLACE_WITH_CATEGORY_ID` in `src/components/CommentsWidget.astro` with those values.

## 4. GoatCounter (analytics)

1. Create a free account/site at https://www.goatcounter.com (e.g. site code `forgottentranslations`).
2. Update the `data-goatcounter` URL in `src/layouts/BaseLayout.astro` to match your actual GoatCounter site endpoint if it differs from the placeholder.

Both giscus and GoatCounter fail silently if not yet configured or blocked by the reader's browser (NFR Design resilience pattern) — the site works fully without them.
