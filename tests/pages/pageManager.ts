import { Page } from '@playwright/test';
import { LoginPage } from './loginPage';
import { InventoryPage } from './inventoryPage';

export class PageManager {
  private readonly page: Page;
  readonly loginPage: LoginPage;
  readonly inventoryPage: InventoryPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
  }
}
