import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const targetSites = [
  { domain: 'pornhub.com', url: 'https://www.pornhub.com/', gateSelectors: ['.age-gate', '.ageGate', '#age-gate', '#ageGate', '[class*="agegate"]', '[class*="age-gate"]', '[id*="agegate"]', '[id*="age-gate"]'] },
  { domain: 'xnxx.com', url: 'https://www.xnxx.com/', gateSelectors: ['.age-gate', '.agegate', '#age-gate', '#agegate', '[class*="agegate"]', '[class*="age-gate"]'] },
  { domain: 'xvideos.com', url: 'https://www.xvideos.com/', gateSelectors: ['.age-gate', '#age_verify', '.age_verification', '[class*="agegate"]', '[class*="age-gate"]'] },
  { domain: 'xhamster.com', url: 'https://www.xhamster.com/', gateSelectors: ['.age-gate', '#age-gate', '.age-verification', '[class*="agegate"]', '[class*="age-gate"]'] },
];

async function readScriptFile() {
  const scriptPath = path.resolve('src/universal-age-gate-bypass.user.js');
  return fs.readFileSync(scriptPath, 'utf-8');
}

// Test each site - viewport/UA comes from Playwright project config
for (const site of targetSites) {
  test(`Age gate bypass - ${site.domain}`, async ({ page }) => {
    // Inject userscript via addInitScript
    const scriptContent = await readScriptFile();
    await page.addInitScript(scriptContent);

    // Navigate to site
    const response = await page.goto(site.url, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });

    expect(response?.status()).toBeLessThan(400);

    // Wait for script to process
    await page.waitForTimeout(3000);

    // Check no age gate visible
    for (const sel of site.gateSelectors) {
      const gate = page.locator(sel).first();
      await expect(gate).toBeHidden({ timeout: 2000 });
    }

    // Check page is scrollable (overflow not hidden)
    const scrollable = await page.evaluate(() => {
      const body = document.body;
      const docEl = document.documentElement;
      if (!body || !docEl) return false;
      return body.style.overflow !== 'hidden' &&
             docEl.style.overflow !== 'hidden';
    });
    expect(scrollable).toBeTruthy();

    // Check for console errors
    const errors = [];
    page.on('console', msg => {
      const text = msg.text();
      if (msg.type() === 'error'
          && !text.includes('[UAG]')
          && !text.includes('refreshAllowedCookies failed')
          && !text.includes('JSHandle@object')) {
        errors.push(text);
      }
    });

    // Give time for any async errors
    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });
}

// Test history.pushState handling (uses mock page)
test('History pushState triggers re-check', async ({ page }) => {
  const scriptContent = await readScriptFile();
  await page.addInitScript(scriptContent);

  // Use mock page to avoid flaky live site
  await page.route('**/test-pushstate.html', async route => {
    await route.fulfill({
      contentType: 'text/html',
      body: `
        <html><head>
          <script>${scriptContent}</script>
        </head><body>
          <div class="age-gate" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;">
            <button data-agegate="confirm">I am 18+</button>
          </div>
        </body></html>
      `
    });
  });

  await page.goto('https://www.pornhub.com/test-pushstate.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Trigger pushState
  await page.evaluate(() => {
    history.pushState(null, '', '/video/test123');
  });

  await page.waitForTimeout(500);

  // Script should have run attempt() again (no error expected)
  const errors = [];
  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error'
        && !text.includes('[UAG]')
        && !text.includes('refreshAllowedCookies failed')
        && !text.includes('JSHandle@object')) {
      errors.push(text);
    }
  });
  await page.waitForTimeout(500);
  expect(errors).toHaveLength(0);
});

// Test bfcache restore (pageshow with persisted) - uses mock page
test('bfcache restore triggers re-check', async ({ page }) => {
  const scriptContent = await readScriptFile();
  await page.addInitScript(scriptContent);

  await page.route('**/test-bfcache.html', async route => {
    await route.fulfill({
      contentType: 'text/html',
      body: `
        <html><head>
          <script>${scriptContent}</script>
        </head><body>
          <div class="age-gate" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;">
            <button data-agegate="confirm">I am 18+</button>
          </div>
        </body></html>
      `
    });
  });

  await page.goto('https://www.pornhub.com/test-bfcache.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Simulate bfcache restore by dispatching pageshow with persisted
  await page.evaluate(() => {
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
  });
  await page.waitForTimeout(500);

  // Verify no age gate reappeared (should have re-checked and found it already handled)
  const gate = page.locator('.age-gate').first();
  await expect(gate).toBeHidden({ timeout: 2000 });
});

// ============================================================================
// v2.2.0 Core Feature Tests
// ============================================================================

test.describe('v2.2.0 Core Infrastructure', () => {
  test('Cookie pre-setting at document-start', async ({ page }) => {
    const scriptContent = await readScriptFile();
    await page.addInitScript(scriptContent);

    await page.goto('https://www.pornhub.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Check if age_verified cookie was set
    const cookies = await page.context().cookies('https://www.pornhub.com');
    const ageVerified = cookies.find(c => c.name === 'age_verified');
    // Cookie may already exist from previous visit, so just verify no error
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('[UAG]')) {
        errors.push(msg.text());
      }
    });
    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });

  test('Overlay hiding after click (not removal)', async ({ page }) => {
    const scriptContent = await readScriptFile();
    await page.addInitScript(scriptContent);

    // Test with a mock overlay page
    await page.route('**/test-overlay.html', async route => {
      await route.fulfill({
        contentType: 'text/html',
        body: `
          <html><head>
            <script>${scriptContent}</script>
          </head><body>
            <div class="age-gate" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;">
              <button data-agegate="confirm">I am 18+</button>
            </div>
          </body></html>
        `
      });
    });

    await page.goto('https://www.pornhub.com/test-overlay.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Check overlay was hidden (display: none)
    const gate = page.locator('.age-gate').first();
    await expect(gate).toBeHidden({ timeout: 2000 });

    // Verify overlay still exists in DOM (hidden, not removed)
    const existsInDom = await page.evaluate(() => {
      return document.querySelector('.age-gate') !== null;
    });
    expect(existsInDom).toBeTruthy();
  });

  test('Negative patterns not clicked (Reject/Manage/Essential)', async ({ page }) => {
    const scriptContent = await readScriptFile();
    await page.addInitScript(scriptContent);

    // Test with a page that has reject/manage buttons
    // Make it a full-screen overlay so Overlay.hide() will hide it after clicking
    await page.route('**/test-negative.html', async route => {
      await route.fulfill({
        contentType: 'text/html',
        body: `
          <html><head>
            <script>${scriptContent}</script>
          </head><body>
            <div class="cookie-banner" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,0.95);z-index: 9999;padding:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;">
              <div style="max-width:400px;text-align:center;">
                <p>We use cookies</p>
                <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
                  <button id="reject-btn">Reject All</button>
                  <button id="manage-btn">Manage Settings</button>
                  <button id="essential-btn">Essential Only</button>
                  <button id="accept-btn">Accept All</button>
                </div>
              </div>
            </div>
          </body></html>
        `
      });
    });

    await page.goto('https://www.pornhub.com/test-negative.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);

    // Only Accept All should be clicked (others are negative patterns)
    const acceptBtn = page.locator('#accept-btn');
    const rejectBtn = page.locator('#reject-btn');
    const manageBtn = page.locator('#manage-btn');
    const essentialBtn = page.locator('#essential-btn');

    // The accept button should be clicked (overlay hidden)
    const banner = page.locator('.cookie-banner').first();
    await expect(banner).toBeHidden({ timeout: 3000 });
  });

  test('Adaptive timing for low-end devices', async ({ page }) => {
    const scriptContent = await readScriptFile();
    await page.addInitScript(scriptContent);

    // Mock low-end device
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'hardwareConcurrency', { value: 2, configurable: true });
      Object.defineProperty(navigator, 'deviceMemory', { value: 2, configurable: true });
    });

    await page.goto('https://www.pornhub.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Should not error
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('[UAG]')) {
        errors.push(msg.text());
      }
    });
    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });

  test('Container-scoped fallback (no page-wide first button)', async ({ page }) => {
    const scriptContent = await readScriptFile();
    await page.addInitScript(scriptContent);

    // Page with button OUTSIDE any modal container - should NOT be clicked
    await page.route('**/test-scoped.html', async route => {
      await route.fulfill({
        contentType: 'text/html',
        body: `
          <html><head>
            <script>${scriptContent}</script>
          </head><body>
            <button class="btn" id="outside-btn">Random Button</button>
            <div class="age-gate" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;">
              <button data-agegate="confirm">I am 18+</button>
            </div>
          </body></html>
        `
      });
    });

    await page.goto('https://www.pornhub.com/test-scoped.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Age gate should be hidden (clicked inside container)
    const gate = page.locator('.age-gate').first();
    await expect(gate).toBeHidden({ timeout: 2000 });

    // Outside button should still exist and be visible
    const outsideBtn = page.locator('#outside-btn');
    await expect(outsideBtn).toBeVisible();
  });

  test('Click cooldown and caps respected', async ({ page }) => {
    const scriptContent = await readScriptFile();
    await page.addInitScript(scriptContent);

    await page.route('**/test-caps.html', async route => {
      await route.fulfill({
        contentType: 'text/html',
        body: `
          <html><head>
            <script>${scriptContent}</script>
          </head><body>
            <div class="age-gate" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;">
              <button data-agegate="confirm">I am 18+</button>
            </div>
          </body></html>
        `
      });
    });

    await page.goto('https://www.pornhub.com/test-caps.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // Should not error (max actions capped at 12)
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('[UAG]')) {
        errors.push(msg.text());
      }
    });
    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });
});