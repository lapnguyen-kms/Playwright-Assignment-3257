// pages/ConfirmationPage.ts
import { Page } from '@playwright/test';

export class ConfirmationPage {
  private page: Page;
  private finishButton = 'button[data-test="finish"]';
  private thankYouMessage = '.complete-header';
  private dispatchMessage = '.complete-text';

  constructor(page: Page) {
    this.page = page;
  }

  async clickFinish() {
    await this.page.click(this.finishButton);
  }

  async validateThankYouMessage() {
    await this.page.waitForSelector(this.thankYouMessage);
    await this.page.waitForSelector(this.dispatchMessage);
  }
}
