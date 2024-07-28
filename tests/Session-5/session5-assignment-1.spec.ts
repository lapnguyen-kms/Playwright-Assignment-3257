import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('Verify locked out user error message', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  const errorMessage = await loginPage.getErrorMessage();
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});