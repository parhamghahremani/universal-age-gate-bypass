import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.pornhub.com',
    trace: 'on-first-retry',
    // proxy: {
    //   server: 'socks5://127.0.0.1:16890',
    // },
  },
  projects: [
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0',
      },
    },
    {
      name: 'Mobile Firefox (Pixel 5)',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 375, height: 812 },
        userAgent: 'Mozilla/5.0 (Android 14; Mobile; rv:130.0) Gecko/130.0 Firefox/130.0',
        isMobile: true,
      },
    },
    {
      name: 'Mobile Firefox (Galaxy S23)',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 412, height: 915 },
        userAgent: 'Mozilla/5.0 (Android 14; Mobile; rv:130.0) Gecko/130.0 Firefox/130.0',
        isMobile: true,
      },
    },
    {
      name: 'Mobile Firefox (Generic)',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 360, height: 780 },
        userAgent: 'Mozilla/5.0 (Android 14; Mobile; rv:130.0) Gecko/130.0 Firefox/130.0',
        isMobile: true,
      },
    },
  ],
  webServer: undefined,
  timeout: 60000,
});