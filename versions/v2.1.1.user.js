// ==UserScript==
// @name         Universal Age Gate Auto-Bypass
// @namespace    https://github.com/yourhandle/userscripts
// @version      2.1.1
// @description  Automatically bypass 18+ age verification gates on multiple adult sites (pornhub, xnxx, xvideos, redtube, xhamster, etc.) + cookie consent + Cloudflare challenge — Firefox Desktop + Android
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
// @match        *://*.spankbang.party/*
// @match        *://spankbang.party/*
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
                // Video page: "Enter and accept all cookies" button
                'button.btn-accept',
                'button.btn-primary[data-age="18"]',
                'button[onclick*="ageCheck"]',
                // Age gate / disclaimer overlay
                '.age-gate button',
                '.agegate button',
                '#age-gate button',
                '#agegate button',
                'a[href*="age_verified"]',
                'button[class*="age"]',
                '.modal button',
                '[class*="age-gate"] button',
                '[class*="agegate"] button',
                // Disclaimer background overlay
                '.disclaimer-background button',
                '#disclaimer button',
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
                /enter and accept all cookies/i,
                /accept all cookies/i,
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
                '.disclaimer-background',
                '#disclaimer',
            ],
            spaPaths: ['/video-', '/category-', '/channels/', '/pornstar-'],
        },

        'xvideos.com': {
            name: 'XVideos',
            primarySelectors: [
                // Video page: "Enter and accept all cookies" button
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
                // Disclaimer background overlay
                '.disclaimer-background button',
                '#disclaimer button',
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
                /enter and accept all cookies/i,
                /accept all cookies/i,
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
                '.disclaimer-background',
                '#disclaimer',
            ],
            spaPaths: ['/video', '/channels/', '/tags/', '/pornstars/'],
        },

        'redtube.com': {
            name: 'RedTube',
            primarySelectors: [
                // RedTube (MindGeek/Aylo) - different class names than Pornhub
                '#btn_agree.removeAdLink.gtm-event-avmodal', // Exact match from inspection
                '#btn_agree.gtm-event-avmodal',
                '#btn_agree',
                'button[aria-label*="18" i]',
                'button[aria-label*="age" i]',
                'button[aria-label*="enter" i]',
                'button.btn-accept',
                'button.age-gate-btn',
                '#consent_accept_all.gtm-event-cookie-banner', // Cookie consent "Accept All Cookies"
                '#consent_accept_all',
                '.age-gate button',
                '.ageGate button',
                '#age-gate button',
                '[class*="agegate"] button',
                '[class*="age-gate"] button',
                '[id*="agegate"] button',
                '[id*="age-gate"] button',
                'a[href*="age_verified"]',
            ],
            textPatterns: [
                /i am 18 or older/i,
                /i am 18/i,
                /i am over 18/i,
                /^enter$/i,
                /^continue$/i,
                /^yes$/i,
                /^accept$/i,
                /^confirm$/i,
                /^agree$/i,
                /accept all cookies/i,
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
                '.disclaimer-background', // RedTube disclaimer overlay
                '.lang_en.pc.wideGrid.disclaimer',
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
                '#accessButton.button.gtm-event-avmodal', // "I am 18 or older - Enter"
                '#accessButton.gtm-event-avmodal',
                '#accessButton',
                '#consent_accept_all.gtm-event-cookie-banner', // Cookie consent "Accept All Cookies"
                '#consent_accept_all',
                'button[aria-label*="18" i]',
                'button[aria-label*="age" i]',
                'button[aria-label*="enter" i]',
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
                /i am 18 or older/i,
                /i am 18/i,
                /i am over 18/i,
                /^enter$/i,
                /^continue$/i,
                /^yes$/i,
                /^accept$/i,
                /^confirm$/i,
                /^agree$/i,
                /accept all cookies/i,
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
                '.age-disclaimer-modal', // YouPorn age disclaimer modal
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

        'spankbang.party': {
            name: 'SpankBang Party',
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
                /accept all cookies/i,
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
                '#challenge-running', // Cloudflare challenge
                '#cf-challenge-running',
                '.cf-challenge',
                '#cf-wrapper',
                '.cf-browser-verification',
                '#cf-please-wait',
                '.ray-id',
                '[data-ray]',
            ],
            spaPaths: ['/video/', '/categories/', '/channels/', '/pornstars/'],
            hasCloudflare: true, // Flag for Cloudflare challenge handling
        },
    };

    // ---------- GLOBAL PATTERNS (Cross-site) ----------
    // Cookie consent patterns - work across all sites
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

    const COOKIE_CONSENT_TEXT_PATTERNS = [
        /^(?:accept all|accept all cookies|allow all|allow all cookies)$/i,
        /^(?:accept|agree|consent|allow|i agree|got it|ok|بپذیر|موافق|تأیید|قبول|قبول همه|پذیرش همه)$/i,
        /^(?:قبول\s+کوکی|پذیرش\s+کوکی|موافقت\s+با\s+کوکی)$/i,
    ];

    // Cloudflare challenge patterns
    const CLOUDFLARE_SELECTORS = [
        '#challenge-running',
        '#cf-challenge-running',
        '.cf-challenge',
        '#cf-wrapper',
        '.cf-browser-verification',
        '#cf-please-wait',
        '.ray-id',
        '[data-ray]',
    ];

    const CLOUDFLARE_TEXT_PATTERNS = [
        /checking your browser/i,
        /please wait/i,
        /cloudflare/i,
        /ray id/i,
        /ddos protection/i,
        /security check/i,
        /verify you are human/i,
        /بررسی مرورگر/i,
        /لطفا صبر کنید/i,
        /امنیت/i,
    ];

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
            cloudflareCheckInterval: 1000,
            cloudflareMaxWait: 30000,
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
                    log('Clicked age gate via primary selector:', sel);
                    return true;
                }
            } catch {}
        }

        // Phase 2: Text-based fallback on visible button-like elements
        const candidates = document.querySelectorAll(BUTTON_CANDIDATES);
        for (const btn of candidates) {
            if (!isVisible(btn)) continue;
            const text = (btn.textContent || btn.innerText || btn.value || '').trim();
            if (!text) continue;
            if (CONFIG.textPatterns.some((rx) => rx.test(text))) {
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

        // Phase 2: Text-based fallback
        const candidates = document.querySelectorAll(BUTTON_CANDIDATES);
        for (const btn of candidates) {
            if (!isVisible(btn)) continue;
            const text = (btn.textContent || btn.innerText || btn.value || '').trim();
            if (!text) continue;
            if (COOKIE_CONSENT_TEXT_PATTERNS.some((rx) => rx.test(text))) {
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

    // Check if Cloudflare challenge is present
    function isCloudflareChallenge() {
        for (const sel of CLOUDFLARE_SELECTORS) {
            if (document.querySelector(sel)) return true;
        }
        const bodyText = document.body.textContent || '';
        if (CLOUDFLARE_TEXT_PATTERNS.some((rx) => rx.test(bodyText))) return true;
        return false;
    }

    // ---------- CLOUDFLARE VISUAL INDICATOR ----------
    // Floating ball icon in center-right that shows during Cloudflare challenge
    // Clickable to retry for 30s
    let cloudflareIndicator = null;
    let cloudflareRetryTimeout = null;

    function createCloudflareIndicator() {
        if (cloudflareIndicator) return cloudflareIndicator;

        const indicator = document.createElement('div');
        indicator.id = 'universal-age-gate-cf-indicator';
        indicator.innerHTML = `
            <style>
                #universal-age-gate-cf-indicator {
                    position: fixed;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: radial-gradient(circle at 30% 30%, #4a90d9, #1e3a5f);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.4), inset 0 -2px 10px rgba(0,0,0,0.2);
                    z-index: 2147483647;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: uag-cf-pulse 1.5s ease-in-out infinite;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    border: 2px solid rgba(255,255,255,0.2);
                }
                #universal-age-gate-cf-indicator:hover {
                    transform: translateY(-50%) scale(1.1);
                    box-shadow: 0 6px 30px rgba(74,144,217,0.6), inset 0 -2px 10px rgba(0,0,0,0.2);
                }
                #universal-age-gate-cf-indicator:active {
                    transform: translateY(-50%) scale(0.95);
                }
                #universal-age-gate-cf-indicator.hidden {
                    opacity: 0;
                    pointer-events: none;
                    transform: translateY(-50%) scale(0.5);
                }
                @keyframes uag-cf-pulse {
                    0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.4), inset 0 -2px 10px rgba(0,0,0,0.2); }
                    50% { box-shadow: 0 4px 30px rgba(74,144,217,0.5), inset 0 -2px 10px rgba(0,0,0,0.2); }
                }
                #uag-cf-tooltip {
                    position: absolute;
                    right: 60px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0,0,0,0.85);
                    color: #fff;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font: 12px/1.4 system-ui, sans-serif;
                    white-space: nowrap;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.2s ease;
                    z-index: 2147483647;
                }
                #universal-age-gate-cf-indicator:hover #uag-cf-tooltip {
                    opacity: 1;
                }
                #uag-cf-tooltip::after {
                    content: '';
                    position: absolute;
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    border: 6px solid transparent;
                    border-left-color: rgba(0,0,0,0.85);
                }
            </style>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" opacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 10 10" opacity="0.6"/>
                <circle cx="12" cy="12" r="4" fill="#fff" opacity="0.9"/>
            </svg>
            <span id="uag-cf-tooltip">Cloudflare challenge active — Click to retry</span>
        `;

        // Click handler: retry immediately
        indicator.addEventListener('click', () => {
            log('Cloudflare indicator clicked - retrying...');
            if (cloudflareRetryTimeout) {
                clearTimeout(cloudflareRetryTimeout);
                cloudflareRetryTimeout = null;
            }
            // Force a new attempt immediately
            attempt();
        });

        document.body.appendChild(indicator);
        cloudflareIndicator = indicator;
        return indicator;
    }

    function showCloudflareIndicator() {
        const indicator = createCloudflareIndicator();
        indicator.classList.remove('hidden');
        // Auto-hide after 30 seconds (max retry window)
        if (cloudflareRetryTimeout) clearTimeout(cloudflareRetryTimeout);
        cloudflareRetryTimeout = setTimeout(() => {
            hideCloudflareIndicator();
            log('Cloudflare indicator auto-hidden after 30s');
        }, 30000);
    }

    function hideCloudflareIndicator() {
        if (cloudflareIndicator) {
            cloudflareIndicator.classList.add('hidden');
        }
        if (cloudflareRetryTimeout) {
            clearTimeout(cloudflareRetryTimeout);
            cloudflareRetryTimeout = null;
        }
    }

    // Wait for Cloudflare challenge to complete
    async function waitForCloudflare() {
        if (!isCloudflareChallenge()) return true;

        log('Cloudflare challenge detected, waiting...');
        showCloudflareIndicator();

        const startTime = Date.now();

        while (Date.now() - startTime < CONFIG.timings.cloudflareMaxWait) {
            await sleep(CONFIG.timings.cloudflareCheckInterval);
            if (!isCloudflareChallenge()) {
                log('Cloudflare challenge cleared');
                hideCloudflareIndicator();
                return true;
            }
        }

        log('Cloudflare challenge timeout, continuing anyway');
        hideCloudflareIndicator();
        return false;
    }

    async function attempt() {
        // First: wait for Cloudflare if present
        await waitForCloudflare();

        // Second: handle cookie consent (often appears after Cloudflare)
        clickCookieConsent();

        // Third: handle age gate
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
