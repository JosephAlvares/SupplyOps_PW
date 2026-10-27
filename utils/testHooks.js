/*
 * Shared lifecycle hooks for SupplyOps tests.
 * beforeEach: log the start and set a useful timeout.
 * afterEach: log result and attach a screenshot when a test fails.
 *
 * Authentication remains inside each spec for now so the existing scenarios
 * and login-specific test behavior are preserved.
 */
export function registerTestHooks(test) {
  test.beforeEach(async ({ page }, testInfo) => {
    page.setDefaultTimeout(15000);
    console.log(`START: ${testInfo.title}`);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = testInfo.outputPath("failure.png");
      try {
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await testInfo.attach("failure-screenshot", {
          path: screenshotPath,
          contentType: "image/png"
        });
      } catch (error) {
        console.log(`Could not capture failure screenshot: ${error.message}`);
      }
      console.log(`FAIL: ${testInfo.title}`);
    } else {
      console.log(`PASS: ${testInfo.title}`);
    }
  });
}
