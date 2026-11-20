// ==UserScript==
// @name         Universal Age Gate Auto-Bypass
// @namespace    https://github.com/parhamghahremani/universal-age-gate-bypass
// @version      2.2.0
// @description  Auto-confirms 18+ prompts and accepts all cookies on supported sites (Pornhub, XNXX, XVideos, xHamster, Tube8) — Firefox Desktop + Android — v2.2.0: single debounced engine, safer click rules (never Reject/Manage/Essential), unified per-site config, SPA + bfcache aware
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
// @exclude      *://*.pornhub.com/admin/*
// @exclude      *://*.xnxx.com/admin/*
// @exclude      *://*.xvideos.com/admin/*
// @exclude      *://*.xhamster.com/admin/*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0YTBhMWUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxNDAzMGIiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibWFzayIgeDE9IjAiIHkxPSIwIiB4Mj0iMC40IiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNTM1MzZhIi8+PHN0b3Agb2Zmc2V0PSIwLjUiIHN0b3AtY29sb3I9IiMxYTFhMjgiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwNzA3MGUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZ29sZCIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZjFiMCIvPjxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjZjZiNzNjIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYTg2NTBhIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImYxIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYmUxMjNjIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY1YTdhIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImYyIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZDYyNDdhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5YWQ1Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImYzIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZDk4MjAwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZlMDhhIi8+PC9saW5lYXJHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImlyaXMiIGN4PSIwLjQiIGN5PSIwLjM1IiByPSIwLjciPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZjNjNCIvPjxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjZmY1ZmEyIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOWQxNzRkIi8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9InJ1YnkiIGN4PSIwLjM1IiBjeT0iMC4zIiByPSIwLjgiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmYjNjMSIvPjxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjZTExZDQ4Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjN2EwNjI2Ii8+PC9yYWRpYWxHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImVkZ2UiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmQyN2EiLz48c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iI2ZmNWE3YSIgc3RvcC1vcGFjaXR5PSIwLjgiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNhODU1ZjciLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ic2hpbmUiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIwIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAuMTQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjwvbGluZWFyR3JhZGllbnQ+PGZpbHRlciBpZD0iYmx1ciIgeD0iLTMwJSIgeT0iLTMwJSIgd2lkdGg9IjE2MCUiIGhlaWdodD0iMTYwJSI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMy41Ii8+PC9maWx0ZXI+PGZpbHRlciBpZD0iYmx1cjEwIiB4PSItNjAlIiB5PSItNjAlIiB3aWR0aD0iMjIwJSIgaGVpZ2h0PSIyMjAlIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxMCIvPjwvZmlsdGVyPjxmaWx0ZXIgaWQ9Imdsb3ciIHg9Ii00MCUiIHk9Ii00MCUiIHdpZHRoPSIxODAlIiBoZWlnaHQ9IjE4MCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEuNCIgcmVzdWx0PSJiIi8+PGZlTWVyZ2U+PGZlTWVyZ2VOb2RlIGluPSJiIi8+PGZlTWVyZ2VOb2RlIGluPSJTb3VyY2VHcmFwaGljIi8+PC9mZU1lcmdlPjwvZmlsdGVyPjxjbGlwUGF0aCBpZD0iY2xpcCI+PHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjExMiIgaGVpZ2h0PSIxMTIiIHJ4PSIzMiIvPjwvY2xpcFBhdGg+PHBhdGggaWQ9InN0YXIiIGQ9Ik0wIC02IEwxLjYgLTEuNiBMNiAwIEwxLjYgMS42IEwwIDYgTC0xLjYgMS42IEwtNiAwIEwtMS42IC0xLjYgWiIvPjxwYXRoIGlkPSJtYXNrc2hhcGUiIGQ9Ik02NCA1NCBDNTggNDYgNDQgMzggMjggNDIgQzE2IDQ2IDEwIDU4IDEyIDY4IEMxNCA4MCAyOCA4NiA0MCA4MiBDNTAgNzkgNTYgNzAgNjQgNzAgQzcyIDcwIDc4IDc5IDg4IDgyIEMxMDAgODYgMTE0IDgwIDExNiA2OCBDMTE4IDU4IDExMiA0NiAxMDAgNDIgQzg0IDM4IDcwIDQ2IDY0IDU0IFoiLz48cGF0aCBpZD0iZXllTCIgZD0iTTI0IDYyIFEzOCA1MCA1MiA2MiBRMzggNzQgMjQgNjIgWiIvPjxwYXRoIGlkPSJleWVSIiBkPSJNNzYgNjIgUTkwIDUwIDEwNCA2MiBROTAgNzQgNzYgNjIgWiIvPjwvZGVmcz48ZWxsaXBzZSBjeD0iNjQiIGN5PSIxMjIiIHJ4PSIzOCIgcnk9IjQuNSIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC41NSIgZmlsdGVyPSJ1cmwoI2JsdXIpIi8+PHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjExMiIgaGVpZ2h0PSIxMTIiIHJ4PSIzMiIgZmlsbD0idXJsKCNiZykiLz48ZyBjbGlwLXBhdGg9InVybCgjY2xpcCkiPjxjaXJjbGUgY3g9IjY0IiBjeT0iNjYiIHI9IjQwIiBmaWxsPSIjZTExZDQ4IiBvcGFjaXR5PSIwLjUiIGZpbHRlcj0idXJsKCNibHVyMTApIi8+PGNpcmNsZSBjeD0iMTA4IiBjeT0iMTA4IiByPSIyOCIgZmlsbD0iI2E4NTVmNyIgb3BhY2l0eT0iMC40IiBmaWx0ZXI9InVybCgjYmx1cjEwKSIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTgiIHI9IjI0IiBmaWxsPSIjZjU5ZTBiIiBvcGFjaXR5PSIwLjMiIGZpbHRlcj0idXJsKCNibHVyMTApIi8+PHBvbHlnb24gcG9pbnRzPSItMTAsMTAwIDcwLC0xMCAxMDAsLTEwIDIwLDExMCIgZmlsbD0idXJsKCNzaGluZSkiLz48L2c+PHJlY3QgeD0iOSIgeT0iOSIgd2lkdGg9IjExMCIgaGVpZ2h0PSIxMTAiIHJ4PSIzMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI2VkZ2UpIiBzdHJva2Utd2lkdGg9IjIiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5NiA0MikiPjxnIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PGVsbGlwc2UgY3g9IjE1IiBjeT0iMCIgcng9IjE1IiByeT0iNS40IiBmaWxsPSJ1cmwoI2YxKSIgdHJhbnNmb3JtPSJyb3RhdGUoLTcwKSIvPjxlbGxpcHNlIGN4PSIxMyIgY3k9IjAiIHJ4PSIxMyIgcnk9IjUiIGZpbGw9InVybCgjZjIpIiB0cmFuc2Zvcm09InJvdGF0ZSgtNDUpIi8+PGVsbGlwc2UgY3g9IjExIiBjeT0iMCIgcng9IjExIiByeT0iNC42IiBmaWxsPSJ1cmwoI2YzKSIgdHJhbnNmb3JtPSJyb3RhdGUoLTIwKSIvPjxwYXRoIGQ9Ik0wIDAgTDMwIDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuNTUiIHN0cm9rZS13aWR0aD0iMC45IiB0cmFuc2Zvcm09InJvdGF0ZSgtNzApIi8+PHBhdGggZD0iTTAgMCBMMjYgMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC41NSIgc3Ryb2tlLXdpZHRoPSIwLjkiIHRyYW5zZm9ybT0icm90YXRlKC00NSkiLz48cGF0aCBkPSJNMCAwIEwyMiAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjU1IiBzdHJva2Utd2lkdGg9IjAuOSIgdHJhbnNmb3JtPSJyb3RhdGUoLTIwKSIvPjwvZz48L2c+PHVzZSB4bGluazpocmVmPSIjbWFza3NoYXBlIiBocmVmPSIjbWFza3NoYXBlIiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjU1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDQpIi8+PHVzZSB4bGluazpocmVmPSIjbWFza3NoYXBlIiBocmVmPSIjbWFza3NoYXBlIiBmaWxsPSJ1cmwoI21hc2spIiBzdHJva2U9InVybCgjZ29sZCkiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zMCA0NiBDNDIgNDIgNTQgNDggNjAgNTYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMjIiIHN0cm9rZS13aWR0aD0iMi40IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48dXNlIHhsaW5rOmhyZWY9IiNleWVMIiBocmVmPSIjZXllTCIgZmlsbD0iIzBiMDIwNiIgc3Ryb2tlPSJ1cmwoI2dvbGQpIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48dXNlIHhsaW5rOmhyZWY9IiNleWVSIiBocmVmPSIjZXllUiIgZmlsbD0iIzBiMDIwNiIgc3Ryb2tlPSJ1cmwoI2dvbGQpIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48Y2lyY2xlIGN4PSIzOCIgY3k9IjYyIiByPSI1LjIiIGZpbGw9InVybCgjaXJpcykiIGZpbHRlcj0idXJsKCNnbG93KSIvPjxjaXJjbGUgY3g9IjkwIiBjeT0iNjIiIHI9IjUuMiIgZmlsbD0idXJsKCNpcmlzKSIgZmlsdGVyPSJ1cmwoI2dsb3cpIi8+PGNpcmNsZSBjeD0iMzgiIGN5PSI2MiIgcj0iMi4xIiBmaWxsPSIjMWEwNTEwIi8+PGNpcmNsZSBjeD0iOTAiIGN5PSI2MiIgcj0iMi4xIiBmaWxsPSIjMWEwNTEwIi8+PGNpcmNsZSBjeD0iMzYuNCIgY3k9IjYwLjQiIHI9IjEuMiIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9Ijg4LjQiIGN5PSI2MC40IiByPSIxLjIiIGZpbGw9IiNmZmYiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9InVybCgjZ29sZCkiIHN0cm9rZS13aWR0aD0iMS44IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Ik0yMiA1MiBDMzAgNDIgNDQgNDIgNTAgNTIiLz48cGF0aCBkPSJNMTA2IDUyIEM5OCA0MiA4NCA0MiA3OCA1MiIvPjxwYXRoIGQ9Ik0yMCA3NCBDMjYgODAgMzQgODIgNDAgNzgiLz48cGF0aCBkPSJNMTA4IDc0IEMxMDIgODAgOTQgODIgODggNzgiLz48L2c+PGcgZmlsbD0iI2ZmZTA4YSI+PGNpcmNsZSBjeD0iMTUiIGN5PSI2MiIgcj0iMS41Ii8+PGNpcmNsZSBjeD0iMTciIGN5PSI3MCIgcj0iMS41Ii8+PGNpcmNsZSBjeD0iMjQiIGN5PSI3OCIgcj0iMS40Ii8+PGNpcmNsZSBjeD0iMTEzIiBjeT0iNjIiIHI9IjEuNSIvPjxjaXJjbGUgY3g9IjExMSIgY3k9IjcwIiByPSIxLjUiLz48Y2lyY2xlIGN4PSIxMDQiIGN5PSI3OCIgcj0iMS40Ii8+PC9nPjxjaXJjbGUgY3g9IjY0IiBjeT0iNjAiIHI9IjYuNCIgZmlsbD0idXJsKCNnb2xkKSIvPjxjaXJjbGUgY3g9IjY0IiBjeT0iNjAiIHI9IjQuNiIgZmlsbD0idXJsKCNydWJ5KSIgZmlsdGVyPSJ1cmwoI2dsb3cpIi8+PGNpcmNsZSBjeD0iNjIuNCIgY3k9IjU4LjQiIHI9IjEuNCIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC45Ii8+PHVzZSB4bGluazpocmVmPSIjc3RhciIgaHJlZj0iI3N0YXIiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwIDI4KSBzY2FsZSgxLjMpIi8+PHVzZSB4bGluazpocmVmPSIjc3RhciIgaHJlZj0iI3N0YXIiIGZpbGw9IiNmZmUwOGEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwNiAxMDApIHNjYWxlKDEpIi8+PHVzZSB4bGluazpocmVmPSIjc3RhciIgaHJlZj0iI3N0YXIiIGZpbGw9IiNmZmQxZWMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwIDEwNCkgc2NhbGUoMC45KSIvPjxjaXJjbGUgY3g9IjY2IiBjeT0iMTAwIiByPSIxLjgiIGZpbGw9IiNmZjlhZDUiLz48L3N2Zz4=
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

    // ========================================================================
    // 1. CONSTANTS
    // ========================================================================

    const DEBUG = false;
    const log = (...args) => {
        if (DEBUG) console.log('[UAG]', ...args);
    };

    const C = Object.freeze({
        MAX_RUN_MS: 20000, // how long one engine run may watch the page
        EXTEND_AFTER_ACTION_MS: 5000, // keep watching after a click (next modal may follow)
        DEBOUNCE_MS: 40, // reaction time after a DOM mutation
        POLL_MS: 250, // safety poll while the engine is active
        CLEANUP_WINDOW_MS: 2500, // overlays are only hidden shortly after we clicked something
        CLICK_COOLDOWN_MS: 700, // min gap between two clicks on the same element
        MAX_CLICKS_PER_ELEMENT: 4, // hydration may swallow early clicks, so allow a few retries
        MAX_ACTIONS: 12, // hard cap of clicks per run
        ESCAPE_AFTER_MS: 600, // Pornhub video: Escape fallback delay (sent at most once per run)
        Z_INDEX_THRESHOLD: 999,
        VIEWPORT_COVERAGE_RATIO: 0.9, // fixed element covering >= 90% of viewport = blocking
        PARTIAL_COVERAGE_RATIO: 0.3, // ...or high z-index and >= 30% coverage
        MIN_OVERLAY_SIZE: 100,
        MAX_CONTAINER_TEXT: 4000, // modals are small; bigger containers are page content
        MAX_CONTAINERS: 12,
        COOKIE_MAX_AGE: 31536000,
    });

    // Low-end detection (Firefox resistFingerprinting reports 2 cores, so it lands here too)
    const LOW_END = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2;
    const TIMING = Object.freeze({
        pollMs: C.POLL_MS * (LOW_END ? 2 : 1),
        maxRunMs: C.MAX_RUN_MS * (LOW_END ? 1.5 : 1),
    });

    // ========================================================================
    // 2. SHARED SELECTORS
    // ========================================================================

    // Clickable candidates (deduplicated; broader selectors already cover the removed subsets)
    const BUTTON_SELECTORS = [
        'button',
        '[role="button"]',
        'a.btn',
        '.btn',
        'input[type="button"]',
        'input[type="submit"]',
        'a[href*="age_verified"]',
        'a.gtm-event-avmodal',
        'a#btn_agree',
        'a.link_accept_all_cookies',
        'a[data-label="accept_all"]',
    ];

    const DIALOG_SELECTORS = [
        '[role="dialog"]',
        '[role="alertdialog"]',
        '[aria-modal="true"]',
        'dialog[open]',
    ];

    // Age-gate containers (all sites). Buttons inside are chosen by text, never "first button".
    const AGE_CONTAINERS = [
        '.age-gate',
        '.ageGate',
        '#age-gate',
        '#ageGate',
        '.agegate',
        '#agegate',
        '.age-verification',
        '.ageVerification',
        '.age_verification',
        '#age_verify',
        '[class*="agegate" i]',
        '[class*="age-gate" i]',
        '[id*="agegate" i]',
        '[id*="age-gate" i]',
        '[class*="agedisclaimer" i]',
        '[id*="agedisclaimer" i]',
        '#disclaimer',
        '.disclaimer-background',
    ];

    const COOKIE_CONTAINERS = [
        '[class*="cookie" i]',
        '[id*="cookie" i]',
        '[class*="consent" i]',
        '[id*="consent" i]',
        '[class*="gdpr" i]',
        '[id*="gdpr" i]',
    ];

    // Used only INSIDE a cookie container (never page-wide). Reject/Manage/Essential are filtered by NEGATIVE_RX.
    const GENERIC_ACCEPT_SELECTORS = [
        'button[id*="accept" i]',
        'button[class*="accept" i]',
        'button[id*="agree" i]',
        'button[class*="agree" i]',
        '[data-testid*="accept" i]',
        '[data-testid*="agree" i]',
        'button[aria-label*="accept" i]',
        'button[aria-label*="agree" i]',
    ];

    // Cookie-management platforms: "accept all" buttons only
    const CMP_SELECTORS = [
        // OneTrust
        '#onetrust-accept-btn-handler',
        'button[id^="onetrust-accept"]',
        // Cookiebot
        '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
        '#CybotCookiebotDialogBodyButtonAccept',
        // Quantcast
        '.qc-cmp2-ui button[mode="primary"]',
        '.qc-cmp2-footer button[data-action="accept-all"]',
        // Usercentrics
        '[data-usercentrics="accept-all"]',
        'button[data-testid="uc-accept-all-button"]',
        // Didomi
        '#didomi-notice-agree-button',
        // TrustArc
        '.trustarc-button-accept-all',
        // Osano
        '#osano-cm-accept-all',
    ];

    // Hidden (never removed) only shortly after we clicked something
    const GENERIC_OVERLAYS = ['.modal-backdrop', '.overlay', '[style*="z-index: 9999"]'];

    // ========================================================================
    // 3. TEXT PATTERNS (matched against normalized, lowercased, Latin-digit text)
    // ========================================================================

    const TEXT = {
        age: [
            /^(?:yes,? )?i(?: a|')m (?:over |at least )?(?:18|21)/,
            /^(?:yes,? )?i(?: a|')m (?:of legal age|an adult)/,
            /^enter(?: (?:the )?site| now| here)?$/,
            /^(?:verify|confirm) (?:my )?age$/,
            /^(?:continue|yes|confirm|agree|i agree|accept|ok|okay)$/,
            /^(?:i )?(?:agree|accept)(?: and)? (?:enter|continue)$/,
            // Persian (anchored; "ثبت نام" / "login" can no longer match)
            /^(?:ورود|ورود به سایت|تایید|تایید سن|ادامه|بله|پذیرفتن|موافقم)$/,
            /^(?:من )?(?:بالای|بالاتر از|بیش از|بزرگتر از) ?18/,
            /^18 ?(?:سال|\+)/,
        ],
        cookie: [
            /^(?:(?:i )?(?:accept|allow|agree(?: to)?|consent to)(?: all)?(?: cookies)?(?: (?:and|&) (?:close|continue|enter))?|got it|ok|okay|i agree)$/,
            /^enter and accept all cookies$/,
            /^(?:قبول|پذیرش|موافقت|تایید|باشه|اوکی)(?: همه)?(?: کوکی(?: ?ها)?)?$/,
            /^ورود و پذیرش همه کوکی/,
        ],
    };
    const ANY_TEXT = TEXT.age.concat(TEXT.cookie);

    // Anything that would reject, limit, leave, or change preferences is never clicked
    const NEGATIVE_RX =
        /\b(?:reject|decline|deny|refuse|manage|settings?|preferences?|customi[sz]e|essentials?|necessary|only|more options|learn more|no thanks|leave|exit|under 18|not 18|sign up|log in|login|register|premium|gay|trans)\b|(?:^|\s)رد(?:\s|$)|مدیریت|تنظیمات|فقط|ضروری|خروج|ثبت نام|زیر 18/i;

    const AGE_REL_RX = /\b(?:18|21)\b|\badults?\b|\bage\b|years? old|legal age|بزرگسال|(?:^|\s)سن(?:\s|$)/;
    const COOKIE_REL_RX = /cookies?|consent|gdpr|کوکی/;
    const PREMIUM_RX =
        /\b(?:premium|upgrade|sign ?up|register|create account|join now|go premium|get premium|vip|membership|subscribe|subscription)\b/;

    // ========================================================================
    // 4. SITE CONFIG (selectors + cookies + page types in one place)
    //    Order inside every list = priority. Duplicates/subsets removed on purpose.
    // ========================================================================

    const SITES = {
        'pornhub.com': {
            name: 'Pornhub',
            age: [
                'button[data-label="over18_enter"]',
                'button[data-label="age_gate_enter"]',
                'button[data-label*="over18" i]',
                'button[data-label*="age_gate" i]',
                '.js-av-cta.buttonOver18',
                '.gtm-event-age-verification.js-closeAgeModal',
                '.ageDisclaimerButtons .buttonOver18',
                'button.gtm-event-age-verification',
                'button[data-agegate="confirm"]',
                'button.age-gate-btn',
                'button.ageGateConfirm',
            ],
            cookie: [
                '.cbPrimaryCTA.gtm-event-cookie-banner',
                'button[data-label="accept_all"]',
                '.js-acceptGlobalCookies',
            ],
            overlays: [],
            // page type -> selectors containing these substrings are tried first
            boost: {
                video: ['data-label', 'gtm-event', 'js-av-cta', 'cbPrimaryCTA', 'js-acceptGlobalCookies'],
                search: ['cbPrimaryCTA', 'data-label', 'js-acceptGlobalCookies'],
            },
            cookies: {
                paths: ['/video/', '/view_video', '/embed/', '/search'],
                list: [
                    ['age_verified', '1'],
                    ['cookieConsent', '3'],
                ],
            },
            pageType(p) {
                if (p.startsWith('/video/search') || p.startsWith('/search')) return 'search';
                if (p.startsWith('/view_video') || p.startsWith('/video/') || p.startsWith('/embed/')) return 'video';
                if (p.startsWith('/categor')) return 'category';
                if (p.startsWith('/channel')) return 'channel';
                if (p.startsWith('/pornstar')) return 'pornstar';
                if (p.startsWith('/gif')) return 'gif';
                return 'other';
            },
            escapeOnStuck: true,
            afterActionMs: 120,
        },

        'xnxx.com': {
            name: 'XNXX',
            age: [
                '#disclaimer-accept_cookies-btn', // "Enter and accept all cookies"
                '#disclaimer_message .btn-primary',
                '#disclaimer-top-close-btn',
                'button.disclaimer-enter',
                '.disclaimer-buttons .disclaimer-enter',
                '.disclaimer-enter',
                '.disclaimer-enter-btns .btn-select',
                'button.btn-accept',
                'button.btn-primary[data-age="18"]',
                'button[onclick*="ageCheck"]',
                'a[href*="age_verified"]',
            ],
            cookie: [],
            overlays: ['#disclaimer_background', '#disclaimer_message'],
            boost: { home: ['disclaimer'] },
            cookies: {
                paths: ['/video-'],
                list: [
                    ['disclaimer', '2'],
                    ['age_verified', '1'],
                ],
            },
            pageType(p) {
                if (p === '/' || p === '') return 'home';
                if (p.startsWith('/video-')) return 'video';
                return 'other';
            },
            afterActionMs: 120,
        },

        'xvideos.com': {
            name: 'XVideos',
            age: [
                '#disclaimer-accept_cookies-btn',
                'button.btn-accept',
                'button.agree-btn',
                'button[data-testid="age-gate-confirm"]',
                'a[href*="age_verified"]',
            ],
            cookie: [],
            overlays: ['#disclaimer_background'],
            boost: {},
            cookies: {
                paths: ['/video'],
                list: [
                    ['age_check', '1'],
                    ['disclaimer', '2'],
                ],
            },
            pageType(p) {
                return p.startsWith('/video') ? 'video' : 'other';
            },
            afterActionMs: 120,
        },

        'xhamster.com': {
            name: 'xHamster',
            age: [
                'button[data-testid="age-gate-confirm"]',
                'button.age-gate-btn',
                'button.btn-accept',
                'a[href*="age_verified"]',
            ],
            cookie: [
                // attribute-based first (hash-independent), CSS-Modules hash as fallback
                '[data-opt-hydration="cookies-dialog-eu"] button',
                'button[data-opt-hydration="cookies-dialog-eu"]',
                'button.experimentalButton-5822e',
            ],
            overlays: ['div.wrapper-5822e.overAv-5822e', 'div[data-opt-hydration="cookies-dialog-eu"]'],
            boost: {},
            cookies: null, // React-based: pre-set cookies do nothing
            pageType(p) {
                return p.startsWith('/videos/') ? 'video' : 'other';
            },
            afterActionMs: 120,
        },

        'tube8.com': {
            name: 'Tube8',
            age: [
                '#accessButton.gtm-event-avmodal[data-label="enter"]',
                'button.gtm-event-avmodal[data-label="enter"]',
                '#accessButton[data-plw="plw_disclaimer_accept"]',
                'button[data-agegate="confirm"]',
                'button.age-gate-btn',
                'button.btn-accept',
                'a[href*="age_verified"]',
            ],
            cookie: [
                // priority: full banner "accept all" -> minimized banner link
                '#consent_accept_all.gtm-event-cookie-banner',
                'button#consent_accept_all[data-label="accept_all"]',
                'button.gtm-event-cookie-banner[data-label="accept_all"]',
                '#consent_accept_min_all',
                'a.link_accept_all_cookies',
            ],
            overlays: ['#ageDisclaimerMainBG', '#ageDisclaimerWrapper', '#cookie_banner_overlay', '#cookie_consent_wrapper'],
            boost: {},
            cookies: {
                paths: ['/video/'],
                list: [
                    ['age_verified', '1'],
                    ['cookieConsent', '5'],
                ],
            },
            pageType(p) {
                return p.startsWith('/video/') ? 'video' : 'other';
            },
            afterActionMs: 300,
        },
    };

    // ========================================================================
    // 5. SITE DETECTIon
    // ========================================================================

    const HOST = location.hostname.replace(/^www\./, '');
    const DOMAIN = Object.keys(SITES).find((d) => HOST === d || HOST.endsWith('.' + d)) || null;
    if (!DOMAIN) {
        log('No config for', location.hostname);
        return;
    }
    const SITE = SITES[DOMAIN];

    // ========================================================================
    // 6. MODULES (kept inside the IIFE: nothing leaks to the page)
    // ========================================================================

    const UAG = {};
    const S = {
        active: false,
        running: false,
        deadline: 0,
        startedAt: 0,
        actions: 0,
        escapeSent: false,
        cleanupUntil: 0,
        timer: 0,
        timerDue: 0,
        observer: null,
        ctx: null, // per-tick scratch (container cache)
    };

    // ---- Util -------------------------------------------------------------
    UAG.Util = {
        probe: document.createDocumentFragment(),

        // Persian/Arabic digits -> Latin, unify ي/ك, drop diacritics/ZWNJ, lowercase
        normalize(s) {
            return String(s || '')
                .replace(/[۰-۹]/g, (d) => d.charCodeAt(0) - 0x06f0)
                .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)
                .replace(/ي/g, 'ی')
                .replace(/ك/g, 'ک')
                .replace(/[أإآ]/g, 'ا')
                .replace(/[ً-ْ]/g, '')
                .replace(/[‌‎‏]/g, ' ')
                .replace(/[‘’]/g, "'")
                .replace(/\s+/g, ' ')
                .trim()
                .toLowerCase();
        },

        // Drops duplicates and selectors the engine cannot parse (checked once at startup)
        validSelectors(list) {
            return Array.from(new Set(list)).filter((s) => {
                try {
                    UAG.Util.probe.querySelector(s);
                    return true;
                } catch {
                    return false;
                }
            });
        },

        matchesAny(rxList, text) {
            return rxList.some((rx) => rx.test(text));
        },
    };

    const BUTTON_SELECTOR = UAG.Util.validSelectors(BUTTON_SELECTORS).join(',');
    const GENERIC_ACCEPT = UAG.Util.validSelectors(GENERIC_ACCEPT_SELECTORS).join(',');
    const AGE_CONTAINER_LIST = UAG.Util.validSelectors(AGE_CONTAINERS);
    const AGE_CONTAINER_JOINED = AGE_CONTAINER_LIST.join(',');
    const COOKIE_CONTAINER_JOINED = UAG.Util.validSelectors(COOKIE_CONTAINERS).join(',');
    const ALL_CONTAINER_JOINED = UAG.Util.validSelectors([
        ...DIALOG_SELECTORS,
        ...AGE_CONTAINERS,
        ...COOKIE_CONTAINERS,
    ]).join(',');

    // ---- Dom --------------------------------------------------------------
    UAG.Dom = {
        // Real visibility: own + ancestor display/visibility, and a non-empty box
        isVisible(el) {
            if (!el || !el.isConnected) return false;
            if (el.classList && el.classList.contains('sf-hidden')) return false;
            if (typeof el.checkVisibility === 'function') {
                if (!el.checkVisibility({ checkVisibilityCSS: true })) return false;
            } else {
                for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
                    const cs = getComputedStyle(n);
                    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
                }
            }
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0;
        },

        labelOf(el) {
            const raw = el.tagName === 'INPUT' ? el.value : el.textContent;
            return UAG.Util.normalize(raw).slice(0, 120);
        },

        // Reject / Manage / Essential / Exit / orientation pickers are never clicked
        isNegative(el) {
            const raw = [
                UAG.Dom.labelOf(el),
                el.getAttribute('aria-label'),
                el.id,
                el.getAttribute('data-label'),
            ].join(' ');
            return NEGATIVE_RX.test(UAG.Util.normalize(raw).replace(/[_-]+/g, ' '));
        },

        isUsable(el) {
            return (
                !el.disabled &&
                el.getAttribute('aria-disabled') !== 'true' &&
                UAG.Dom.isVisible(el) &&
                !UAG.Dom.isNegative(el)
            );
        },

        // Fixed element covering (most of) the viewport
        isBlockingOverlay(el) {
            if (el === document.body || el === document.documentElement) return false;
            const cs = getComputedStyle(el);
            if (cs.position !== 'fixed') return false;
            const r = el.getBoundingClientRect();
            if (r.width < C.MIN_OVERLAY_SIZE || r.height < C.MIN_OVERLAY_SIZE) return false;
            const vw = window.innerWidth || document.documentElement.clientWidth;
            const vh = window.innerHeight || document.documentElement.clientHeight;
            if (!vw || !vh) return false;
            const w = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
            const h = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
            const coverage = (w * h) / (vw * vh);
            const z = parseInt(cs.zIndex, 10) || 0;
            return (
                coverage >= C.VIEWPORT_COVERAGE_RATIO ||
                (z > C.Z_INDEX_THRESHOLD && coverage >= C.PARTIAL_COVERAGE_RATIO)
            );
        },

        // Upsell/signup overlays are left alone, but never an age/cookie prompt
        isPremiumOverlay(el) {
            const text = UAG.Util.normalize((el.textContent || '').slice(0, 3000));
            if (AGE_REL_RX.test(text) || COOKIE_REL_RX.test(text)) return false;
            return PREMIUM_RX.test(text);
        },
    };

    // ---- Cookie (pre-set at document-start, only when missing) -------------
    UAG.Cookie = {
        get(name) {
            for (const part of document.cookie.split(';')) {
                const i = part.indexOf('=');
                if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
            }
            return null;
        },

        preset() {
            const cfg = SITE.cookies;
            if (!cfg) return;
            const path = location.pathname;
            if (!cfg.paths.some((p) => path.startsWith(p))) return;
            const secure = location.protocol === 'https:' ? '; Secure' : '';
            for (const [name, value] of cfg.list) {
                try {
                    if (UAG.Cookie.get(name) !== null) continue; // never overwrite the site's own value
                    document.cookie = `${name}=${value}; path=/; domain=.${DOMAIN}; max-age=${C.COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
                    log('Pre-set cookie:', name);
                } catch {
                    /* ignore */
                }
            }
        },
    };

    // ---- Selectors (validated, page-type ordered, memoized per kind+type) ----
    UAG.Selectors = {
        cache: new Map(),

        get(kind, pageType) {
            const key = kind + ':' + pageType;
            let entry = UAG.Selectors.cache.get(key);
            if (!entry) {
                let list = SITE[kind].slice();
                if (kind === 'cookie') list = list.concat(CMP_SELECTORS);
                list = UAG.Util.validSelectors(list);
                const boost = SITE.boost && SITE.boost[pageType];
                if (boost && boost.length) {
                    const first = [];
                    const rest = [];
                    for (const s of list) {
                        if (boost.some((b) => s.includes(b))) first.push(s);
                        else rest.push(s);
                    }
                    list = first.concat(rest);
                }
                entry = { sels: list, joined: list.join(',') };
                UAG.Selectors.cache.set(key, entry);
            }
            return entry;
        },
    };

    // ---- Overlay (find / hide blocking layers) ------------------------------
    UAG.Overlay = {
        entry: null,

        init() {
            const list = UAG.Util.validSelectors([...AGE_CONTAINER_LIST, ...SITE.overlays, ...GENERIC_OVERLAYS]);
            UAG.Overlay.entry = { sels: list, joined: list.join(',') };
        },

        // Blocking fixed layers at the center of the viewport (generic detector)
        center() {
            const out = [];
            if (typeof document.elementsFromPoint !== 'function') return out;
            let stack;
            try {
                stack = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2);
            } catch {
                return out;
            }
            const seen = new Set();
            for (const el of stack.slice(0, 8)) {
                let cur = el;
                for (let d = 0; cur && d < 25; d++, cur = cur.parentElement) {
                    if (cur === document.body || cur === document.documentElement || seen.has(cur)) break;
                    seen.add(cur);
                    if (UAG.Dom.isBlockingOverlay(cur)) {
                        out.push(cur);
                        break;
                    }
                }
            }
            return out;
        },

        // Hide (not remove: safer for React) known overlays that still block the page
        hide() {
            const entry = UAG.Overlay.entry;
            let hiddenAny = false;
            if (entry.joined && document.querySelector(entry.joined)) {
                for (const sel of entry.sels) {
                    let nodes;
                    try {
                        nodes = document.querySelectorAll(sel);
                    } catch {
                        continue;
                    }
                    for (const el of nodes) {
                        if (!UAG.Dom.isVisible(el) || !UAG.Dom.isBlockingOverlay(el)) continue;
                        if (UAG.Dom.isPremiumOverlay(el)) continue;
                        el.style.setProperty('display', 'none', 'important');
                        hiddenAny = true;
                        log('Hid overlay:', sel);
                    }
                }
            }
            const body = document.body;
            if (hiddenAny || (body && body.style.overflow === 'hidden')) {
                if (body) body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        },
    };

    // ---- Containers (modal-scoped fallback search) ---------------------------
    UAG.Containers = {
        // computed at most once per tick
        get() {
            if (S.ctx.containers) return S.ctx.containers;
            const found = new Set();
            if (ALL_CONTAINER_JOINED) {
                for (const el of document.querySelectorAll(ALL_CONTAINER_JOINED)) {
                    found.add(el);
                    if (found.size >= C.MAX_CONTAINERS * 3) break;
                }
            }
            for (const el of UAG.Overlay.center()) found.add(el);
            const out = [];
            for (const el of found) {
                if (out.length >= C.MAX_CONTAINERS) break;
                if (el === document.body || el === document.documentElement) continue;
                if (!UAG.Dom.isVisible(el)) continue;
                if ((el.textContent || '').length > C.MAX_CONTAINER_TEXT) continue;
                out.push(el);
            }
            S.ctx.containers = out;
            return out;
        },

        relevant(el, kind) {
            const joined = kind === 'age' ? AGE_CONTAINER_JOINED : COOKIE_CONTAINER_JOINED;
            try {
                if (joined && el.matches(joined)) return true;
            } catch {
                /* ignore */
            }
            const text = UAG.Util.normalize((el.textContent || '').slice(0, 1500));
            return (kind === 'age' ? AGE_REL_RX : COOKIE_REL_RX).test(text);
        },
    };

    // ---- Click ----------------------------------------------------------------
    UAG.Click = {
        records: new WeakMap(),

        reset() {
            UAG.Click.records = new WeakMap();
        },

        // One place for cooldown + per-element cap + global cap
        safe(el) {
            const now = Date.now();
            const rec = UAG.Click.records.get(el);
            if (rec && (rec.n >= C.MAX_CLICKS_PER_ELEMENT || now - rec.t < C.CLICK_COOLDOWN_MS)) return false;
            UAG.Click.records.set(el, { n: rec ? rec.n + 1 : 1, t: now });
            S.actions++;
            try {
                el.click();
            } catch (e) {
                log('click failed', e);
            }
            return true;
        },

        // Site-specific selectors in priority order. When a selector matches several
        // buttons, the one whose text looks like "enter / accept" wins; Reject/Manage never qualify.
        trusted(entry) {
            if (!entry.joined || !document.querySelector(entry.joined)) return false;
            for (const sel of entry.sels) {
                let nodes;
                try {
                    nodes = document.querySelectorAll(sel);
                } catch {
                    continue;
                }
                if (!nodes.length) continue;
                const usable = Array.from(nodes).filter((el) => UAG.Dom.isUsable(el));
                if (!usable.length) continue;
                const ordered = usable
                    .filter((el) => UAG.Util.matchesAny(ANY_TEXT, UAG.Dom.labelOf(el)))
                    .concat(usable);
                for (const el of ordered) {
                    if (UAG.Click.safe(el)) {
                        log('Clicked via selector:', sel);
                        return true;
                    }
                }
            }
            return false;
        },

        // Generic fallback: only inside modal-like containers, by text (never "first button")
        scoped(kind) {
            for (const c of UAG.Containers.get()) {
                if (!UAG.Containers.relevant(c, kind)) continue;
                const btns = Array.from(c.querySelectorAll(BUTTON_SELECTOR)).filter((b) => UAG.Dom.isUsable(b));
                if (!btns.length) continue;
                let pick = btns.find((b) => UAG.Util.matchesAny(TEXT[kind], UAG.Dom.labelOf(b)));
                if (!pick && kind === 'cookie' && GENERIC_ACCEPT) {
                    pick = btns.find((b) => b.matches(GENERIC_ACCEPT));
                }
                // age gate whose other buttons were filtered out (Exit/Leave): the single remaining one
                if (!pick && kind === 'age' && btns.length === 1) pick = btns[0];
                if (pick && UAG.Click.safe(pick)) {
                    log('Clicked via container fallback:', kind, UAG.Dom.labelOf(pick));
                    return true;
                }
            }
            return false;
        },

        attempt(kind, entry) {
            return UAG.Click.trusted(entry) || UAG.Click.scoped(kind);
        },
    };

    // ---- Engine (one debounced MutationObserver + safety poll, time-boxed) -----
    UAG.Engine = {
        // Synchronous: one pass over the page. Returns true when something was clicked.
        tick() {
            S.ctx = { containers: null };
            const pageType = SITE.pageType(location.pathname);
            const gotAge = UAG.Click.attempt('age', UAG.Selectors.get('age', pageType));
            const gotCookie = UAG.Click.attempt('cookie', UAG.Selectors.get('cookie', pageType));
            const acted = gotAge || gotCookie;
            const now = Date.now();

            if (acted) {
                S.cleanupUntil = now + C.CLEANUP_WINDOW_MS;
                S.deadline = Math.max(S.deadline, now + C.EXTEND_AFTER_ACTION_MS);
            } else if (
                SITE.escapeOnStuck &&
                pageType === 'video' &&
                !S.escapeSent &&
                S.actions === 0 &&
                now - S.startedAt > C.ESCAPE_AFTER_MS &&
                UAG.Overlay.center().length > 0
            ) {
                // Stuck modal on a video page: one Escape per run, only if a blocking layer exists
                S.escapeSent = true;
                try {
                    document.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true })
                    );
                    log('Dispatched Escape');
                } catch {
                    /* ignore */
                }
            }

            if (now < S.cleanupUntil) UAG.Overlay.hide();
            return acted;
        },

        schedule(delay) {
            const due = Date.now() + delay;
            if (S.timer && S.timerDue <= due) return;
            if (S.timer) clearTimeout(S.timer);
            S.timerDue = due;
            S.timer = setTimeout(() => {
                S.timer = 0;
                UAG.Engine.run();
            }, delay);
        },

        run() {
            if (S.running || !S.active) return;
            S.running = true;
            let acted = false;
            try {
                acted = UAG.Engine.tick();
            } catch (e) {
                log('tick error', e);
            }
            S.running = false;
            if (Date.now() > S.deadline || S.actions >= C.MAX_ACTIONS) {
                UAG.Engine.stop();
                return;
            }
            UAG.Engine.schedule(acted ? SITE.afterActionMs || 120 : TIMING.pollMs);
        },

        // fresh = real navigation: forget click history
        start(fresh) {
            S.active = true;
            S.startedAt = Date.now();
            S.deadline = S.startedAt + TIMING.maxRunMs;
            S.actions = 0;
            S.escapeSent = false;
            if (fresh) UAG.Click.reset();
            if (!S.observer) {
                S.observer = new MutationObserver(() => {
                    if (S.active) UAG.Engine.schedule(C.DEBOUNCE_MS);
                });
            }
            S.observer.observe(document, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style', 'hidden', 'open', 'aria-hidden'],
            });
            UAG.Engine.schedule(0);
        },

        stop() {
            S.active = false;
            if (S.observer) S.observer.disconnect();
            if (S.timer) {
                clearTimeout(S.timer);
                S.timer = 0;
            }
        },

        // DOMContentLoaded / load: keep an active run, or open a fresh watch window
        nudge() {
            if (S.active) UAG.Engine.schedule(0);
            else UAG.Engine.start(false);
        },
    };

    // ---- Navigation (SPA + bfcache) ----------------------------------------------
    UAG.Navigation = {
        // hash-only changes (e.g. clicking <a href="#">) are not navigation
        key: () => location.href.split('#')[0],
        lastUrl: location.href.split('#')[0],

        onChange() {
            const key = UAG.Navigation.key();
            if (key === UAG.Navigation.lastUrl) return;
            UAG.Navigation.lastUrl = key;
            log('URL changed:', location.href);
            UAG.Cookie.preset();
            UAG.Engine.start(true);
        },

        install() {
            for (const fn of ['pushState', 'replaceState']) {
                const orig = history[fn];
                if (typeof orig !== 'function') continue;
                history[fn] = function (...args) {
                    const result = orig.apply(this, args);
                    try {
                        UAG.Navigation.onChange();
                    } catch {
                        /* ignore */
                    }
                    return result;
                };
            }
            window.addEventListener('popstate', UAG.Navigation.onChange);
            window.addEventListener('hashchange', UAG.Navigation.onChange);
            // Back/forward from bfcache: the page is restored without re-running the script
            window.addEventListener('pageshow', (e) => {
                if (e.persisted) {
                    UAG.Navigation.lastUrl = UAG.Navigation.key();
                    UAG.Engine.start(true);
                }
            });
        },
    };

    // ========================================================================
    // 7. ENTRY POINT
    // ========================================================================

    UAG.Overlay.init();
    UAG.Cookie.preset();
    UAG.Navigation.install();
    document.addEventListener('DOMContentLoaded', UAG.Engine.nudge);
    window.addEventListener('load', UAG.Engine.nudge);
    UAG.Engine.start(true);
})();