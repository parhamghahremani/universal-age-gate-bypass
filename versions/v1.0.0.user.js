// ==UserScript==
// @name         Pornhub Age Gate Auto-Bypass
// @namespace    https://github.com/yourhandle/userscripts
// @version      1.0.0
// @description  Automatically bypass the 18+ age verification gate on pornhub.com (Desktop + Android Firefox)
// @author       Your Name
// @match        *://*.pornhub.com/*
// @match        *://pornhub.com/*
// @exclude      *://*.pornhub.com/admin/*
// @icon         https://www.pornhub.com/favicon.ico
// @grant        none
// @run-at       document-start
// @downloadURL  https://github.com/yourhandle/userscripts/raw/main/pornhub-age-gate-bypass/pornhub-age-gate-bypass.user.js
// @updateURL    https://github.com/yourhandle/userscripts/raw/main/pornhub-age-gate-bypass/pornhub-age-gate-bypass.user.js
// @supportURL   https://github.com/yourhandle/userscripts/issues
// @homepageURL  https://github.com/yourhandle/userscripts/tree/main/pornhub-age-gate-bypass
// @license      MIT
// ==/UserScript==

/* global GM_addStyle, GM_setValue, GM_getValue, GM_deleteValue, GM_xmlhttpRequest, GM_notification */

(function() {
    'use strict';

    // ---------- CONFIG ----------
    const CONFIG = {
        selectors: {
            primary: [
                'button[data-agegate="confirm"]',
                'button.age-gate-btn',
                'button.ageGateConfirm',
                'button[aria-label*="18" i]',
                'button[aria-label*="age" i]',
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
            overlays: [
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
        },
        timings: {
            initialDelay: 0,
            retryInterval: 300,
            maxRetries: 10,
            overlayCleanupDelay: 100,
            spaNavDelay: 200,
        },
        debug: false,
    };

    // ---------- UTILITIES ----------
    const log = (...args) => CONFIG.debug && console.log('[PornhubAgeGate]', ...args);
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    const isVisible = (el) => el && el.offsetParent !== null;

    // ---------- CORE LOGIC ----------
    function clickAgeGateButton() {
        for (const sel of CONFIG.selectors.primary) {
            try {
                const btn = document.querySelector(sel);
                if (isVisible(btn)) {
                    btn.click();
                    log('Clicked via selector:', sel);
                    return true;
                }
            } catch (e) {}
        }

        const candidates = document.querySelectorAll(
            'button, [role="button"], a.btn, .btn, input[type="button"], input[type="submit"]'
        );
        for (const btn of candidates) {
            if (!isVisible(btn)) continue;
            const text = (btn.textContent || btn.innerText || btn.value || '').trim();
            if (CONFIG.selectors.textPatterns.some(rx => rx.test(text))) {
                btn.click();
                log('Clicked via text match:', text);
                return true;
            }
        }
        return false;
    }

    function removeOverlays() {
        let removed = false;
        for (const sel of CONFIG.selectors.overlays) {
            try {
                const elements = document.querySelectorAll(sel);
                elements.forEach(el => {
                    if (isVisible(el)) {
                        el.remove();
                        log('Removed overlay:', el.className || el.id || sel);
                        removed = true;
                    }
                });
            } catch (e) {}
        }

        if (removed || document.body.style.overflow === 'hidden') {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            log('Restored page scroll');
        }
        return removed;
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

        const observer = new MutationObserver(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                log('URL changed via MutationObserver:', lastUrl);
                setTimeout(attempt, CONFIG.timings.spaNavDelay);
            }
        });
        observer.observe(document, { subtree: true, childList: true });

        ['pushState', 'replaceState'].forEach(fn => {
            const orig = history[fn];
            history[fn] = function(...args) {
                orig.apply(this, args);
                log('History API:', fn);
                setTimeout(attempt, CONFIG.timings.spaNavDelay);
            };
        });

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
        log('Initializing...');

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();