
import { test, expect } from "@playwright/test";
import "dotenv/config";

test("Save authenticated session", async ({ page }) => {
  test.setTimeout(60000);

  await page.goto("https://supplyops.io/");

  const logoutButton = page.getByRole("button", {
    name: "Log Out"
  });

  // If already logged in, skip the login flow.
  if (!(await logoutButton.isVisible())) {
    // Open the login form from the landing page.
    await page.getByRole("button", {
      name: "Log In",
      exact: true
    }).click();

    const emailField = page.locator("#authEmail_input");
    const passwordField = page.locator("#authPassword_input");

    await expect(emailField).toBeVisible();
    await expect(passwordField).toBeVisible();

    const email = process.env.SUPPLYOPS_EMAIL;
    const password = process.env.SUPPLYOPS_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "Check SUPPLYOPS_EMAIL and SUPPLYOPS_PASSWORD in .env"
      );
    }

    await emailField.fill(email);
    await passwordField.fill(password);

    await page.locator("#authSubmit").click();

    await expect(logoutButton).toBeVisible({
      timeout: 20000
    });
  }

  // Save the authenticated browser state.
  await page.context().storageState({
    path: "playwright/.auth/user.json"
  });

  console.log("Authentication state saved successfully.");
});
