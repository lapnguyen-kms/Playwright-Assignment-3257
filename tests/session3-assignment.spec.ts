import { test, expect } from '@playwright/test'
import { execPath } from 'process';

//Test case 1
test('TC001 - Verify Checkboxes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Checkboxes' }).click();
    await expect(page.getByRole('heading', { name: 'Checkboxes' })).toBeVisible();

    const checkbox1 = await page.$('#checkboxes input:nth-child(1)');
    if (!(await checkbox1.isChecked())) {
        await checkbox1.check();
    }
    expect(await checkbox1.isChecked()).toBe(true); 

    const checkbox2 = await page.$('#checkboxes input:nth-child(3)');
    if (await checkbox2.isChecked()) {
        await checkbox2.uncheck();
    }
    expect(await checkbox2.isChecked()).toBe(false);    
})

//Test case 2
test('TC002 - Verify Drag and Drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Drag and Drop' }).click();

    const source = page.locator('#column-a');
    const target = page.locator('#column-b');

    await source.dragTo(target);

    const newColumnAHeader = await source.textContent();
    const newColumnBHeader = await target.textContent();
    
    expect(newColumnAHeader).toBe('B'); 
    expect(newColumnBHeader).toBe('A'); 
})

//Test case 3
test('TC003 - Verify Dropdown', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Dropdown' }).click();
    await expect(page.getByRole('heading', { name: 'Dropdown List' })).toBeVisible(); 

    await page.selectOption('#dropdown', { label: 'Option 2' });
    let selectedValue = await page.$eval('#dropdown', dropdown => (dropdown as HTMLSelectElement).value);
    expect(selectedValue).toBe('2');

    await page.selectOption('#dropdown', { index: 1 });
    selectedValue = await page.$eval('#dropdown', dropdown => (dropdown as HTMLSelectElement).value);
    expect(selectedValue).toBe('1');
    
    await page.selectOption('#dropdown', { value: '2' });
    selectedValue = await page.$eval('#dropdown', dropdown => (dropdown as HTMLSelectElement).value);
    expect(selectedValue).toBe('2');
})

//Test case 4
test('TC005 - Verify Frames', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'WYSIWYG Editor' }).click();
    await expect(page.getByRole('heading', { name: 'An iFrame containing the TinyMCE WYSIWYG Editor' })).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.frameLocator('iframe[title="Rich Text Area"]').getByText('Your content goes here.')).toBeVisible();
})

//Test case 5
test('TC005 - Verify Upload file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'File Upload' }).click();
    await expect(page.getByRole('heading', { name: 'File Uploader' })).toBeVisible();
    await page.locator('#file-upload').click();
    await page.locator('#file-upload').setInputFiles('/Users/lapnguyen/Documents/TS/tests/Screenshot 2024-03-07 at 11.41.53 AM.png');
    await page.getByRole('button', { name: 'Upload' }).click();
    await expect(page.getByText('Screenshot 2024-03-07 at 11.')).toBeVisible();   
})

//Test case 6
test('TC006 - Verify Dynamically Loaded Page Elements', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Dynamic Loading' }).click();
    await expect(page.getByRole('heading', { name: 'Dynamically Loaded Page Elements' })).toBeVisible();
    await page.getByRole('link', { name: 'Example 1: Element on page that is hidden' }).click();
    await expect(page.getByRole('heading', { name: 'Dynamically Loaded Page Elements' })).toBeVisible();
    await page.getByRole('button', { name: 'Start'} ).click();

    const message = page.locator('#finish');
    await message.waitFor({state: "visible"});
    await expect(message).toHaveText("Hello World!");
})

//Test case 7
test('TC007 - Verify input', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await expect(page.getByRole('heading', { name: 'Automation Testing Practice' })).toBeVisible();

    const inputName = await page.locator('#name');
    const nameValue = 'Nguyen A';
    await inputName.fill(nameValue);
    expect(await inputName.inputValue()).toBe(nameValue);

    const inputAddress = await page.getByLabel('Address:');
    const addressValue = '02 Tan Vien';
    await inputAddress.fill(addressValue);
    expect(await inputAddress.inputValue()).toBe(addressValue);

    await inputName.clear();
    expect(await inputName.inputValue()).toBe('');

    await inputAddress.clear();
    expect(await inputAddress.inputValue()).toBe('');
})

//Test case 8
test('TC008 - Verify prompt dialog', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await expect(page.getByRole('heading', { name: 'Automation Testing Practice' })).toBeVisible();
    
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe('Please enter your name:');
        expect(dialog.defaultValue()).toBe('Harry Potter');
        await dialog.accept();
        
        expect(page.locator('#demo')).toHaveText('Hello Lap! How are you today?');
      });
})