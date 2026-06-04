# CHANGELOG_AI.md

Purpose: Append-only historical record of important site events and AI-completed work for MechKeysHub.

Update Rule: Do not rewrite or remove historical entries. Add new entries at the top of the log when Claude, ChatGPT, or Codex completes an important project task.

## Append-Only Log

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
