
 // @ts-check
import "dotenv/config";
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for the SupplyOps automation framework.
 * Supports local execution and Jenkins CI execution.
 */
export default defineConfig({
  testDir: './tests',

  // Run test files in parallel where workers are available.
  fullyParallel: true,

  // Prevent accidental test.only usage in CI.
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI.
  retries: process.env.CI ? 2 : 0,

  // Use one worker in Jenkins CI; use the default locally.
  workers: process.env.CI ? 1 : undefined,

  // HTML report configuration.
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],
  ],

  // Shared settings for all browser projects.
  use: {
    // Collect a trace when a test fails on its first attempt.
    trace: 'on-first-retry',
  },

  // Browser projects.
 
projects: [
  {
    name: "setup",
    testMatch: /auth\.setup\.spec\.js/,
  },
  {
    name: "chromium",
    use: {
      ...devices["Desktop Chrome"],
      storageState: "playwright/.auth/user.json",
    },
    dependencies: ["setup"],
    testIgnore: /auth\.setup\.spec\.js/,
  },
],


  // Configure webServer here if the application needs to be started
  // automatically before running tests.
});
