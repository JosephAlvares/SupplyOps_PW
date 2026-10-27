
import { test as base, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage.js";
import { LandingPage } from "../pages/LandingPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { AddItemPage } from "../pages/AddItemPage.js";
import { KioskPage } from "../pages/KioskPage.js";
import { PricingPage } from "../pages/PricingPage.js";

export const test = base.extend({

 
  
page: async ({ browser }, use) => {

  console.log("FIXTURE SETUP: Creating browser context");

  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("FIXTURE SETUP: New page created");

  // Give the page to the test
  await use(page);

  // Runs after the test finishes
  console.log("FIXTURE TEARDOWN: Closing browser context");

  await context.close();

  console.log("FIXTURE TEARDOWN: Browser context closed");
},


  
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  addItemPage: async ({ page }, use) => {
    await use(new AddItemPage(page));
  },

  kioskPage: async ({ page }, use) => {
    await use(new KioskPage(page));
  },

  pricingPage: async ({ page }, use) => {
    await use(new PricingPage(page));
  },

  
  // Authenticated page fixture
  authenticatedPage: async ({ page, loginPage }, use) => {
    const email = process.env.SUPPLYOPS_EMAIL;
    const password = process.env.SUPPLYOPS_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "Check SUPPLYOPS_EMAIL and SUPPLYOPS_PASSWORD in your .env file."
      );
    }

    await loginPage.openApplication();

    // Login only if the user is not already authenticated
    if (!(await loginPage.isLoggedIn())) {
      await loginPage.login(email, password);
    }

    await expect(loginPage.logoutButton).toBeVisible();

    // Provide the logged-in page to the test
    await use(page);
  },


});

export { expect };
