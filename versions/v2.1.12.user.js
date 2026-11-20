// ==UserScript==
// @name         Universal Age Gate Auto-Bypass
// @namespace    https://github.com/parhamghahremani/universal-age-gate-bypass
// @version      2.1.12
// @description  Automatically bypass 18+ age verification gates on multiple adult sites + cookie consent — Firefox Desktop + Android
// @author       parham
// @match        *://*.pornhub.com/*
// @match        *://pornhub.com/*
// @match        *://*.xnxx.com/*
// @match        *://xnxx.com/*
// @match        *://*.xvideos.com/*
// @match        *://xvideos.com/*
// @match        *://*.xhamster.com/*
// @match        *://xhamster.com/*
// @match        *://*.tube8.com/*
// @match        *://tube8.com/*
// @match        *://*.spankbang.com/*
// @match        *://spankbang.com/*
// @exclude      *://*.pornhub.com/admin/*
// @exclude      *://*.xnxx.com/admin/*
// @exclude      *://*.xvideos.com/admin/*
// @exclude      *://*.xhamster.com/admin/*
// @icon         data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FF6B35"/><stop offset="100%" stop-color="%23F7931E"/></linearGradient></defs><rect fill="url(%23g)" rx="4" width="24" height="24"/><text fill="%23FFF" font-family="system-ui,sans-serif" font-size="10" font-weight="bold" x="50%" y="58%" text-anchor="middle" dominant-baseline="middle">18+</text></svg>
// @grant        none
// @run-at       document-start
// @downloadURL  https://github.com/parhamghahremani/universal-age-gate-bypass/raw/main/universal-age-gate-bypass.user.js
// @updateURL    https://github.com/parhamghahremani/universal-age-gate-bypass/raw/main/universal-age-gate-bypass.user.js
// @supportURL   https://github.com/parhamghahremani/universal-age-gate-bypass/issues
// @homepageURL  https://github.com/parhamghahremani/universal-age-gate-bypass
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    // ============================================================================
    // SITE CONFIGURATIONS (v2.1.4 simplicity + v2.1.8 precision selectors)
    // ============================================================================

    const SITE_CONFIGS = {
        'pornhub.com': {
            name: 'Pornhub',
            primarySelectors: [
                // Pornhub-specific: data-label & GTM classes (highest priority, geo-independent)
                // Comprehensive A/B test coverage with wildcards
                'button[data-label="over18_enter"]',
                'button[data-label="age_gate_enter"]',
                'button[data-label*="over18" i]',
                'button[data-label*="age_gate" i]',
                'button[data-label*="18" i]',
                '.js-av-cta.buttonOver18',
                '.gtm-event-age-verification.js-closeAgeModal',
                '.ageDisclaimerButtons .buttonOver18',
                'button.gtm-event-age-verification[data-label="over18_enter"]',
                'button.gtm-event-age-verification',
                // Generic fallbacks
                'button[data-agegate="confirm"]',
                'button.age-gate-btn',
                'button.ageGateConfirm',
                'button[aria-label*="18" i]',
                'button[aria-label*="age" i]',
                'button[aria-label*="enter" i]',
                '.age-gate button',
                '.ageGate button',
                '#age-gate button',
                '#ageGate button',
                '[class*="agegate"] button',
                '[class*="age-gate"] button',
                '[id*="agegate"] button',
                '[id*="age-gate"] button',
            ],
            overlaySelectors: [
                '.age-gate',
                '.ageGate',
                '#age-gate',
                '#ageGate',
                '.age-verification',
                '.ageVerification',
                '[class*="agegate"]',
                '[class*="age-gate"]',
                '[id*="agegate"]',
                '[id*="age-gate"]',
                '.modal-backdrop',
                '.overlay',
                '[style*="z-index: 9999"]',
            ],
            spaPaths: ['/video/', '/categories/', '/channels/', '/pornstars/', '/gifs/'],
            timings: {
                retryInterval: 30,
                maxRetries: 30,
                initialDelay: 0,
                overlayCleanupDelay: 0,
                spaNavDelay: 50,
            },
        },

        'xnxx.com': {
            name: 'XNXX',
            primarySelectors: [
                // Homepage: disclaimer/cookie consent overlay (highest priority)
                '#disclaimer-accept_cookies-btn',
                '#disclaimer_message .btn-primary',
                '#disclaimer-top-close-btn',
                '.disclaimer-enter-btns .btn-select',
                '#disclaimer-reject_cookies-btn',
                '.disclaimer-manage_cookies',
                // Age gate (first overlay): .disclaimer-enter button "I am 18+ - Enter Site"
                'button.disclaimer-enter',
                '.disclaimer-buttons .disclaimer-enter',
                '.disclaimer-enter',
                // Generic age gate fallbacks (video pages may not have disclaimer)
                'button.btn-accept',
                'button.btn-primary[data-age="18"]',
                'button[onclick*="ageCheck"]',
                '.age-gate button',
                '.agegate button',
                '#age-gate button',
                '#agegate button',
                'a[href*="age_verified"]',
                'button[class*="age"]',
                '.modal button',
                '[class*="age-gate"] button',
                '[class*="agegate"] button',
                '.disclaimer-background button',
                '#disclaimer button',
            ],
            overlaySelectors: [
                // Homepage disclaimer overlay (fixed, covers viewport, z-index 80000)
                '#disclaimer_background',
                '#disclaimer_message',
                '.disclaimer-opened',
                // Generic age gate overlays
                '.age-gate',
                '.agegate',
                '#age-gate',
                '#agegate',
                '.age-verification',
                '.modal-backdrop',
                '.overlay',
                '[class*="agegate"]',
                '[class*="age-gate"]',
                '[style*="z-index: 9999"]',
                '#disclaimer',
            ],
            spaPaths: ['/video-', '/category-', '/channels/', '/pornstar-'],
            timings: {
                retryInterval: 50,
                maxRetries: 50,
                initialDelay: 50,
                overlayCleanupDelay: 50,
                spaNavDelay: 50,
            },
        },

        'xvideos.com': {
            name: 'XVideos',
            primarySelectors: [
                '#disclaimer-accept_cookies-btn',
                'button.btn-accept',
                'button.agree-btn',
                'button[data-testid="age-gate-confirm"]',
                '.age-gate button',
                '#age_verify button',
                '.age_verification button',
                '[class*="agegate"] button',
                '[class*="age-gate"] button',
                'a[href*="age_verified"]',
                'button[class*="accept"]',
                '.disclaimer-background button',
                '#disclaimer button',
            ],
            overlaySelectors: [
                '.age-gate',
                '#age_verify',
                '.age_verification',
                '[class*="agegate"]',
                '[class*="age-gate"]',
                '.modal-backdrop',
                '.overlay',
                '[style*="z-index: 9999"]',
                '#disclaimer_background',
                '#disclaimer',
            ],
            spaPaths: ['/video', '/channels/', '/tags/', '/pornstars/'],
            timings: {
                retryInterval: 80,
                maxRetries: 60,
                initialDelay: 100,
                overlayCleanupDelay: 50,
                spaNavDelay: 100,
            },
        },

        'xhamster.com': {
            name: 'xHamster',
            primarySelectors: [
                'button[data-testid="age-gate-confirm"]',
                'button.age-gate-btn',
                'button.btn-accept',
                '.age-gate button',
                '#age-gate button',
                '[class*="agegate"] button',
                '[class*="age-gate"] button',
                'a[href*="age_verified"]',
                'button[aria-label*="18" i]',
                'button[aria-label*="enter" i]',
            ],
            overlaySelectors: [
                '.age-gate',
                '#age-gate',
                '.age-verification',
                '[class*="agegate"]',
                '[class*="age-gate"]',
                '.modal-backdrop',
                '.overlay',
                '[style*="z-index: 9999"]',
            ],
            spaPaths: ['/videos/', '/channels/', '/categories/', '/pornstars/'],
            timings: {
                retryInterval: 60,
                maxRetries: 50,
                initialDelay: 50,
                overlayCleanupDelay: 0,
                spaNavDelay: 50,
            },
        },

        'tube8.com': {
            name: 'Tube8',
            primarySelectors: [
                'button[data-agegate="confirm"]',
                'button.age-gate-btn',
                'button.btn-accept',
                '.age-gate button',
                '.ageGate button',
                '#age-gate button',
                '[class*="agegate"] button',
                '[class*="age-gate"] button',
                'a[href*="age_verified"]',
            ],
            overlaySelectors: [
                '.age-gate',
                '.ageGate',
                '#age-gate',
                '.age-verification',
                '[class*="agegate"]',
                '[class*="age-gate"]',
                '.modal-backdrop',
                '.overlay',
                '[style*="z-index: 9999"]',
            ],
            spaPaths: ['/video/', '/categories/', '/channels/', '/pornstars/'],
            timings: {
                retryInterval: 40,
                maxRetries: 40,
                initialDelay: 0,
                overlayCleanupDelay: 0,
                spaNavDelay: 0,
            },
        },

        'spankbang.com': {
            name: 'SpankBang',
            primarySelectors: [
                'button[data-agegate="confirm"]',
                'button.age-gate-btn',
                'button.btn-accept',
                '.age-gate button',
                '.ageGate button',
                '#age-gate button',
                '[class*="agegate"] button',
                '[class*="age-gate"] button',
                'a[href*="age_verified"]',
                'button[class*="age-gate"]',
                'button[class*="confirm"]',
            ],
            overlaySelectors: [
                '.age-gate',
                '.ageGate',
                '#age-gate',
                '.age-verification',
                '[class*="agegate"]',
                '[class*="age-gate"]',
                '.modal-backdrop',
                '.overlay',
                '[style*="z-index: 9999"]',
            ],
            spaPaths: ['/video/', '/categories/', '/channels/', '/pornstars/'],
            timings: {
                retryInterval: 60,
                maxRetries: 50,
                initialDelay: 50,
                overlayCleanupDelay: 0,
                spaNavDelay: 50,
            },
        },
    };

    // ============================================================================
    // GLOBAL COOKIE CONSENT SELECTORS (Cross-site)
    // ============================================================================

    const COOKIE_CONSENT_SELECTORS = [
        // Pornhub-specific: "Accept all cookies" variant (highest priority)
        '.cbPrimaryCTA.gtm-event-cookie-banner',
        'button[data-label="accept_all"]',
        'button.cbButton[data-event="cookie_banner"][data-label="accept_all"]',
        // Pornhub-specific: "Ok" button variant (high priority)
        '.js-acceptGlobalCookies',
        'button[id*="accept"]',
        'button[class*="accept"]',
        'button[id*="consent"]',
        'button[class*="consent"]',
        'button[id*="agree"]',
        'button[class*="agree"]',
        'button[aria-label*="accept" i]',
        'button[aria-label*="agree" i]',
        'button[aria-label*="consent" i]',
        'a[href*="consent"]',
        'a[href*="accept"]',
        '[data-testid*="accept"]',
        '[data-testid*="consent"]',
        '[data-testid*="agree"]',
        'button[class*="cookie"]',
        'button[id*="cookie"]',
    ];

    // ============================================================================
    // MULTI-LANGUAGE TEXT PATTERNS (EN + FA only)
    // ============================================================================

    const TEXT_PATTERNS = {
        ageGate: {
            en: [
                /i am 18/i,
                /i am over 18/i,
                /^enter$/i,
                /^continue$/i,
                /^yes$/i,
                /^accept$/i,
                /^confirm$/i,
                /^agree$/i,
                /verify age/i,
                /confirm age/i,
            ],
            fa: [
                /ثبت/i,
                /ورود/i,
                /تایید/i,
                /بالاتر از ۱۸/i,
                /۱۸\s*سال/i,
                /پذیرفتن/i,
                /تایید\s+سن/i,
            ],
        },
        cookieConsent: {
            en: [
                /^(?:accept all|accept all cookies|allow all|allow all cookies)$/i,
                /^(?:accept|agree|consent|allow|i agree|got it|ok)$/i,
            ],
            fa: [
                /^(?:قبول\s+همه|پذیرش\s+همه|موافقت\s+با\s+همه)$/i,
                /^(?:قبول|پذیرش|موافق|تأیید|باشه|اوکی)$/i,
            ],
        },
        // Extended cookie consent patterns for geo-variants
        cookieConsentExtended: {
            en: [
                /accept all cookies/i,
                /accept only essential/i,
                /allow all/i,
                /agree to all/i,
                /consent to all/i,
            ],
        },
        // XNXX-specific text patterns (homepage disclaimer/cookie consent)
        xnxxDisclaimer: {
            en: [
                /^enter and accept all cookies$/i,
                /^reject all cookies$/i,
                /^manage cookies$/i,
                /^straight$/i,
                /^gay$/i,
                /^trans$/i,
            ],
            fa: [
                /^ورود و پذیرش همه کوکی/i,
                /^رد همه کوکی/i,
                /^مدیریت کوکی/i,
                /^مستقیم$/i,
                /^گِی/i,
                /^ترنس/i,
            ],
        },
    };

    function detectPageLanguage() {
        const htmlLang =
            document.documentElement.lang || document.documentElement.getAttribute('lang');
        if (htmlLang) return htmlLang.split('-')[0].toLowerCase();

        const metaLang = document.querySelector(
            'meta[http-equiv="content-language"], meta[name="language"]'
        );
        if (metaLang) return metaLang.getAttribute('content').split('-')[0].toLowerCase();

        const bodyText = (document.body.innerText || '').toLowerCase();
        const langScores = { en: 0, fa: 0 };
        for (const pattern of TEXT_PATTERNS.ageGate.en) {
            if (pattern.test(bodyText)) langScores.en++;
        }
        for (const pattern of TEXT_PATTERNS.ageGate.fa) {
            if (pattern.test(bodyText)) langScores.fa++;
        }
        return langScores.fa > langScores.en ? 'fa' : 'en';
    }

    function getPatternsForType(type) {
        const lang = detectPageLanguage();
        const patterns = TEXT_PATTERNS[type]?.[lang] || TEXT_PATTERNS[type]?.en || [];
        const enPatterns = TEXT_PATTERNS[type]?.en || [];
        const extended =
            (type === 'cookieConsent' && TEXT_PATTERNS.cookieConsentExtended?.en) || [];
        const xnxxPatterns =
            (type === 'cookieConsent' && CURRENT_DOMAIN === 'xnxx.com' && TEXT_PATTERNS.xnxxDisclaimer?.[lang]) ||
            (type === 'cookieConsent' && CURRENT_DOMAIN === 'xnxx.com' && TEXT_PATTERNS.xnxxDisclaimer?.en) ||
            [];
        return [...new Set([...patterns, ...enPatterns, ...extended, ...xnxxPatterns])];
    }

    // ============================================================================
    // DETECT CURRENT SITE
    // ============================================================================

    function detectSite() {
        const hostname = location.hostname.replace(/^www\./, '');
        for (const [domain, config] of Object.entries(SITE_CONFIGS)) {
            if (hostname === domain || hostname.endsWith('.' + domain)) {
                return { domain, config };
            }
        }
        return { domain: null, config: null };
    }

    const { domain: CURRENT_DOMAIN, config: SITE_CONFIG } = detectSite();

    if (!SITE_CONFIG) {
        console.log('[UniversalAgeGate] No config for:', location.hostname);
        return;
    }

    // ============================================================================
    // GLOBAL CONFIG (v2.1.4 simplicity)
    // ============================================================================

    const DEFAULT_TIMINGS = {
        retryInterval: 50,
        maxRetries: 50,
        initialDelay: 0,
        overlayCleanupDelay: 0,
        spaNavDelay: 0,
    };

    // ============================================================================
    // PORNHUB-SPECIFIC ENHANCEMENTS (v2.1.10)
    // ============================================================================

    // Smart conditional cookie pre-setting at document-start (no DOM manipulation)
    function preSetPornhubCookies() {
        if (CURRENT_DOMAIN !== 'pornhub.com') return;
        const pathname = location.pathname;
        // Only on video pages and only if cookies not already set
        if (pathname.startsWith('/video/') || pathname.startsWith('/embed/')) {
            const hasAgeVerified = document.cookie.includes('age_verified=1');
            const hasCookieConsent = document.cookie.includes('cookieConsent=1');
            if (!hasAgeVerified) {
                document.cookie =
                    'age_verified=1; path=/; domain=.pornhub.com; Secure; SameSite=Lax';
                log('Pre-set age_verified cookie');
            }
            if (!hasCookieConsent) {
                document.cookie =
                    'cookieConsent=1; path=/; domain=.pornhub.com; Secure; SameSite=Lax';
                log('Pre-set cookieConsent cookie');
            }
        }
    }

    // Page-type detection for targeted selectors
    function getPornhubPageType() {
        if (CURRENT_DOMAIN !== 'pornhub.com') return 'unknown';
        const p = location.pathname;
        if (p.startsWith('/video/') || p.startsWith('/embed/')) return 'video';
        if (p.startsWith('/category') || p.startsWith('/categories')) return 'category';
        if (p.startsWith('/channel') || p.startsWith('/channels')) return 'channel';
        if (p.startsWith('/pornstar') || p.startsWith('/pornstars')) return 'pornstar';
        if (p.startsWith('/search') || p.includes('search')) return 'search';
        if (p.startsWith('/gif') || p.startsWith('/gifs')) return 'gif';
        return 'other';
    }

    // XNXX-specific: detect homepage (has disclaimer) vs video page (no disclaimer)
    function getXnxxPageType() {
        if (CURRENT_DOMAIN !== 'xnxx.com') return 'unknown';
        const hasDisclaimerOpened = document.documentElement.classList.contains('disclaimer-opened');
        const hasDisclaimerBg = !!document.getElementById('disclaimer_background');
        if (hasDisclaimerOpened || hasDisclaimerBg) return 'homepage';
        // Video pages: /video-<id>/<title> format
        if (location.pathname.match(/^\/video-[\w]+/)) return 'video';
        return 'other';
    }

    // XNXX-specific: conditional cookie pre-setting for video pages
    function preSetXnxxCookies() {
        if (CURRENT_DOMAIN !== 'xnxx.com') return;
        // Video pages don't show disclaimer - cookies may already be set from homepage
        // This ensures they're set for direct video links
        if (CONFIG.xnxxPageType === 'video') {
            // XNXX uses different cookie names - check common ones
            const hasConsent = document.cookie.includes('disclaimer=2') ||
                               document.cookie.includes('age_verified=1') ||
                               document.cookie.includes('cookieConsent=1');
            if (!hasConsent) {
                // Set common XNXX consent cookies
                document.cookie = 'disclaimer=2; path=/; domain=.xnxx.com; Secure; SameSite=Lax';
                document.cookie = 'age_verified=1; path=/; domain=.xnxx.com; Secure; SameSite=Lax';
                log('Pre-set XNXX video page cookies');
            }
        }
    }

    const CONFIG = {
        ...SITE_CONFIG,
        timings: { ...DEFAULT_TIMINGS, ...SITE_CONFIG.timings },
        debug: false,
        logPrefix: `[UniversalAgeGate:${SITE_CONFIG.name}]`,
        pageType: getPornhubPageType(),
        xnxxPageType: getXnxxPageType(),
    };

    // ============================================================================
    // UTILITIES
    // ============================================================================

    const log = (...args) => CONFIG.debug && console.log(CONFIG.logPrefix, ...args);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    // Smart visibility: rejects sf-hidden, display:none, visibility:hidden
    const isVisible = (el) =>
        el &&
        el.offsetParent !== null &&
        !el.classList.contains('sf-hidden') &&
        getComputedStyle(el).display !== 'none' &&
        getComputedStyle(el).visibility !== 'hidden';

    // Check if overlay is premium/signup/upsell (should NOT be removed)
    const isPremiumOverlay = (el) => {
        const text = (el.textContent || '').toLowerCase();
        const premiumKeywords = [
            'premium',
            'upgrade',
            'signup',
            'sign up',
            'register',
            'create account',
            'join now',
            'get premium',
            'go premium',
            'vip',
            'membership',
            'subscribe',
            'subscription',
        ];
        return premiumKeywords.some((kw) => text.includes(kw));
    };

    // Generic button candidates (buttons, links with button role, inputs)
    const BUTTON_CANDIDATES =
        'button, [role="button"], a.btn, .btn, input[type="button"], input[type="submit"], a[href*="age_verified"], a.removeAdLink.gtm-event-avmodal, a#btn_agree, a.gtm-event-avmodal';

    // ============================================================================
    // CORE LOGICS
    // ============================================================================

    function clickAgeGateButton() {
        // Phase 1: Site-specific primary selectors (fastest, most reliable)
        for (const sel of CONFIG.primarySelectors) {
            try {
                const btn = document.querySelector(sel);
                if (isVisible(btn)) {
                    btn.click();
                    log('Clicked age gate via primary selector:', sel);
                    return true;
                }
            } catch {}
        }

        // Phase 2: Text-based fallback on visible button-like elements
        const candidates = document.querySelectorAll(BUTTON_CANDIDATES);
        const patterns = getPatternsForType('ageGate');

        for (const btn of candidates) {
            if (!isVisible(btn)) continue;
            const text = (btn.textContent || btn.innerText || btn.value || '').trim();
            if (!text) continue;
            if (patterns.some((rx) => rx.test(text))) {
                btn.click();
                log('Clicked age gate via text match:', text);
                return true;
            }
        }
        return false;
    }

    function clickCookieConsent() {
        // Phase 1: Cookie consent specific selectors
        for (const sel of COOKIE_CONSENT_SELECTORS) {
            try {
                const btn = document.querySelector(sel);
                if (isVisible(btn)) {
                    btn.click();
                    log('Clicked cookie consent via selector:', sel);
                    return true;
                }
            } catch {}
        }

        // Phase 2: Text-based fallback (with extended patterns for geo-variants)
        const candidates = document.querySelectorAll(BUTTON_CANDIDATES);
        const patterns = getPatternsForType('cookieConsent');

        for (const btn of candidates) {
            if (!isVisible(btn)) continue;
            const text = (btn.textContent || btn.innerText || btn.value || '').trim();
            if (!text) continue;
            if (patterns.some((rx) => rx.test(text))) {
                btn.click();
                log('Clicked cookie consent via text match:', text);
                return true;
            }
        }
        return false;
    }

    function removeOverlays() {
        let removed = false;
        for (const sel of CONFIG.overlaySelectors) {
            try {
                const elements = document.querySelectorAll(sel);
                elements.forEach((el) => {
                    if (isVisible(el) && isBlockingOverlay(el)) {
                        el.remove();
                        log('Removed overlay:', el.className || el.id || sel);
                        removed = true;
                    }
                });
            } catch {}
        }

        if (removed || document.body.style.overflow === 'hidden') {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            log('Restored page scroll');
        }
        return removed;
    }

    // Heuristic: is this element a full-screen blocking overlay? (v2.1.4 non-strict)
    // v2.1.10: Skip premium/signup/upsell overlays
    function isBlockingOverlay(el) {
        if (isPremiumOverlay(el)) {
            log('Skipping premium/upsell overlay:', el.className || el.id);
            return false;
        }
        const style = getComputedStyle(el);
        const isFixed = style.position === 'fixed';
        const coversViewport =
            style.top === '0px' &&
            style.left === '0px' &&
            style.right === '0px' &&
            style.bottom === '0px';
        const highZ = parseInt(style.zIndex) > 999;
        const hasSize = el.offsetWidth > 100 && el.offsetHeight > 100;
        return isFixed && (coversViewport || highZ) && hasSize;
    }

    // ============================================================================
    // MAIN ATTEMPT (v2.1.4 flow: cookie consent -> age gate -> overlay cleanup)
    // ============================================================================

    async function attempt() {
        // 1. Handle cookie consent first (may not exist yet on some sites)
        clickCookieConsent();

        // 2. Then handle age gate
        if (clickAgeGateButton()) {
            // After clicking age gate, wait for DOM to update and check for cookie consent again
            // Some sites (XNXX, Pornhub) show cookie consent AFTER age gate is dismissed
            await sleep(100); // brief pause for DOM transition
            clickCookieConsent(); // re-check for cookie consent that may appear after age gate
            await sleep(CONFIG.timings.overlayCleanupDelay);
            removeOverlays();
            return true;
        }

        // 3. Fallback: Press Escape to dismiss stuck modals (Pornhub video pages)
        if (CURRENT_DOMAIN === 'pornhub.com' && CONFIG.pageType === 'video') {
            try {
                document.dispatchEvent(
                    new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
                );
                log('Dispatched Escape key for stuck modal');
                await sleep(50);
                if (clickAgeGateButton()) {
                    await sleep(100);
                    clickCookieConsent(); // re-check after Escape too
                    await sleep(CONFIG.timings.overlayCleanupDelay);
                    removeOverlays();
                    return true;
                }
            } catch {}
        }
        return false;
    }

    // ============================================================================
    // SPA NAVIGATION HANDLING
    // ============================================================================

    function observeSPANavigation() {
        let lastUrl = location.href;

        // MutationObserver for DOM changes (covers SPA content loads)
        const observer = new MutationObserver(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                log('URL changed via MutationObserver:', lastUrl);
                setTimeout(attempt, CONFIG.timings.spaNavDelay);
            }
        });
        observer.observe(document, { subtree: true, childList: true });

        // History API overrides (pushState, replaceState)
        ['pushState', 'replaceState'].forEach((fn) => {
            const orig = history[fn];
            history[fn] = function (...args) {
                orig.apply(this, args);
                log('History API:', fn);
                setTimeout(attempt, CONFIG.timings.spaNavDelay);
            };
        });

        // popstate for back/forward navigation
        window.addEventListener('popstate', () => {
            log('popstate event');
            setTimeout(attempt, CONFIG.timings.spaNavDelay);
        });

        return () => observer.disconnect();
    }

    // ============================================================================
    // FAST PATH: MutationObserver at document-start (v2.1.4 ultra-fast)
    // ============================================================================

    let fastPathActive = true;
    let fastPathObserver = null;
    let fastPathMicrotaskScheduled = false;
    let fastPathInterval = null;

    function scheduleFastPathAttempt() {
        if (!fastPathActive || fastPathMicrotaskScheduled) return;
        fastPathMicrotaskScheduled = true;
        queueMicrotask(() => {
            fastPathMicrotaskScheduled = false;
            if (!fastPathActive) return;
            if (attempt()) {
                fastPathActive = false;
                if (fastPathObserver) {
                    fastPathObserver.disconnect();
                    fastPathObserver = null;
                }
                if (fastPathInterval) {
                    clearInterval(fastPathInterval);
                    fastPathInterval = null;
                }
            }
        });
    }

    function startFastPath() {
        // Immediate synchronous check at document-start
        if (attempt()) {
            fastPathActive = false;
            return;
        }

        // MutationObserver on documentElement for earliest possible detection
        fastPathObserver = new MutationObserver(() => {
            scheduleFastPathAttempt();
        });
        fastPathObserver.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });

        // Also schedule periodic microtask retries for ultra-fast response
        fastPathInterval = setInterval(() => {
            if (!fastPathActive) {
                clearInterval(fastPathInterval);
                fastPathInterval = null;
                return;
            }
            scheduleFastPathAttempt();
        }, 10); // Check every 10ms via microtasks
    }

    // ============================================================================
    // ENTRY POINT
    // ============================================================================

    async function init() {
        log('Initializing for:', CURRENT_DOMAIN);

        // Stop fast path if it's still running
        if (fastPathObserver) {
            fastPathObserver.disconnect();
            fastPathObserver = null;
        }
        if (fastPathInterval) {
            clearInterval(fastPathInterval);
            fastPathInterval = null;
        }
        fastPathActive = false;

        // Initial delay for heavy mobile pages
        if (CONFIG.timings.initialDelay > 0) {
            await sleep(CONFIG.timings.initialDelay);
        }

        if (await attempt()) return;

        let retries = CONFIG.timings.maxRetries;
        const interval = setInterval(async () => {
            if (await attempt()) {
                clearInterval(interval);
                return;
            }
            if (--retries <= 0) {
                clearInterval(interval);
                log('Max retries reached, giving up');
            }
        }, CONFIG.timings.retryInterval);

        observeSPANavigation();
    }

    // Run at document-start
    // Pre-set Pornhub cookies immediately at document-start (before any DOM interaction)
    if (CURRENT_DOMAIN === 'pornhub.com') {
        preSetPornhubCookies();
    }
    // Pre-set XNXX cookies for video pages
    if (CURRENT_DOMAIN === 'xnxx.com') {
        preSetXnxxCookies();
    }

    if (document.readyState === 'loading') {
        startFastPath();
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
