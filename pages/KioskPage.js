
class KioskPage {
  constructor(page) {
    this.page = page;

    this.kioskHeading = page.getByRole("heading", {
      name: "Kiosk — Log what you took",
      exact: true
    });

    this.kioskContent = page.locator("body");

    this.kiosktile = page.locator(".inv-card:visible").filter({
      has: page.locator(".nm", {
        hasText: /^dish soap 1792741742081$/
      })
    });

    this.authcard = page.locator(".auth-card");
  }

  async verifyKioskOpened() {
    await this.kioskHeading.waitFor({
      state: "visible",
      timeout: 15000
    });
  }

  async clickItemTile() {
    await this.kiosktile.click();
  }
}

export { KioskPage };
