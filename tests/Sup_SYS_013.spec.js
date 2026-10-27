import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { registerTestHooks } from '../utils/testHooks.js';

registerTestHooks(test);

test('Sup_SYS_013 - Verify Pricing module navigation and pricing information @system', async ({ authenticatedPage, landingPage, pricingPage }) => {
  await test.step('Open Pricing and verify its heading', async () => {
    await pricingPage.openPricing();
    await pricingPage.verifyPricingLoaded();
    await expect(pricingPage.pricingHeading).toBeVisible();
  });

  await test.step('Verify Pricing content is present', async () => {
    const pageText = await authenticatedPage.locator('body').innerText();
    expect(pageText.trim().length).toBeGreaterThan(0);
  });

  await test.step('Navigate to Dashboard and return to Pricing', async () => {
    await landingPage.openDashboard();
    await expect(landingPage.dashboardButton).toHaveClass(/active/);
    await pricingPage.openPricing();
    await pricingPage.verifyPricingLoaded();
    await expect(pricingPage.pricingHeading).toBeVisible();
  });
});
