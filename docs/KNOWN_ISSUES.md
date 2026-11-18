# Known Issues — Universal Age Gate Bypass

**Project**: `universal-age-gate-bypass`  
**Version**: 2.2.1

---

## Confirmed Issues

| ID | Severity | Issue | Workaround | Status |
|----|----------|-------|------------|--------|
| KI-01 | Low | Pornhub video page: Escape key sent even if not needed | Only once per run, 600ms delay | Monitored |
| KI-02 | Low | xHamster regional variants may have different modal text | Blocklist prevents false clicks | Monitored |
| KI-03 | Medium | resistFingerprinting reports 2 cores → low-end mode always on Android | Adaptive timing handles it | By design |
| KI-04 | Low | Cookie consent may reappear after clear-site-data | Engine re-runs on visibilitychange | Expected |
| KI-05 | Low | Very fast navigation may exceed MAX_ACTIONS (12) | Time-boxed runs reset counter | By design |

---

## Limitations

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| Only 4 sites supported | Other adult sites not handled | Easy to add via SITES config |
| No Shadow DOM support | Modals in shadow roots missed | Rare on target sites |
| No iframe traversal | Same-origin iframes not searched | Not needed for target sites |
| No IAB TCF v2.0 handlers | CMP frameworks handled via static selectors only | Accept All buttons work for most |
| 2 languages only (EN, FA) | Limited i18n for button text | Expandable pattern registry |

---

## Won't Fix (By Design)

| Issue | Reason |
|-------|--------|
| Click "Reject" if no "Accept" found | Safety: better no click than wrong click |
| Support Tube8 again | Site structure unstable, caused regressions |
| Use GM_addStyle for overlay hiding | Requires `@grant`, breaks CSP compatibility |
| Increase MAX_ACTIONS above 12 | Safety restraint; 12 sufficient for all tested flows |

---

## Related to v2.1.x Rollback

| Rolled Back Feature | Why | Current Approach |
|---------------------|-----|------------------|
| Aggressive overlay hiding | Broke xHamster layout | 2.5s cleanup window only |
| fetch interception for cookies | Caused CORS errors | Click-based acceptance only |
| Separate cookie engine | Complexity, race conditions | Unified engine |
| Tube8 support | Site changed, false clicks | Removed entirely |