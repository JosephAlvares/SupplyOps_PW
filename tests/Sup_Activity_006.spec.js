import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { registerTestHooks } from '../utils/testHooks.js';


registerTestHooks(test);

test('Sup_ACTIVITY_006 - Verify Activity module opens @smoke', async ({ authenticatedPage, landingPage }) => {
  await test.step('Navigate to Activity', async () => {
    await landingPage.openActivity();
  });

  await test.step('Verify Activity Dashboard is displayed', async () => {
    await expect(authenticatedPage.getByRole('heading', {
      name: 'Activity Dashboard', exact: true,
    })).toBeVisible();
  });
});
