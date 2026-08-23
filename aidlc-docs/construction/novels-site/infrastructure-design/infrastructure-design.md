# Infrastructure Design — novels-site

## Summary
This project's infrastructure is entirely GitHub-hosted: GitHub Actions for build/CI, GitHub Pages for static hosting, and the translator's own DNS provider for the custom domain. There is no cloud provider account (AWS/Azure/GCP) and no server to provision or maintain.

## Repository
- **Owner/repo**: `gregori/novels-site`
- **Visibility**: Public (required for GitHub Pages custom domain support on the free plan, and for giscus/GitHub Discussions-backed comments)

## Deployment Environment
- **Host**: GitHub Pages, using the **native GitHub Pages Actions deployment** mechanism (Infrastructure Design plan Q1/A) — `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`. No `gh-pages` branch.
- **Custom domain**: `forgottentranslations.online` (apex) with `www.forgottentranslations.online` also supported and redirecting to the apex (Q3/B).

## Compute
- Build runs on a standard GitHub-hosted `ubuntu-latest` Actions runner — ephemeral, no sizing/scaling decisions needed (a static site build has negligible resource requirements).

## Storage
- Not applicable — no database. Source content lives in the Git repository; build output is static files served directly by GitHub Pages.

## Messaging
- Not applicable — the only "events" are GitHub Actions' native `push` and `pull_request` triggers, already defined by the BR-5 validation gate (Functional Design).

## Networking (DNS)
See `deployment-architecture.md` for the exact DNS records required at the domain registrar/DNS provider for `forgottentranslations.online`.

## Monitoring
- GitHub Actions' built-in failure notifications (email/UI) for build and deploy failures — sufficient per Infrastructure Design plan Q4/A.
- No external uptime monitoring service added.
- GoatCounter (NFR Requirements) provides traffic visibility; not a monitoring/alerting tool.

## Shared Infrastructure
- Not applicable — single unit, single repository.
