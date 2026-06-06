# CHANGELOG_AI.md

Purpose: Append-only historical record of important site events and AI-completed work for MechKeysHub.

Update Rule: Do not rewrite or remove historical entries. Add new entries at the top of the log when Claude, ChatGPT, or Codex completes an important project task.

## Append-Only Log

### 2026-06-06 - Product Card UX Consistency Preview Fixes

Type: Frontend and affiliate UX consistency fix

Completed Items:

- Removed duplicate product image `alt` attributes from `60_percent.html` and `best-value.html`, keeping product-name alt text only.
- Unified product rating display to `/5` across homepage, layout pages, category pages, brand pages, search results, compare tooling, and the 60% vs 75% Compare affiliate recommendation section.
- Replaced missing-rating fallback `4.5` displays with `N/A` handling on category and search product cards.
- Normalized product price display so numeric product prices render as `$XX.XX` and zero or missing prices render as `Check current price`.
- Unified Amazon purchase CTA copy to `Check Price on Amazon →` while preserving existing Amazon URLs and `tag=mechkeyshub-20` affiliate tags.
- Confirmed no URL structure, canonical, sitemap, robots, Schema, Compare page body structure, or affiliate tag rule changes were included.

Preview or Production: Preview

### 2026-06-06 - Header and Navigation UI Production Release

Type: Production release

Completed Items:

- Merged the confirmed Header / Navigation unification and `search.html` usability fix into `main`.
- Published the unified Header / Navigation and visible Search page input to Production.
- Confirmed searches for `keychron` and `silent` return results, no-result searches show an empty state, and Amazon result links continue to use `tag=mechkeyshub-20`.
- Confirmed no new Compare page, body content rewrite, URL structure, canonical, sitemap, robots, Schema, or affiliate link rule changes were included.

Preview or Production: Production

### 2026-06-06 - Search Page Usability Preview Fix

Type: Search and navigation usability fix

Completed Items:

- Added a clearly visible body search form to `search.html` so the Header Search navigation entry leads to a usable search page on desktop, tablet, and mobile.
- Added live search behavior for typed queries while preserving the existing `/search.html?q=` URL pattern and SearchAction schema.
- Confirmed searches for `keychron` and `silent` return results, no-result searches show an empty state, and Amazon result links continue to use `tag=mechkeyshub-20`.
- Re-verified the unified Header / Navigation across the priority pages and responsive widths without restoring the old desktop header search box.
- Confirmed canonical URLs, sitemap, robots, Schema, affiliate links, and the 60% vs 75% Compare page body content were not changed.

Preview or Production: Preview

### 2026-06-05 - Header and Navigation UI Unification

Type: Navigation UI update

Completed Items:

- Unified the site header visual style, logo treatment, desktop navigation, and mobile hamburger navigation around the newer `/compare/60-vs-75-keyboard.html` pattern.
- Applied the unified navigation to the homepage, layout pages, category/function pages, guide pages, brand pages, compare pages, and the top-level brands redirect page.
- Kept Search as a navigation link instead of a persistent desktop search box to avoid desktop header overflow while preserving a consistent search entry.
- Extended the hamburger breakpoint through 1279px and added a compact desktop navigation rule for 1280px-1399px to preserve 768px-1023px usability and prevent 1280px overflow.
- Confirmed canonical URLs, sitemap, robots, Schema, affiliate links, and the 60% vs 75% Compare page body content were not changed.

Preview or Production: Preview

### 2026-06-05 - Affiliate and Product Data P0/P1 Production Release

Type: Production release

Completed Items:

- Merged the confirmed Affiliate and Product Data P0/P1 fixes into `main`.
- Published the Amazon affiliate URL, missing product URL, `$0` product price, broken Filco image, unavailable product CTA, search result affiliate link, `best-value.html`, and `60_percent.html` runtime fixes to Production.
- Confirmed no Compare Expansion, P2 work, URL structure, canonical, sitemap, robots, or unrelated changes were included.

Preview or Production: Production

### 2026-06-05 - Affiliate and Product Data Preview Blocker Fixes

Type: Affiliate and product data fix

Completed Items:

- Fixed `search.html` search result Amazon CTAs so product links are generated from existing ASINs as standard `/dp/ASIN/?tag=mechkeyshub-20` affiliate URLs.
- Fixed `best-value.html` runtime rendering errors so budget product cards and Amazon purchase buttons render normally.
- Removed the stale `renderProducts` call from `60_percent.html` to eliminate the runtime error while preserving the existing product grid.
- Scoped Amazon URL normalization to the affected `search.html`, `best-value.html`, and `60_percent.html` outputs.
- Confirmed no URL structure, canonical, sitemap, robots, or Production deployment changes were included.

Preview or Production: Preview

### 2026-06-05 - Affiliate and Product Data P0/P1 Fixes

Type: Affiliate and product data fix

Completed Items:

- Removed confirmed 404 Amazon purchase CTAs for unavailable Filco Ninja Majestouch-2 and Filco Majestouch Convertible II listings.
- Replaced the confirmed Filco Majestouch 2 product link with the verified Amazon `/dp/B004VKUSG6/` page and affiliate tag.
- Added standard Amazon `/dp/ASIN/?tag=mechkeyshub-20` URLs to product records that had ASINs but no `url` field.
- Replaced `$0` product prices with `Check current price` instead of fabricating prices.
- Replaced confirmed broken Filco image URLs with either a verified Amazon image or an inline unavailable-image placeholder.
- Added guarded purchase CTA rendering so unavailable products show status text instead of invalid Amazon buttons.
- Confirmed no URL structure, canonical, sitemap, robots, or Production deployment changes were included.

Preview or Production: Preview

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
