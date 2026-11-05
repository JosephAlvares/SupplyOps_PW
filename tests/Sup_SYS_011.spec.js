import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { registerTestHooks } from '../utils/testHooks.js';
import addItem from '../testdata/additem.json' with { type: 'json' };

registerTestHooks(test);

test('Sup_SYS_011 - Verify end-to-end inventory item creation, validation, and retrieval @system', async ({ authenticatedPage, landingPage, inventoryPage }) => {
  await test.step('Open the Add Item form', async () => {
    await landingPage.openInventory();
    await landingPage.openAddItemForm();
    await expect(inventoryPage.itemNameTextField).toBeVisible();
  });

  await test.step('Verify validation when item name is blank', async () => {
    await inventoryPage.itemNameTextField.fill('');
    await inventoryPage.categoryDropdown.selectOption({ label: addItem.category });
    await inventoryPage.unitDropdown.selectOption({ label: addItem.unit });
    await inventoryPage.startingQuantityTF.fill(addItem.startingQuantity);
    await inventoryPage.currentQuantityTF.fill(addItem.currentQuantity);
    await inventoryPage.priceperunitTF.fill(addItem.pricePerUnit);
    await inventoryPage.saveItemButton.click();
    await expect(authenticatedPage.getByText('Enter a name, a starting quantity above 0, and a current quantity.', { exact: true })).toBeVisible();
    await expect(inventoryPage.itemNameTextField).toHaveValue('');
  });

  const itemName = `System Test Item ${Date.now()}`;
  await test.step('Create a valid item and retrieve it from the listing', async () => {
    await inventoryPage.itemNameTextField.fill(itemName);
    await inventoryPage.categoryDropdown.selectOption({ label: addItem.category });
    await inventoryPage.unitDropdown.selectOption({ label: addItem.unit });
    await inventoryPage.startingQuantityTF.fill(addItem.startingQuantity);
    await inventoryPage.currentQuantityTF.fill(addItem.currentQuantity);
    await inventoryPage.priceperunitTF.fill(addItem.pricePerUnit);
    await inventoryPage.saveItemButton.click();
    await inventoryPage.searchItem(itemName);
    await expect(inventoryPage.itemCard(itemName)).toHaveCount(1);
    await expect(inventoryPage.itemCard(itemName)).toBeVisible();
  });
});
