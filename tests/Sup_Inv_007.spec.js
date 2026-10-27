import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { registerTestHooks } from '../utils/testHooks.js';

registerTestHooks(test);

test('Sup_Inv_007 - Verify inventory search with a non-existent item name @smoke', async ({ authenticatedPage, landingPage, inventoryPage }) => {
  const nonexistentItem = `PW_NoSuchItem_${Date.now()}`;

  await test.step('Open Inventory and verify the search field', async () => {
    await landingPage.openInventory();
    await expect(inventoryPage.inventorySearchTxtField).toBeVisible();
  });

  await test.step('Search for an item that does not exist', async () => {
    await inventoryPage.searchItem(nonexistentItem);
    await expect(authenticatedPage.locator('.inv-card')).toHaveCount(0);
    await expect(authenticatedPage.getByText('0 items', { exact: true })).toBeVisible();
  });

  await test.step('Clear search and verify the field resets', async () => {
    await inventoryPage.inventorySearchTxtField.clear();
    await expect(inventoryPage.inventorySearchTxtField).toHaveValue('');
  });
});
