# CHANGELOG_AI.md

Purpose: Append-only historical record of important site events and AI-completed work for MechKeysHub.

Update Rule: Do not rewrite or remove historical entries. Add new entries at the top of the log when Claude, ChatGPT, or Codex completes an important project task.

## Append-Only Log

### 2026-06-05 - 60% vs 75% Keyboard Compare Page Production Release

Type: Production release

Completed Items:

- Merged the confirmed 60% vs 75% Keyboard Compare page work into `main`.
- Published the first Compare Expansion page at `/compare/60-vs-75-keyboard.html` to Production.
- Included the workflow copy enhancement for Programming / IDE, Excel / Office, and the 60% learning curve section.
- Confirmed no URL, canonical, schema, FAQ, affiliate product recommendation, affiliate link, or internal link changes were added beyond the confirmed preview scope.

Preview or Production: Production

### 2026-06-04 - 60% vs 75% Compare Workflow Copy Enhancement

Type: Compare page content enhancement

Completed Items:

- Enhanced the Programming and IDE workflow copy with F5, F10, F11, and F12 examples for VS Code and JetBrains IDE usage.
- Enhanced the Excel / Office workflow copy with F2 and F4 spreadsheet examples.
- Strengthened the 60% learning curve section while preserving the existing URL, SEO metadata, schema, FAQ, affiliate recommendations, affiliate links, and internal links.

Preview or Production: Preview

### 2026-06-04 - 60% vs 75% Keyboard Compare Page

Type: Compare page and internal linking update

Completed Items:

- Added the first Compare Expansion content page at `/compare/60-vs-75-keyboard.html`.
- Implemented buyer-focused Quick Verdict, comparison table, workflow sections, learning curve, desk space analysis, affiliate recommendation section, FAQ, FAQPage schema, and BreadcrumbList schema.
- Added internal links to the compare guide from `compare.html`, `60_percent.html`, and `75_percent.html`.
- Added the new Compare URL to `sitemap.xml` using the production SEO domain.

Preview or Production: Preview

### 2026-06-04 - Claude Desktop Critical Audit PC P0 Production Release

Type: Production release

Completed Items:

- Merged the confirmed Claude Desktop Critical Audit PC P0 fixes into `main`.
- Published the Brand affiliate CTA, duplicate HTML/head, homepage social URL, WebSite schema/SearchAction, and search noindex fixes to Production.
- Confirmed no P1/P2 work, Compare Expansion, URL changes, canonical changes, or sitemap changes were included.

Preview or Production: Production

### 2026-06-04 - Claude Desktop Critical Audit PC P0 Fixes

Type: SEO and affiliate CTA fix

Completed Items:

- Fixed invalid Brand page Amazon affiliate CTAs that pointed only to `?tag=mechkeyshub-20`.
- Removed duplicate `<html>` / `<head>` structure remnants from `compare.html`, `guide-beginners.html`, and `guides.html`.
- Corrected homepage social URL metadata to use `https://mechkeyshub.com/` instead of `/index.html`.
- Consolidated homepage WebSite JSON-LD to a single schema with SearchAction targeting `/search.html?q={search_term_string}`.
- Added `noindex,follow` robots meta to `search.html`.
- Confirmed no URL, canonical, sitemap, P1/P2, or Compare Expansion changes were included.

Preview or Production: Preview

### 2026-06-04 - Mobile UX Audit P0 Production Release

Type: Production release

Completed Items:

- Merged the confirmed Mobile UX Audit P0 fixes into `main`.
- Published the Mobile UX P0 navigation, script, compare table, and DOCTYPE fixes to Production.
- Confirmed no P1/P2 work, URL changes, canonical changes, or sitemap changes were included.

Preview or Production: Production

### 2026-06-04 - Mobile UX Audit P0 Fixes

Type: Navigation and compare UX fix

Completed Items:

- Fixed the 768px-1023px navigation dead zone by keeping the mobile menu trigger available through the existing tablet breakpoint.
- Added missing mobile menu triggers to affected pages with existing mobile navigation containers.
- Removed stale mobile menu scripts that referenced non-existent `mobile-menu-btn` and `mobile-menu` IDs.
- Fixed the `compare.html` Best For row so each selected product renders in its own table cell.
- Stabilized the `compare.html` Key Pros row generation.
- Corrected invalid `<!DOCTY` declarations found across top-level HTML pages.

Preview or Production: Preview

### 2026-06-04 - Project Context Sync

Type: Governance context update

Completed Items:

- Reviewed the current `main` branch state against `AGENTS.md`, `PROJECT_CONTEXT.md`, and `CHANGELOG_AI.md`.
- Updated `PROJECT_CONTEXT.md` to reflect completed SEO stabilization, governance setup, GitHub + Vercel workflow establishment, and local repository cleanup.
- Updated Current Phase to Compare Expansion Readiness.
- Updated Milestone Log and Current Priorities with completed items marked as Done.

Preview or Production: Preview

### 2026-06-04 - Repository Cleanup

Type: Affiliate system cleanup

Completed Items:

- Removed unreferenced `ozon*` files and the `ozon-image-proxy` directory from the repository.
- Confirmed no `extract*` files were present for deletion.
- Added root-level `.gitignore` rules for future `ozon*` and `extract*` local residues.
- Confirmed no modified HTML files were present and no website pages were deleted.

Preview or Production: Preview

### 2026-06-04 - Technical SEO Stabilization Baseline

Actors: Claude, ChatGPT, Codex

Summary:

- Domain unification completed.
- Canonical cleanup completed.
- Sitemap cleanup completed.
- Robots cleanup completed.
- Metadata P0/P1 cleanup completed.
- AGENTS.md established.
- PROJECT_CONTEXT.md established.
- Preview-first workflow established.
- GitHub + Vercel workflow established.

Notes:

- The project is currently in the Technical SEO Stabilization phase.
- Future important AI-completed tasks should be appended to this file.
- Production deployment remains out of scope unless explicitly approved.
