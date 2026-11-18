# Development Log — Universal Age Gate Bypass

**Project**: `universal-age-gate-bypass`  
**Version**: 2.2.1

---

## Milestones

| Date | Version | Milestone |
|------|---------|-----------|
| 2024-11-04 | 1.0.0 | Initial release — basic age gate bypass for 4 sites |
| 2024-11-10 | 1.5.0 | Added cookie consent handling |
| 2024-11-15 | 2.0.0 | Major rewrite: UAG.Engine architecture, single debounced loop |
| 2024-11-18 | 2.1.0 | SPA + bfcache support, adaptive timing for low-end |
| 2024-11-20 | 2.2.0 | Safer click rules, unified per-site config, Tube8 removed |
| 2024-11-22 | 2.2.1 | Bug fixes, time-boxed runs, Pornhub Escape fallback |

---

## Key Technical Decisions

### v2.0.0 — UAG.Engine Architecture
**Problem**: Multiple independent loops causing race conditions and duplicate clicks.
**Solution**: Single debounced engine loop handling all triggers.
**Result**: Eliminated duplicate clicks, simplified state management.

### v2.1.0 — SPA + bfcache Support
**Problem**: Age gates not re-detected after SPA navigation or back button.
**Solution**: Wrap `pushState`/`replaceState`, listen for `pageshow` (persisted) and `visibilitychange`.
**Result**: Works on Pornhub SPA navigation and bfcache restore.

### v2.1.0 — Adaptive Timing
**Problem**: Slow on low-end devices (Firefox Android, resistFingerprinting).
**Solution**: Detect ≤2 cores / ≤2GB RAM, auto-extend poll interval and max run time.
**Result**: Reliable on Pixel 5, Galaxy S23, and resistFingerprinting modes.

### v2.2.0 — Safer Click Rules
**Problem**: Accidental clicks on "Reject"/"Manage" buttons.
**Solution**: Blocklist of negative-intent button texts; blocklist takes precedence over allowlist.
**Result**: Zero false clicks in testing.

### v2.2.0 — Tube8 Removed
**Problem**: Tube8 structure changed, causing false clicks and layout breaks.
**Solution**: Removed Tube8 from supported sites.
**Result**: Stability improved.

---

## Diagnosed Issues

| Issue | Version | Root Cause | Fix |
|-------|---------|------------|-----|
| Duplicate clicks on same modal | 1.x | Multiple loops | v2.0.0 single engine |
| Missed age gate after SPA nav | 1.5 | No SPA listeners | v2.1.0 history wrap + pageshow |
| Slow on Firefox Android | 2.0 | Fixed timing | v2.1.0 adaptive timing |
| Clicked "Reject" on cookie banner | 2.1 | Overly broad selectors | v2.2.0 blocklist precedence |
| Layout break on xHamster | 2.1 | Overlay hiding too aggressive | v2.2.0 2.5s cleanup window |
| Memory leak on long sessions | 2.0 | Global element arrays | v2.0.0 WeakMap/WeakSet |

---

## Performance Metrics

| Metric | v1.5 | v2.2.1 |
|--------|------|--------|
| Avg time to bypass | ~800ms | ~200ms |
| Duplicate clicks/run | 2-3 | 0 |
| Max actions/run | Unlimited | 12 |
| Memory growth (10 nav) | +15MB | <1MB |
| Low-end success rate | 60% | 95% |