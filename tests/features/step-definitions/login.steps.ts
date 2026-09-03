import { Given, When, Then, Before } from '@cucumber/cucumber';
//Al inicializar las páginas dentro del hook Before y guardarlas en this, en el archivo login.steps.ts no hace falta importar LoginPage
import { LoginPage } from '../../pages/loginPage';
import { InventoryPage } from '../../pages/inventoryPage';

Given('the user is on the Swag Labs login page', async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigateToUrl();
  await loginPage.verifyInitialLoginButtonState();
  await loginPage.verifyPageTitle();
});

When('the user enters {string} in the email field', async function (email: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.enterEmail(email);
});

When('the user enters {string} in the password field', async function (password: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.enterPassword(password);
});

When('the user selects the {string} button', async function (buttonName: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.verifyInitialLoginButtonState();
  await loginPage.selectButton(buttonName);
});

Then('the user should be redirected to the Inventory page', async function () {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.navigateToInventoryPage();
  //await this.page.pause();
});
