import { Given, When, Then, Before } from '@cucumber/cucumber';

Given('the user is on the Swag Labs login page', async function () {
  await this.pageManager.loginPage.navigateToUrl();
  await this.pageManager.loginPage.verifyInitialLoginButtonState();
  await this.pageManager.loginPage.verifyPageTitle();
});

When('the user enters {string} in the email field', async function (email: string) {
  await this.pageManager.loginPage.enterEmail(email);
});

When('the user enters {string} in the password field', async function (password: string) {
  await this.pageManager.loginPage.enterPassword(password);
});

When('the user selects the {string} button', async function (buttonName: string) {
  await this.pageManager.loginPage.verifyInitialLoginButtonState();
  await this.pageManager.loginPage.selectButton(buttonName);
});

Then('the user should be redirected to the Inventory page', async function () {
  await this.pageManager.inventoryPage.navigateToInventoryPage();
  //await this.page.pause();
});
