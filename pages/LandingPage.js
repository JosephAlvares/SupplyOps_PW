
class LandingPage {
  constructor(page) {
    this.page = page;

    // Navigation buttons identified from the actual SupplyOps DOM
    this.dashboardButton = page.locator('#navpills button[data-view="dashboard"]');
    this.inventoryButton = page.locator('#navpills button[data-view="inventory"]');
    this.kioskButton = page.locator('#navpills button[data-view="kiosk"]');
    this.scanButton = page.locator('#navpills button[data-view="scan"]');
    this.activityButton = page.locator('#navpills button[data-view="activity"]');
    this.overviewButton = page.locator('#navpills button[data-view="landing"]');
    this.intelligenceButton = page.locator('#navpills button[data-view="intelligence"]');
    this.pricingButton = page.locator('#navpills button[data-view="pricing"]');

    // Add Item may be inside the Inventory view rather than the main navigation
    this.addItemButton = page.getByRole('button', {
      name: 'Add Item',
      exact: true
    });
  }

  async openOverview() {
    await this.overviewButton.click();
  }

  async openDashboard() {
    await this.dashboardButton.click();
  }

  async openInventory() {
    await this.inventoryButton.click();
  }

  async openKiosk() {
    await this.kioskButton.click();
  }

  async openScan() {
    await this.scanButton.click();
  }

  async openActivity() {
    await this.activityButton.click();
  }

  async openIntelligence() {
    await this.intelligenceButton.click();
  }

  async openPricing() {
    await this.pricingButton.click();
  }

  async openAddItemForm() {
    await this.addItemButton.click();
  }
}

export { LandingPage };
