# Changelog — Universal Age Gate Auto-Bypass

All notable changes to this project will be documented in this format.

## [2.2.1] - 2026-11-16

### Changed
- **Tube8 Removed**: Removed `tube8.com` from supported sites (4 sites remaining: Pornhub, XNXX, XVideos, xHamster)
- Updated `@match` patterns in userscript header to exclude Tube8
- Removed Tube8 site config (simultaneous modal handling, GTM event selectors, cookie pre-setting)
- Removed Tube8 from test matrix and test cases

### Site Configs (4 sites)
- **Pornhub**: video/search/category/channel/pornstar/gif page types, Escape fallback on video
- **XNXX**: combined age gate + cookie consent button, disclaimer overlays
- **XVideos**: data-testid age gate, cookie pre-setting on video pages
- **xHamster**: attribute-based cookie dialog selectors (CSS Modules hash fallback), React-based (no cookie pre-set)

### Known Limitations (unchanged from v2.2.0)
- **No Shadow DOM traversal** — light DOM only (planned for future)
- **No iframe traversal** — same-origin iframes not searched (planned for future)
- **No IAB TCF v2.0 handlers** — CMP frameworks handled via static "accept all" selectors only
- **2 languages only** (EN, FA) — 14-language i18n planned for future
- Cross-origin iframes silently skipped
- WeakMap click records reset on real navigation (fresh start)

## [2.2.0] - 2026-11-16

### Core Infrastructure — Modular Architecture
- **Modular UAG.Engine Architecture**: Single debounced MutationObserver + safety poll with time-boxed runs (20s default, 5s extension after actions). Replaces scattered retry loops.
- **Unified Per-Site Config**: Selectors, cookies, page types, overlays, boost rules all in one `SITES` object per domain.
- **Container-Scoped Fallback**: Generic text-based search only inside modal-like containers (dialog, age/cookie containers, center-of-screen blockers). No page-wide "first button" fallback.
- **Overlay Hiding (Not Removal)**: `display: none !important` shortly after action (2.5s window). Safer for React/Vue hydration than DOM removal.
- **SPA + bfcache Navigation Awareness**: History API overrides + `pageshow` listener for bfcache restore. Fresh click history on real navigation, preserved on same-page hash changes.
- **Adaptive Timing for Low-End Devices**: Detects `hardwareConcurrency <= 2` or `deviceMemory <= 2` at init, scales poll/maxRun timings automatically (Firefox resistFingerprinting friendly).
- **Cookie Pre-Setting at Document-Start**: Sets known consent cookies only when missing, path-specific, never overwrites site values.
- **Safer Click Rules**: Never clicks Reject/Manage/Essential/Exit/Leave/Under-18/Sign-Up/Log-In/Register/Premium/Gay/Trans. `NEGATIVE_RX` covers 40+ patterns across languages.
- **Time-Boxed Engine**: Hard cap of 12 actions per run, 20s max run time (30s on low-end).

### New Modules (all inside IIFE — nothing leaks to page)
- `UAG.Util` — normalization, selector validation, regex matching
- `UAG.Dom` — visibility, blocking overlay detection, premium overlay detection
- `UAG.Cookie` — document-start pre-setting (only when missing)
- `UAG.Selectors` — page-type ordered, memoized, validated
- `UAG.Overlay` — center-point detection, generic hide
- `UAG.Containers` — modal-scoped fallback search (max 12, text < 4000 chars)
- `UAG.Click` — cooldown (700ms), per-element cap (4), global cap (12), trusted + scoped
- `UAG.Engine` — single debounced tick, time-boxed, extends on action, Escape fallback for stuck video modals
- `UAG.Navigation` — SPA + bfcache, cookie pre-set on real navigation

### Selector Strategy
- **Trusted (priority)**: site-specific selectors + CMP framework "accept all" buttons, ordered by page type boost
- **Scoped Fallback**: only inside relevant containers, by text match against anchored patterns (EN + FA)
- **Removed**: page-wide generic button selectors, `GENERIC_ACCEPT_SELECTORS` page-wide, `first button` logic

### Site Configs (5 sites)
- **Pornhub**: video/search/category/channel/pornstar/gif page types, Escape fallback on video
- **XNXX**: combined age gate + cookie consent button, disclaimer overlays
- **XVideos**: data-testid age gate, cookie pre-setting on video pages
- **xHamster**: attribute-based cookie dialog selectors (CSS Modules hash fallback), React-based (no cookie pre-set)
- **Tube8**: simultaneous modal handling (age gate blocks cookie consent), GTM event selectors

### Known Limitations (v2.2.0)
- **No Shadow DOM traversal** — light DOM only (planned for future)
- **No iframe traversal** — same-origin iframes not searched (planned for future)
- **No IAB TCF v2.0 handlers** — CMP frameworks handled via static "accept all" selectors only
- **2 languages only** (EN, FA) — 14-language i18n planned for future
- Cross-origin iframes silently skipped
- WeakMap click records reset on real navigation (fresh start)

## [2.1.20] - 2026-11-15

### Reverted — v2.2.x Regression Fix
- **Complete Reversion to v2.1.20 Architecture**: v2.2.0 (Core Infrastructure), v2.2.1 (Performance Optimization), and v2.2.2 (Regression Fixes) introduced **zero-click regression** on all 5 sites. Root causes identified:
  1. `isVisible()` overly strict — rejected fixed overlay buttons with zero layout rect
  2. `handleSimultaneousModals()` used `querySelector` (light DOM only) instead of Shadow DOM traversal
  3. Fast path async bug — `attempt()` made async but not awaited, killing fast path prematurely
  4. Page-type computed once at load, not updated on SPA navigation
  5. Per-attempt cache key collisions for iframes
  6. Shadow cache invalidation timer (5s) causing race conditions
  7. Cross-origin iframe `SecurityError` handling
  8. Missing plain `<a>` tag selectors in `BUTTON_CANDIDATES`
  9. No production debug logging

- **Removed from v2.2.x (Intentional Simplification)**:
  - Shadow DOM & iframe traversal (`queryAllRoots`, `getAllShadowRoots`, `getAllSameOriginIframes`)
  - IAB TCF Framework handler registry (8 handlers)
  - 14-language pattern registry (kept 2: EN + FA)
  - `observeShadowRoots()` MutationObserver for shadow roots
  - Per-attempt Map cache (reverted to WeakMap with `isConnected` verification)
  - Periodic shadow cache invalidation (5s interval)
  - Advanced CMP framework handlers (`clickCookieConsentAdvanced`)
  - Async `attempt()` (reverted to sync for fast path compatibility)

- **Kept from v2.1.20 (Proven Working)**:
  - WeakMap selector cache with `isConnected` verification
  - Ancestor-chain `isVisible()` for fixed/absolute/sticky positioned buttons
  - Sync fast path with microtask scheduling
  - Generic simultaneous modal handler (`handleSimultaneousModals`)
  - Page-type aware selector prioritization (P2.2)
  - Memoized language detection & patterns (P2.3)
  - Unified cookie pre-setting at document-start (P2.4-2.8)
  - Conditional function overrides for Pornhub (P2.9)
  - Adaptive timing for low-end devices (P1.3)
  - `requestIdleCallback` for non-critical work (P1.1)
  - SPA navigation handling with cleanup (P0.2)

### Changed
- **Version locked at 2.1.20 FINAL STABLE** — no further v2.2.x development at that time
- All v2.2.x files removed from `versions/` directory (later restored v2.2.0)
- `src/universal-age-gate-bypass.user.js` = exact copy of `versions/v2.1.20.user.js`
- `package.json` version updated to 2.1.20

## [2.1.19] - 2026-11-15

### Accuracy (P2)
- **CMP Framework Auto-Detection (P2.1)**: Added fallback selectors for major CMP frameworks (OneTrust, Cookiebot, Quantcast, Usercentrics, Didomi, TrustArc, Osano) + generic CMP fallbacks. Only activates after site-specific selectors fail.
- **Page-Type Aware Selector Prioritization (P2.2)**: Uses existing `getPornhubPageType()` / `getXnxxPageType()` to reorder selectors:
  - Pornhub video pages → prioritize `data-label`/GTM selectors
  - XNXX homepage → prioritize disclaimer enter buttons
  - Tube8 → prioritize GTM cookie banner selectors
  - xHamster → prioritize attribute-based cookie dialog selectors
- **Memoized Language Detection & Patterns (P2.3)**: `detectPageLanguage()` and `getPatternsForType()` now cached per page load / domain+type. Eliminates redundant regex array creation and body text scanning.

### Cookie Pre-Setting Expansion (P2.4-2.8)
- **Unified `preSetSiteCookies()`**: Single function called at `document-start` before fast path. Replaces individual `preSetPornhubCookies()` / `preSetXnxxCookies()`.
- **XVideos**: `age_check=1`, `disclaimer=2` on `/video` pages
- **Tube8**: `age_verified=1` on `/video/` pages
- **Pornhub**: `age_verified=1`, `cookieConsent=1` on `/video/`, `/embed/` (existing)
- **XNXX**: `disclaimer=2`, `age_verified=1` on `/video-` pages (existing)
- **xHamster**: None (React-based, cookies don't work)

### Function Overrides (P2.9)
- **Conditional Function Overrides for Pornhub**: Only overrides `showAgeGate`, `showModal`, `openAgeGate` if they **already exist** at `document-start` (safe, no React hydration breakage). No-op `Promise.resolve()` replacement.

### Changed
- **Version bumped to 2.1.19** (patch for P2 accuracy + cookie expansion + function overrides)

## [2.1.18] - 2026-11-14

### Fixed
- **Fast Path Race Condition (P0.1)**: Unified MutationObserver + periodic check into single microtask-scheduled checker. Removed redundant `setInterval(10ms)` that could cause double-execution race. Fast path now cleanly exits on first success.
- **SPA Memory Leak (P0.2)**: Stored `MutationObserver` reference globally (`spaNavObserver`). Added `pagehide` and `beforeunload` listeners with `{ once: true }` to disconnect observer on page unload, preventing memory leaks during SPA navigation.
- **`isVisible()` False Negative for `<a>` Tags (P0.3)**: Changed from single-element check to ancestor chain walk. Now checks element AND all ancestors for `position: fixed/absolute/sticky` — correctly identifies `<a>` tags inside fixed-position overlays (Tube8 minimized cookie banner, etc.) as clickable.
- **Hardcoded Simultaneous Modal Logic (P0.4)**: Replaced Tube8-specific hardcoded check with generic z-index-based handler (`handleSimultaneousModals()`). Detects ALL visible blocking overlays across ALL sites, sorts by z-index (topmost first), handles age gate then cookie consent in stacking order. Works on Tube8, XNXX, and any future site with overlapping modals.

### Performance (P1)
- **`requestIdleCallback` Integration (P1.1)**: Added `scheduleIdleWork(fn)` wrapper — uses `requestIdleCallback` with 50ms timeout for non-critical work (overlay cleanup scroll restoration), falls back to `queueMicrotask`.
- **Selector Caching with WeakMap (P1.2)**: Added `cachedQuerySelector()` and `cachedQuerySelectorAll()` with per-retry-loop WeakMap cache. Auto-evicts stale entries when elements are no longer in DOM. Used in `clickAgeGateButton()`, `clickCookieConsent()`, `removeOverlays()`, `handleSimultaneousModals()`.
- **Adaptive Timing for Low-End Devices (P1.3)**: Detects `navigator.hardwareConcurrency <= 2` or `deviceMemory <= 2` at init. If true: doubles `retryInterval`, increases `maxRetries` by 1.5x (capped at 100). Improves reliability on mobile/low-end without hurting desktop speed.

### Changed
- **Version bumped to 2.1.18** (patch for P0 stability fixes + P1 performance improvements)

## [2.1.17] - 2026-11-14

### Fixed
- **xHamster Fast Cookie Consent**: Replaced fragile CSS Modules hash-based selectors (`experimentalButton-5822e`) with robust attribute-based selectors (`[data-opt-hydration="cookies-dialog-eu"] button`). Reduced timings: `retryInterval: 30ms` (was 80), `initialDelay: 30ms` (was 100), `maxRetries: 80` (was 60) for near-instant cookie modal handling.
- **Tube8 Simultaneous Modals**: Added Tube8-specific pre-check in `attempt()` to detect when both age gate (`#ageDisclaimerWrapper`, z-index 20240) and cookie consent (`#consent_accept_all`, z-index 20230) are visible at page load. Now handles age gate FIRST (which blocks cookie consent), then cookie consent with 200ms transition delay.
- **Improved `isVisible()` for Fixed Overlay Buttons**: Buttons in `position: fixed` overlays (like Tube8 cookie consent under age gate) now correctly detected as visible even when `offsetParent === null`, by checking `position === 'fixed'` as alternative.

### Changed
- **xHamster Timings**: Optimized for React modal hydration speed - faster polling, more retries, quicker first check.
- **Tube8 Timings**: `retryInterval: 30ms`, `maxRetries: 80`, `initialDelay: 30ms`, `overlayCleanupDelay: 300ms`, `spaNavDelay: 30ms`.
- **Version bumped to 2.1.17** (patch for xHamster fast cookie consent + Tube8 simultaneous modal fix + improved visibility detection).