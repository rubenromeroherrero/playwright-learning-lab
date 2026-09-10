import { World } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { PageManager } from '../../pages/pageManager';

export class CustomWorld extends World {
  page!: Page;
  pageManager!: PageManager;
}
