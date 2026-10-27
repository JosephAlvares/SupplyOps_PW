import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { registerTestHooks } from '../utils/testHooks.js';

registerTestHooks(test);

test('Sup_INV_003 - Verify Inventory navigation @smoke', async ({ authenticatedPage, landingPage }) => {
  await test.step('Navigate to Inventory', async () => {
    await landingPage.openInventory();
  });

  await test.step('Verify Inventory actions are available', async () => {
    await expect(landingPage.addItemButton).toBeVisible();
    await expect(landingPage.inventoryButton).toHaveClass(/active/);
  });
});
