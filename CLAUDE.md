# Universal Age Gate Bypass — Project Instructions

**Project**: `universal-age-gate-bypass`  
**Canonical Name**: `universal-age-gate-bypass`  
**Userscript File**: `src/universal-age-gate-bypass.user.js` (built to `dist/` and `versions/`)  
**GitHub Repo**: `parhamghahremani/universal-age-gate-bypass` (Public)  
**Current Version**: 2.2.1  
**Target**: Firefox Desktop + Firefox Android  
**Sites**: `pornhub.com`, `xnxx.com`, `xvideos.com`, `xhamster.com`

---

## Quick Reference

| Aspect | Value |
|--------|-------|
| `@run-at` | `document-start` |
| `@grant` | `none` |
| `@match` | 4 domains × 2 (www + root) |
| Build | `npm run build` → `dist/`, `versions/` |
| Lint | `npm run lint` |
| Test | `npm test` (Playwright) |
| Version bump | `npm run version:patch\|minor\|major` |

---

## Architecture Summary

Single-file userscript (IIFE) with modular `UAG.*` namespace:

1. **UAG.Util** — Normalization, selector validation, regex matching
2. **UAG.Dom** — Visibility, blocking overlay detection, premium overlay detection
3. **UAG.Cookie** — Document-start pre-setting (only when missing)
4. **UAG.Selectors** — Page-type ordered, memoized, validated
5. **UAG.Overlay** — Center-point detection, generic hide
6. **UAG.Containers** — Modal-scoped fallback search (max 12, text < 4000 chars)
7. **UAG.Click** — Cooldown (700ms), per-element cap (4), global cap (12)
8. **UAG.Engine** — Single debounced tick, time-boxed, extends on action, Escape fallback
9. **UAG.Navigation** — SPA + bfcache, cookie pre-set on real navigation
10. **SITES** — Per-site config registry (selectors, cookies, page types)

---

## Key Design Decisions

- **v2.2.0**: Modular UAG.Engine architecture, single debounced loop, unified per-site config
- **v2.2.0**: Container-scoped fallback (no page-wide "first button"), overlay hiding (not removal)
- **v2.2.0**: SPA + bfcache navigation awareness, adaptive timing for low-end
- **v2.2.0**: Cookie pre-setting at document-start, safer click rules (blocklist > allowlist)
- **v2.2.1**: Tube8 removed, time-boxed runs (20s), Pornhub Escape fallback
- **Reader pages**: N/A (different domain patterns)
- **Emergency disable**: `?uag=off` URL parameter
- **No GM APIs**: `@grant none` for CSP compatibility
- **WeakMap/WeakSet tracking**: Prevents re-processing and memory leaks

---

## Configuration (Constants object `C`)

| Option | Default | Description |
|--------|---------|-------------|
| `MAX_RUN_MS` | `20000` | Max engine run time (ms) |
| `EXTEND_AFTER_ACTION_MS` | `5000` | Extra time after click |
| `DEBOUNCE_MS` | `40` | Debounce after DOM mutation |
| `POLL_MS` | `250` | Safety poll interval |
| `CLEANUP_WINDOW_MS` | `2500` | Overlay hide duration |
| `CLICK_COOLDOWN_MS` | `700` | Min gap between clicks on same element |
| `MAX_CLICKS_PER_ELEMENT` | `4` | Max retries per element |
| `MAX_ACTIONS` | `12` | Hard cap clicks per run |
| `ESCAPE_AFTER_MS` | `600` | Pornhub Escape fallback delay |

---

## Development Commands

```bash
# From project root: D:\Desktop\project\scripts\universal-age-gate-bypass

# Install deps
npm install

# Lint source
npm run lint

# Format source
npm run format

# Run Playwright tests
npm test

# Build versioned release
npm run build

# Version bumps (updates package.json + src/@version)
npm run version:patch  # 2.2.1 → 2.2.2
npm run version:minor  # 2.2.1 → 2.3.0
npm run version:major  # 2.2.1 → 3.0.0
```

---

## Build Process

`build.js` reads `@version` from source, creates:
- `versions/universal-age-gate-bypass-v{version}.user.js` — versioned archive
- `dist/universal-age-gate-bypass.user.js` — latest with updated `@downloadURL`/`@updateURL` pointing to stable `dist/` file (raw.githubusercontent.com)

**Never edit `dist/` or `versions/` directly** — they are build outputs.
**Note**: `dist/` and `versions/` are now tracked in git (`.gitignore` commented) for Tampermonkey auto-update compatibility.

---

## Testing

- **Playwright tests** in `tests/run-tests.spec.js` — run with `npm test`
- **3 browser configs**: Desktop Firefox, Mobile Firefox (Pixel 5), Mobile Firefox (Galaxy S23)
- Tests inject script via `page.addInitScript()` and verify:
  - Style element injection
  - Age gate bypass
  - Cookie consent acceptance
  - SPA navigation handling
  - Emergency disable (`?uag=off`)
  - Overlay hiding & scroll restoration

**Final verification always manual** in real Firefox + Tampermonkey (Desktop + Android).

---

## Git Workflow

```bash
# Always use explicit path
cd "D:\Desktop\project\scripts\universal-age-gate-bypass"

# Check status
git status

# Stage changes
git add .

# Commit with conventional message
git commit -m "type: description"

# Tag stable versions
git tag v2.2.1

# Push (ONLY after manual review + explicit approval)
git push origin master --tags
```

---

## Backup Protocol

Pre-change snapshot before each logical batch:
```bash
# Create timestamped snapshot (exclude .git/, backups/, node_modules/, dist/, versions/)
# Verify with Get-FileHash -Algorithm SHA256
# Record in backups/BACKUP_MANIFEST.md
```

---

## Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | User-facing: install, usage, config, version |
| `CHANGELOG.md` | Versioned history |
| `PROJECT_STATUS.md` | Current state, version, backups, next steps |
| `docs/SPECIFICATION.md` | Requirements, acceptance criteria |
| `docs/ARCHITECTURE.md` | Module breakdown, data flow |
| `docs/DEVELOPMENT_GUIDE.md` | Editing, build, maintenance, release |
| `docs/CONFIGURATION_AND_PERMISSIONS.md` | Metadata, grants, CONFIG details |
| `docs/COMPATIBILITY.md` | Verified browsers, unverified areas |
| `docs/MANUAL_TEST_PLAN.md` | User test checklist |
| `docs/DEVELOPMENT_LOG.md` | Milestones, diagnosed issues |
| `docs/DECISIONS.md` | Key technical decisions + rationale |
| `docs/KNOWN_ISSUES.md` | Confirmed defects, workarounds |
| `docs/REFERENCES.md` | Official docs, research sources |

---

## Constraints & Rules

1. **Never modify sibling projects** — Only touch `universal-age-gate-bypass/`
2. **Source of truth** = `src/universal-age-gate-bypass.user.js`
3. **Version consistency**: `@version` in source = `package.json` = Git tag = CHANGELOG
4. **Public GitHub repo** — Public for Tampermonkey auto-update compatibility (changed 2026-11-20)
5. **Sync only after approval** — Push after manual test + user go-ahead
6. **Persian communication** — All user messages in Persian; code/docs in English
7. **No automated test suites** — Playwright for research only; user tests manually

---

## Current Status (2026-11-21)

- **Version**: 2.2.1 (stable)
- **Git**: Commit bbe4fdd — dist/ and versions/ now tracked for Tampermonkey auto-update
- **GitHub**: Public repo at `parhamghahremani/universal-age-gate-bypass` (changed 2026-11-20)
- **Build**: `dist/` contains stable `@downloadURL`/`@updateURL` pointing to `dist/universal-age-gate-bypass.user.js`
- **Documentation**: 13 docs files + CLAUDE.md + PROJECT_STATUS.md (this file updated)
- **Backups**: Full snapshot + git bundle in backups/ (SHA256 verified)
- **Tests**: Playwright tests have proxy/network issues (NS_ERROR_PROXY_CONNECTION_REFUSED) — not code bugs
- **Next**: Documentation sync complete, ready for manual verification