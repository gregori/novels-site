# Functional Design Plan — Clarification Questions

## Clarification 1: Verifying the build before pushing

On Question 5, you confirmed the build should fail hard on invalid front matter (Option A), but added: "it's interesting to be able to verify the build before pushing the content." This could mean a few different things for how the workflow is set up — I want to nail down which one(s) you want before Infrastructure Design.

### Question 1

How do you want to verify the build before content reaches the live site?

A) A documented local command (e.g., `npm run build`) the translator runs on their machine before pushing, to catch front-matter/build errors early — no extra CI setup needed

B) A) plus: GitHub Actions also runs the build (without deploying) on every Pull Request, so even if you forget to check locally, a broken PR is flagged before merging to main

C) A) plus B) plus: branch protection requiring that PR check to pass before merging to main (strongest guarantee, but adds a small amount of process even for a solo project)

D) Other (please describe after [Answer]: tag below)

[Answer]: B
