# Test Plan — Universal Age Gate Auto-Bypass v2.2.1

## Target Sites & URLs (4 sites)

| Site | Base URL | Age Gate Selectors |
|------|----------|-------------------|
| Pornhub | `https://www.pornhub.com/` | `.age-gate`, `.ageGate`, `#age-gate`, `#ageGate`, `[class*="agegate"]`, `[class*="age-gate"]`, `[id*="agegate"]`, `[id*="age-gate"]` |
| XNXX | `https://www.xnxx.com/` | `.age-gate`, `.agegate`, `#age-gate`, `#agegate`, `[class*="agegate"]`, `[class*="age-gate"]` |
| XVideos | `https://www.xvideos.com/` | `.age-gate`, `#age_verify`, `.age_verification`, `[class*="agegate"]`, `[class*="age-gate"]` |
| xHamster | `https://www.xhamster.com/` | `.age-gate`, `#age-gate`, `.age-verification`, `[class*="agegate"]`, `[class*="age-gate"]` |

## Test Matrix

| Platform | Viewport | User Agent | Test Cases |
|----------|----------|------------|------------|
| Desktop Windows | 1920×1080 | Firefox 130+ | TC-01 to TC-17 |
| Android Firefox | 375×812 (Pixel 5) | Firefox Android 130+ | TC-01 to TC-17 |
| Android Firefox | 412×915 (Galaxy S23) | Firefox Android 130+ | TC-01 to TC-17 |
| Android Firefox | 360×780 (Generic) | Firefox Android 130+ | TC-01 to TC-17 |

## Test Cases

### TC-01: Initial Load — Age Gate Present (All Sites)
**Precondition:** Fresh profile, no cookies
**Action:** Navigate to each site
**Expected:** Script clicks "I am 18+" button within 3s, overlay hidden, page scrollable
**Pass Criteria:** No console errors, content visible, no layout shift

### TC-02: Initial Load — No Age Gate (Cookie Accepted)
**Precondition:** Age gate already accepted (cookie present)
**Action:** Navigate to each site
**Expected:** Script runs, finds no gate, exits cleanly
**Pass Criteria:** No false clicks, no console errors

### TC-03: SPA Navigation — Video Click (Pornhub)
**Precondition:** On homepage, age gate dismissed
**Action:** Click a video thumbnail → navigate to video page
**Expected:** Script re-runs on URL change, handles any re-appearing gate
**Pass Criteria:** Video plays, no gate blocks playback

### TC-04: SPA Navigation — Back Button
**Precondition:** On video page
**Action:** Browser back button → homepage
**Expected:** `popstate` triggers re-check
**Pass Criteria:** No gate reappears incorrectly

### TC-05: PushState Navigation
**Precondition:** On any page
**Action:** `history.pushState(null, '', '/new-path')` via console
**Expected:** Script detects navigation, runs attempt()
**Pass Criteria:** Attempt runs without error

### TC-06: bfcache Restore (pageshow with persisted)
**Precondition:** Navigated from page A → B, then back to A
**Action:** Browser back button (may use bfcache)
**Expected:** `pageshow` with `persisted=true` triggers re-check
**Pass Criteria:** No gate reappears incorrectly

### TC-07: Mobile Touch Events
**Precondition:** Android viewport, age gate present
**Action:** Navigate to each site
**Expected:** Button clicked via touch/click both work
**Pass Criteria:** Gate dismissed on touch devices

### TC-08: Overlay Hiding (Not Removal)
**Precondition:** Age gate clicked but backdrop remains
**Action:** Navigate, wait for click
**Expected:** `UAG.Overlay.hide()` hides backdrop with `display: none`, restores `body.scroll`
**Pass Criteria:** Page scrollable, overlay still in DOM (hidden), no zombie overlays

### TC-09: Selector Coverage — Container-Scoped Text Fallback
**Precondition:** DOM with non-standard button inside modal container
**Action:** Inject test button matching `TEXT.age`/`TEXT.cookie` regex
**Expected:** Fallback scanner finds and clicks it inside container only
**Pass Criteria:** Click logged via text match, no page-wide button clicks

### TC-10: Cross-Site Compatibility
**Precondition:** Fresh profile
**Action:** Test all 4 sites sequentially
**Expected:** Each site handled by its specific config
**Pass Criteria:** All sites pass TC-01

### TC-11: Performance (Time-Boxed)
**Metric:** Time from DOMContentLoaded to gate dismissed / engine stop
**Target:** < 1000ms on desktop, < 1500ms on Android emulation, max 20s time-box
**Pass Criteria:** Meets target, no main-thread blocking, engine stops at deadline

### TC-12: No Console Errors
**Check:** Firefox DevTools Console after each test
**Pass Criteria:** Zero errors, only `[UAG]` info logs (when DEBUG=true)

### TC-13: Multiple Rapid Navigations
**Precondition:** On homepage
**Action:** Click 5 video links rapidly
**Expected:** Script handles each navigation without race conditions
**Pass Criteria:** No errors, all pages load correctly

### TC-14: Cookie Consent Handling
**Precondition:** Fresh profile, cookie consent banner present
**Action:** Navigate to any site with cookie banner
**Expected:** Script clicks "Accept all cookies" / "Accept" / "Agree" / "Allow all" via trusted selectors or container fallback
**Pass Criteria:** Cookie banner dismissed, no console errors, age gate still handled

### TC-15: Negative Pattern Filtering (v2.2.0)
**Precondition:** Page with Reject/Manage/Essential/Exit/Under-18/Sign-Up buttons
**Action:** Navigate to test page
**Expected:** Script NEVER clicks negative pattern buttons
**Pass Criteria:** Only positive (accept/enter) buttons clicked, negative buttons left alone

### TC-16: Cookie Pre-Setting at Document-Start
**Precondition:** Fresh profile on video page path
**Action:** Navigate to video page
**Expected:** Consent cookies set before modal renders (where supported)
**Pass Criteria:** Cookies present, modal may not appear or dismisses faster

### TC-17: Adaptive Timing (Low-End Device)
**Precondition:** `navigator.hardwareConcurrency <= 2` or `deviceMemory <= 2`
**Action:** Navigate to any site
**Expected:** Poll interval doubled, max run time 1.5x
**Pass Criteria:** No errors, reliable on low-end without hurting desktop speed

## Automation Script (Playwright)
See `tests/run-tests.spec.js` for full automated test suite.

## Manual Verification Checklist
- [ ] Tampermonkey shows script enabled on all 4 target sites
- [ ] Script version matches `versions/v2.2.1.user.js`
- [ ] Android: One-tap import from raw GitHub URL works
- [ ] No interference with video player, comments, login
- [ ] Works with uBlock Origin / other extensions enabled
- [ ] Memory usage stable over 10+ page navigations
- [ ] Cookie consent banners auto-dismissed
- [ ] Overlay hiding (not removal) preserves React hydration
- [ ] Negative patterns (Reject/Manage/Essential) never clicked
- [ ] Time-boxed engine stops at 20s max