import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user navigates to the Free Range Testers Sandbox', async function () {
  // Accedemos a 'page' desde el 'this' configurado en el hook
  await this.page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
});

When('the user types on the input field', async function () {
  await expect(this.page.getByPlaceholder('Ingresá texto')).toBeVisible();
  await (this.page.getByPlaceholder('Ingresá texto')).click();
  await (this.page.getByPlaceholder('Ingresá texto')).fill('Cristiano Ronaldo');
});

When('the field is filled in', async function () {
  await expect(this.page.getByPlaceholder('Ingresá texto')).toHaveValue('Cristiano Ronaldo');
});
