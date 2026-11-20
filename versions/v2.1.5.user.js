// ==UserScript==
// @name         Universal Age Gate Auto-Bypass
// @namespace    https://github.com/yourhandle/userscripts
// @version      2.1.6
// @description  Automatically bypass 18+ age verification gates on multiple adult sites + cookie consent — Firefox Desktop + Android
// @author       Your Name
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

    // ============================================================================
    // MODULE 1: SHADOW DOM & IFRAME TRAVERSAL (with safeguards)
    // ============================================================================

    /**
     * Traverses light DOM + all shadow roots + same-origin iframes
     * Returns all matching elements across all roots
     * @param {Object} options - { disableShadowDom, disableIframes }
     */
    function queryAllRoots(selector, root = document, options = {}) {
        const { disableShadowDom = false, disableIframes = false } = options;
        const results = [];

        // 1. Light DOM (always)
        try {
            results.push(...root.querySelectorAll(selector));
        } catch {}

        // 2. Shadow DOM (recursive) - can be disabled per site via safeguards
        if (!disableShadowDom) {
            const walkShadowRoots = (node) => {
                if (node.shadowRoot) {
                    try {
                        results.push(...node.shadowRoot.querySelectorAll(selector));
                    } catch {}
                    // Nested shadow roots
                    node.shadowRoot.querySelectorAll('*').forEach((nested) => {
                        if (nested.shadowRoot) {
                            try {
                                results.push(...nested.shadowRoot.querySelectorAll(selector));
                            } catch {}
                        }
                    });
                }
                try {
                    node.querySelectorAll('*').forEach((child) => walkShadowRoots(child));
                } catch {}
            };
            walkShadowRoots(root);
        }

        // 3. Same-origin iframes - can be disabled per site via safeguards
        if (!disableIframes) {
            try {
                root.querySelectorAll('iframe').forEach((iframe) => {
                    try {
                        if (iframe.contentDocument) {
                            results.push(...queryAllRoots(selector, iframe.contentDocument, options));
                        }
                    } catch {
                        // Cross-origin: silently ignore
                    }
                });
            } catch {}
        }

        // Deduplicate by reference
        return [...new Set(results)];
    }

    // ============================================================================
    // SITE CONFIGURATIONS (with per-site timings, safeguards & injection strategies)
    // ============================================================================

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
                initialDelay: 50,
                overlayCleanupDelay: 0,
                spaNavDelay: 50,
            },
            // Site-specific safeguards
            safeguards: {
                disableShadowDomTraversal: true,
                disableIframeTraversal: true,
                disableCookieBypass: false,
                strictOverlayDetection: true,
                fastPathEnabled: true,
            },
            // Injection strategies for no-click auto-pass
            injection: {
                cookieBypass: [
                    { name: 'age_verified', value: '1', domain: '.pornhub.com', path: '/' },
                    { name: 'cookieConsent', value: '1', domain: '.pornhub.com', path: '/' },
                ],
                localStorageFlags: {
                    'age_verified': 'true',
                    'ageGatePassed': 'true',
                },
                globalFlags: {
                    'PH_AGE_VERIFIED': true,
                    'ageGatePassed': true,
                },
                functionOverrides: {
                    'showAgeGate': () => Promise.resolve(),
                    'showModal': () => Promise.resolve(),
                    'openAgeGate': () => Promise.resolve(),
                },
                blockElements: [
                    '#ageDisclaimerMainBG',
                    '#js-ageDisclaimerModal',
                    '#ageDisclaimerOverlay',
                ],
            },
        },

        'xnxx.com': {
            name: 'XNXX',
            primarySelectors: [
                '#disclaimer-accept_cookies-btn',
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
                '#disclaimer_background',
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
    // COOKIE-BASED BYPASS CONFIG
    // ============================================================================

    const COOKIE_BYPASS_CONFIG = {
        'pornhub.com': { name: 'age_verified', value: '1', domain: '.pornhub.com' },
        'xnxx.com': { name: 'age_verified', value: '1', domain: '.xnxx.com' },
        'xvideos.com': { name: 'age_check', value: '1', domain: '.xvideos.com' },
        'xhamster.com': { name: 'age_gate_passed', value: 'true', domain: '.xhamster.com' },
        'tube8.com': { name: 'age_verified', value: '1', domain: '.tube8.com' },
        'spankbang.com': { name: 'age_verified', value: '1', domain: '.spankbang.com' },
    };

    // ============================================================================
    // GLOBAL PATTERNS (Cross-site) — Legacy cookie consent fallback
    // ============================================================================

    const COOKIE_CONSENT_SELECTORS = [
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
    };

    function detectPageLanguage() {
        const htmlLang = document.documentElement.lang || document.documentElement.getAttribute('lang');
        if (htmlLang) return htmlLang.split('-')[0].toLowerCase();

        const metaLang = document.querySelector('meta[http-equiv="content-language"], meta[name="language"]');
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
        return [...new Set([...patterns, ...enPatterns])];
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
    // GLOBAL CONFIG
    // ============================================================================

    const DEFAULT_TIMINGS = {
        retryInterval: 50,
        maxRetries: 50,
        initialDelay: 0,
        overlayCleanupDelay: 0,
        spaNavDelay: 0,
    };

    const CONFIG = {
        ...SITE_CONFIG,
        timings: { ...DEFAULT_TIMINGS, ...SITE_CONFIG.timings },
        debug: false,
        logPrefix: `[UniversalAgeGate:${SITE_CONFIG.name}]`,
    };

    // ============================================================================
    // UTILITIES
    // ============================================================================

    const log = (...args) => CONFIG.debug && console.log(CONFIG.logPrefix, ...args);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const isVisible = (el) => el && el.offsetParent !== null;

    function getSafeguards() {
        return CONFIG.safeguards || {
            disableShadowDomTraversal: false,
            disableIframeTraversal: false,
            disableCookieBypass: false,
            strictOverlayDetection: false,
            fastPathEnabled: true,
        };
    }

    const BUTTON_CANDIDATES =
        'button, [role="button"], a.btn, .btn, input[type="button"], input[type="submit"], a[href*="age_verified"], a.removeAdLink.gtm-event-avmodal, a#btn_agree, a.gtm-event-avmodal';

    // ============================================================================
    // MODULE: INJECTION-BASED BYPASS (No-Click Auto-Pass)
    // ============================================================================

    function attemptInjectionBypass() {
        const injection = CONFIG.injection;
        if (!injection) return;

        const safeguards = getSafeguards();

        // 1. Set cookies at document-start
        if (injection.cookieBypass && !safeguards.disableCookieBypass) {
            injection.cookieBypass.forEach(cookie => {
                const cookieStr = `${cookie.name}=${cookie.value}; domain=${cookie.domain}; path=${cookie.path}; max-age=31536000; SameSite=Lax`;
                document.cookie = cookieStr;
            });
            log('Injection: set cookies');
        }

        // 2. Pre-set localStorage flags (queue for when ready)
        if (injection.localStorageFlags) {
            const setLS = () => {
                try {
                    Object.entries(injection.localStorageFlags).forEach(([key, value]) => {
                        localStorage.setItem(key, value);
                    });
                    log('Injection: set localStorage flags');
                } catch {
                    queueMicrotask(setLS);
                }
            };
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', setLS, { once: true });
            } else {
                setLS();
            }
        }

        // 3. Define global flags immediately
        if (injection.globalFlags) {
            Object.entries(injection.globalFlags).forEach(([key, value]) => {
                window[key] = value;
            });
            log('Injection: defined global flags');
        }

        // 4. Override functions to prevent modal display
        if (injection.functionOverrides) {
            Object.entries(injection.functionOverrides).forEach(([fnName, replacement]) => {
                if (typeof window[fnName] === 'function') {
                    window[fnName] = replacement;
                } else {
                    Object.defineProperty(window, fnName, {
                        configurable: true,
                        writable: true,
                        value: replacement,
                    });
                }
            });
            log('Injection: overridden functions');
        }

        // 5. MutationObserver to block/remove elements immediately
        if (injection.blockElements && injection.blockElements.length > 0) {
            const blockedSelectors = injection.blockElements.join(',');
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.matches && node.matches(blockedSelectors)) {
                                node.remove();
                                log('Injection: removed blocked element', node.id || node.className);
                                continue;
                            }
                            try {
                                const matched = node.querySelectorAll(blockedSelectors);
                                matched.forEach(el => {
                                    el.remove();
                                    log('Injection: removed blocked descendant', el.id || el.className);
                                });
                            } catch {}
                        }
                    }
                }
            });
            observer.observe(document.documentElement, { childList: true, subtree: true });

            // Also check existing elements
            document.querySelectorAll(blockedSelectors).forEach(el => {
                el.remove();
                log('Injection: removed existing blocked element', el.id || el.className);
            });
        }
    }

    // ============================================================================
    // CORE LOGICS
    // ============================================================================

    function clickAgeGateButton() {
        const safeguards = getSafeguards();

        for (const sel of CONFIG.primarySelectors) {
            try {
                const btn = queryAllRoots(sel, document, {
                    disableShadowDom: safeguards.disableShadowDomTraversal,
                    disableIframes: safeguards.disableIframeTraversal,
                })[0];
                if (isVisible(btn)) {
                    btn.click();
                    log('Clicked age gate via primary selector:', sel);
                    return true;
                }
            } catch {}
        }

        const candidates = queryAllRoots(BUTTON_CANDIDATES, document, {
            disableShadowDom: safeguards.disableShadowDomTraversal,
            disableIframes: safeguards.disableIframeTraversal,
        });
        const patterns = getPatternsForType('ageGate');

        for (const btn of candidates) {
            if (!isVisible(btn)) continue;
            const text = (btn.textContent || btn.innerText || btn.value || '').trim();
            if (!text) continue;
            if (patterns.some((rx) => rx.test(text))) {
                btn.click();
                log('Clicked age gate via text match:', text, 'lang:', detectPageLanguage());
                return true;
            }
        }
        return false;
    }

    function clickCookieConsentLegacy() {
        const safeguards = getSafeguards();
        for (const sel of COOKIE_CONSENT_SELECTORS) {
            try {
                const btn = queryAllRoots(sel, document, {
                    disableShadowDom: safeguards.disableShadowDomTraversal,
                    disableIframes: safeguards.disableIframeTraversal,
                })[0];
                if (isVisible(btn)) {
                    btn.click();
                    log('Clicked cookie consent via selector:', sel);
                    return true;
                }
            } catch {}
        }
        return clickCookieConsentTextFallback();
    }

    function clickCookieConsentTextFallback() {
        const safeguards = getSafeguards();
        const candidates = queryAllRoots(BUTTON_CANDIDATES, document, {
            disableShadowDom: safeguards.disableShadowDomTraversal,
            disableIframes: safeguards.disableIframeTraversal,
        });
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

    function clickCookieConsent() {
        return clickCookieConsentLegacy();
    }

    function tryCookieBypass() {
        const config = COOKIE_BYPASS_CONFIG[CURRENT_DOMAIN];
        if (!config) return false;

        const safeguards = getSafeguards();
        if (safeguards.disableCookieBypass) {
            log('Cookie bypass disabled by safeguard');
            return false;
        }

        const cookies = document.cookie.split('; ').reduce((acc, c) => {
            const [k, v] = c.split('=');
            acc[k] = v;
            return acc;
        }, {});

        if (cookies[config.name] === config.value) {
            log('Cookie bypass: already set');
            return true;
        }

        try {
            document.cookie = `${config.name}=${config.value}; domain=${config.domain}; path=/; max-age=31536000; SameSite=Lax`;
            log('Cookie bypass: set', config.name);
            return true;
        } catch {
            log('Cookie bypass failed');
            return false;
        }
    }

    function removeOverlays() {
        const safeguards = getSafeguards();
        let removed = false;

        // Standard overlay removal
        if (CONFIG.overlaySelectors) {
            for (const sel of CONFIG.overlaySelectors) {
                try {
                    const elements = queryAllRoots(sel, document, {
                        disableShadowDom: safeguards.disableShadowDomTraversal,
                        disableIframes: safeguards.disableIframeTraversal,
                    });
                    elements.forEach((el) => {
                        if (isVisible(el) && isBlockingOverlay(el, safeguards.strictOverlayDetection)) {
                            el.remove();
                            log('Removed overlay:', el.className || el.id || sel);
                            removed = true;
                        }
                    });
                } catch {}
            }
        }

        // Site-specific injection block elements cleanup
        if (CONFIG.injection?.blockElements) {
            CONFIG.injection.blockElements.forEach(selector => {
                const el = document.querySelector(selector);
                if (el) {
                    el.remove();
                    log('Removed injection-blocked element:', selector);
                    removed = true;
                }
            });
        }

        if (removed || document.body.style.overflow === 'hidden') {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            log('Restored page scroll');
        }
        return removed;
    }

    function isBlockingOverlay(el, strict = false) {
        const style = getComputedStyle(el);
        const isFixed = style.position === 'fixed';
        const coversViewport =
            style.top === '0px' &&
            style.left === '0px' &&
            style.right === '0px' &&
            style.bottom === '0px';
        const highZ = parseInt(style.zIndex) > 999;
        const hasSize = el.offsetWidth > 100 && el.offsetHeight > 100;

        if (strict) {
            return isFixed && coversViewport && highZ && hasSize;
        }
        return isFixed && (coversViewport || highZ) && hasSize;
    }

    // ============================================================================
    // MAIN ATTEMPT
    // ============================================================================

    async function attempt() {
        const safeguards = getSafeguards();

        try {
            // 1. Try cookie bypass first (document-start) - respect safeguards
            if (!safeguards.disableCookieBypass && tryCookieBypass()) {
                await sleep(100);
                const overlay = queryAllRoots(CONFIG.overlaySelectors.join(', '), document, {
                    disableShadowDom: safeguards.disableShadowDomTraversal,
                    disableIframes: safeguards.disableIframeTraversal,
                })[0];
                if (!overlay || !isVisible(overlay) || !isBlockingOverlay(overlay, safeguards.strictOverlayDetection)) {
                    log('Cookie bypass successful, no age gate detected');
                    return true;
                }
            }

            // 2. Handle cookie consent first
            clickCookieConsent();

            // 3. Then handle age gate
            if (clickAgeGateButton()) {
                await sleep(CONFIG.timings.overlayCleanupDelay);
                removeOverlays();
                return true;
            }
        } catch {
            log('Attempt error');
        }
        return false;
    }

    // ============================================================================
    // SPA NAVIGATION HANDLING
    // ============================================================================

    function observeSPANavigation() {
        let lastUrl = location.href;

        const observer = new MutationObserver(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                log('URL changed via MutationObserver:', lastUrl);
                setTimeout(attempt, CONFIG.timings.spaNavDelay);
            }
        });
        observer.observe(document, { subtree: true, childList: true });

        ['pushState', 'replaceState'].forEach((fn) => {
            const orig = history[fn];
            history[fn] = function (...args) {
                orig.apply(this, args);
                log('History API:', fn);
                setTimeout(attempt, CONFIG.timings.spaNavDelay);
            };
        });

        window.addEventListener('popstate', () => {
            log('popstate event');
            setTimeout(attempt, CONFIG.timings.spaNavDelay);
        });

        return () => observer.disconnect();
    }

    // ============================================================================
    // FAST PATH: MutationObserver + Injection at document-start
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
        const safeguards = getSafeguards();
        if (!safeguards.fastPathEnabled) {
            fastPathActive = false;
            return;
        }

        // NEW: Attempt injection bypass first (document-start)
        attemptInjectionBypass();

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

        // Periodic microtask retries for ultra-fast response (10ms)
        fastPathInterval = setInterval(() => {
            if (!fastPathActive) {
                clearInterval(fastPathInterval);
                fastPathInterval = null;
                return;
            }
            scheduleFastPathAttempt();
        }, 10);
    }

    // ============================================================================
    // ENTRY POINT
    // ============================================================================

    async function init() {
        log('Initializing for:', CURRENT_DOMAIN);

        // Stop fast path if still running
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
    if (document.readyState === 'loading') {
        startFastPath();
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();