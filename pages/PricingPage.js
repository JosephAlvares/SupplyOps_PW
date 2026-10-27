
class PricingPage {
  constructor(page) {
    this.page = page;

    this.pricingNavigation = page.locator('button[data-view="pricing"]');
    this.pricingHeading = page.getByRole("heading", {
      name: /pricing/i
    });
  }

  async openPricing() {
    await this.pricingNavigation.click();
  }

  async verifyPricingLoaded() {
    await this.pricingHeading.waitFor({
      state: "visible",
      timeout: 10000
    });
  }
}

export { PricingPage };
