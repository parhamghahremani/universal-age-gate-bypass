// ==UserScript==
// @name         Universal Age Gate Auto-Bypass
// @namespace    https://github.com/yourhandle/userscripts
// @version      2.0.0
// @description  Automatically bypass 18+ age verification gates on multiple adult sites (pornhub, xnxx, xvideos, redtube, xhamster, etc.) — Firefox Desktop + Android
// @author       Your Name
// @match        *://*.pornhub.com/*
// @match        *://pornhub.com/*
// @match        *://*.xnxx.com/*
// @match        *://xnxx.com/*
// @match        *://*.xvideos.com/*
// @match        *://xvideos.com/*
// @match        *://*.redtube.com/*
// @match        *://redtube.com/*
// @match        *://*.xhamster.com/*
// @match        *://xhamster.com/*
// @match        *://*.youporn.com/*
// @match        *://youporn.com/*
// @match        *://*.tube8.com/*
// @match        *://tube8.com/*
// @match        *://*.spankbang.com/*
// @match        *://spankbang.com/*
// @exclude      *://*.pornhub.com/admin/*
// @exclude      *://*.xnxx.com/admin/*
// @exclude      *://*.xvideos.com/admin/*
// @exclude      *://*.redtube.com/admin/*
// @exclude      *://*.xhamster.com/admin/*
// @icon         https://www.pornhub.com/favicon.ico
// @grant        none
// @run-at       document-start
// @downloadURL  https://github.com/yourhandle/userscripts/raw/main/universal-age-gate-bypass/universal-age-gate-bypass.user.js
// @updateURL    https://github.com/yourhandle/userscripts/raw/main/universal-age-gate-bypass/universal-age-gate-bypass.user.js
// @supportURL   https://github.com/yourhandle/userscripts/issues
// @homepageURL  https://github.com/yourhandle/userscripts/tree/main/universal-age-gate-bypass
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    // ---------- SITE CONFIGURATIONS ----------
    // Each site defines its own selectors, text patterns, and overlay patterns
    // Easy to extend: just add a new entry to SITE_CONFIGS
    const SITE_CONFIGS = {
        'pornhub.com': {
            name: 'Pornhub',
            primarySelectors: [
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
            textPatterns: [
                /i am 18/i,
                /i am over 18/i,
                /^enter$/i,
                /^continue$/i,
                /^yes$/i,
                /^accept$/i,
                /^confirm$/i,
                /^agree$/i,
                /ثبت/i,
                /ورود/i,
                /تایید/i,
                /بالاتر از 18/i,
                /18\s*سال/i,
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
        },

        'xnxx.com': {
            name: 'XNXX',
            primarySelectors: [
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
            ],
            textPatterns: [
                /i am 18/i,
                /i am over 18/i,
                /^enter$/i,
                /^continue$/i,
                /^yes$/i,
                /^accept$/i,
                /^confirm$/i,
                /^agree$/i,
                /ثبت/i,
                /ورود/i,
                /تایید/i,
                /بالاتر از 18/i,
                /18\s*سال/i,
            ],
            overlaySelectors: [
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
            ],
            spaPaths: ['/video-', '/category-', '/channels/', '/pornstar-'],
        },

        'xvideos.com': {
            name: 'XVideos',
            primarySelectors: [
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
            ],
            textPatterns: [
                /i am 18/i,
                /i am over 18/i,
                /^enter$/i,
                /^continue$/i,
                /^yes$/i,
                /^accept$/i,
                /^confirm$/i,
                /^agree$/i,
                /ثبت/i,
                /ورود/i,
                /تایید/i,
                /بالاتر از 18/i,
                /18\s*سال/i,
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
            ],
            spaPaths: ['/video', '/channels/', '/tags/', '/pornstars/'],
        },

        'redtube.com': {
            name: 'RedTube',
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
            textPatterns: [
                /i am 18/i,
                /i am over 18/i,
                /^enter$/i,
                /^continue$/i,
                /^yes$/i,
                /^accept$/i,
                /^confirm$/i,
                /^agree$/i,
                /ثبت/i,
                /ورود/i,
                /تایید/i,
                /بالاتر از 18/i,
                /18\s*سال/i,
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
            spaPaths: ['/video/', '/categories/', '/pornstars/'],
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
            textPatterns: [
                /i am 18/i,
                /i am over 18/i,
                /^enter$/i,
                /^continue$/i,
                /^yes$/i,
                /^accept$/i,
                /^confirm$/i,
                /^agree$/i,
                /ثبت/i,
                /ورود/i,
                /تایید/i,
                /بالاتر از 18/i,
                /18\s*سال/i,
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
        },

        'youporn.com': {
            name: 'YouPorn',
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
            textPatterns: [
                /i am 18/i,
                /i am over 18/i,
                /^enter$/i,
                /^continue$/i,
                /^yes$/i,
                /^accept$/i,
                /^confirm$/i,
                /^agree$/i,
                /ثبت/i,
                /ورود/i,
                /تایید/i,
                /بالاتر از 18/i,
                /18\s*سال/i,
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
            textPatterns: [
                /i am 18/i,
                /i am over 18/i,
                /^enter$/i,
                /^continue$/i,
                /^yes$/i,
                /^accept$/i,
                /^confirm$/i,
                /^agree$/i,
                /ثبت/i,
                /ورود/i,
                /تایید/i,
                /بالاتر از 18/i,
                /18\s*سال/i,
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
            textPatterns: [
                /i am 18/i,
                /i am over 18/i,
                /^enter$/i,
                /^continue$/i,
                /^yes$/i,
                /^accept$/i,
                /^confirm$/i,
                /^agree$/i,
                /ثبت/i,
                /ورود/i,
                /تایید/i,
                /بالاتر از 18/i,
                /18\s*سال/i,
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
        },
    };

    // ---------- DETECT CURRENT SITE ----------
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

    // ---------- GLOBAL CONFIG ----------
    const CONFIG = {
        ...SITE_CONFIG,
        timings: {
            initialDelay: 0,
            retryInterval: 300,
            maxRetries: 15,
            overlayCleanupDelay: 100,
            spaNavDelay: 200,
        },
        debug: false,
        logPrefix: `[UniversalAgeGate:${SITE_CONFIG.name}]`,
    };

    // ---------- UTILITIES ----------
    const log = (...args) => CONFIG.debug && console.log(CONFIG.logPrefix, ...args);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const isVisible = (el) => el && el.offsetParent !== null;

    // Generic button candidates (buttons, links with button role, inputs)
    const BUTTON_CANDIDATES =
        'button, [role="button"], a.btn, .btn, input[type="button"], input[type="submit"], a[href*="age_verified"]';

    // ---------- CORE LOGIC ----------
    function clickAgeGateButton() {
        // Phase 1: Site-specific primary selectors (fastest, most reliable)
        for (const sel of CONFIG.primarySelectors) {
            try {
                const btn = document.querySelector(sel);
                if (isVisible(btn)) {
                    btn.click();
                    log('Clicked via primary selector:', sel);
                    return true;
                }
            } catch (_) {}
        }

        // Phase 2: Text-based fallback on visible button-like elements
        const candidates = document.querySelectorAll(BUTTON_CANDIDATES);
        for (const btn of candidates) {
            if (!isVisible(btn)) continue;
            const text = (btn.textContent || btn.innerText || btn.value || '').trim();
            if (!text) continue;
            if (CONFIG.textPatterns.some((rx) => rx.test(text))) {
                btn.click();
                log('Clicked via text match:', text);
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
            } catch (_) {}
        }

        if (removed || document.body.style.overflow === 'hidden') {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            log('Restored page scroll');
        }
        return removed;
    }

    // Heuristic: is this element a full-screen blocking overlay?
    function isBlockingOverlay(el) {
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

    async function attempt() {
        if (clickAgeGateButton()) {
            await sleep(CONFIG.timings.overlayCleanupDelay);
            removeOverlays();
            return true;
        }
        return false;
    }

    // ---------- SPA NAVIGATION HANDLING ----------
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

        return () => {
            observer.disconnect();
        };
    }

    // ---------- ENTRY POINT ----------
    async function init() {
        log('Initializing for:', CURRENT_DOMAIN);

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

    // Run at document-start, but wait for DOMContentLoaded if already past
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
