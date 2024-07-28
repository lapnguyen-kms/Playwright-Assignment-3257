import { Page } from '@playwright/test';

export class InventoryPage {
  private page: Page;
  private productsTitle = '.title';
  private firstItemAddToCartButton = 'button[data-test="add-to-cart-sauce-labs-backpack"]';
  private cartIcon = '.shopping_cart_link';

  constructor(page: Page) {
    this.page = page;
  }

  async validateProductsTitle() {
    await this.page.waitForSelector(this.productsTitle);
  }

  async addItemToCart() {
    await this.page.click(this.firstItemAddToCartButton);
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
  }
}
