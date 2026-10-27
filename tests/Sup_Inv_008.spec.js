import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { registerTestHooks } from '../utils/testHooks.js';

registerTestHooks(test);

test('Sup_INV_008 - Search for an existing demo inventory item @smoke', async ({ authenticatedPage, landingPage, inventoryPage }) => {
  const itemName = 'dish soap 1792741742081';

  await test.step('Open Inventory and search for the demo item', async () => {
    await landingPage.openInventory();
    await inventoryPage.searchItem(itemName);
  });

  await test.step('Verify exactly one matching item is displayed', async () => {
    const matchingItem = inventoryPage.itemCard(itemName);
    await expect(matchingItem).toHaveCount(1);
    await expect(matchingItem).toBeVisible();
  });
});
