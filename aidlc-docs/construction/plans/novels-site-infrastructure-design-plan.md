# Infrastructure Design Plan — Unit: novels-site

## Execution Checklist

- [ ] Step 1: Confirm infrastructure decisions (via questions below)
- [ ] Step 2: Generate `aidlc-docs/construction/novels-site/infrastructure-design/infrastructure-design.md`
- [ ] Step 3: Generate `aidlc-docs/construction/novels-site/infrastructure-design/deployment-architecture.md`
- [ ] Step 4: Present completion message and request approval

## Category Applicability Assessment

| Category                  | Applicable? | Justification                                                                                                                                                     |
| ------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deployment Environment    | Yes         | GitHub Pages is the target (requirements.md), but the deployment _mechanism_ still needs a decision — see Question 1                                              |
| Compute Infrastructure    | Minimal     | No app server; the only "compute" is the ephemeral GitHub Actions runner that builds the static site — standard `ubuntu-latest` runner, no sizing decision needed |
| Storage Infrastructure    | N/A         | No database. Content lives in Git; build output is static files served by GitHub Pages — no separate storage service to provision                                 |
| Messaging Infrastructure  | N/A         | No queues/events beyond GitHub Actions' own push/pull_request triggers, already decided in Functional Design (BR-5)                                               |
| Networking Infrastructure | Yes         | Custom domain DNS records need mapping — see Question 3                                                                                                           |
| Monitoring Infrastructure | Yes         | GitHub Actions failure notifications are built-in (NFR Requirements), but external uptime monitoring is an open choice — see Question 4                           |
| Shared Infrastructure     | N/A         | Single unit, single repository, no multi-tenancy                                                                                                                  |

## Questions

### Question 1 — GitHub Pages Deployment Mechanism

How should the build get published to GitHub Pages?

A) **Native GitHub Pages Actions deployment** (recommended) — using `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`; no `gh-pages` branch needed, deployment shows up as a proper GitHub "Environment"

B) **Legacy branch-based deployment** — build output committed/pushed to a `gh-pages` branch (e.g., via a third-party action), which GitHub Pages then serves

C) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 2 — Repository Visibility

GitHub Pages custom domains and giscus (GitHub Discussions-backed comments) both require the repository to be public (unless on a paid GitHub plan with Pages support for private repos). Confirm:

A) The repository is/will be public

B) The repository needs to stay private — flag this, since it changes both the Pages and giscus setup

[Answer]: A

### Question 3 — Custom Domain DNS Setup

`forgottentranslations.online` is an apex/root domain (no `www.` prefix). GitHub Pages requires apex domains to point to GitHub's IP addresses via `A`/`AAAA` records (a `CNAME` record isn't allowed at the apex by DNS rules). Should the site also support `www.forgottentranslations.online`?

A) Apex domain only (`forgottentranslations.online`) — set the 4 required `A` records (and `AAAA` for IPv6) at the DNS provider; no `www` subdomain

B) Apex domain + `www` redirect — same `A`/`AAAA` records for the apex, plus a `CNAME` record for `www` pointing to `<github-username>.github.io`, so `www.forgottentranslations.online` also resolves (GitHub Pages will redirect it to the apex automatically once both are configured)

C) Other (please describe after [Answer]: tag below)

[Answer]: B

### Question 4 — Uptime Monitoring

Beyond GitHub Actions' built-in failure notifications (build/deploy errors), do you want external uptime monitoring for the live site itself?

A) No — GitHub Pages' own reliability plus Actions failure notifications are sufficient for a hobby project (recommended — avoids adding another third-party account/service to maintain)

B) Yes — add a free external uptime monitor (e.g., UptimeRobot) that pings the site periodically and alerts by email if it goes down

C) Other (please describe after [Answer]: tag below)

[Answer]: A
