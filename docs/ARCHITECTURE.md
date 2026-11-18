# Architecture — Universal Age Gate Bypass

**Project**: `universal-age-gate-bypass`  
**Version**: 2.2.1

---

## Overview

Single-file userscript (IIFE) with modular `UAG.*` architecture. Single debounced engine loop handles all triggers (load, SPA, bfcache, visibility).

---

## Module Breakdown

```
UAG Namespace (inside IIFE)
├── UAG.Util          — Normalization, selector validation, regex matching
├── UAG.Dom           — Visibility, blocking overlay detection, premium overlay detection
├── UAG.Cookie        — Document-start pre-setting (only when missing)
├── UAG.Selectors     — Page-type ordered, memoized, validated
├── UAG.Overlay       — Center-point detection, generic hide
├── UAG.Containers    — Modal-scoped fallback search (max 12, text < 4000 chars)
├── UAG.Click         — Cooldown (700ms), per-element cap (4), global cap (12)
├── UAG.Engine        — Single debounced tick, time-boxed, extends on action, Escape fallback
├── UAG.Navigation    — SPA + bfcache, cookie pre-set on real navigation
├── SITES             — Per-site config registry (selectors, cookies, page types)
└── Public API        — start, stop, emergency disable check
```

---

## Data Flow

```
Page Load / SPA / bfcache / Visibility Change
         │
         ▼
UAG.Engine.start() ──► Debounced (40ms) ──► tick()
         │                                    │
         │                                    ▼
         │                           [MAX_RUN_MS timeout]
         │                                    │
         │                                    ▼
         │                           findActionableElements()
         │                                    │
         │                                    ▼
         │                           clickBestCandidate()
         │                                    │
         │                                    ▼
         │                           scheduleNextPoll()
         │                                    │
         └────────────────────────────────────┘
```

---

## Key Components

### UAG.Engine (Main Loop)
Single debounced loop managing all detection/click cycles.

**State**:
- `active` — engine running
- `runId` — current run identifier
- `runStart` — timestamp for timeout tracking
- `actionsThisRun` — click counter (max 12)
- `clickHistory` — per-element click tracking (WeakMap)

### Site Configs (`SITES` object)
Per-site rules unified in single object:
```javascript
const SITES = {
  'pornhub.com': {
    name: 'Pornhub',
    age: [...],           // Age gate selectors
    cookie: [...],        // Cookie consent selectors
    overlays: [...],      // Overlay hiding selectors
    cookies: {...},       // Cookie pre-setting config
    pageType: () => ...,  // Page type detection function
    boost: {...},         // Page-type aware selector prioritization
  },
  'xnxx.com': { ... },
  'xvideos.com': { ... },
  'xhamster.com': { ... },
};
```

### Element Tracking (WeakMap/WeakSet)
- `clickHistory` (WeakMap<Element, number[]>) — timestamps per element
- `elementCache` (WeakMap) — selector query caching
- `seenContainers` (WeakSet) — already processed containers

---

## Trigger System

| Trigger | Handler | Notes |
|---------|---------|-------|
| `DOMContentLoaded` | `UAG.Engine.start()` | Initial run |
| `load` | `UAG.Engine.start()` | After resources |
| `visibilitychange` | `UAG.Engine.start()` | Tab visible again |
| `pageshow` (persisted) | `UAG.Engine.start()` | bfcache restore |
| `pushState`/`replaceState` (wrapped) | `UAG.Navigation.onHistoryChange()` | SPA navigation |
| `popstate` | `UAG.Engine.start()` | Back/forward |

All funnel into single `debouncedStart()` → `tick()`.

---

## Click Safety Restraints

1. **Max actions/run**: 12 clicks
2. **Click cooldown**: 700ms per element
3. **Max clicks/element**: 4 (hydration retries)
4. **Button filtering**: Never click "Reject", "Manage", "Essential", etc. (40+ negative patterns)
5. **Overlay hiding**: Only for 2.5s after click
6. **Escape fallback**: Pornhub video only, once/run, 600ms delay

---

## Low-End Adaptation

```javascript
const LOW_END = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2;

const TIMING = {
  pollMs: C.POLL_MS * (LOW_END ? 2 : 1),        // 250ms → 500ms
  maxRunMs: C.MAX_RUN_MS * (LOW_END ? 1.5 : 1), // 20s → 30s
};
```

---

## Memory Management

- `WeakMap`/`WeakSet` for all element references — auto GC
- `cleanup()` on `pagehide` clears all engine state
- No persistent global arrays of DOM elements

---

## Build Output

`build.js` creates:
- `versions/universal-age-gate-bypass-v{version}.user.js` — versioned archive
- `dist/universal-age-gate-bypass.user.js` — latest with updated URLs