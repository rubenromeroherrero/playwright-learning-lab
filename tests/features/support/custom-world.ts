import { World, IWorldOptions } from '@cucumber/cucumber';
import { Page, Browser } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { InventoryPage } from '../../pages/inventory';

export class CustomWorld extends World {
  page!: Page;
  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(browser: Browser, baseURL?: string) {
    const context = await browser.newContext({ baseURL });
    this.page = await context.newPage();

    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
  }
}
