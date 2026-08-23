# Services

**Note**: Per Application Design plan Q3/A, "services" here are build-time orchestration only — there are no runtime/deployed services in this static-site architecture.

## Site Build Service

**Responsibility**: Orchestrates the full static build from source content to deployable output.

**Orchestration steps**:
1. Content Layer parses and validates all title/chapter front matter
2. Site Generator / Templating renders all pages using the parsed content
3. Search builds the search index from the same parsed content
4. Community & Distribution generates the RSS feed from the same parsed content
5. Output: a complete static output directory ready to publish

**Triggered by**: Build & Deploy Automation, on every push to main (and can be run locally by the translator for previewing).

## Deploy Service

**Responsibility**: Publishes the Site Build Service's output to GitHub Pages.

**Orchestration steps**:
1. Take the static output directory produced by the Site Build Service
2. Include the `CNAME` file for the custom domain `forgottentranslations.online`
3. Publish to the GitHub Pages hosting branch/environment via GitHub Actions

**Triggered by**: Successful completion of the Site Build Service within the GitHub Actions workflow.
