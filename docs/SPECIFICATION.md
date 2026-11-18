# Specification — Universal Age Gate Bypass

**Project**: `universal-age-gate-bypass`  
**Version**: 2.2.1

---

## Purpose

Automatically bypass age-gate modals and accept cookie consent on supported adult sites, providing seamless access to content on Firefox Desktop and Firefox Android.

---

## Supported Sites

| Site | Domain Patterns | Age Gate | Cookie Consent |
|------|-----------------|----------|----------------|
| Pornhub | `*://*.pornhub.com/*`, `*://pornhub.com/*` | ✅ | ✅ |
| XNXX | `*://*.xnxx.com/*`, `*://xnxx.com/*` | ✅ | ✅ |
| XVideos | `*://*.xvideos.com/*`, `*://xvideos.com/*` | ✅ | ✅ |
| xHamster | `*://*.xhamster.com/*`, `*://xhamster.com/*` | ✅ | ✅ |

**Excluded**: Admin paths (`*://*.*/admin/*`)

---

## Functional Requirements

### FR-1: Age Gate Detection & Bypass
- Detect age verification modals on page load and after SPA navigation
- Click appropriate "I am 18+" / "Enter" / "Accept" buttons
- Never click "Reject", "Manage", or "Essential only" buttons
- Handle site-specific modal structures

### FR-2: Cookie Consent Acceptance
- Detect cookie consent banners/modals
- Click "Accept All" / "Accept" / "Agree" buttons
- Prefer explicit accept over dismiss

### FR-3: SPA & bfcache Support
- Re-run detection after `history.pushState` / `replaceState`
- Re-run detection on `pageshow` with `persisted` (bfcache restore)
- Re-run detection on `visibilitychange` to visible
- Single debounced engine loop handles all triggers

### FR-4: Adaptive Timing
- Detect low-end devices (≤2 CPU cores or ≤2GB RAM)
- Automatically extend poll interval and max run time for low-end
- Time-boxed runs (max 20s default, 30s low-end)

### FR-5: Safety & Restraint
- Maximum 12 click actions per engine run
- Click cooldown (700ms) per element
- Maximum 4 clicks per element (for hydration retries)
- Overlay hiding limited to 2.5s after action
- Escape key fallback for Pornhub video (once per run, 600ms delay)

### FR-6: Emergency Disable
- URL parameter `?uag=off` completely disables the script

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| `@run-at` | `document-start` |
| `@grant` | `none` (CSP compatible) |
| Browser | Firefox Desktop, Firefox Android (primary) |
| Performance | Zero perceptible delay on page load |
| Memory | No leaks; WeakMap/WeakSet for element tracking |

---

## Acceptance Criteria

1. ✅ Age gate bypassed on all 4 supported sites (Desktop + Android)
2. ✅ Cookie consent accepted automatically
3. ✅ No false clicks on "Reject"/"Manage"/"Essential"
4. ✅ Works after SPA navigation (no full reload)
5. ✅ Works after bfcache restore (back button)
6. ✅ Emergency disable `?uag=off` works
7. ✅ No console errors on non-supported sites
8. ✅ Playwright tests pass (Desktop Firefox, Mobile Firefox ×2)