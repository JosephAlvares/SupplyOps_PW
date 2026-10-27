
class AddItemPage {
  constructor(page) {
    this.page = page;

    // Item details
    this.itemNameTF = page.locator("#itemName");
    this.categoryDropDown = page.locator("#itemCategory");
    this.categoryCustomTF = page.locator("#itemCategoryCustom");
    this.piecesDropDown = page.locator("#itemUnit");
    this.unitCustomTF = page.locator("#itemUnitCustom");

    // Quantity and price
    this.startingQuantityTF = page.locator("#itemStarting");
    this.currentQuantityTF = page.locator("#itemCurrent");
    this.pricePerUnitTF = page.locator("#itemPrice");

    // Other fields
    this.vendorTF = page.locator("#itemVendor");
    this.locationTF = page.locator("#itemLocation");

    // Form actions
    this.saveItemButton = page.locator("#itemSave");
    this.itemMessage = page.locator("#itemMsg");
  }

  async enterItemName(itemName) {
    await this.itemNameTF.fill(itemName);
  }

  async selectCategory(category) {
    await this.categoryDropDown.selectOption({ label: category });
  }

  async selectUnit(unit) {
    await this.piecesDropDown.selectOption({ label: unit });
  }

  async enterStartingQuantity(quantity) {
    await this.startingQuantityTF.fill(String(quantity));
  }

  async enterCurrentQuantity(quantity) {
    await this.currentQuantityTF.fill(String(quantity));
  }

  async enterPricePerUnit(price) {
    await this.pricePerUnitTF.fill(String(price));
  }

  async saveItem() {
    await this.saveItemButton.click();
  }
}

export { AddItemPage };
