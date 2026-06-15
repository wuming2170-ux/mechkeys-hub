# TKL vs 75% Keyboard Compare Page Spec
- **Project:** MechKeysHub
- **Target URL:** `/compare/tkl-vs-75-keyboard.html`
- **Page Type:** Compare / Buyer Decision Guide
- **Status:** Approved for Codex Preview Implementation
- **Production:** Not approved yet — requires Vercel Preview + ChatGPT review + user confirmation
- **Source:** Claude final spec + ChatGPT review
- **Date:** 2026-06-15
---
## Directory Note
`docs/specs/` does not currently exist in the repository. Codex must create the directory before saving this file. Do not create any other files or directories outside the scope listed below.
---
## Codex Execution Scope
### Codex should create:
- `/compare/tkl-vs-75-keyboard.html` — new Compare page
- `sitemap.xml` — add one new URL entry for the new page (production domain only)
- `CHANGELOG_AI.md` — append one Preview entry after implementation
### Codex must NOT modify:
- `compare/60-vs-75-keyboard.html`
- Any existing page body copy
- Any existing canonical URLs
- `robots.txt`
- Any existing URLs already in `sitemap.xml`
- `search.html`
- Any existing product cards outside the new page
- `AGENTS.md`
- `PROJECT_CONTEXT.md`
---
## Page SEO Metadata
```html
<title>TKL vs 75% Keyboard: Which Layout Should You Actually Buy? | MechKeysHub</title>
<meta name="description" content="TKL keeps a full nav cluster and standard keycap sizes. 75% saves desk space and gains mouse room. Here's who should pick each — and who will regret getting it wrong.">
<link rel="canonical" href="https://mechkeyshub.com/compare/tkl-vs-75-keyboard.html">
<meta property="og:url" content="https://mechkeyshub.com/compare/tkl-vs-75-keyboard.html">
<meta name="twitter:url" content="https://mechkeyshub.com/compare/tkl-vs-75-keyboard.html">

H1:

TKL vs 75% Keyboard: Which Layout Is Right for Your Workflow?

⸻

Page Positioning

This page must be a Buyer Decision Guide, not a keyboard encyclopedia.

It must:

* Give clear recommendations for specific user types
* Never end with “it depends on your needs” or “both have pros and cons”
* Use real workflow friction examples (Home/End navigation, keycap compatibility)
* Include explicit regret-cost scenarios (who will regret buying TKL, who will regret buying 75%)
* Help users make a final decision between TKL and 75%

It must NOT:

* Read like a spec sheet or Wikipedia entry
* Pad content with generic keyboard history
* List parameters without decision guidance
* Use fabricated ratings or prices

⸻

Page Structure

Section 1: Quick Verdict

Placement: Top of page, high-contrast callout block.

Content requirements:

* Most users should start by considering 75%. It keeps a full F row, independent arrow keys, and a compressed navigation column — while saving approximately 1.5 inches of desk width compared to TKL. For gamers, programmers, and students, the functional loss is minimal and the space gain is real.
* TKL has two scenarios where it genuinely outperforms 75%:
    1. Heavy keyboard navigation in Excel, Word, or large documents (Home / End / PgUp / PgDn used dozens of times per hour). TKL’s independent nav cluster has zero learning curve; 75%’s compressed right column requires adjustment and some users never fully adapt.
    2. Keycap compatibility. TKL uses fully standard keycap sizes. 75% right-column keys use non-standard sizes — many popular keycap sets do not include them.
* Final line: “Not sure? Start with 75%. If you live in Excel or care about keycap sets, choose TKL.”
* Do not write: “It depends on your needs.” Do not write: “Both have pros and cons.”

⸻

Section 2: Side-by-Side Comparison Table

Include the following rows:

Feature	TKL (80%)	75%
Key Count	87 keys	81–84 keys
Width	~14–15 inches	~12–13 inches
F Row (F1–F12)	Full, standard spacing	Full, standard spacing
Arrow Keys	Independent, with gap	Independent, bottom-right corner
Nav Cluster (Home/End/Insert/PgUp/PgDn)	Full independent block	Compressed right column, usually no Insert
Mouse Space	Standard	~1.5 inches more
Keycap Compatibility	Fully standard, all keycap sets	Non-standard right column, limited sets
Programming Workflow	Excellent	Excellent (minor adjustment)
Excel / Heavy Text Navigation	Best	Requires adjustment (1–2 weeks)
FPS Gaming	Good	Better (more mouse room)
Custom Keycaps	Best (universal)	Limited by non-standard sizes
Beginner Friendly	Highest (zero position changes)	High (minor adjustment)
Portability	Average	Good

⸻

Section 3: The Real Difference Nobody Talks About — The Navigation Cluster

H3: What TKL Keeps That 75% Compresses

TKL has a fully independent nav cluster: Insert, Home, End, PgUp, PgDn, Delete — physically separated from the main key block with a gap. 75% compresses this into a single right-side column with no gap, and usually removes Insert entirely. The exact placement of these compressed keys varies between 75% models, which means switching between different 75% boards can reset muscle memory.

H3: Who Actually Notices

This is a frequency question. If you press Home/End more than 50 times per day — accounting, finance, content editing, legal documents — TKL’s advantage is persistent and real. If you mostly click to navigate with a mouse, the difference is negligible and most users adapt to 75% in 3–5 days.

H3: The Keycap Compatibility Issue

75% keyboards use non-standard key sizes on the right column (commonly 1.75U Right Shift and non-standard Delete). Many popular aftermarket keycap sets do not include these sizes. Users who buy a 75% keyboard and then purchase a keycap set may discover the right-column keys are missing from the kit. TKL uses fully standard sizes — any keycap set works without exceptions.

Write this as practical buyer advice, not a technical specification.

⸻

Section 4: Who Should Buy Each Layout

H3: Choose 75% If You Are…

* FPS Gamer — The extra ~1.5 inches of mouse space lets the mouse sit closer to the body’s centerline, reducing arm extension during wide sweeps. Especially valuable at low DPI settings.
* Programmer / Developer — Full F row preserved (F5 run, F9 breakpoint, F10 step over, F11 step into, F12 go to definition). Arrow keys independent. Most IDE shortcuts require no remapping. Mouse space bonus for users who switch between keyboard and mouse frequently.
* Student — Limited desk space is common. 75% is more practical on small desks and in shared spaces. Home/End usage is occasional rather than constant, making adaptation low-cost.
* First-time compact keyboard buyer — 75% is the smoothest transition from full-size: F row complete, arrow keys independent, nav keys present (just compressed). Functional loss is minimal.
* Anyone with limited desk space — Smaller keyboard means more mouse room and less clutter, regardless of use case.

H3: Choose TKL If You Are…

* Heavy Excel / Spreadsheet User — Ctrl+Home, Ctrl+End, PgUp, PgDn, and Home/End are used constantly. TKL’s independent nav cluster means zero relearning. For users performing hundreds of cell navigation actions per day, this is a meaningful daily difference.
* Writer / Content Editor — Frequent use of Home/End to jump between line start and end. TKL’s nav cluster matches full-size muscle memory exactly.
* Keycap Enthusiast — If you plan to replace keycaps now or in the future, TKL’s standard sizing means virtually unlimited compatibility. 75%’s right column creates real constraints with popular sets.
* User Who Wants Zero Learning Curve — TKL removes only the numpad. Every other key — position, size, spacing — is identical to a full-size keyboard.

H3: Who Should NOT Buy 75%

* Users who use Home/End/PgUp/PgDn dozens of times per hour and do not want to rebuild muscle memory
* Users who have already purchased a keycap set that does not include 75% right-column sizes
* Users whose workflow requires a dedicated Insert key (most 75% layouts omit it)
* Users who rely on Scroll Lock for specific software

H3: Who Should NOT Buy TKL

* FPS gamers with limited desk space — the 1.5-inch mouse space difference is real during gameplay
* Users who already adapted to 60% or 65% layouts — TKL will feel wide by comparison
* Users where the desk setup is tight on the right side — TKL’s nav cluster extension adds meaningful width

⸻

Section 5: Workflow Breakdown

H3: Programming & Software Development

Recommendation: Both work well. 75% has a slight edge for most developers.

Both layouts keep a full F row. F5, F9, F10, F11, F12 work identically on both. 75%‘s mouse space advantage benefits developers who frequently switch between keyboard and mouse. TKL’s nav cluster benefits developers who navigate large codebases using Home/End keyboard shortcuts rather than the mouse. Either layout works with no significant productivity cost for most programming workflows.

H3: Office Work & Spreadsheets

Recommendation: TKL. The nav cluster advantage is real for heavy spreadsheet users.

Excel and Google Sheets rely heavily on Ctrl+Home, Ctrl+End, PgUp, PgDn, and Home/End for navigation. On TKL, these are in the standard positions learned on full-size keyboards — zero retraining. On 75%, the compressed right column places these keys in different positions and removes the physical spacing gap that aids blind navigation. Users performing frequent cell jumps will notice the difference, and some users find the 75% layout persistently awkward for this use case even after weeks of use.

H3: FPS Gaming

Recommendation: 75%. More mouse room is a practical advantage.

FPS gameplay uses WASD and a few F-row keys. The keyboard’s nav cluster is largely irrelevant during a gaming session. The extra ~1.5 inches of mouse room from a 75% keyboard allows the mouse to sit closer to the body’s centerline, which reduces shoulder strain and can improve precision for low-DPI players during wide sweeps. TKL is also a strong FPS layout, but 75% has a clear ergonomic edge in this scenario.

H3: MMO / Strategy Gaming

Recommendation: TKL slight edge, or equal.

MMO and RTS players often use more complex keybindings and may assign functions to nav cluster keys (Insert, Scroll Lock, Home) as macro triggers. TKL provides more physical keys available for binding without requiring Fn-layer combinations. For most MMO players the difference is minor, but TKL offers more raw key count for complex setups.

H3: Student & General Use

Recommendation: 75%.

Students benefit from the smaller footprint on limited desk space. Home/End usage in document writing is occasional rather than constant, making the 75% adaptation period low cost. The keyboard is also easier to transport or move between locations.

⸻

Section 6: Desk Space — The Numbers

TKL is approximately 14–15 inches wide. 75% is approximately 12–13 inches wide. The difference is roughly 1.5 inches. In practical terms, this is approximately the width of a standard mouse — which is how much additional mouse movement range the 75% layout creates on the right side of the desk. For users with a tight desk setup or who game at low DPI, this extra space is directly usable.

Keep this section concise. The Quick Verdict already covers the core point.

⸻

Section 7: Affiliate Product Recommendations

Placement: After the comparison table and workflow sections. Before FAQ. Two-column layout (TKL | 75%), three tiers per column.

Affiliate Link Requirements (Hard Rules)

* All Amazon links must use format: /dp/ASIN/?tag=mechkeyshub-20
* CTA label on all buy buttons: Check Price on Amazon →
* Do NOT use: href="?tag=mechkeyshub-20" (no ASIN placeholder)
* Do NOT use: “View on Amazon” or any other CTA variant
* Do NOT use: Wooting 80HE as an Amazon affiliate recommendation (Wooting has no official Amazon channel)
* Do NOT use: Keychron C2 Pro as TKL Budget (C2 Pro is 100% full-size)
* Do NOT use: Keychron C3 Pro as 75% Budget (C3 Pro is TKL/80%)

Codex Must Verify Before Writing Any Product Into the Page

For each product selected from the candidates below, Codex must confirm all of the following before writing the product into the HTML:

1. Amazon product page is real and currently accessible
2. Product is in stock or listed as currently available
3. ASIN is correct and matches the product
4. Layout is confirmed as TKL (for TKL column) or 75% (for 75% column) — not 65%, not 80HE, not full-size
5. Price roughly matches the target tier range
6. Product rating is 4.0/5 or higher on Amazon — if not, do not use this product; select an alternative from the candidates or find a comparable substitute
7. Affiliate URL uses /dp/ASIN/?tag=mechkeyshub-20 format
8. If a candidate is unavailable or does not pass verification, select a comparable in-stock alternative and document the substitution in CHANGELOG_AI.md

⸻

TKL Recommendations

TKL — Budget Pick (Target: $40–$70)

Candidate products (Codex selects one after verification):

* Keychron C3 Pro (TKL layout, ~$45–$55, wired, hot-swap, QMK/VIA)
* Corsair K60 RGB TKL (~$50, Corsair official Amazon channel, TKL layout)
* Redragon K552 series TKL (~$40–$50, entry-level mechanical, confirm hot-swap variant availability)

Codex selects one verified candidate. If none pass verification at time of implementation, find a comparable TKL keyboard under $70 with rating ≥ 4.0 and document the substitution.

TKL — Best Value Pick (Target: $90–$130)

Candidate products:

* Keychron K8 Pro (~$110–$120, wireless TKL, QMK/VIA, aluminum frame, hot-swap, Keychron official Amazon store)
* Keychron K8 Max (~$115, wireless TKL, QMK/VIA, hot-swap, Keychron Amazon listing)
* Keychron K8 HE TKL (~$130, wireless TKL, Hall Effect switches, QMK/VIA, Keychron Amazon listing)

Note: K8 Pro has multiple variants (switch type, color). Codex selects the main wired+wireless hot-swap variant when a specific ASIN passes verification. For the preview fix, K8 Max was rejected because the repository Amazon crawl rating was 3.5/5, below the requested 4.0/5 threshold. Keychron K8 HE TKL ASIN B0DY17T591 was selected instead because the Amazon /dp/ASIN/ endpoint was reachable and repository Amazon crawl data confirmed Keychron branding, TKL naming, $129.99 price, and 4.5/5 rating.

TKL — Premium Pick (Target: $150–$220)

Candidate products (Codex selects one after verification):

* Razer Huntsman V3 Pro TKL (~$190, optical switches, competitive gaming focus, Razer official Amazon store)
* Logitech G515 TKL (~$130, low-profile wireless, gaming and office dual-use)
* Corsair K70 RGB TKL Max or current equivalent (~$180–$200)

Preferred: Razer or Logitech (most stable official Amazon channel). Codex verifies and selects one.

⸻

75% Recommendations

75% — Budget Pick (Target: $60–$90)

Candidate products (Codex selects one after verification):

* Keychron V1 (~$70–$80, 75% layout, wired, hot-swap, QMK/VIA, entry-level custom-style board, Keychron Amazon store)
* Keychron V1 Max (~$90, 75% layout, wireless version, if within target price range)
* Epomaker TH80 / TH80 Pro (~$60–$80, 75% layout, hot-swap, RGB, available on Amazon)
* Aula F75 (~$60–$70, 75% layout, hot-swap, tri-mode wireless, entry-level value)

Codex confirms layout is 75% (not TKL, not 65%) before selecting. If none pass verification, find a comparable 75% keyboard under $90 with rating ≥ 4.0 and document the substitution.

75% — Best Value Pick (Target: $120–$150)

Candidate products:

* NuPhy Halo75 V2 (~$130, wireless tri-mode, gasket mount, 75% layout, available on Amazon)
* Keychron K2 HE (~$130–$140, Hall Effect switches, Rapid Trigger, wireless, 75% layout, available on Amazon)

Both candidates pass general verification. Codex confirms current in-stock status and ASIN for each. May list both if both pass, with a brief note on the difference (NuPhy for general use, K2 HE for gaming/Hall Effect users).

75% — Premium Pick (Target: $200+)

Candidate products:

* Keychron Q1 Max (~$219, full aluminum, gasket mount, wireless tri-mode, rotary knob, QMK/VIA, 75% layout, Keychron Amazon flagship store)

Codex confirms current in-stock status, ASIN (select primary color/switch variant), and price. Confirms layout is 75%.

⸻

Section 8: Internal Links

The new page must include links to the following existing pages. Do not modify those pages in this task — internal links back to this new page should be added to existing pages in a separate future task.

Target Page	Suggested Anchor Text	Placement
/compare/60-vs-75-keyboard.html	“our 60% vs 75% comparison” or “comparing 60% vs 75%”	Introduction or Related Guides section
/75_percent.html	“browse 75% keyboards” or “all 75% picks”	Near product recommendation section
/tkl.html	“browse TKL keyboards” or “all TKL picks”	Near product recommendation section
/compare.html	“use our keyboard compare tool”	FAQ section or end-of-page CTA
/guide-beginners.html	“new to mechanical keyboards?”	Introduction, for first-time buyers

⸻

Section 9: FAQ

Use exactly these six questions. Write answers inline — do not use vague or hedging language.

Q1: Is 75% or TKL better for gaming?
75% is better for FPS gaming because the shorter width gives the mouse approximately 1.5 more inches of movement range. TKL has a slight edge for MMO and strategy games where extra keys are useful for complex bindings. For most gaming scenarios, 75% is the stronger choice.

Q2: Does a 75% keyboard have all function keys?
Yes. 75% keyboards keep a full F1–F12 row. This is the key difference between 75% and smaller layouts like 60% or 65%, which remove or layer the function row. If you use F-keys for IDE shortcuts, browser tools, or gaming binds, 75% handles them the same way TKL does.

Q3: What keys are missing on a 75% keyboard compared to TKL?
75% keyboards typically remove the dedicated Insert key and Scroll Lock. Home, End, PgUp, and PgDn are kept but compressed into a right-side column without the physical gap that TKL has. The exact position of these keys varies between 75% models.

Q4: Is TKL or 75% better for programming?
Both work well. The F row is identical on both, so IDE shortcuts are unaffected. 75% offers slightly more mouse room for developers who switch between keyboard and mouse frequently. TKL is preferable if you navigate large files using Home/End shortcuts rather than the mouse.

Q5: Can you use any keycaps on a 75% keyboard?
Not always. 75% right-column keys use non-standard sizes (commonly 1.75U Right Shift and a non-standard Delete). Many popular keycap sets do not include these sizes. Verify that a keycap set supports your specific 75% model before purchasing. TKL uses standard sizes and is compatible with virtually all keycap sets.

Q6: How much desk space does a 75% save compared to TKL?
Approximately 1.5–2 inches of width. TKL is roughly 14–15 inches wide; 75% is roughly 12–13 inches wide. In practice, this translates into more mouse movement space to the right of the keyboard, which benefits both ergonomics and gameplay at low mouse sensitivity settings.

⸻

Section 10: Schema Requirements

FAQPage JSON-LD

Required. Generate FAQPage schema for all six FAQ questions and answers listed above. Place in <head> or immediately before </body>. Use https://mechkeyshub.com/compare/tkl-vs-75-keyboard.html as the page URL in any mainEntity references if needed.

BreadcrumbList JSON-LD

Required. Use the following structure:

{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://mechkeyshub.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Compare Keyboards",
      "item": "https://mechkeyshub.com/compare.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "TKL vs 75% Keyboard",
      "item": "https://mechkeyshub.com/compare/tkl-vs-75-keyboard.html"
    }
  ]
}

Do NOT use:

* Product Schema
* Review Schema
* ItemList Schema (for product lists)

Using Product or Review Schema on an editorial comparison page will generate Search Console warnings.

⸻

Section 11: Header, Footer, and Styling Rules

* Use the same header as compare/60-vs-75-keyboard.html (the most recently updated compare page header)
* Use the same footer as compare/60-vs-75-keyboard.html
* Product card styling (if used in the recommendation section) must follow the site-wide Product Card Trust UI standard:
    * Ratings displayed as /5 (not /10)
    * Prices displayed with $ prefix
    * No fabricated ratings — if rating is unknown, display N/A
    * No undefined badge text
    * CTA: Check Price on Amazon →
    * Badge styling: use the same CSS system as existing compare/category pages
* Do not inject duplicate CSS blocks — the nav-link CSS duplication issue from compare/60-vs-75-keyboard.html must not be repeated on this page

⸻

Section 12: Sitemap Entry

Add one entry to sitemap.xml. Use the production domain. Do not modify any other entries.

<url>
  <loc>https://mechkeyshub.com/compare/tkl-vs-75-keyboard.html</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>

⸻

Section 13: CHANGELOG_AI.md Entry

Before committing, append the following Preview entry at the top of CHANGELOG_AI.md. Do not modify any existing entries. Do not write the Production entry until Production is confirmed by the user.

### YYYY-MM-DD - TKL vs 75% Keyboard Compare Page
Type: Compare page
Completed Items:
- Added the second Compare Expansion content page at /compare/tkl-vs-75-keyboard.html.
- Implemented Quick Verdict, comparison table, navigation cluster section, keycap compatibility section, user scenario breakdown, workflow friction analysis, affiliate recommendation section (6 products, 2 layouts × 3 tiers), FAQ, FAQPage schema, and BreadcrumbList schema.
- Added internal links to /compare/60-vs-75-keyboard.html, /75_percent.html, /tkl.html, /compare.html, and /guide-beginners.html from the new page.
- Added new Compare URL to sitemap.xml using the production SEO domain.
- Verified all Amazon affiliate links use /dp/ASIN/?tag=mechkeyshub-20 format.
- Confirmed no modifications to existing pages, canonical URLs, robots.txt, or sitemap existing entries.
Preview or Production: Preview

Replace YYYY-MM-DD with the actual implementation date.

⸻

Verification Checklist

Codex must confirm all items below before submitting the Preview for review.

File Output

* /compare/tkl-vs-75-keyboard.html exists
* docs/specs/TKL_VS_75_COMPARE_SPEC.md exists
* sitemap.xml contains the new production URL entry
* CHANGELOG_AI.md has a new Preview entry appended at the top
* No files were modified outside the approved scope

SEO / Metadata

* <title> matches spec exactly
* <meta name="description"> matches spec exactly (≤160 characters)
* canonical is https://mechkeyshub.com/compare/tkl-vs-75-keyboard.html
* og:url is https://mechkeyshub.com/compare/tkl-vs-75-keyboard.html
* twitter:url is https://mechkeyshub.com/compare/tkl-vs-75-keyboard.html
* No vercel.app domain appears in any metadata or schema
* No mechkeys-hub.com domain appears in any metadata or schema

Schema

* FAQPage JSON-LD is present and contains all 6 FAQ questions
* BreadcrumbList JSON-LD is present with correct 3-level structure
* No Product Schema is present
* No Review Schema is present

Affiliate Links

* All Amazon links use format /dp/ASIN/?tag=mechkeyshub-20
* No link uses href="?tag=mechkeyshub-20" without a valid ASIN
* All CTA button labels read exactly: Check Price on Amazon →
* No CTA reads “View on Amazon”
* Wooting 80HE is not used as an affiliate recommendation
* Keychron C2 Pro is not used as TKL Budget
* Keychron C3 Pro is not used as 75% Budget
* Each recommended product has been verified: real Amazon page, in stock, confirmed layout (TKL or 75%), rating ≥ 4.0/5

Product Card Trust UI

* No product displays $0, 0, or $0.00 as a price
* No product displays undefined as a badge
* All ratings are displayed as /5 (not /10)
* Prices include $ prefix

Technical / Layout

* No horizontal overflow at 390×844 viewport (mobile)
* Browser console shows no JavaScript errors on page load
* CSS blocks are not duplicated (no nav-link style repeated 50+ times)

Scope Integrity

* git diff only includes: /compare/tkl-vs-75-keyboard.html, sitemap.xml, CHANGELOG_AI.md, and docs/specs/TKL_VS_75_COMPARE_SPEC.md
* No other files were modified or created

⸻

Codex Implementation Status

Approved for Preview implementation only.

Production publishing requires all three of the following before proceeding:

1. Successful Vercel Preview deployment
2. ChatGPT review and approval of the Preview
3. Explicit user confirmation to publish to Production

Do not promote or alias the Preview to Production without explicit user confirmation.

::
