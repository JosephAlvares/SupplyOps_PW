import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { registerTestHooks } from '../utils/testHooks.js';
import addItem from '../testdata/additem.json' with { type: 'json' };

registerTestHooks(test);

test('Sup_INT_010 - Verify Inventory item creation and integration with the Inventory listing @integration', async ({ authenticatedPage, landingPage, inventoryPage, addItemPage }) => {
  const itemName = `${addItem.item} INT ${Date.now()}`;

  await test.step('Navigate to Inventory and open the add-item form', async () => {
    await landingPage.openInventory();
    await landingPage.openAddItemForm();
    await expect(addItemPage.itemNameTF).toBeVisible();
  });

  await test.step('Create an inventory item using JSON test data', async () => {
    await addItemPage.enterItemName(itemName);
    await addItemPage.selectCategory(addItem.category);
    await addItemPage.selectUnit(addItem.unit);
    await addItemPage.enterStartingQuantity(addItem.startingQuantity);
    await addItemPage.enterCurrentQuantity(addItem.currentQuantity);
    await addItemPage.enterPricePerUnit(addItem.pricePerUnit);
    await expect(addItemPage.itemNameTF).toHaveValue(itemName);
    await addItemPage.saveItem();
  });

  await test.step('Verify the created item appears in the Inventory listing', async () => {
    await inventoryPage.searchItem(itemName);
    const card = inventoryPage.itemCard(itemName);
    await expect(card).toHaveCount(1);
    await expect(card).toBeVisible();
    await expect(card).toContainText(addItem.category);
  });

  console.log(`PASS: Created and verified inventory item: ${itemName}`);
});
