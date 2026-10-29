
import { expect } from "@playwright/test";

class LoginPage {
  constructor(page) {
    this.page = page;

    this.loginButton = page.getByRole("button", {
      name: "Log In",
      exact: true,
    });

    this.emailField = page.locator("#authEmail_input");
    this.passwordField = page.locator("#authPassword_input");
    this.submitButton = page.locator("#authSubmit");

    this.logoutButton = page.getByRole("button", {
      name: "Log Out",
      exact: true,
    });
  }

  async openApplication() {
    await this.page.goto("https://supplyops.io/");
    await this.page.waitForLoadState("domcontentloaded");

    console.log("Current URL:", this.page.url());
    console.log("Page title:", await this.page.title());

    console.log(
      "Log In button count:",
      await this.page.getByRole("button", {
        name: "Log In",
        exact: true,
      }).count()
    );

    console.log(
      "Page content:",
      (await this.page.locator("body").innerText()).slice(0, 1500)
    );
  }

  async login(email, password) {
    await expect(this.loginButton).toBeVisible({
      timeout: 15000,
    });

    await this.loginButton.click();
    await expect(this.emailField).toBeVisible();
    await expect(this.passwordField).toBeVisible();

    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.submitButton.click();

    await expect(this.logoutButton).toBeVisible({
      timeout: 20000,
    });
  }

  async isLoggedIn() {
    return await this.logoutButton.isVisible();
  }
}

export { LoginPage };
