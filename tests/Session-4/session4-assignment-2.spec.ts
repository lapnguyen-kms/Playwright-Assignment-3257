import { test, expect } from '@playwright/test'

test.use({ storageState: 'playwright/.auth/user.json' });

test.beforeEach(async ({ page }) => {
    console.log('beforeEach: Start the page');
    await page.goto('https://www.saucedemo.com/inventory.html/');
})

//Testcase 1
test('TC001 - Verify sort by price', async ({ page }) => {
    const pageTitle = await page.locator('//*[@id="header_container"]/div[2]/span').textContent();
    expect(pageTitle).toBe('Products');

    await page.selectOption('.product_sort_container', { label: 'Price (low to high)' });

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const pricesNumber = prices.map(price => parseFloat(price.replace('$', '')));

    for (let i = 0; i < pricesNumber.length - 1; i++) {
        expect(pricesNumber[i]).toBeLessThanOrEqual(pricesNumber[i + 1]);
      }
  });

  //Testcase 2
  test('TC002 - Verify user can order product', async ({ page }) => {

    const pageTitle = await page.locator('//*[@id="header_container"]/div[2]/span').textContent();
    expect(pageTitle).toBe('Products');

    await page.click('.inventory_item:first-of-type .btn_inventory');
  
    const buttonText = await page.locator('.inventory_item:first-of-type .btn_inventory').textContent();
    expect(buttonText).toBe('Remove');
    
    const cartBadge = await page.locator('.shopping_cart_badge').textContent();
    expect(cartBadge).toBe('1');
    
    await page.click('.shopping_cart_link');
    
    const cartItem = await page.locator('.cart_item');
    expect(cartItem).toBeVisible();
    
    await page.click('#checkout');
    await page.fill('#first-name', 'Lap');
    await page.fill('#last-name', 'Nguyen');
    await page.fill('#postal-code', '3257');
    
    const firstName = await page.inputValue('#first-name');
    const lastName = await page.inputValue('#last-name');
    const postalCode = await page.inputValue('#postal-code');
    expect(firstName).toBe('Lap');
    expect(lastName).toBe('Nguyen');
    expect(postalCode).toBe('3257');
    
    await page.click('#continue');
    
    const checkoutItem = await page.locator('.cart_item');
    expect(checkoutItem).toBeVisible();
    
    await page.click('#finish');
    
    const thankYouMsg = await page.locator('.complete-header').textContent();
    const completeText = await page.locator('.complete-text').textContent();
    expect(thankYouMsg).toBe('Thank you for your order!');
    expect(completeText).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  

  }); 