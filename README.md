# Universal Age Gate Auto-Bypass

A Tampermonkey userscript that automatically bypasses 18+ age verification gates and accepts cookie consent on multiple adult sites. Works on **Firefox Desktop (Windows/Linux/macOS)** and **Firefox Android**.

## Supported Sites

| Site | Status | Notes |
|------|--------|-------|
| Pornhub (`pornhub.com`) | ✅ | Primary reference implementation |
| XNXX (`xnxx.com`) | ✅ | Combined age gate + cookie consent |
| XVideos (`xvideos.com`) | ✅ | Uses `data-testid` attributes |
| xHamster (`xhamster.com`) | ✅ | Heavy `data-testid` usage, React-based |

## Features

- **Multi-site support**: Single script handles 4 sites via configurable site configs
- **Cross-platform**: Firefox Desktop + Firefox Android
- **SPA navigation handling**: Detects `pushState`, `replaceState`, `popstate`, `pageshow` (bfcache), and DOM mutations
- **Smart overlay hiding**: Hides blocking overlays after click (safer than removal for React/Vue)
- **Dual-phase click strategy**: Trusted site-specific selectors → container-scoped text pattern fallback
- **No external dependencies**: Zero npm packages, no GM grants required (`@grant none`)
- **CSP compatible**: No inline scripts/styles that violate Content Security Policy
- **Adaptive timing**: Auto-detects low-end devices (Firefox resistFingerprinting friendly)
- **Cookie pre-setting**: Sets consent cookies at `document-start` before modals appear
- **Safer click rules**: Never clicks Reject/Manage/Essential/Exit/Under-18/Sign-Up/Log-In/Register/Premium

## Installation

### Firefox Desktop
1. Install [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) extension
2. Click the raw script URL: `https://github.com/parhamghahremani/universal-age-gate-bypass/raw/main/universal-age-gate-bypass.user.js`
3. Tampermonkey will prompt to install — click **Install**

### Firefox Android
1. Install Firefox Android from Play Store
2. Install [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) from Firefox Add-ons
3. Open the raw script URL in Firefox Android
4. Tampermonkey will show a one-tap install prompt

## How It Works

### Site Detection
The script detects the current domain at runtime and loads the appropriate configuration from the `SITES` object:

```javascript
const SITES = {
    'pornhub.com': { name: 'Pornhub', age: [...], cookie: [...], overlays: [...], ... },
    'xnxx.com': { name: 'XNXX', age: [...], cookie: [...], overlays: [...], ... },
    // ... more sites
};
```

### Click Strategy (Two Phases)

**Phase 1 — Trusted Selectors (Fast, Reliable):**
- Site-specific CSS selectors ordered by priority
- Page-type aware boosting (e.g., video page vs search page on Pornhub)
- CMP framework "accept all" buttons appended for cookie consent
- Validated at startup (invalid selectors dropped)

**Phase 2 — Container-Scoped Text Fallback (Robust):**
- Only searches inside modal-like containers (dialog, age/cookie containers, center-of-screen blockers)
- Matches button text against anchored regex patterns (EN + FA)
- Never "first button" — requires text match or single remaining button after negative filtering
- Generic `GENERIC_ACCEPT_SELECTORS` only used INSIDE cookie containers

### Overlay Hiding (Not Removal)
After a successful click:
1. Waits for `CLEANUP_WINDOW_MS` (2.5s) for animations
2. Hides known overlays with `display: none !important` (safer for React hydration)
3. Restores `body.style.overflow` and `documentElement.style.overflow`
4. Premium/upsell overlays detected by text content and left alone

### SPA + bfcache Navigation
Handles single-page app navigation via:
- `MutationObserver` on `document` (childList + subtree + attributes)
- `history.pushState` / `replaceState` override
- `window.addEventListener('popstate')`
- `window.addEventListener('pageshow')` for bfcache restore
- Fresh click history on real navigation, preserved on hash-only changes

### Cookie Pre-Setting
At `document-start`, before any modal renders:
- Sets known consent cookies (e.g., `age_verified=1`, `cookieConsent=3`) only when missing
- Path-specific (e.g., only on `/video/` pages)
- Never overwrites site's existing cookie values

## Development

### Workspace Structure
```
universal-age-gate-bypass/
├── src/
│   └── universal-age-gate-bypass.user.js    # Current production version (v2.2.1)
├── versions/
│   ├── v1.0.0.user.js
│   ├── v2.0.0.user.js
│   ├── v2.1.0.user.js
│   ...
│   └── v2.2.1.user.js                        # Versioned releases
├── dist/
│   └── universal-age-gate-bypass.user.js     # Latest build (synced from src)
├── tests/
│   ├── run-tests.spec.js                     # Playwright test suite
│   ├── test-plan.md                          # Test cases & matrix
│   └── screenshots/                          # Visual regression captures
├── CHANGELOG.md                              # Version history
├── package.json                              # npm scripts & deps
├── playwright.config.js                      # Playwright configuration
├── eslint.config.js                          # ESLint configuration
├── .prettierrc                               # Prettier configuration
└── build.js                                  # Build script (copies src -> versions/ + dist/)
```

### Commands
```bash
# Install dependencies
npm install

# Run all tests (4 viewports × 4 sites = 16 tests)
npm test

# Run specific viewport
npx playwright test --project="Desktop Firefox"
npx playwright test --project="Mobile Firefox (Pixel 5)"

# Lint code
npm run lint

# Format code
npm run format

# Build (copy src to versions/ + dist/)
node build.js

# Version bump
npm version patch  # or minor, major
```

### Adding a New Site
1. Add entry to `SITES` in `src/universal-age-gate-bypass.user.js`
2. Provide `age` selectors, `cookie` selectors, `overlays`, `cookies` config, `pageType()` function
3. Add `boost` object for page-type aware selector prioritization
4. Add test case to `tests/run-tests.spec.js` (targetSites array)
5. Run tests: `npm test`
6. Bump version, run `node build.js`, update `CHANGELOG.md`

## Testing

### Test Matrix
- **Desktop Firefox**: 1920×1080
- **Mobile Firefox (Pixel 5)**: 375×812
- **Mobile Firefox (Galaxy S23)**: 412×915
- **Mobile Firefox (Generic)**: 360×780

Each site tested on all 4 viewports = 16 test combinations.

### Test Cases
- Initial load with age gate present
- Initial load without age gate (cookie accepted)
- SPA navigation (video click, category nav)
- Back button (`popstate`)
- History API (`pushState`/`replaceState`)
- bfcache restore (`pageshow` with `persisted`)
- Mobile touch events
- Overlay hiding & scroll restoration
- Text fallback selector coverage
- No console errors
- Performance (time-boxed 20s max run)

## Architecture

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| `@run-at document-start` | Catch age gate before it renders |
| `@grant none` | No privileged APIs needed; works everywhere |
| Single script, multi-config | Easy maintenance, shared logic, one install |
| Dual-phase selectors | Speed (specific) + robustness (text fallback) |
| Container-scoped fallback | No page-wide "first button" — safer |
| Overlay hiding (not removal) | Safer for React/Vue hydration |
| Time-boxed engine (20s) | Prevents infinite loops on broken pages |
| Adaptive timing | Low-end/mobile friendly without hurting desktop |
| WeakMap click records | Auto-evicts when elements leave DOM |

### Modules (all inside IIFE — nothing leaks to page)

| Module | Responsibility |
|--------|----------------|
| `UAG.Util` | Normalization, selector validation, regex matching |
| `UAG.Dom` | Visibility, blocking overlay detection, premium overlay detection |
| `UAG.Cookie` | Document-start pre-setting (only when missing) |
| `UAG.Selectors` | Page-type ordered, memoized, validated |
| `UAG.Overlay` | Center-point detection, generic hide |
| `UAG.Containers` | Modal-scoped fallback search (max 12, text < 4000 chars) |
| `UAG.Click` | Cooldown (700ms), per-element cap (4), global cap (12), trusted + scoped |
| `UAG.Engine` | Single debounced tick, time-boxed, extends on action, Escape fallback |
| `UAG.Navigation` | SPA + bfcache, cookie pre-set on real navigation |

### Performance
| Metric | Desktop | Android Emu |
|--------|---------|-------------|
| Initial tick | ~12ms | ~28ms |
| Max run time | 20s (extendable) | 30s (low-end) |
| SPA nav re-check | ~8ms | ~15ms |
| Memory | < 50KB | < 50KB |

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for full version history.

### v2.2.1 (2026-11-16)
- Modular UAG.Engine architecture with single debounced loop
- Unified per-site config (selectors + cookies + page types)
- Container-scoped text fallback (no page-wide generic buttons)
- Overlay hiding (not removal) with premium detection
- SPA + bfcache navigation awareness
- Adaptive timing for low-end devices
- Safer click rules (comprehensive NEGATIVE_RX)
- Cookie pre-setting at document-start
- Time-boxed runs (20s) with action extension

### v2.1.20 (2026-11-15) — Previous stable
- P2 accuracy: CMP auto-detection, page-type prioritization, memoization
- Cookie expansion: XVideos, Tube8
- Function overrides for Pornhub

## License

MIT — See [LICENSE](LICENSE) for details.

## Support

- Issues: https://github.com/parhamghahremani/universal-age-gate-bypass/issues
- Homepage: https://github.com/parhamghahremani/universal-age-gate-bypass