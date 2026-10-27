import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { registerTestHooks } from '../utils/testHooks.js';

registerTestHooks(test);

test('Sup_LOGIN_002 - Verify login with valid credentials @smoke', async ({ loginPage }) => {
  const email = process.env.SUPPLYOPS_EMAIL;
  const password = process.env.SUPPLYOPS_PASSWORD;
  test.skip(!email || !password, 'SUPPLYOPS_EMAIL and SUPPLYOPS_PASSWORD must be configured in .env');

  await test.step('Open SupplyOps login page', async () => {
    await loginPage.openApplication();
    await expect(loginPage.page).toHaveURL(/supplyops\.io/);
  });

  await test.step('Authenticate and verify successful login', async () => {
    await loginPage.login(email, password);
    await expect(loginPage.logoutButton).toBeVisible();
  });
});
