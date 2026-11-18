# Development Guide — Universal Age Gate Bypass

**Project**: `universal-age-gate-bypass`  
**Version**: 2.2.1

---

## Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- Firefox (for manual testing)

---

## Setup

```bash
cd D:\Desktop\project\scripts\universal-age-gate-bypass
npm install
```

---

## Commands

```bash
# Lint source
npm run lint

# Format source
npm run format

# Run Playwright tests (3 browser configs)
npm test

# Run tests headed (see browser)
npm run test:headed

# Debug tests
npm run test:debug

# Build versioned release
npm run build

# Version bumps (updates package.json + src/@version)
npm run version:patch  # 2.2.1 → 2.2.2
npm run version:minor  # 2.2.1 → 2.3.0
npm run version:major  # 2.2.1 → 3.0.0
```

---

## Project Structure

```
universal-age-gate-bypass/
├── src/
│   └── universal-age-gate-bypass.user.js   # Main userscript (source of truth)
├── tests/
│   └── run-tests.spec.js                    # Playwright tests
├── versions/                                 # Versioned releases (gitignored)
├── dist/                                     # Latest build (gitignored)
├── docs/                                     # Documentation (13 files)
├── backups/                                  # Local backups (gitignored)
├── research/                                 # Research notes
├── CHANGELOG.md
├── CLAUDE.md
├── PROJECT_STATUS.md
├── package.json
├── eslint.config.js
├── playwright.config.js
├── build.js
└── .prettierrc
```

---

## Source of Truth

**`src/universal-age-gate-bypass.user.js`** — Never edit `dist/` or `versions/` directly. They are build outputs.

---

## Version Consistency

All must match:
- `src/universal-age-gate-bypass.user.js` → `@version`
- `package.json` → `version`
- Git tag → `v{version}`
- `CHANGELOG.md` → latest entry

---

## Adding a New Site

1. Add `@match`/`@exclude` to metadata block
2. Add site config to `SITES` object:
   ```javascript
   'newsite.com': {
     name: 'NewSite',
     age: [...],
     cookie: [...],
     overlays: [...],
     cookies: { ... },
     pageType: () => ...,
     boost: { ... },
   }
   ```
3. Add test case in `tests/run-tests.spec.js` (targetSites array)
4. Update `README.md` supported sites table

---

## Testing Strategy

- **Playwright**: Automated injection + verification on live sites
- **3 browser configs**: Desktop Firefox, Mobile Firefox (Pixel 5), Mobile Firefox (Galaxy S23)
- **Manual**: Final verification in real Firefox + Tampermonkey (Desktop + Android)

---

## Build Process

`build.js`:
1. Reads `@version` from source
2. Creates `versions/universal-age-gate-bypass-v{version}.user.js`
3. Creates `dist/universal-age-gate-bypass.user.js` with updated `@downloadURL`/`@updateURL`

---

## Git Workflow

```bash
cd "D:\Desktop\project\scripts\universal-age-gate-bypass"

git status
git add .
git commit -m "type: description"
git tag v2.2.1

# ONLY after manual test + explicit approval
git push origin master --tags
```

---

## Backup Protocol

Pre-change snapshot before each logical batch:
```powershell
# Run create-backup.ps1 (to be created)
# Verify with Get-FileHash -Algorithm SHA256
# Record in backups/BACKUP_MANIFEST.md
```