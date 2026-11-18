# Configuration & Permissions — Universal Age Gate Bypass

**Project**: `universal-age-gate-bypass`  
**Version**: 2.2.1

---

## Metadata Block

```javascript
// ==UserScript==
// @name         Universal Age Gate Auto-Bypass
// @namespace    https://github.com/parhamghahremani/universal-age-gate-bypass
// @version      2.2.1
// @description  Auto-confirms 18+ prompts and accepts all cookies on supported sites...
// @author       parham
// @match        *://*.pornhub.com/*
// @match        *://pornhub.com/*
// @match        *://*.xnxx.com/*
// @match        *://xnxx.com/*
// @match        *://*.xvideos.com/*
// @match        *://xvideos.com/*
// @match        *://*.xhamster.com/*
// @match        *://xhamster.com/*
// @exclude      *://*.pornhub.com/admin/*
// @exclude      *://*.xnxx.com/admin/*
// @exclude      *://*.xvideos.com/admin/*
// @exclude      *://*.xhamster.com/admin/*
// @icon         data:image/svg+xml;base64,...
// @grant        none
// @run-at       document-start
// @downloadURL  https://github.com/parhamghahremani/universal-age-gate-bypass/raw/main/universal-age-gate-bypass.user.js
// @updateURL    https://github.com/parhamghahremani/universal-age-gate-bypass/raw/main/universal-age-gate-bypass.user.js
// @supportURL   https://github.com/parhamghahremani/universal-age-gate-bypass/issues
// @homepageURL  https://github.com/parhamghahremani/universal-age-gate-bypass
// @license      MIT
// ==/UserScript==
```

---

## Permissions Analysis

| Permission | Value | Reason |
|------------|-------|--------|
| `@grant` | `none` | No GM_* APIs used; CSP compatible |
| `@run-at` | `document-start` | Early injection before modals render |
| `@match` | 4 domains × 2 (www + root) | Covers all supported sites |
| `@exclude` | 4 admin paths | Avoid interfering with admin panels |

---

## Configuration (Constants Object `C`)

| Constant | Value | Description |
|----------|-------|-------------|
| `MAX_RUN_MS` | `20000` | Max engine run time (ms) |
| `EXTEND_AFTER_ACTION_MS` | `5000` | Extra time after click |
| `DEBOUNCE_MS` | `40` | Debounce after DOM mutation |
| `POLL_MS` | `250` | Safety poll interval |
| `CLEANUP_WINDOW_MS` | `2500` | Overlay hide duration |
| `CLICK_COOLDOWN_MS` | `700` | Min gap between clicks on same element |
| `MAX_CLICKS_PER_ELEMENT` | `4` | Max retries per element |
| `MAX_ACTIONS` | `12` | Hard cap clicks per run |
| `ESCAPE_AFTER_MS` | `600` | Pornhub Escape fallback delay |
| `Z_INDEX_THRESHOLD` | `999` | High z-index threshold |
| `VIEWPORT_COVERAGE_RATIO` | `0.9` | Full-screen overlay detection |
| `PARTIAL_COVERAGE_RATIO` | `0.3` | Partial coverage with high z-index |
| `MIN_OVERLAY_SIZE` | `100` | Min overlay dimensions (px) |
| `MAX_CONTAINER_TEXT` | `4000` | Max text length for modal containers |
| `MAX_CONTAINERS` | `12` | Max containers to evaluate |
| `COOKIE_MAX_AGE` | `31536000` | Cookie max age (1 year) |

---

## Adaptive Timing (Auto-detected)

```javascript
const LOW_END = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2;

const TIMING = {
  pollMs: C.POLL_MS * (LOW_END ? 2 : 1),        // 250ms → 500ms
  maxRunMs: C.MAX_RUN_MS * (LOW_END ? 1.5 : 1), // 20s → 30s
};
```

---

## Site Configuration (`SITES`)

Per-site rules in single object:

```javascript
const SITES = {
  'pornhub.com': {
    name: 'Pornhub',
    age: [...],           // Age gate selectors
    cookie: [...],        // Cookie consent selectors
    overlays: [...],      // Overlay hiding selectors
    cookies: { ... },     // Cookie pre-setting config
    pageType: () => ...,  // Page type detection function
    boost: { ... },       // Page-type aware selector prioritization
  },
  'xnxx.com': { ... },
  'xvideos.com': { ... },
  'xhamster.com': { ... },
};
```

Each site config contains:
- `name` — Display name
- `age` — Age gate button selectors (priority ordered)
- `cookie` — Cookie consent button selectors
- `overlays` — Overlay hiding selectors
- `cookies` — Cookie pre-setting config (name, value, path, domain)
- `pageType()` — Function returning page type string
- `boost` — Page-type aware selector priority mapping

---

## Button Text Patterns (Safe Clicking)

**Allowed** (positive intent, EN + FA):
- "I am 18+", "I am over 18", "Enter", "Accept", "Agree", "Continue", "Accept All", "Allow All"
- "بسیار عالی", "تأیید", "قبول", "ورود", "ادامه"

**Blocked** (negative/restrictive intent):
- "Reject", "Decline", "Manage", "Settings", "Essential", "Necessary", "Customize", "Configure"
- "خیر", "رد", "مدیریت", "تنظیمات", "ضروری", "خروج", "زیر ۱۸", "ثبت نام", "ورود", "پرمیوم", "گِی", "ترنس"

**Logic**: Case-insensitive regex match; blocked patterns take precedence over allowlist

---

## Emergency Disable

Add to any URL:
```
?uag=off
```

Script returns immediately without injection.