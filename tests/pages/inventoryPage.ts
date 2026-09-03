import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    
    //Atributtes
    readonly page: Page; 

    constructor(page: Page) {
        this.page = page;
    }
    
    //Navigations
    async navigateToInventoryPage() {
        await expect(this.page, 'La URL no pertenece a la del inventario').toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(this.page, 'La página del inventario no tiene el título esperado').toHaveTitle('Swag Labs');
    }

    //Actions

    //Assertions
}
