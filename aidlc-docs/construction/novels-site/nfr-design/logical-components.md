# Logical Components — novels-site

**Note**: Per the category applicability assessment in the NFR Design plan, this project has no backend, so there are no queues, server-side caches, or circuit breakers to design. The "logical components" here are the concrete build-time artifacts the Site Build Service (application-design/services.md) produces, plus the client-side runtime pieces that consume them.

## Build-Time Artifacts

| Artifact | Produced By | Consumed By |
|---|---|---|
| Static HTML pages (Home, Catalog, Category Index, Category, Title, Chapter, About) | Site Generator / Templating | Reader's browser |
| `search-index.json` | Search (business-logic-model.md Process 4) | Search widget (client-side, at runtime) |
| `feed.xml` | Community & Distribution (Process 5) | Reader's feed reader app |
| `sitemap.xml` | Astro's built-in sitemap integration | Search engine crawlers |
| Optimized cover images (resized/format-converted) | Astro's built-in image pipeline (NFR Requirements Q6/A) | Catalog, Category, Title pages |
| `CNAME` | Build & Deploy Automation | GitHub Pages (custom domain routing) |

## Client-Side Runtime Pieces

| Component | Loaded On | Failure Mode |
|---|---|---|
| Reading UI Runtime (theme/typography controls) | Every page | Must always work — no external dependency, so no degradation case (see business-rules.md BR-7) |
| Search widget | Pages with `SearchBox` (site-wide header) | If `search-index.json` fails to load, search silently shows no results rather than erroring |
| giscus embed | Chapter pages only | Fails silently per NFR Design Resilience Pattern — comments area stays empty |
| GoatCounter snippet | Every page | Fails silently per NFR Design Resilience Pattern — no analytics recorded for that visit, nothing visible to the reader |

## Explicitly Not Applicable
- **Message queues**: no asynchronous backend processing exists.
- **Server-side caches** (Redis, Memcached, etc.): no server to host one; caching is entirely the browser's HTTP cache plus GitHub Pages' CDN.
- **Circuit breakers**: no service-to-service calls exist within this project's own code; the only external calls (giscus, GoatCounter) are made directly by the reader's browser, not proxied through any component this project controls, and are already covered by the silent-degradation pattern above.
