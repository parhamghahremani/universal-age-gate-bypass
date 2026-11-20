// ==UserScript==
// @name         Universal Age Gate Auto-Bypass
// @namespace    https://github.com/parhamghahremani/universal-age-gate-bypass
// @version      2.1.19
// @description  Automatically bypass 18+ age verification gates on multiple adult sites + cookie consent — Firefox Desktop + Android — v2.1.19 P2 accuracy (CMP auto-detection, page-type prioritization, memoization) + Cookie expansion (XVideos, Tube8) + Function overrides (Pornhub)
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
                // Cookie consent modal (React/CSS Modules) - attribute-based, hash-independent (HIGHEST PRIORITY)
                '[data-opt-hydration="cookies-dialog-eu"] button',
                'button[data-opt-hydration="cookies-dialog-eu"]',
                'div[data-opt-hydration="cookies-dialog-eu"] button[type="button"]',
                // Fallback: CSS Modules hash-based (may change per build)
                'button.experimentalButton-5822e',
                'div[data-opt-hydration="cookies-dialog-eu"] button.experimentalButton-5822e',
                'div.wrapper-5822e.overAv-5822e button.experimentalButton-5822e',
                // Age gate (if separate from cookie consent)
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
                'div.wrapper-5822e.overAv-5822e',
                'div[data-opt-hydration="cookies-dialog-eu"]',
            ],
            spaPaths: ['/videos/', '/channels/', '/categories/', '/pornstars/'],
            timings: {
                retryInterval: 30,    // faster polling for React modal hydration
                maxRetries: 80,       // more attempts
                initialDelay: 30,     // faster first check
                overlayCleanupDelay: 50,
                spaNavDelay: 50,
            },
        },

        'tube8.com': {
            name: 'Tube8',
            primarySelectors: [
                // Tube8 Age Gate (homepage/entry) - HIGHEST PRIORITY (handles simultaneous modals first)
                '#accessButton.gtm-event-avmodal[data-label="enter"]',
                'button#accessButton.button.button-pink.gtm-event-avmodal[data-label="enter"]',
                'button.gtm-event-avmodal[data-label="enter"]',
                '#accessButton[data-plw="plw_disclaimer_accept"]',
                // Tube8 Cookie Consent (GTM banner) - attribute-based, robust
                '#consent_accept_all.gtm-event-cookie-banner',
                'button#consent_accept_all[data-label="accept_all"]',
                'button.gtm-event-cookie-banner[data-label="accept_all"]',
                'button#consent_accept_essential[data-label="accept_essential"]',
                'button.gtm-event-cookie-banner[data-label="accept_essential"]',
                // Tube8 Minimized cookie banner (after accept, shows as link) - HTML has <a> without gtm-event-cookie-banner class or data-label
                '#consent_accept_min_all.link_accept_all_cookies',
                'a#consent_accept_min_all.link_accept_all_cookies',
                '#consent_accept_min_all.gtm-event-cookie-banner',
                'button#consent_accept_min_all[data-label="accept_all"]',
                'a.link_accept_all_cookies.gtm-event-cookie-banner',
                'a.link_accept_all_cookies[data-label="accept_all"]',
                // Generic age gate fallbacks (if separate age gate appears on video pages)
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
                // Tube8 Age Gate overlays
                '#ageDisclaimerMainBG',
                '#ageDisclaimerWrapper',
                'html.showAgeDisclaimer',
                // Tube8 Cookie Consent overlays
                '#cookie_banner_overlay',
                '#cookie_consent_wrapper',
                // Generic
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
                retryInterval: 30,      // faster polling
                maxRetries: 80,         // more attempts
                initialDelay: 30,       // faster first check
                overlayCleanupDelay: 300, // slightly more for DOM transition
                spaNavDelay: 30,
            },
        },
    };

    // ============================================================================
    // GLOBAL COOKIE CONSENT SELECTORS (Cross-site)
    // ============================================================================

    const COOKIE_CONSENT_SELECTORS = [
        // xHamster-specific: attribute-based, hash-independent (HIGHEST PRIORITY for xHamster)
        '[data-opt-hydration="cookies-dialog-eu"] button',
        'button[data-opt-hydration="cookies-dialog-eu"]',
        'div[data-opt-hydration="cookies-dialog-eu"] button[type="button"]',
        // Tube8-specific: GTM cookie banner (highest priority for Tube8)
        '#consent_accept_all.gtm-event-cookie-banner',
        'button#consent_accept_all[data-label="accept_all"]',
        'button.gtm-event-cookie-banner[data-label="accept_all"]',
        'button#consent_accept_essential[data-label="accept_essential"]',
        'button.gtm-event-cookie-banner[data-label="accept_essential"]',
        // Tube8 Minimized cookie banner (link style) - HTML has <a> without gtm-event-cookie-banner class or data-label
        '#consent_accept_min_all.link_accept_all_cookies',
        'a#consent_accept_min_all.link_accept_all_cookies',
        '#consent_accept_min_all.gtm-event-cookie-banner',
        'button#consent_accept_min_all[data-label="accept_all"]',
        'a.link_accept_all_cookies.gtm-event-cookie-banner',
        'a.link_accept_all_cookies[data-label="accept_all"]',
        // Pornhub-specific: "Accept all cookies" variant (highest priority)
        '.cbPrimaryCTA.gtm-event-cookie-banner',
        'button[data-label="accept_all"]',
        'button.cbButton[data-event="cookie_banner"][data-label="accept_all"]',
        // Pornhub-specific: "Ok" button variant (high priority)
        '.js-acceptGlobalCookies',
        // xHamster-specific: experimentalButton-5822e (cookie dialog) - fallback for hash-based
        'button.experimentalButton-5822e',
        'div[data-opt-hydration="cookies-dialog-eu"] button.experimentalButton-5822e',
        // SpankBang-specific (kept for reference, site removed but selectors may match others)
        'button[data-testid="accept-all-cookies"]',
        // CMP Framework Auto-Detection (P2.1) - fallback after site-specific selectors
        // OneTrust
        '#onetrust-accept-btn-handler',
        '.ot-sdk-btn-floating.ot-btn-primary',
        'button[id^="onetrust-accept"]',
        'button[class*="onetrust"][class*="accept"]',
        // Cookiebot
        '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
        '#CybotCookiebotDialogBodyButtonAccept',
        'button[id*="CybotCookiebot"][id*="Accept"]',
        'button[class*="Cookiebot"][class*="Accept"]',
        // Quantcast
        '.qc-cmp2-ui button[mode="primary"]',
        '.qc-cmp2-footer button[data-action="accept-all"]',
        'button[class*="qc-cmp"][class*="accept"]',
        // Usercentrics
        '[data-usercentrics="accept-all"]',
        'button[data-testid="uc-accept-all-button"]',
        'button[class*="uc-"][class*="accept"]',
        // Didomi
        '#didomi-notice-agree-button',
        'button[class*="didomi"][class*="agree"]',
        // TrustArc
        '.trustarc-button-accept-all',
        'button[id*="tealium"][id*="accept"]',
        'button[class*="trustarc"][class*="accept"]',
        // Osano
        '#osano-cm-accept-all',
        'button[class*="osano"][class*="accept"]',
        // Generic CMP fallbacks
        'button[id*="cmp"][id*="accept"]',
        'button[class*="cmp"][class*="accept"]',
        'button[class*="consent-manager"][class*="accept"]',
        // Generic fallbacks
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
        // Tube8-specific cookie consent patterns (minimized banner link text)
        tube8CookieConsent: {
            en: [
                /^accept all cookies$/i,
                /^accept all$/i,
                /^allow all cookies$/i,
                /^allow all$/i,
            ],
            fa: [
                /^قبول\s+همه\s+کوکی/i,
                /^قبول\s+همه/i,
                /^پذیرش\s+همه\s+کوکی/i,
                /^پذیرش\s+همه/i,
            ],
        },
    };

    // v2.1.19: Memoized language detection and pattern resolution (P2.3)
    let _memoizedLanguage = null;
    let _memoizedPatterns = new Map(); // key: `${domain}:${type}`

    function detectPageLanguage() {
        if (_memoizedLanguage) return _memoizedLanguage;

        const htmlLang =
            document.documentElement.lang || document.documentElement.getAttribute('lang');
        if (htmlLang) {
            _memoizedLanguage = htmlLang.split('-')[0].toLowerCase();
            return _memoizedLanguage;
        }

        const metaLang = document.querySelector(
            'meta[http-equiv="content-language"], meta[name="language"]'
        );
        if (metaLang) {
            _memoizedLanguage = metaLang.getAttribute('content').split('-')[0].toLowerCase();
            return _memoizedLanguage;
        }

        const bodyText = (document.body.innerText || '').toLowerCase();
        const langScores = { en: 0, fa: 0 };
        for (const pattern of TEXT_PATTERNS.ageGate.en) {
            if (pattern.test(bodyText)) langScores.en++;
        }
        for (const pattern of TEXT_PATTERNS.ageGate.fa) {
            if (pattern.test(bodyText)) langScores.fa++;
        }
        _memoizedLanguage = langScores.fa > langScores.en ? 'fa' : 'en';
        return _memoizedLanguage;
    }

    function getPatternsForType(type) {
        const cacheKey = `${CURRENT_DOMAIN}:${type}`;
        if (_memoizedPatterns.has(cacheKey)) {
            return _memoizedPatterns.get(cacheKey);
        }

        const lang = detectPageLanguage();
        const patterns = TEXT_PATTERNS[type]?.[lang] || TEXT_PATTERNS[type]?.en || [];
        const enPatterns = TEXT_PATTERNS[type]?.en || [];
        const extended =
            (type === 'cookieConsent' && TEXT_PATTERNS.cookieConsentExtended?.en) || [];
        const xnxxPatterns =
            (type === 'cookieConsent' && CURRENT_DOMAIN === 'xnxx.com' && TEXT_PATTERNS.xnxxDisclaimer?.[lang]) ||
            (type === 'cookieConsent' && CURRENT_DOMAIN === 'xnxx.com' && TEXT_PATTERNS.xnxxDisclaimer?.en) ||
            [];
        const tube8Patterns =
            (type === 'cookieConsent' && CURRENT_DOMAIN === 'tube8.com' && TEXT_PATTERNS.tube8CookieConsent?.[lang]) ||
            (type === 'cookieConsent' && CURRENT_DOMAIN === 'tube8.com' && TEXT_PATTERNS.tube8CookieConsent?.en) ||
            [];
        const result = [...new Set([...patterns, ...enPatterns, ...extended, ...xnxxPatterns, ...tube8Patterns])];
        _memoizedPatterns.set(cacheKey, result);
        return result;
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
    // @deprecated - replaced by unified preSetSiteCookies() in v2.1.19
    // eslint-disable-next-line no-unused-vars
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
    // @deprecated - replaced by unified preSetSiteCookies() in v2.1.19
    // eslint-disable-next-line no-unused-vars
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

    // ============================================================================
    // COOKIE PRE-SETTING EXPANSION (v2.1.19 - P2.4-2.8)
    // ============================================================================

    const COOKIE_PRESET_CONFIG = {
        'pornhub.com': {
            paths: ['/video/', '/embed/'],
            cookies: [
                { name: 'age_verified', value: '1', domain: '.pornhub.com' },
                { name: 'cookieConsent', value: '1', domain: '.pornhub.com' },
            ]
        },
        'xnxx.com': {
            paths: ['/video-'],
            cookies: [
                { name: 'disclaimer', value: '2', domain: '.xnxx.com' },
                { name: 'age_verified', value: '1', domain: '.xnxx.com' },
            ]
        },
        'xvideos.com': {
            paths: ['/video'],
            cookies: [
                { name: 'age_check', value: '1', domain: '.xvideos.com' },
                { name: 'disclaimer', value: '2', domain: '.xvideos.com' },
            ]
        },
        'tube8.com': {
            paths: ['/video/'],
            cookies: [
                { name: 'age_verified', value: '1', domain: '.tube8.com' },
            ]
        },
        // xHamster: NO cookie pre-setting (React-based, cookies don't work)
    };

    function preSetSiteCookies() {
        const config = COOKIE_PRESET_CONFIG[CURRENT_DOMAIN];
        if (!config) return;

        const pathname = location.pathname;
        const shouldSet = config.paths.some(p => pathname.startsWith(p));
        if (!shouldSet) return;

        config.cookies.forEach(cookie => {
            const cookieStr = `${cookie.name}=${cookie.value}; path=/; domain=${cookie.domain}; Secure; SameSite=Lax; max-age=31536000`;
            if (!document.cookie.includes(`${cookie.name}=${cookie.value}`)) {
                document.cookie = cookieStr;
                log('Pre-set cookie:', cookie.name);
            }
        });
    }

    // ============================================================================
    // CONDITIONAL FUNCTION OVERRIDES (v2.1.19 - P2.9)
    // ============================================================================

    const FUNCTION_OVERRIDES = {
        'pornhub.com': ['showAgeGate', 'showModal', 'openAgeGate'],
        'xnxx.com': [],
        'xvideos.com': [],
        'xhamster.com': [], // React - DO NOT override
        'tube8.com': [],
    };

    function applyConditionalFunctionOverrides() {
        const fns = FUNCTION_OVERRIDES[CURRENT_DOMAIN] || [];
        fns.forEach(fnName => {
            if (typeof window[fnName] === 'function') {
                window[fnName] = function(..._args) {
                    log('Intercepted call to', fnName);
                    return Promise.resolve();
                };
                log('Overrode existing function:', fnName);
            }
        });
    }

    const CONFIG = {
        ...SITE_CONFIG,
        timings: getAdaptiveTimings({ ...DEFAULT_TIMINGS, ...SITE_CONFIG.timings }),
        debug: false,
        logPrefix: `[UniversalAgeGate:${SITE_CONFIG.name}]`,
        pageType: getPornhubPageType(),
        xnxxPageType: getXnxxPageType(),
    };

    // ============================================================================
    // UTILITIES
    // v2.1.18: Added requestIdleCallback, selector caching, adaptive timing
    // ============================================================================

    const log = (...args) => CONFIG.debug && console.log(CONFIG.logPrefix, ...args);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    // v2.1.18: requestIdleCallback wrapper for non-critical work (overlay cleanup, SPA nav)
    const scheduleIdleWork = (fn) => {
        if (typeof requestIdleCallback === 'function') {
            requestIdleCallback(fn, { timeout: 50 });
        } else {
            queueMicrotask(fn);
        }
    };

    // v2.1.18: Selector caching with WeakMap - per retry loop cache, auto-evicts on DOM mutations
    const selectorCache = new WeakMap();
    function cachedQuerySelector(root, selector) {
        if (!selectorCache.has(root)) {
            selectorCache.set(root, new Map());
        }
        const cache = selectorCache.get(root);
        if (cache.has(selector)) {
            const cached = cache.get(selector);
            // Verify element still exists in DOM
            if (cached && (cached.isConnected || root.contains(cached))) {
                return cached;
            }
        }
        const result = root.querySelector(selector);
        cache.set(selector, result);
        return result;
    }
    function cachedQuerySelectorAll(root, selector) {
        if (!selectorCache.has(root)) {
            selectorCache.set(root, new Map());
        }
        const cache = selectorCache.get(root);
        const cacheKey = selector + '_all';
        if (cache.has(cacheKey)) {
            const cached = cache.get(cacheKey);
            // Verify elements still exist
            if (cached && cached.length > 0 && (cached[0].isConnected || root.contains(cached[0]))) {
                return cached;
            }
        }
        const result = Array.from(root.querySelectorAll(selector));
        cache.set(cacheKey, result);
        return result;
    }

    // v2.1.18: Adaptive timing for low-end devices
    function getAdaptiveTimings(baseTimings) {
        const hwConcurrency = navigator.hardwareConcurrency || 4;
        const deviceMemory = navigator.deviceMemory || 4;
        const isLowEnd = hwConcurrency <= 2 || deviceMemory <= 2;
        if (isLowEnd) {
            log('Low-end device detected (concurrency:', hwConcurrency, ', memory:', deviceMemory, 'GB) - adaptive timing applied');
            return {
                ...baseTimings,
                retryInterval: baseTimings.retryInterval * 2,
                maxRetries: Math.min(Math.ceil(baseTimings.maxRetries * 1.5), 100),
            };
        }
        return baseTimings;
    }

    // Smart visibility: rejects sf-hidden, display:none, visibility:hidden
    // v2.1.18: Walk up ancestor chain for fixed/absolute/sticky position (handles <a> tags in fixed overlays)
    const isVisible = (el) => {
        if (!el || el.classList.contains('sf-hidden')) return false;
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        // Check element or any ancestor for fixed/absolute/sticky positioning (common in overlay buttons)
        let current = el;
        while (current && current !== document.documentElement) {
            const cs = getComputedStyle(current);
            if (current.offsetParent !== null || cs.position === 'fixed' || cs.position === 'absolute' || cs.position === 'sticky') {
                return true;
            }
            current = current.parentElement;
        }
        return false;
    };

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

    // Generic button candidates (buttons, links with button role, inputs, <a> tags)
    const BUTTON_CANDIDATES =
        'button, [role="button"], a.btn, .btn, input[type="button"], input[type="submit"], a[href*="age_verified"], a.removeAdLink.gtm-event-avmodal, a#btn_agree, a.gtm-event-avmodal, a.link_accept_all_cookies.gtm-event-cookie-banner, a[data-label="accept_all"], a[data-label="accept_essential"]';

    // ============================================================================
    // CORE LOGICS
    // ============================================================================

    function clickAgeGateButton() {
        // Phase 1: Site-specific primary selectors (fastest, most reliable) - with caching
        // v2.1.19: Page-type aware selector prioritization (P2.2)
        let primarySelectors = CONFIG.primarySelectors;
        if (CURRENT_DOMAIN === 'pornhub.com' && CONFIG.pageType === 'video') {
            // Prioritize data-label/GTM selectors for video pages
            primarySelectors = CONFIG.primarySelectors.filter(s => s.includes('data-label') || s.includes('gtm-event') || s.includes('js-av-cta') || s.includes('gtm-event-age-verification'));
        } else if (CURRENT_DOMAIN === 'xnxx.com' && CONFIG.xnxxPageType === 'homepage') {
            // Prioritize disclaimer enter buttons for homepage
            primarySelectors = CONFIG.primarySelectors.filter(s => s.includes('disclaimer-enter') || s.includes('disclaimer-buttons'));
        }

        for (const sel of primarySelectors) {
            try {
                const btn = cachedQuerySelector(document, sel);
                if (isVisible(btn)) {
                    btn.click();
                    log('Clicked age gate via primary selector:', sel);
                    return true;
                }
            } catch {}
        }

        // Fallback to all primary selectors if page-type prioritization didn't match
        if (primarySelectors !== CONFIG.primarySelectors) {
            for (const sel of CONFIG.primarySelectors) {
                if (primarySelectors.includes(sel)) continue;
                try {
                    const btn = cachedQuerySelector(document, sel);
                    if (isVisible(btn)) {
                        btn.click();
                        log('Clicked age gate via fallback selector:', sel);
                        return true;
                    }
                } catch {}
            }
        }

        // Phase 2: Text-based fallback on visible button-like elements - with caching
        const candidates = cachedQuerySelectorAll(document, BUTTON_CANDIDATES);
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
        // Phase 1: Cookie consent specific selectors - with caching
        // v2.1.19: Page-type aware selector prioritization (P2.2)
        let cookieSelectors = COOKIE_CONSENT_SELECTORS;
        if (CURRENT_DOMAIN === 'pornhub.com' && CONFIG.pageType === 'video') {
            // Prioritize video-page specific cookie selectors
            cookieSelectors = COOKIE_CONSENT_SELECTORS.filter(s =>
                s.includes('cbPrimaryCTA') || s.includes('data-label="accept_all"') ||
                s.includes('cbButton') || s.includes('js-acceptGlobalCookies')
            );
        } else if (CURRENT_DOMAIN === 'xnxx.com' && CONFIG.xnxxPageType === 'homepage') {
            // Prioritize disclaimer cookie buttons for homepage
            cookieSelectors = COOKIE_CONSENT_SELECTORS.filter(s =>
                s.includes('disclaimer') || s.includes('accept_cookies') || s.includes('btn-primary')
            );
        } else if (CURRENT_DOMAIN === 'tube8.com') {
            // Prioritize GTM cookie banner selectors
            cookieSelectors = COOKIE_CONSENT_SELECTORS.filter(s =>
                s.includes('gtm-event-cookie-banner') || s.includes('consent_accept') ||
                s.includes('link_accept_all_cookies')
            );
        } else if (CURRENT_DOMAIN === 'xhamster.com') {
            // Prioritize attribute-based cookie dialog selectors
            cookieSelectors = COOKIE_CONSENT_SELECTORS.filter(s =>
                s.includes('data-opt-hydration') || s.includes('experimentalButton-5822e')
            );
        }

        for (const sel of cookieSelectors) {
            try {
                const btn = cachedQuerySelector(document, sel);
                if (isVisible(btn)) {
                    btn.click();
                    log('Clicked cookie consent via selector:', sel);
                    return true;
                }
            } catch {}
        }

        // Fallback to all cookie selectors if page-type prioritization didn't match
        if (cookieSelectors !== COOKIE_CONSENT_SELECTORS) {
            for (const sel of COOKIE_CONSENT_SELECTORS) {
                if (cookieSelectors.includes(sel)) continue;
                try {
                    const btn = cachedQuerySelector(document, sel);
                    if (isVisible(btn)) {
                        btn.click();
                        log('Clicked cookie consent via fallback selector:', sel);
                        return true;
                    }
                } catch {}
            }
        }

        // Phase 2: Text-based fallback (with extended patterns for geo-variants) - with caching
        const candidates = cachedQuerySelectorAll(document, BUTTON_CANDIDATES);
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
                const elements = cachedQuerySelectorAll(document, sel);
                elements.forEach((el) => {
                    if (isVisible(el) && isBlockingOverlay(el)) {
                        el.remove();
                        log('Removed overlay:', el.className || el.id || sel);
                        removed = true;
                    }
                });
            } catch {}
        }

        // v2.1.18: Use requestIdleCallback for non-critical scroll restoration
        if (removed || document.body.style.overflow === 'hidden') {
            scheduleIdleWork(() => {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                log('Restored page scroll');
            });
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

    // v2.1.18: Generic simultaneous modal handler - detect overlapping fixed overlays, handle by z-index (top-down)
    function handleSimultaneousModals() {
        // Find all visible blocking overlays
        const overlays = [];
        for (const sel of CONFIG.overlaySelectors) {
            try {
                const elements = cachedQuerySelectorAll(document, sel);
                elements.forEach((el) => {
                    if (isVisible(el) && isBlockingOverlay(el)) {
                        const zIndex = parseInt(getComputedStyle(el).zIndex) || 0;
                        overlays.push({ element: el, zIndex, selector: sel });
                    }
                });
            } catch {}
        }

        if (overlays.length <= 1) return false; // No simultaneous modals

        // Sort by z-index descending (highest first = topmost)
        overlays.sort((a, b) => b.zIndex - a.zIndex);
        log('Simultaneous modals detected:', overlays.map(o => ({ zIndex: o.zIndex, selector: o.selector })));

        // Handle topmost first (age gate typically has higher z-index than cookie consent)
        for (const overlay of overlays) {
            // Try age gate buttons within this overlay
            const ageGateBtn = overlay.element.querySelector(CONFIG.primarySelectors.join(', '));
            if (isVisible(ageGateBtn)) {
                ageGateBtn.click();
                log('Clicked age gate in topmost overlay (z-index:', overlay.zIndex, ')');
                return true;
            }
            // Try cookie consent buttons within this overlay
            const cookieBtn = overlay.element.querySelector(COOKIE_CONSENT_SELECTORS.join(', '));
            if (isVisible(cookieBtn)) {
                cookieBtn.click();
                log('Clicked cookie consent in overlay (z-index:', overlay.zIndex, ')');
                return true;
            }
        }
        return false;
    }

    // ============================================================================
    // MAIN ATTEMPT (v2.1.4 flow: cookie consent -> age gate -> overlay cleanup)
    // v2.1.18: Generic simultaneous modal handling (replaces Tube8 hardcoded logic)
    // ============================================================================

    async function attempt() {
        // v2.1.18: Generic simultaneous modal handler - works on any site with overlapping overlays
        if (handleSimultaneousModals()) {
            await sleep(200); // pause for DOM transition after handling topmost
            clickCookieConsent(); // re-check for any remaining
            await sleep(CONFIG.timings.overlayCleanupDelay);
            removeOverlays();
            return true;
        }

        // 1. Handle cookie consent first (may not exist yet on some sites)
        clickCookieConsent();

        // 2. Then handle age gate
        if (clickAgeGateButton()) {
            // After clicking age gate, wait for DOM to update and check for cookie consent again
            // Some sites (XNXX, Pornhub, Tube8) show cookie consent AFTER age gate is dismissed
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
    // v2.1.18: Store observer ref globally + pagehide cleanup (no memory leak)
    // ============================================================================

    let spaNavObserver = null;

    function observeSPANavigation() {
        let lastUrl = location.href;

        // MutationObserver for DOM changes (covers SPA content loads)
        spaNavObserver = new MutationObserver(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                log('URL changed via MutationObserver:', lastUrl);
                setTimeout(attempt, CONFIG.timings.spaNavDelay);
            }
        });
        spaNavObserver.observe(document, { subtree: true, childList: true });

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

        // Cleanup on page unload to prevent memory leaks
        function cleanupSPANavigation() {
            if (spaNavObserver) {
                spaNavObserver.disconnect();
                spaNavObserver = null;
            }
        }
        window.addEventListener('pagehide', cleanupSPANavigation, { once: true });
        window.addEventListener('beforeunload', cleanupSPANavigation, { once: true });
    }

    // ============================================================================
    // FAST PATH: MutationObserver at document-start (v2.1.4 ultra-fast)
    // v2.1.18: Unified single microtask checker (no race condition)
    // ============================================================================

    let fastPathActive = true;
    let fastPathObserver = null;
    let fastPathMicrotaskScheduled = false;

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

        // Periodic microtask retries via setTimeout (not setInterval) to avoid race
        function scheduleNextCheck() {
            if (!fastPathActive) return;
            setTimeout(scheduleFastPathAttempt, 10);
        }
        // Start the periodic check loop
        scheduleNextCheck();
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
    // v2.1.19: Unified cookie pre-setting for all supported sites
    preSetSiteCookies();
    // v2.1.19: Conditional function overrides (only if functions already exist)
    applyConditionalFunctionOverrides();

    if (document.readyState === 'loading') {
        startFastPath();
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();