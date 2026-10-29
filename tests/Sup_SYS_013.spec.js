
import { test, expect } from "../fixtures/SupplyOpsFixture.js";
import { registerTestHooks } from "../utils/testHooks.js";

registerTestHooks(test);

test(
  "Sup_SYS_013 - Verify Pricing module navigation and pricing information @system",
  async ({ authenticatedPage, landingPage, pricingPage }) => {

    await test.step("Open Pricing and verify pricing information", async () => {
      await pricingPage.openPricing();

      await expect(pricingPage.pricingView).toBeVisible();
      console.log("PASS: Pricing module opened.");
    });

    await test.step("Navigate to Dashboard and return to Pricing", async () => {
      await landingPage.openDashboard();

      await expect(landingPage.dashboardButton).toBeVisible();

      // Confirm the Dashboard view is visible before returning.
      await expect(
        authenticatedPage.locator("#view-dashboard")
      ).toBeVisible();

      await pricingPage.openPricing();

      await expect(pricingPage.pricingView).toBeVisible();
      await expect(pricingPage.pricingContent).toContainText("$29");

      console.log("PASS: Dashboard-to-Pricing navigation verified.");
    });
  }
);
