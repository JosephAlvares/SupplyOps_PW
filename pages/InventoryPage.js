
class InventoryPage {
  constructor(page) {
    this.page = page;

    this.inventorySearchTxtField = page.locator("#invSearch");
    this.addItemButton = page.locator("#addItemBtn");
    this.itemNameTextField = page.locator("input#itemName");
    this.categoryDropdown = page.locator("#itemCategory");
    this.unitDropdown = page.locator("#itemUnit");
    this.startingQuantityTF = page.locator("#itemStarting");
    this.currentQuantityTF = page.locator("#itemCurrent");
    this.priceperunitTF = page.locator("#itemPrice");
    this.saveItemButton = page.locator("#itemSave");

    this.stockQuantityField = page.locator(
      'input[type="number"]:visible'
    );
    this.addStockButton = page.getByRole("button", {
      name: "Add Stock",
      exact: true
    });
  }

  async searchItem(itemName) {
    await this.inventorySearchTxtField.fill(itemName);
  }

  itemCard(itemName) {
    const escapedName = itemName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return this.page.locator(".inv-card").filter({
      has: this.page.locator(".nm", {
        hasText: new RegExp(`^${escapedName}$`)
      })
    });
  }

  async clickItemCard(itemName) {
    await this.itemCard(itemName).click();
  }

  async addStock(quantity) {
    await this.stockQuantityField.fill(String(quantity));
    await this.addStockButton.click();
  }
}

export { InventoryPage };
