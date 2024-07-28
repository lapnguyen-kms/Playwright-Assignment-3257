// pages/CartPage.ts
import { Page } from '@playwright/test';

export class CartPage {
  private page: Page;
  private cartItem = '.cart_item';
  private checkoutButton = 'button[data-test="checkout"]';

  constructor(page: Page) {
    this.page = page;
  }

  async validateCartItemVisible() {
    await this.page.waitForSelector(this.cartItem);
  }

  async clickCheckout() {
    await this.page.click(this.checkoutButton);
  }
}
