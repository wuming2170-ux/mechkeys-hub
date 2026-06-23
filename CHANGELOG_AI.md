# CHANGELOG_AI.md

Purpose: Append-only historical record of important site events and AI-completed work for MechKeysHub.

Update Rule: Do not rewrite or remove historical entries. Add new entries at the top of the log when Claude, ChatGPT, or Codex completes an important project task.

## Append-Only Log

### 2026-06-23 - Silent Linear vs Silent Tactile Sitemap Entry
Type: Sitemap update
Completed Items:
- Added sitemap entry for `silent-linear-vs-silent-tactile.html` guide page.
- Page HTML, product data, Amazon links, affiliate tags, CTA wording, robots, search, and guide pages were not modified.
- Production was not published and browser automation was not run.
Preview or Production: Preview

### 2026-06-23 - Silent Linear vs Silent Tactile Readability Modules
Type: Silent switch guide readability update
Completed Items:
- Added Quick Decision Cards after the hero to help users choose between silent linear and silent tactile switches faster.
- Added a lightweight CSS/text diagram explaining downstroke, internal dampening, and upstroke noise reduction.
- Added Use Case Cards for open offices, video calls, writers and programmers, and shared rooms.
- Kept canonical, metadata, FAQPage schema, product data, Amazon links, product cards, and prices unchanged.
- Production was not published and browser automation was not run.
Preview or Production: Preview

### 2026-06-23 - Silent Linear vs Silent Tactile Guide Preview
Type: Silent switch guide page
Completed Items:
- Created `silent-linear-vs-silent-tactile.html` as an informational guide page explaining silent linear versus silent tactile switches.
- Added an internal link from `silent.html` to the new guide page.
- Added FAQPage and BreadcrumbList structured data for the new guide page.
- Product data, Amazon links, affiliate tags, and CTA wording were not modified.
- No fixed prices, product cards, product rankings, or Amazon CTAs were added.
- Production was not published and browser automation was not run.
Preview or Production: Preview

### 2026-06-22 - Gaming Recommendation Visual Alignment
Type: Gaming recommendation visual consistency
Completed Items:
- Aligned `gaming.html` with the Production `best-value.html` recommendation template using the same amber CTA and badge color system.
- Matched Featured card radius, border, hover, and image-frame styling to the reference page.
- Matched More Keyboards card hierarchy, image height, muted borders, hover treatment, and CTA styling to the reference page.
- Refined Hero and section spacing while preserving page structure, content, products, ASINs, and recommendation counts.
- Product JSON, Amazon links, affiliate tags, CTA wording, Best Value, Compare pages, sitemap, robots, search, documentation, and recommendation products were not modified.
- Production was not published and browser automation was not run.
Preview or Production: Preview

### 2026-06-22 - Gaming Zero Price Data Cleanup
Type: Gaming recommendation data cleanup
Completed Items:
- Removed 15 unused `$0` price fields from the legacy `topProducts` data embedded in `gaming.html`.
- Kept the page free of fixed price display without substituting any replacement prices.
- Preserved the five Featured Picks, eight More Keyboards, Amazon CTA wording, affiliate tags, FAQPage schema, canonical URL, and metadata.
- Product JSON files, Amazon link source data, Best Value, Compare pages, sitemap, robots, search, guide pages, and documentation were not modified.
- Production was not published and browser automation was not run.
Preview or Production: Preview

### 2026-06-22 - Gaming Editorial Recommendations Preview
Type: Gaming product recommendation page
Completed Items:
- Reworked `gaming.html` into the standard recommendation structure with Hero, Quick Picks, five static Featured Picks, eight More Keyboards, How to Choose, FAQ, and Related Links.
- Matched each Featured Pick to a distinct gaming user need: budget entry, all-around gaming, wireless gaming, competitive FPS, and affordable Rapid Trigger.
- Added visible FAQ content and matching FAQPage structured data, while preserving the production canonical at `https://mechkeyshub.com/gaming.html`.
- Kept all product cards free of fixed price display and retained `Check Price on Amazon →` CTAs with `tag=mechkeyshub-20`.
- Product JSON files, Amazon link source data, affiliate tags, CTA wording, Compare pages, sitemap, robots, search, guide pages, and documentation were not modified.
- Production was not published and browser automation was not run.
Preview or Production: Preview

### 2026-06-22 - Featured Picks User Need Matching Standard
Type: Product recommendation documentation
Completed Items:
- Added User Need Matching rules for Featured Picks.
- Documented slot-level user intent for `best-value.html` recommendations.
- Added User Need Matching checks to the recurring Featured Picks review process.
- No HTML, product data, Amazon links, or CTA changes were made.
- Production was not published and browser automation was not run.
Preview or Production: Preview

### 2026-06-18 - Featured Picks Review Standard
Type: Product recommendation documentation
Completed Items:
- Added `docs/FEATURED_PICKS_REVIEW.md` to define recurring Featured Picks editorial reviews while keeping the page UI fixed.
- Defined Keep, Watch, and Replace statuses, page-specific review frequencies, and the required product review checklist.
- Recorded the 2026-06-18 `best-value.html` review statuses and the next review date of 2026-07-18.
- Limited each review to replacing no more than 1–2 Featured Picks.
- HTML, product JSON, and Amazon links were not modified.
- Production was not published and browser automation was not run.
Preview or Production: Preview

### 2026-06-18 - Best Value More Keyboards Rendering Fix
Type: Product recommendation rendering fix
Completed Items:
- Made the More Keyboards to Consider selection deterministic with 10 existing product ASINs and a fallback fill path.
- Added DOM readiness and container checks for both Featured Picks and More Keyboards rendering.
- Confirmed the page renders 6 Featured Picks and 10 More Keyboards without changing product JSON, Amazon affiliate tags, or CTA wording.
- Preview only, not Production.
Preview or Production: Preview

### 2026-06-18 - Best Value Product Recommendation Page Standard Finalization
Type: Product recommendation page standard
Completed Items:
- Finalized best-value as the product recommendation page standard.
- Updated the positive meta description and matching Open Graph description.
- Added FAQPage schema matching the three visible FAQ entries.
- Added the product recommendation page standard document.
- Preview only, not Production.
Preview or Production: Preview

### 2026-06-18 - Best Value Featured Picks Product Correction
Type: Editorial recommendation correction
Completed Items:
- Replaced the Bulk Packaging Logitech MX Mechanical pick with retail ASIN B09LK1P1RD for Best for Office.
- Replaced the full-size Keychron K10 Max with Keychron K8 HE TKL ASIN B0DY17T591 for Best Wireless.
- Replaced the lower-recognition TMKB Hall Effect pick with Razer Huntsman Mini ASIN B0F2GVF5HC for Best for Gaming.
- Retained AULA F75 Pro Wireless, Redragon K631, and Ducky One 3 SF Daybreak after reviewing current repository product evidence and category fit.
- Confirmed all six Featured Picks exist in repository JSON with ratings, images, and Amazon links.
- Removed the excluded Bulk Packaging SKU from the best-value page's embedded product collection so it cannot reappear in the supplemental grid.
- Product JSON files, affiliate tag, CTA wording, compare pages, sitemap, robots, and search page were not modified.
- Production was not published and browser automation was not run.
Preview or Production: Preview

### 2026-06-17 - Best Value Editorial Picks Preview
Type: Best Value page editorial structure pilot
Completed Items:
- Updated the homepage Best Value entry from a fixed-price-positioned label to Editor's Top Picks.
- Updated homepage description metadata to remove the fixed budget claim.
- Reworked best-value.html from a long budget product list into an editor-curated guide with Hero, Quick Picks, Featured Picks, More Keyboards to Consider, How to Choose, FAQ, and Related Links.
- Selected six Featured Picks from existing best-value.html product data only.
- Product JSON data was not modified.
- Amazon links and affiliate tags were not modified.
- CTA text remains Check Price on Amazon →.
- Compare child pages, sitemap.xml, robots.txt, search.html, use-case pages, layout pages, and brand pages were not modified.
- Production not published.
- Browser automation skipped.
Preview or Production: Preview

### 2026-06-16 - Product Card Hardcoded Price Display Removal Production Release
Type: Production release
Completed Items:
- Removed hardcoded Amazon price display from product cards published to Production.
- Product JSON data was not modified.
- Amazon links and affiliate tags were not modified.
- CTA text remains Check Price on Amazon →.
- Compare child pages were not modified.
- sitemap.xml / robots.txt / search.html were not modified.
- Production URL: https://mechkeyshub.com
- commit: 173714912f11f3780b92bb34b41989a9a79d8655
- browser automation skipped.
Preview or Production: Production

### 2026-06-16 - Product Card Hardcoded Price Display Removal
Type: Product card trust and affiliate display fix
Completed Items:
- Removed hardcoded Amazon price display from product cards.
- Product JSON data was not modified.
- Amazon links and affiliate tags were not modified.
- CTA text remains Check Price on Amazon →.
- Compare child pages were not modified.
- Production not published.
- Browser automation skipped.
Preview or Production: Preview

### 2026-06-17 - Product Card UI Consistency Cleanup Production Release

Type: Production release

Completed Items:

- Published the product card UI consistency cleanup to Production after Preview confirmation.
- Released the best-value Price Comparison table removal.
- Released the product card tier/badge placeholder prevention.
- Confirmed product JSON data, Amazon links, affiliate tags, CTA text, Compare pages, sitemap, robots, search, guide pages, and P0 layout body content were not modified for the Production deploy.
- Browser automation remained skipped.

Preview or Production: Production

### 2026-06-16 - P0 Layout and Guide Metadata Production Release
Type: Production release
Completed Items:
- P0 layout factual fixes published to Production.
- 65_percent.html corrected to explain dedicated arrow keys and no function row.
- tkl.html corrected to explain TKL removes only the numpad and keeps F-row / arrows / nav cluster.
- full-size.html corrected to explain full-size includes F-row / arrows / nav cluster / numpad.
- 7 guide pages metadata placeholders replaced.
- og:site_name standardized to MechKeysHub in the scoped pages.
- Production URL: https://mechkeyshub.com
- commit: 75977ec9a349a6d821a59fdc1797ebc79f8cacd3
- No changes to compare child pages / sitemap.xml / robots.txt / search.html / product JSON / Amazon links / CTA text.
- Browser automation skipped.
Preview or Production: Production

### 2026-06-16 - P0 Layout Factual Errors and Guide Metadata Fix
Type: Content fact and metadata fix
Completed Items:
- Fixed P0 layout factual errors for 65%, TKL, and full-size pages.
- Replaced placeholder guide metadata for guide pages.
- Standardized og:site_name to MechKeysHub in allowed scoped files.
- No Production published.
Preview or Production: Preview

### 2026-06-16 - TKL / 75% Internal Links and Favicon Production Release
Type: Production release
Completed Items:
- Internal links from TKL / 75% / 60 vs 75 pages to TKL vs 75% comparison published to Production.
- favicon.ico 404 fixed on Production.
- Production URL: https://mechkeyshub.com
- Related pages:
  - https://mechkeyshub.com/tkl.html
  - https://mechkeyshub.com/75_percent.html
  - https://mechkeyshub.com/compare/60-vs-75-keyboard.html
  - https://mechkeyshub.com/favicon.ico
- Published from reviewed commit 84456d78b0cc915051c0d57b320eb4796df09c88.
- Confirmed robots.txt / search.html / product recommendations / Amazon links / CTA copy were not modified.
- Automatic browser verification skipped; mobile check will be completed manually by the user.
Preview or Production: Production

### 2026-06-16 - TKL vs 75% Internal Links and Favicon Fix
Type: Internal linking and favicon fix
Completed Items:
- Added internal links from TKL / 75% / 60 vs 75 pages to TKL vs 75% comparison.
- Fixed favicon.ico 404.
- No Production published.
Preview or Production: Preview

### 2026-06-16 - TKL vs 75% Compare Production Release
Type: Production release
Completed Items:
- TKL vs 75% Compare page published to Production at https://mechkeyshub.com/compare/tkl-vs-75-keyboard.html.
- Compare 分类页已加入 TKL vs 75% 入口 at https://mechkeyshub.com/compare.html.
- Published from reviewed commit 9b0c7f2edc01a09d9672f58e73b0ef369b4fd6c6.
- Affiliate 修复已包含: TKL Best Value 从 Corsair K70 CORE TKL Wireless 改为 Keychron K8 HE TKL.
- Confirmed ASIN B0DY17T591 for the Keychron K8 HE TKL recommendation.
- Claude 最终复审结论: 可发布 Production，无必须修复项.
- Confirmed robots.txt / search.html / compare/60-vs-75-keyboard.html were not modified for this Production release.
Preview or Production: Production

### 2026-06-16 - TKL vs 75% Compare Category Entry
Type: Internal discovery fix
Completed Items:
- Added TKL vs 75% comparison entry to Compare category page.
- Internal discovery fixed before Production.
- Production still not published.
Preview or Production: Preview

### 2026-06-15 - TKL vs 75% Affiliate Picks and Metadata Fix
Type: Affiliate and metadata fix
Completed Items:
- Replaced the TKL Best Value pick from Corsair K70 CORE TKL Wireless to Keychron K8 HE TKL to avoid two Corsair recommendations in the TKL section.
- Verified Amazon /dp/ASIN/ reachability for Keychron K8 HE TKL (B0DY17T591), Keychron K2 HE (B0DCVQBMVP), and Keychron Q1 Ultra 8K (B0G4M99132); Amazon returned anti-bot interstitial content for body scraping, so price/rating/layout details were cross-checked against repository Amazon crawl data and Keychron official layout references.
- Rejected Keychron K8 Max as the TKL Best Value replacement because the repository Amazon crawl rating was 3.5/5, below the requested 4.0/5 threshold.
- Confirmed Keychron K2 HE ASIN B0DCVQBMVP remains a 75% Hall Effect Keychron K2 HE listing in repository Amazon crawl data with $129.99 price and 4.6/5 rating.
- Confirmed Keychron Q1 Ultra 8K ASIN B0G4M99132 remains a 75% / 82-key Keychron Q1 Ultra 8K listing in repository Amazon crawl data with $229.99 price and 4.0/5 rating.
- Updated og:description to match the meta description and standardized og:site_name to MechKeysHub.
Preview or Production: Preview

### 2026-06-15 - TKL vs 75% Compare Preview Route Recovery
Type: Preview route recovery
Completed Items:
- Investigated the reported stale Preview URL for /compare/tkl-vs-75-keyboard.html returning homepage content.
- Confirmed the local Vercel preview build output includes /compare/tkl-vs-75-keyboard.html as a static file.
- Re-created a Vercel Preview from the verified prebuilt output without publishing Production.
- Verified the page content locally at the direct compare URL, including H1, SEO URLs, FAQPage schema, BreadcrumbList schema, 6 Amazon CTAs, affiliate tag preservation, console errors, and 390px mobile overflow.
Preview or Production: Preview

### 2026-06-15 - TKL vs 75% Keyboard Compare Page
Type: Compare page
Completed Items:
- Added the second Compare Expansion content page at /compare/tkl-vs-75-keyboard.html.
- Implemented Quick Verdict, comparison table, navigation cluster section, keycap compatibility section, user scenario breakdown, workflow friction analysis, affiliate recommendation section (6 products, 2 layouts × 3 tiers), FAQ, FAQPage schema, and BreadcrumbList schema.
- Added internal links to /compare/60-vs-75-keyboard.html, /75_percent.html, /tkl.html, /compare.html, and /guide-beginners.html from the new page.
- Added new Compare URL to sitemap.xml using the production SEO domain.
- Verified all Amazon affiliate links use /dp/ASIN/?tag=mechkeyshub-20 format.
- Confirmed no modifications to existing pages, canonical URLs, robots.txt, or sitemap existing entries.
- Substituted Corsair K70 CORE TKL Wireless for Keychron K8 Pro because the current repository-verifiable product data did not include a confirmed K8 Pro ASIN, layout, price, and rating set.
- Substituted Keychron Q1 Ultra 8K for Keychron Q1 Max because the current repository-verifiable product data did not include a confirmed Q1 Max rating, while Q1 Ultra 8K had confirmed 75% layout, ASIN, price, and rating data.
Preview or Production: Preview

### 2026-06-08 - 60% vs 75% Compare CTA Consistency Production Release

Type: Production release

Completed Items:

- Merged the confirmed 60% vs 75% Compare CTA consistency fix into `main`.
- Published the Amazon CTA label update for `/compare/60-vs-75-keyboard.html` to Production.
- Confirmed the existing Amazon URLs, `tag=mechkeyshub-20` affiliate tags, canonical, `og:url`, `twitter:url`, FAQPage schema, BreadcrumbList schema, sitemap, robots, and page body content outside the CTA labels were preserved.

Preview or Production: Production

### 2026-06-08 - 60% vs 75% Compare CTA Consistency Fix

Type: Affiliate CTA consistency fix

Completed Items:

- Standardized the 60% vs 75% Compare page Amazon CTA labels from `View on Amazon` to `Check Price on Amazon →`.
- Preserved the existing Amazon URLs and `tag=mechkeyshub-20` affiliate tags.
- Preserved the page canonical, `og:url`, `twitter:url`, FAQPage schema, BreadcrumbList schema, FAQ, sitemap, robots, and page body content outside the CTA labels.

Preview or Production: Preview

### 2026-06-06 - Product Card Trust UI Consistency Production Release

Type: Production release

Completed Items:

- Merged the confirmed Product Card Trust / UI Consistency fixes into `main`.
- Published the Brand product card `undefined` badge cleanup to Production.
- Preserved product titles, prices, ratings, Amazon URLs, and `tag=mechkeyshub-20` affiliate tags while removing visible dirty badge output.
- Excluded Compare page changes from this Production release per confirmation scope.
- Confirmed no new Compare page, URL structure, canonical, sitemap, robots, Header / Navigation, Compare page body, or affiliate tag rule changes were included.

Preview or Production: Production

### 2026-06-06 - Brand Product Card Undefined Badge Fix

Type: Product card trust and UI consistency fix

Completed Items:

- Removed visible `undefined` product card badges from Brand pages.
- Verified missing badge or switch/feature values are not replaced with fabricated labels.
- Kept product titles, prices, ratings, Amazon URLs, and `tag=mechkeyshub-20` affiliate tags unchanged.
- Confirmed no Header / Navigation, Compare page, canonical, sitemap, robots, URL structure, or Production deployment changes were included.

Preview or Production: Preview

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

### 2026-06-17 - Product Card UI Consistency Cleanup

Type: Product card UI minimal cleanup

Completed Items:

- Removed empty Price Comparison table from best-value page if present.
- Prevented empty product card tier/badge placeholders.
- Product JSON data was not modified.
- Amazon links and affiliate tags were not modified.
- CTA text remains Check Price on Amazon →.
- Production not published.
- Browser automation skipped.

Preview or Production: Preview

### 2026-06-17 - Use-Case and Category Metadata Placeholder Fix

Type: SEO metadata fix

Completed Items:

- Fixed placeholder metadata on use-case/category pages.
- Replaced generic placeholder descriptions.
- Standardized scoped og:site_name to MechKeysHub.
- No product data, Amazon links, CTA, sitemap, robots, search, guide, layout, or compare child pages changed.
- Production not published.
- Browser automation skipped.

Preview or Production: Preview

### 2026-06-18 - Best Value Editorial UI Polish

Type: Editorial page UI refinement

Completed Items:

- Shortened the six Featured Picks display headings while preserving the existing full product names as secondary text.
- Standardized Featured Picks image areas with fixed-height, object-contain presentation and equal-height card layouts.
- Kept Featured Picks CTAs aligned toward the bottom of each card across the desktop grid.
- Removed the sticky header blur treatment and added anchor spacing so navigation does not visually cover editorial content.
- Reduced the visual weight of More Keyboards to Consider and limited long product headings to three lines.
- Product JSON, Amazon links, affiliate tags, and CTA wording were not modified.
- Production was not published and browser automation was not run.

Preview or Production: Preview

### 2026-06-23 - Silent Editorial Recommendation Page Preview

Type: Editorial recommendation page update

Completed Items:

- Rebuilt `silent.html` as a standard static recommendation page with Hero, Quick Picks, Featured Picks, More Keyboards to Consider, How to Choose, FAQ, and Related Links sections.
- Added five user-need-matched Featured Picks for silent overall, budget, office calls, wireless, and tactile quiet typing use cases.
- Added eight curated More Keyboards to Consider entries from existing product data while excluding the five Featured Picks.
- Updated silent page title, meta description, canonical, social metadata, FAQPage schema, and visible FAQ content for the silent keyboard intent.
- Preserved Amazon CTA wording as `Check Price on Amazon →` and used affiliate-tagged Amazon URLs.
- Product JSON, Amazon source data, affiliate tag rules, sitemap, robots, search, guide, compare, best-value, and gaming pages were not modified.
- Production was not published and browser automation was not run.

Preview or Production: Preview
