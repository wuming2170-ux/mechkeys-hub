# AGENTS.md

Long-term operating rules for the `mechkeys-hub` project.

## Project Identity

- Project name: `mechkeys-hub`
- Production domain: `https://mechkeyshub.com`
- Site type: mechanical keyboard content, comparison, and affiliate website.
- Vercel project name: `mechkeys-hub`

## Engineering Workflow

- Always use a preview-first workflow.
- Do not deploy directly to production.
- Always create a Vercel preview first.
- Standard completion flow for important project updates:
  1. Update `CHANGELOG_AI.md`.
  2. Git Commit.
  3. GitHub Push.
  4. Vercel Preview.
  5. Wait for Production confirmation.
- Merge to `main` only after explicit user confirmation.
- Production deploys require explicit user confirmation.
- Do not rename the repository.
- Do not rename the Vercel project.
- Do not change existing URL structure unless the user explicitly requests it and confirms the SEO impact.
- Do not commit `ozon*` files.
- Do not commit untracked local crawl files.
- Do not commit temporary scripts.
- Do not commit local cache files.
- Keep changes scoped to the user's request.

## CHANGELOG_AI.md Maintenance Rules

- After completing any important project update, update `CHANGELOG_AI.md`.
- Important project updates include:
  - SEO fixes
  - Compare pages
  - Guide pages
  - navigation adjustments
  - internal linking adjustments
  - affiliate system adjustments
  - Finder / Tool features
  - Production releases
- `CHANGELOG_AI.md` is append-only.
- Do not delete historical records.
- Do not overwrite historical records.
- Do not rewrite old entries.
- Each `CHANGELOG_AI.md` record must include:
  - date
  - type
  - completed items
  - Preview or Production

## SEO Domain Rules

- The only production SEO domain is `https://mechkeyshub.com`.
- Never use `mechkeys-hub.com` for SEO metadata or absolute internal URLs.
- Never use `vercel.app` domains for SEO metadata or absolute internal URLs.
- Use `https://mechkeyshub.com` for:
  - canonical URLs
  - sitemap URLs
  - `robots.txt`
  - `og:url`
  - `twitter:url`
  - JSON-LD
  - `SearchAction`
  - structured data
  - metadata
  - internal absolute URLs
- The homepage canonical must be `https://mechkeyshub.com/`.
- Do not use `/index.html` as the homepage canonical.

## SEO Implementation Rules

- Prioritize static HTML for SEO pages.
- Compare pages, guides, reviews, and use-case pages should not rely on JS-only content for SEO-critical text.
- Avoid large-scale generation of low-quality affiliate pages.
- Avoid bulk AI thin content.
- Avoid undifferentiated product dumps.
- Avoid automatically generating hundreds of SEO pages.
- Current content priority:
  - comparison pages
  - keyboard guides
  - switch guides
  - high-intent SEO content
  - topical authority growth

## Content Strategy

`mechkeys-hub` is not a generic Amazon affiliate product site. The long-term goal is to build a vertical mechanical keyboard content and comparison platform.

Prioritize these content types:

1. Compare pages
   - `X vs Y`
   - layout comparisons
   - switch comparisons
2. High-intent guides
   - best keyboard under `$100`
   - keyboards for programming
   - keyboards for office
   - keyboards for Mac
   - silent keyboards
3. Switch knowledge
   - linear vs tactile
   - Cherry MX vs Gateron
   - sound profile explanations
4. Finder and tool content
   - keyboard finder
   - switch finder
   - layout selector

## Current SEO Phase

The site has recently completed:

- canonical cleanup
- sitemap cleanup
- production-domain unification
- `vercel.app` redirects
- duplicate metadata cleanup

Google is currently reconsolidating canonical and indexing signals. During this phase, avoid disruptive changes.

Do not do the following unless the user explicitly asks and confirms the risk:

- large-scale content expansion
- URL restructuring
- CMS restructuring
- architecture restructuring
- one-time mass page generation

Current priorities:

1. Stabilize SEO signals.
2. Fix metadata issues.
3. Add small batches of high-quality comparison pages.
4. Grow topical authority steadily.

## Deployment Rules

- Create preview deployments only unless production is explicitly approved.
- Do not promote or alias a preview to production without explicit confirmation.
- Do not rely on preview or `vercel.app` URLs in committed SEO metadata.
