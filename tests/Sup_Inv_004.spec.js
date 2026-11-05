import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { registerTestHooks } from '../utils/testHooks.js';
import testData from '../testdata/additem.json' with { type: 'json' };

registerTestHooks(test);

test('Sup_INV_004 - Create and verify inventory item @smoke', async ({ authenticatedPage, landingPage, inventoryPage, addItemPage }) => {
  const itemName = `${testData.item} ${Date.now()}`;

  await test.step('Open Inventory and the Add Item form', async () => {
    await landingPage.openInventory();
    await landingPage.openAddItemForm();
    await expect(addItemPage.itemNameTF).toBeVisible();
  });

  await test.step('Fill item details from JSON test data', async () => {
    await addItemPage.enterItemName(itemName);
    await addItemPage.selectCategory(testData.category);
    await addItemPage.selectUnit(testData.unit);
    await addItemPage.enterStartingQuantity(testData.startingQuantity);
    await addItemPage.enterCurrentQuantity(testData.currentQuantity);
    await addItemPage.enterPricePerUnit(testData.pricePerUnit);
    await expect(addItemPage.itemNameTF).toHaveValue(itemName);
    await expect(addItemPage.categoryDropDown).toHaveValue(testData.category);
    await expect(addItemPage.piecesDropDown).toHaveValue(testData.unit);
  });

  await test.step('Save the item and verify it in the listing', async () => {
    await addItemPage.saveItem();
    await inventoryPage.searchItem(itemName);
    const card = inventoryPage.itemCard(itemName);
    await expect(card).toHaveCount(1);
    await expect(card).toBeVisible();
    await expect(card.locator('.meta')).toContainText(testData.category);
    await expect(card.locator('.inv-card-foot')).toContainText(`${testData.currentQuantity} / ${testData.startingQuantity} ${testData.unit}`);
  });

  console.log(`PASS: Inventory item created and verified: ${itemName}`);
});
