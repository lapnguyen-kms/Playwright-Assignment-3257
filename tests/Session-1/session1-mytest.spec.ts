import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/');
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await page.getByRole('heading', { name: 'Samsung galaxy s6' }).click();
  await page.getByRole('heading', { name: '$360 *includes tax' }).click();
  await page.getByText('Product description').click();
  await page.getByText('The Samsung Galaxy S6 is').click();
});