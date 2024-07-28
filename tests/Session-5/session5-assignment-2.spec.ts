// tests/e2e.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPageStandard } from '../../pages/loginstandard.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { ConfirmationPage } from '../../pages/confirmation.page';

test('Verify user can order product successfully', async ({ page }) => {
  const loginPage = new LoginPageStandard(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const confirmationPage = new ConfirmationPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.validateProductsTitle();

  await inventoryPage.addItemToCart();

  await inventoryPage.goToCart();

  await cartPage.validateCartItemVisible();

  await cartPage.clickCheckout();
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  await checkoutPage.clickContinue();

  await checkoutPage.validateItemInCheckout();

  await confirmationPage.clickFinish();
  await confirmationPage.validateThankYouMessage();

  const thankYouText = await page.textContent('.complete-header');
  expect(thankYouText).toBe('Thank you for your order!');
  const dispatchText = await page.textContent('.complete-text');
  expect(dispatchText).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});
