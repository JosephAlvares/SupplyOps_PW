
import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { LoginPage } from '../pages/LoginPage.js';
import { registerTestHooks } from '../utils/testHooks.js';

registerTestHooks(test);

test(
  'Sup_LOGIN_002 - Verify login with valid credentials @smoke',
  async ({ guestPage }) => {
    const email = process.env.SUPPLYOPS_EMAIL;
    const password = process.env.SUPPLYOPS_PASSWORD;

    test.skip(
      !email || !password,
      'SUPPLYOPS_EMAIL and SUPPLYOPS_PASSWORD must be configured in .env'
    );

    // Create the POM using the unauthenticated page fixture.
    const loginPage = new LoginPage(guestPage);

    await test.step('Open SupplyOps application', async () => {
      await loginPage.openApplication();

      await expect(loginPage.page).toHaveURL(/supplyops\.io/);

      console.log('SupplyOps application opened successfully.');
    });

    await test.step('Check and clear existing authentication if necessary', async () => {
      if (await loginPage.isLoggedIn()) {
        console.log(
          'Existing authenticated session detected. Logging out first.'
        );

        await loginPage.logoutButton.click();

        // Confirm the application returns to its logged-out state.
        await expect(loginPage.loginButton).toBeVisible({
          timeout: 15000,
        });

        console.log('Logged out successfully.');
      } else {
        await expect(loginPage.loginButton).toBeVisible({
          timeout: 15000,
        });

        console.log('Unauthenticated state verified.');
      }
    });

    await test.step('Authenticate and verify successful login', async () => {
      await loginPage.login(email, password);

      await expect(loginPage.logoutButton).toBeVisible({
        timeout: 20000,
      });

      console.log('PASS: Login with valid credentials successful.');
    });
  }
);
