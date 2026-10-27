
class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.loginButton = page.getByRole("button", { name: "Log In" });

    this.emailField = page.locator("#authEmail_input");
    this.passwordField = page.locator("#authPassword_input");
    this.submitButton = page.locator("#authSubmit");

    this.logoutButton = page.getByRole("button", {name: "Log Out"});
  }

  async openApplication() {
    await this.page.goto("https://supplyops.io/");
  }

  async login(email, password) {
    await this.loginButton.click();
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.submitButton.click();

    await this.logoutButton.waitFor({
      state: "visible",
      timeout: 15000
    });
  }

  async isLoggedIn() {
    return await this.logoutButton.isVisible();
  }
}

export { LoginPage };
