# Manual Test Plan — Universal Age Gate Bypass

**Project**: `universal-age-gate-bypass`  
**Version**: 2.2.1

---

## Pre-Test Setup

1. Install Firefox Desktop + Firefox Android
2. Install Tampermonkey on both
3. Install script from `dist/universal-age-gate-bypass.user.js`
4. Enable Tampermonkey in private browsing (for testing)

---

## Test Cases

### TC-01: Pornhub Age Gate
- **Steps**: Open `https://pornhub.com` → Navigate to any video
- **Expected**: Age gate auto-dismissed, video plays
- **Verify**: No "Reject"/"Manage" clicks; Escape fallback works on video page

### TC-02: Pornhub Cookie Consent
- **Steps**: Clear cookies → Open `https://pornhub.com`
- **Expected**: Cookie banner auto-accepted
- **Verify**: "Accept All" clicked, not "Reject"

### TC-03: XNXX Age Gate
- **Steps**: Open `https://xnxx.com` → Navigate to video
- **Expected**: Age gate auto-dismissed

### TC-04: XNXX Cookie Consent
- **Steps**: Clear cookies → Open `https://xnxx.com`
- **Expected**: Cookie banner auto-accepted

### TC-05: XVideos Age Gate
- **Steps**: Open `https://xvideos.com` → Navigate to video
- **Expected**: Age gate auto-dismissed

### TC-06: XVideos Cookie Consent
- **Steps**: Clear cookies → Open `https://xvideos.com`
- **Expected**: Cookie banner auto-accepted

### TC-07: xHamster Age Gate
- **Steps**: Open `https://xhamster.com` → Navigate to video
- **Expected**: Age gate auto-dismissed

### TC-08: xHamster Cookie Consent
- **Steps**: Clear cookies → Open `https://xhamster.com`
- **Expected**: Cookie banner auto-accepted

### TC-09: SPA Navigation (Pornhub)
- **Steps**: On Pornhub, click video → Click another video (no full reload)
- **Expected**: Age gate re-detected and bypassed

### TC-10: bfcache Restore (Back Button)
- **Steps**: Open video → Go back to homepage → Click video again
- **Expected**: Age gate re-detected and bypassed

### TC-11: Visibility Change
- **Steps**: Open video → Switch tab → Switch back
- **Expected**: Engine re-runs, no duplicate clicks

### TC-12: Emergency Disable
- **Steps**: Open `https://pornhub.com?uag=off`
- **Expected**: Script disabled, age gate NOT bypassed

### TC-13: Non-Supported Site
- **Steps**: Open `https://example.com`
- **Expected**: No errors in console, no interference

### TC-14: Firefox Android (Pixel 5)
- **Steps**: Repeat TC-01 through TC-08 on Firefox Android
- **Expected**: All pass

### TC-15: Firefox Android (Galaxy S23)
- **Steps**: Repeat TC-01 through TC-08 on Firefox Android (Galaxy S23)
- **Expected**: All pass

### TC-16: Low-End Simulation
- **Steps**: Open DevTools → Performance → CPU throttling 6x → Test TC-01
- **Expected**: Adaptive timing kicks in, still works

---

## Regression Checklist

- [ ] No "Reject"/"Manage"/"Essential" buttons ever clicked
- [ ] No console errors on any site
- [ ] No duplicate clicks on same element
- [ ] No interference with video playback
- [ ] No layout breaks
- [ ] Memory stable (no leaks after 10+ navigations)

---

## Sign-Off

| Test | Desktop Firefox | Firefox Android (Pixel 5) | Firefox Android (Galaxy S23) |
|------|-----------------|---------------------------|------------------------------|
| TC-01 | ☐ | ☐ | ☐ |
| TC-02 | ☐ | ☐ | ☐ |
| TC-03 | ☐ | ☐ | ☐ |
| TC-04 | ☐ | ☐ | ☐ |
| TC-05 | ☐ | ☐ | ☐ |
| TC-06 | ☐ | ☐ | ☐ |
| TC-07 | ☐ | ☐ | ☐ |
| TC-08 | ☐ | ☐ | ☐ |
| TC-09 | ☐ | ☐ | ☐ |
| TC-10 | ☐ | ☐ | ☐ |
| TC-11 | ☐ | ☐ | ☐ |
| TC-12 | ☐ | ☐ | ☐ |
| TC-13 | ☐ | ☐ | ☐ |
| TC-14 | — | ☐ | — |
| TC-15 | — | — | ☐ |
| TC-16 | ☐ | — | — |