
import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { registerTestHooks } from '../utils/testHooks.js';

registerTestHooks(test);

test(
  'Sup_INT_012 - Verify stock update appears in Activity @integration',
  async ({ authenticatedPage, landingPage, inventoryPage }) => {
    test.setTimeout(60000);

    const itemName = 'Playwright Item 1792664524804';

    let stockBefore;
    let stockAfter;

    // STEP 1: Open Inventory and locate the existing item
    await test.step('Open Inventory and locate the existing item', async () => {
      console.log('Current URL:', authenticatedPage.url());

      await landingPage.openInventory();

      console.log('Inventory navigation clicked successfully.');

      await inventoryPage.searchItem(itemName);

      const itemCard = inventoryPage.itemCard(itemName);

      await expect(itemCard).toBeVisible();

      const stockText = await itemCard.innerText();
      console.log('Item details before stock update:', stockText);

      const stockMatch = stockText.match(/(\d+)\s*\/\s*(\d+)\s*Pieces/);

      expect(
        stockMatch,
        'Unable to read the current stock quantity from the item card'
      ).not.toBeNull();

      stockBefore = Number(stockMatch[1]);
      stockAfter = stockBefore + 2;

      console.log('Stock before update:', stockBefore);
      console.log('Expected stock after update:', stockAfter);
    });

    // STEP 2: Update stock and verify the new quantity
    await test.step('Add two pieces and verify the updated stock', async () => {
      await inventoryPage.clickItemCard(itemName);

      await expect(inventoryPage.addStockButton).toBeVisible();

      await inventoryPage.addStock(2);

      await expect(inventoryPage.addStockButton).toBeHidden();

      const updatedItemCard = inventoryPage.itemCard(itemName);

      await expect(updatedItemCard).toContainText(
        `${stockAfter} / ${stockAfter} Pieces`
      );

      console.log('PASS: Stock updated successfully.');
    });

    // STEP 3: Navigate to Activity
    await test.step('Navigate to Activity', async () => {
      console.log('URL before Activity:', authenticatedPage.url());

      await authenticatedPage.screenshot({
        path: 'activity-navigation-debug.png',
        fullPage: true
      });

      await landingPage.openActivity();

      await expect(
        authenticatedPage.getByRole('heading', {
          name: 'Activity Dashboard',
          exact: true
        })
      ).toBeVisible();

      console.log('PASS: Activity Dashboard opened successfully.');
    });

    // STEP 4: Verify the restock transaction
    await test.step(
      'Verify the restock transaction appears in Activity',
      async () => {
        const restockTable = authenticatedPage
          .locator('table')
          .filter({ hasText: 'Restocked By' });

        const restockRow = restockTable
          .locator('tr')
          .filter({ hasText: itemName })
          .filter({ hasText: '2 Pieces' });

        await expect(restockRow.first()).toBeVisible();

        console.log(
          `PASS: Restock transaction for "${itemName}" is visible in Activity.`
        );
      }
    );
  }
);
