import { test, expect } from '../fixtures/SupplyOpsFixture.js';
import { registerTestHooks } from '../utils/testHooks.js';

registerTestHooks(test);

test('Sup_Kiosk_009 - Verify Kiosk module opens and transaction workflow @integration', async ({ authenticatedPage, landingPage, kioskPage }) => {
  const itemName = 'dish soap 1792741742081';

  await test.step('Open Kiosk and verify the module heading', async () => {
    await landingPage.openKiosk();
    await expect(kioskPage.kioskHeading).toBeVisible();
  });

  await test.step('Navigate away and return to Kiosk', async () => {
    await landingPage.openActivity();
    await expect(authenticatedPage.getByRole('heading', { name: 'Activity Dashboard', exact: true })).toBeVisible();
    await landingPage.openKiosk();
    await expect(kioskPage.kioskHeading).toBeVisible();
  });

  await test.step('Select an item and open the transaction dialog', async () => {
    const itemCard = authenticatedPage.locator('.kiosk-tile').filter({
      has: authenticatedPage.locator('.nm', { hasText: itemName }),
    });
    await expect(itemCard).toHaveCount(1);
    await itemCard.click();

    const transactionHeading = authenticatedPage.getByText('How many did you take?', { exact: true });
    await expect(transactionHeading).toBeVisible();
    const transactionModal = transactionHeading.locator("xpath=ancestor::div[.//button[normalize-space()='Log It']][1]");
    await expect(transactionModal).toBeVisible();

    const quantityInput = transactionModal.locator('input').first();
    await quantityInput.fill('2');
    await expect(quantityInput).toHaveValue('2');

    const unitDropdown = transactionModal.locator('select').first();
    await unitDropdown.selectOption({ label: 'Bottles' });

    const logItButton = transactionModal.getByRole('button', { name: 'Log It', exact: true });
    await expect(logItButton).toBeEnabled();
    await logItButton.click();
    await expect(transactionHeading).toBeHidden();
  });
});
