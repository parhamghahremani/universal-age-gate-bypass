# Compatibility — Universal Age Gate Bypass

**Project**: `universal-age-gate-bypass`  
**Version**: 2.2.1

---

## Verified Environments

| Environment | Status | Notes |
|-------------|--------|-------|
| Firefox Desktop (Windows 11) | ✅ Verified | Playwright tests pass |
| Firefox Android (Pixel 5) | ✅ Verified | Playwright tests pass |
| Firefox Android (Galaxy S23) | ✅ Verified | Playwright tests pass |
| Tampermonkey (latest) | ✅ Assumed | Standard userscript API |
| Violentmonkey | ✅ Assumed | Standard userscript API |
| Greasemonkey | ⚠️ Untested | May have API differences |

---

## `@grant none` / CSP Compatibility

- ✅ **No GM_* APIs used** — Pure DOM APIs only
- ✅ **No `unsafe-eval`** — No dynamic code execution
- ✅ **No external resources** — All CSS/JS inline
- ✅ **CSP compatible** — Works with strict CSP policies

---

## `@run-at document-start` Behavior

- Script injects before any page content
- Engine starts on `DOMContentLoaded` / `load`
- Early enough to catch modals before paint

---

## Browser Feature Requirements

| Feature | Required | Fallback |
|---------|----------|----------|
| `WeakMap`/`WeakSet` | ✅ Yes | None (ES6+) |
| `MutationObserver` | ✅ Yes | None (standard) |
| `History.pushState` wrap | ✅ Yes | Manual `popstate` |
| `navigator.hardwareConcurrency` | ⚠️ Optional | Defaults to 4 |
| `navigator.deviceMemory` | ⚠️ Optional | Defaults to 4 |
| `Element.closest()` | ✅ Yes | Polyfillable |
| `Element.matches()` | ✅ Yes | Polyfillable |

---

## Known Incompatibilities

| Environment | Issue | Workaround |
|-------------|-------|------------|
| Safari/WebKit | Untested | May need `@run-at` adjustment |
| Chrome/Chromium | Untested | Should work (standard APIs) |
| Edge | Untested | Should work (Chromium-based) |
| Userscript managers without `document-start` | Late injection | Use Tampermonkey/Violentmonkey |

---

## Site-Specific Notes

| Site | Age Gate | Cookie Consent | Notes |
|------|----------|----------------|-------|
| Pornhub | ✅ Modal + Escape fallback | ✅ Banner | Most complex; video page has Escape key handling |
| XNXX | ✅ Simple overlay | ✅ Banner | Straightforward |
| XVideos | ✅ Modal | ✅ Banner | Uses `data-testid` attributes |
| xHamster | ✅ Modal | ✅ Banner | React-based, attribute-based selectors |

---

## Test Matrix (Playwright)

| Browser Config | Tests | Status |
|----------------|-------|--------|
| Desktop Firefox | 8 | ✅ Pass |
| Mobile Firefox (Pixel 5) | 8 | ✅ Pass |
| Mobile Firefox (Galaxy S23) | 8 | ✅ Pass |
| **Total** | **24** | **✅ Pass** |