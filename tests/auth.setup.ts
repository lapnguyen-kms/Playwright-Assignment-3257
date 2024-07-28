import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup ('authenticate', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // await page.waitForURL('https://www.saucedemo.com/');
    // await expect(page.getByTitle('Products')).toBeVisible();

    await page.context().storageState({ path: authFile });

})
