# References — Universal Age Gate Bypass

**Project**: `universal-age-gate-bypass`  
**Version**: 2.2.1

---

## Official Documentation

### Web APIs
- **MDN `MutationObserver`**: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
- **MDN `WeakMap`**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
- **MDN `WeakSet`**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
- **MDN `History API`**: https://developer.mozilla.org/en-US/docs/Web/API/History_API
- **MDN `PageShowEvent.persisted`**: https://developer.mozilla.org/en-US/docs/Web/API/PageShowEvent/persisted
- **MDN `visibilitychange`**: https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
- **MDN `navigator.hardwareConcurrency`**: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency
- **MDN `navigator.deviceMemory`**: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory

### Userscript Standards
- **Tampermonkey Documentation**: https://www.tampermonkey.net/documentation.php
- **Greasemonkey API Reference**: https://wiki.greasespot.net/API_Reference
- **Violentmonkey Docs**: https://violentmonkey.github.io/
- **Userscript Metadata Block**: https://wiki.greasespot.net/Metadata_Block

### Firefox Android
- **Firefox Android Performance**: https://developer.mozilla.org/en-US/docs/Web/Performance/Firefox_Android
- **resistFingerprinting**: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/resistFingerprinting

---

## Related Projects

### MT98 Performance Optimizer
- **Repo**: `parhamghahremani/mt98-performance-optimizer`
- **Similarities**: Userscript pattern, document-start, Firefox Android target

### Sarrast Performance Optimizer
- **Repo**: `parhamghahremani/sarrast-performance-optimizer`
- **Similarities**: WeakSet tracking, MutationObserver, batch processing

### Instagram Select Comments
- **Repo**: `parhamghahremani/instagram-select-comments`
- **Similarities**: Userscript, DOM interaction automation

---

## Tools & Versions

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | ≥18.0.0 | Build, lint, test |
| npm | ≥9.0.0 | Package management |
| ESLint | ^10.14.0 | Linting |
| Prettier | ^3.9.10 | Formatting |
| Playwright | ^1.64.1 | Automated testing |
| Firefox | Latest | Primary target browser |
| Tampermonkey | Latest | Userscript manager |

---

## Useful Commands

```bash
# Development
npm install              # Install dependencies
npm run lint             # Check code style
npm run format           # Auto-format
npm test                 # Run Playwright tests (3 browser configs)

# Build
npm run build            # Create versioned release in versions/

# Version management
npm run version:patch    # 2.2.1 → 2.2.2
npm run version:minor    # 2.2.1 → 2.3.0
npm run version:major    # 2.2.1 → 3.0.0

# Git
git add . && git commit -m "type: description"
git tag v2.2.1
git push origin master --tags
```