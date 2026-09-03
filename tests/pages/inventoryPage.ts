import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    
    //Atributtes
    readonly page: Page; 

    constructor(page: Page) {
        this.page = page;
    }
    
    //Navigations
    async navigateToInventoryPage() {
        await expect(this.page, 'The URL does not match the one in the inventory').toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(this.page, 'The inventory page does not have the expected title').toHaveTitle('Swag Labs');
    }

    //Actions

    //Assertions
}
