# Decisions — Universal Age Gate Bypass

**Project**: `universal-age-gate-bypass`  
**Version**: 2.2.1

---

## Decision Log

| ID | Date | Decision | Rationale | Alternatives Considered |
|----|------|----------|-----------|------------------------|
| D-01 | 2024-11-04 | `@grant none` | CSP compatibility; no GM APIs needed | `@grant GM_xmlhttpRequest` — rejected |
| D-02 | 2024-11-04 | `@run-at document-start` | Catch modals before paint | `@run-at document-end` — too late |
| D-03 | 2024-11-04 | IIFE + single file | Tampermonkey userscript standard | ES modules — not supported by all managers |
| D-04 | 2024-11-15 | Single UAG.Engine loop | Eliminate race conditions from multiple loops | Multiple independent observers — caused duplicates |
| D-05 | 2024-11-15 | WeakMap/WeakSet for tracking | Auto GC, no memory leaks | Global arrays — memory leaks on SPA |
| D-06 | 2024-11-18 | Wrap pushState/replaceState | Detect SPA navigation reliably | MutationObserver only — misses history changes |
| D-07 | 2024-11-18 | Listen pageshow (persisted) | Handle bfcache restore | Only popstate — misses bfcache |
| D-08 | 2024-11-18 | Adaptive timing (low-end detection) | Firefox Android + resistFingerprinting support | Fixed timing — fails on slow devices |
| D-09 | 2024-11-20 | Blocklist > Allowlist for buttons | Prevent "Reject"/"Manage" clicks | Allowlist only — false positives |
| D-10 | 2024-11-20 | Max 12 actions/run | Hard safety cap | Unlimited — risk of runaway clicks |
| D-11 | 2024-11-20 | 700ms click cooldown per element | Prevent double-clicks on hydration | No cooldown — hydration swallows clicks |
| D-12 | 2024-11-20 | 2.5s overlay hide window | Balance UX vs. cleanup | Permanent hide — breaks page layout |
| D-13 | 2024-11-20 | Remove Tube8 | Site structure unstable, caused regressions | Keep with site-specific fixes — too brittle |
| D-14 | 2024-11-22 | Pornhub Escape fallback (once/run) | Video page age gate sometimes needs Escape | Always send Escape — interferes with player |
| D-15 | 2024-11-22 | Emergency disable `?uag=off` | User escape hatch | No disable — user trapped if broken |

---

## Architectural Principles

1. **Safety first** — Never click negative-intent buttons
2. **Restraint** — Hard caps on actions, time, retries
3. **Adaptability** — Auto-adjust for device capabilities
4. **Observability** — Debug logging available (disabled by default)
5. **Compatibility** — Standard DOM APIs only, no GM_*

---

## Rejected Approaches

| Approach | Reason Rejected |
|----------|-----------------|
| Separate engines per site | Code duplication, inconsistent behavior |
| `IntersectionObserver` for modals | Modals often `position:fixed` not in viewport flow |
| `setInterval` polling | Battery drain, imprecise; debounced loop better |
| `GM_addStyle` for hiding | `@grant none` requirement |
| Separate userscript per site | User management overhead; single script preferred |