import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { registerTestHooks } from '../utils/testHooks.js';

registerTestHooks(test);

test('Sup_DASH_004 - Verify Dashboard module opens @smoke', async ({ authenticatedPage, landingPage }) => {
  await test.step('Open Dashboard', async () => {
    await landingPage.openDashboard();
  });

  await test.step('Verify Dashboard navigation and page health', async () => {
    await expect(landingPage.dashboardButton).toBeVisible();
    await expect(landingPage.dashboardButton).toHaveClass(/active/);
    await expect(authenticatedPage.locator('body')).toBeVisible();
    await expect(authenticatedPage.getByText(/application error|something went wrong|internal server error/i)).toHaveCount(0);
  });
});
