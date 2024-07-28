import { Page } from '@playwright/test';

export class CheckoutPage {
  private page: Page;
  private firstNameInput = '#first-name';
  private lastNameInput = '#last-name';
  private postalCodeInput = '#postal-code';
  private continueButton = 'input[data-test="continue"]';
  private itemName = '.inventory_item_name';

  constructor(page: Page) {
    this.page = page;
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async clickContinue() {
    await this.page.click(this.continueButton);
  }

  async validateItemInCheckout() {
    await this.page.waitForSelector(this.itemName);
  }
}
