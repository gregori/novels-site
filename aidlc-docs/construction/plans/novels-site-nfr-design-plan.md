# NFR Design Plan — Unit: novels-site

## Execution Checklist

- [ ] Step 1: Confirm design pattern decisions (via questions below)
- [ ] Step 2: Generate `aidlc-docs/construction/novels-site/nfr-design/nfr-design-patterns.md`
- [ ] Step 3: Generate `aidlc-docs/construction/novels-site/nfr-design/logical-components.md`
- [ ] Step 4: Present completion message and request approval

## Category Applicability Assessment

| Category             | Applicable?                | Justification                                                                                                                                                                                                                                                                |
| -------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Resilience Patterns  | Partially                  | No owned infrastructure to make resilient (Resiliency Baseline not enforced), but graceful handling of third-party embed failures (giscus, GoatCounter) is still a relevant design concern — see Question 1                                                                  |
| Scalability Patterns | Settled, no new question   | NFR Requirements already fixed content scale (small, no pagination) and confirmed the schema won't need to change if scale grows later — nothing further to design now                                                                                                       |
| Performance Patterns | Yes                        | Caching/offline strategy is an open design choice — see Question 2                                                                                                                                                                                                           |
| Security Patterns    | Partially                  | Security Baseline not enforced, but a lightweight CSP for third-party script origins is a reasonable low-effort hygiene practice — see Question 3                                                                                                                            |
| Logical Components   | Yes (build artifacts only) | No queues/caches/circuit-breakers exist (no backend); the relevant "logical components" are the build-time artifacts (search index JSON, RSS feed XML) already identified in Functional Design — will be inventoried directly in `logical-components.md`, no question needed |

## Questions

### Question 1 — Third-Party Embed Failure Handling

giscus (comments) and GoatCounter (analytics) are both external scripts loaded client-side. If a reader's browser blocks them (ad blocker, offline, script error), how should the page behave?

A) Fail silently — the rest of the page (chapter text, navigation, reading controls) works normally; the comments section or analytics simply don't load, with no visible error to the reader (recommended — simplest, no extra code, matches a calm reading-focused UI)

B) Show a small inline fallback message where comments would appear (e.g., "Comments unavailable") if giscus fails to load

C) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 2 — Caching / Offline Strategy

Should the site do anything beyond relying on GitHub Pages' default HTTP caching?

A) Keep it simple — rely on GitHub Pages' default caching headers and the browser's normal HTTP cache; no service worker (recommended — avoids the complexity/staleness pitfalls of offline caching for a small hobby project)

B) Add a service worker for offline reading (previously-visited chapters remain readable without a connection) — more useful for mobile readers with spotty connections, but adds meaningful complexity (cache invalidation on new deploys, etc.)

C) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 3 — Content Security Policy

Should the site set a basic Content-Security-Policy restricting which external origins can load scripts (limited to giscus + GoatCounter + self), as a lightweight hygiene measure even though the Security Baseline extension isn't formally enforced?

A) Yes, add a basic CSP meta tag allow-listing only the known third-party origins (giscus, GoatCounter) plus self — low effort, reduces blast radius if a dependency is ever compromised

B) No, skip CSP for now — keep the initial build simpler, can be added later without restructuring anything

C) Other (please describe after [Answer]: tag below)

[Answer]: A
