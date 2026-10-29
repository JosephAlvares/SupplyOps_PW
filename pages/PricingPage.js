
import { expect } from "@playwright/test";

class PricingPage {
  constructor(page) {
    this.page = page;

    this.pricingNavigation = page.locator(
      'button[data-view="pricing"]'
    );

    this.pricingView = page.locator("#view-pricing");

    this.pricingHeading = this.pricingView.getByRole("heading", {
      name: "Simple, honest pricing.",
      exact: true,
    });

    this.pricingContent = this.pricingView.locator(".plan-price");

    this.dashboardNavigation = page.locator(
      'button[data-view="dashboard"]'
    );
  }

  async openPricing() {
    await expect(this.pricingNavigation).toBeVisible();

    // Click only when Pricing is not already the visible view.
    if (!(await this.pricingView.isVisible())) {
      await this.pricingNavigation.click();
    }

    await expect(this.pricingView).toBeVisible({
      timeout: 10000,
    });

    await this.verifyPricingLoaded();
  }

  async verifyPricingLoaded() {
    await expect(this.pricingHeading).toBeVisible();

    await expect(this.pricingContent).toBeVisible();

    await expect(this.pricingContent).toContainText("$29");

    await expect(this.pricingContent.locator("small")).toHaveText(
      "/month"
    );

    console.log("PASS: Pricing heading and $29/month verified.");
  }
}

export { PricingPage };
