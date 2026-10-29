
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

    const context = await browser.newContext({
      storageState: "playwright/.auth/user.json",
    });
    const page = await context.newPage();

    console.log("FIXTURE SETUP: New page created");

    // Give the page to the test
    await use(page);

    // Runs after the test finishes
    console.log("FIXTURE TEARDOWN: Closing browser context");

    await context.close();

    console.log("FIXTURE TEARDOWN: Browser context closed");
  },

  guestPage: async ({ browser }, use) => {
  console.log("GUEST FIXTURE: Creating unauthenticated context");

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await use(page);
  } finally {
    await context.close();
  }
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
    await page.goto("https://supplyops.io/");

    await expect(loginPage.logoutButton).toBeVisible({
      timeout: 10000,
    });

    console.log("Authenticated session loaded from storage state");

    await use(page);
  },



});

export { expect };
