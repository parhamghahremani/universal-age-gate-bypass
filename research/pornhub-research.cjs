const { firefox } = require('playwright');
const fs = require('fs');

const PROXY = { server: 'socks5://127.0.0.1:1819' };

async function research() {
    const browser = await firefox.launch({
        headless: false,
        proxy: PROXY,
        args: ['--disable-blink-features=AutomationControlled']
    });

    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        viewport: { width: 1920, height: 1080 }
    });

    const page = await context.newPage();

    // Enable console logging
    page.on('console', msg => console.log('CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    // Track all network requests
    const requests = [];
    page.on('request', req => {
        requests.push({
            url: req.url(),
            method: req.method(),
            resourceType: req.resourceType()
        });
    });

    console.log('=== Navigating to Pornhub homepage ===');
    await page.goto('https://www.pornhub.com', { waitUntil: 'networkidle', timeout: 60000 });

    // Wait for any modals/dialogs to appear
    await page.waitForTimeout(5000);

    // Take screenshot
    await page.screenshot({ path: 'research/pornhub-homepage.png', fullPage: true });

    // Get all buttons and their attributes
    const buttons = await page.evaluate(() => {
        const btns = document.querySelectorAll('button, a[role="button"], input[type="button"], input[type="submit"]');
        return Array.from(btns).map(btn => ({
            tag: btn.tagName,
            id: btn.id,
            className: btn.className,
            textContent: btn.textContent?.trim().substring(0, 100),
            innerText: btn.innerText?.trim().substring(0, 100),
            value: btn.value,
            type: btn.type,
            role: btn.getAttribute('role'),
            ariaLabel: btn.getAttribute('aria-label'),
            dataAgegate: btn.getAttribute('data-agegate'),
            onclick: btn.getAttribute('onclick'),
            style: btn.style.cssText,
            offsetParent: btn.offsetParent ? 'visible' : 'hidden',
            boundingRect: btn.getBoundingClientRect()
        }));
    });

    console.log('\n=== ALL BUTTONS ===');
    console.log(JSON.stringify(buttons, null, 2));

    // Get all elements with age-gate related classes/ids
    const ageGateElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('[class*="age"], [id*="age"], [class*="gate"], [id*="gate"], [class*="modal"], [class*="overlay"], [class*="consent"], [class*="cookie"], [class*="disclaimer"], [class*="tos"], [class*="terms"]');
        return Array.from(elements).map(el => ({
            tag: el.tagName,
            id: el.id,
            className: el.className,
            textContent: el.textContent?.trim().substring(0, 200),
            style: el.style.cssText,
            computedStyle: {
                position: getComputedStyle(el).position,
                zIndex: getComputedStyle(el).zIndex,
                display: getComputedStyle(el).display,
                visibility: getComputedStyle(el).visibility,
                opacity: getComputedStyle(el).opacity,
                top: getComputedStyle(el).top,
                left: getComputedStyle(el).left,
                width: getComputedStyle(el).width,
                height: getComputedStyle(el).height
            },
            offsetParent: el.offsetParent ? 'visible' : 'hidden',
            boundingRect: el.getBoundingClientRect()
        }));
    });

    console.log('\n=== AGE GATE / MODAL / CONSENT ELEMENTS ===');
    console.log(JSON.stringify(ageGateElements, null, 2));

    // Check cookies
    const cookies = await context.cookies();
    console.log('\n=== COOKIES ===');
    console.log(JSON.stringify(cookies, null, 2));

    // Check localStorage
    const localStorage = await page.evaluate(() => {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }
        return data;
    });
    console.log('\n=== LOCALSTORAGE ===');
    console.log(JSON.stringify(localStorage, null, 2));

    // Check sessionStorage
    const sessionStorage = await page.evaluate(() => {
        const data = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data[key] = sessionStorage.getItem(key);
        }
        return data;
    });
    console.log('\n=== SESSIONSTORAGE ===');
    console.log(JSON.stringify(sessionStorage, null, 2));

    // Look for specific age gate patterns
    const ageGatePatterns = await page.evaluate(() => {
        const results = {
            buttonsWithAgeGate: [],
            elementsWithAgeVerified: [],
            forms: [],
            iframes: [],
            shadowHosts: []
        };

        // Buttons with age gate related attributes
        document.querySelectorAll('button').forEach(btn => {
            if (btn.getAttribute('data-agegate') ||
                btn.textContent.toLowerCase().includes('18') ||
                btn.textContent.toLowerCase().includes('enter') ||
                btn.textContent.toLowerCase().includes('accept') ||
                btn.textContent.toLowerCase().includes('agree') ||
                btn.textContent.toLowerCase().includes('confirm') ||
                btn.textContent.toLowerCase().includes('verify') ||
                btn.textContent.toLowerCase().includes('تایید') ||
                btn.textContent.toLowerCase().includes('ورود') ||
                btn.textContent.toLowerCase().includes('ثبت')) {
                results.buttonsWithAgeGate.push({
                    id: btn.id,
                    className: btn.className,
                    text: btn.textContent.trim(),
                    dataAgegate: btn.getAttribute('data-agegate'),
                    ariaLabel: btn.getAttribute('aria-label')
                });
            }
        });

        // Elements referencing age_verified
        document.querySelectorAll('*').forEach(el => {
            const html = el.outerHTML;
            if (html.includes('age_verified') || html.includes('age-gate') || html.includes('agegate')) {
                results.elementsWithAgeVerified.push({
                    tag: el.tagName,
                    id: el.id,
                    className: el.className,
                    outerHTML: html.substring(0, 500)
                });
            }
        });

        // Forms
        document.querySelectorAll('form').forEach(form => {
            results.forms.push({
                id: form.id,
                className: form.className,
                action: form.action,
                method: form.method,
                innerHTML: form.innerHTML.substring(0, 500)
            });
        });

        // Iframes
        document.querySelectorAll('iframe').forEach(iframe => {
            results.iframes.push({
                id: iframe.id,
                className: iframe.className,
                src: iframe.src,
                name: iframe.name
            });
        });

        // Shadow DOM hosts
        document.querySelectorAll('*').forEach(el => {
            if (el.shadowRoot) {
                results.shadowHosts.push({
                    tag: el.tagName,
                    id: el.id,
                    className: el.className,
                    shadowRootInnerHTML: el.shadowRoot.innerHTML?.substring(0, 500)
                });
            }
        });

        return results;
    });

    console.log('\n=== AGE GATE PATTERNS ===');
    console.log(JSON.stringify(ageGatePatterns, null, 2));

    // Save all research data
    const researchData = {
        timestamp: new Date().toISOString(),
        url: page.url(),
        buttons,
        ageGateElements,
        cookies,
        localStorage,
        sessionStorage,
        ageGatePatterns,
        requests: requests.slice(0, 100)
    };

    fs.writeFileSync('research/pornhub-research-data.json', JSON.stringify(researchData, null, 2));
    console.log('\n=== Research data saved to research/pornhub-research-data.json ===');

    // Now try with age_verified cookie pre-set
    console.log('\n=== Testing with age_verified cookie ===');
    await context.addCookies([{ name: 'age_verified', value: '1', domain: '.pornhub.com', path: '/' }]);
    await page.reload({ waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'research/pornhub-with-cookie.png', fullPage: true });

    const buttonsWithCookie = await page.evaluate(() => {
        const btns = document.querySelectorAll('button, a[role="button"], input[type="button"], input[type="submit"]');
        return Array.from(btns).map(btn => ({
            tag: btn.tagName,
            id: btn.id,
            className: btn.className,
            textContent: btn.textContent?.trim().substring(0, 100),
            offsetParent: btn.offsetParent ? 'visible' : 'hidden'
        }));
    });
    console.log('\n=== BUTTONS WITH COOKIE ===');
    console.log(JSON.stringify(buttonsWithCookie, null, 2));

    const ageGateWithCookie = await page.evaluate(() => {
        const elements = document.querySelectorAll('[class*="age"], [id*="age"], [class*="gate"], [id*="gate"], [class*="modal"], [class*="overlay"]');
        return Array.from(elements).map(el => ({
            tag: el.tagName,
            id: el.id,
            className: el.className,
            textContent: el.textContent?.trim().substring(0, 200),
            computedStyle: {
                position: getComputedStyle(el).position,
                zIndex: getComputedStyle(el).zIndex,
                display: getComputedStyle(el).display,
                visibility: getComputedStyle(el).visibility
            },
            offsetParent: el.offsetParent ? 'visible' : 'hidden'
        }));
    });
    console.log('\n=== AGE GATE ELEMENTS WITH COOKIE ===');
    console.log(JSON.stringify(ageGateWithCookie, null, 2));

    await browser.close();
}

research().catch(console.error);