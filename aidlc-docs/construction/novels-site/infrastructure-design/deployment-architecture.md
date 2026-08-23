# Deployment Architecture — novels-site

## Repository
`gregori/novels-site` (public)

## GitHub Actions Workflow(s)

Two triggers, one shared build step, per Functional Design BR-5:

### On Pull Request → main
- Job: **build only** (validation gate)
- Steps: checkout → setup Node.js + npm cache → `npm ci` → `npm run build`
- On failure: PR check fails, surfaced in the PR's checks tab (satisfies the "verify before merging" requirement from Functional Design clarification)
- No deploy step runs for PRs

### On Push → main
- Job 1: **build** — same steps as above (checkout → setup Node.js → `npm ci` → `npm run build`)
- Job 2: **deploy** (depends on Job 1 succeeding)
  - `actions/configure-pages`
  - `actions/upload-pages-artifact` — uploads the Astro build output directory
  - `actions/deploy-pages` — publishes to the GitHub Pages environment
- Permissions required: `pages: write`, `id-token: write` (standard for native Pages Actions deployment)

## GitHub Pages Settings
- **Source**: GitHub Actions (not "Deploy from a branch")
- **Custom domain**: `forgottentranslations.online`
- **Enforce HTTPS**: enabled (GitHub provisions the certificate automatically once DNS is verified)

## CNAME File
The build output includes a `CNAME` file (or Astro's `site`/deployment config is set so the Pages deploy step writes one) containing:
```
forgottentranslations.online
```

## DNS Records (at the domain registrar/DNS provider for forgottentranslations.online)

Per Infrastructure Design plan Q3/B (apex + `www`):

| Type | Host | Value |
|---|---|---|
| A | `@` (apex) | `185.199.108.153` |
| A | `@` (apex) | `185.199.109.153` |
| A | `@` (apex) | `185.199.110.153` |
| A | `@` (apex) | `185.199.111.153` |
| AAAA | `@` (apex) | `2606:50c0:8000::153` |
| AAAA | `@` (apex) | `2606:50c0:8001::153` |
| AAAA | `@` (apex) | `2606:50c0:8002::153` |
| AAAA | `@` (apex) | `2606:50c0:8003::153` |
| CNAME | `www` | `gregori.github.io` |

**Note**: These are GitHub's current published Pages IP addresses; verify against GitHub's own documentation at setup time in case they've changed.

## Pre-Custom-Domain Fallback URL
Before DNS propagates (or if the custom domain is ever removed), the site remains reachable at:
`https://gregori.github.io/novels-site/`

## Third-Party Service Configuration (from NFR Design/Requirements, referenced here for completeness)
- **giscus**: requires the giscus GitHub App installed on `gregori/novels-site`, and GitHub Discussions enabled on the repo, before the embed will function.
- **GoatCounter**: requires a GoatCounter account/site created (e.g., `novels-site.goatcounter.com` or similar) before the tracking snippet has a valid endpoint.

These two setup steps are one-time manual actions outside the Actions workflow — they will be called out as prerequisites in Code Generation.
