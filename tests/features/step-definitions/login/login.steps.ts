import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/customWorld';

Given('the user is on the Swag Labs login page', async function (this: CustomWorld) {
  await this.pageManager.loginPage.navigateToUrl();
  await this.pageManager.loginPage.verifyLoginPageIsDisplayed();
});

Given('the {string} is logged into the Swag Labs', async function (this: CustomWorld, username: string) {
    await this.pageManager.loginPage.navigateToUrl();
    await this.pageManager.loginPage.login(username, 'generic password');
});

When('the user enters {string} in the username field', async function (this: CustomWorld, username: string) {
  await this.pageManager.loginPage.enterUsername(username);
});

When('the user enters {string} in the password field', async function (this: CustomWorld, password: string) {
  await this.pageManager.loginPage.enterPassword(password);
});

When('the user selects the {string} button', async function (this: CustomWorld, buttonName: string) {
  await this.pageManager.loginPage.verifyInitialLoginButtonState();
  await this.pageManager.loginPage.selectButton(buttonName);
});

When('the user logs out from the side menu', async function (this: CustomWorld) {
    await this.pageManager.inventoryPage.logoutSession();
});

Then('the user should be redirected to the Inventory page', async function (this: CustomWorld) {
  await this.pageManager.inventoryPage.verifyInventoryPageIsDisplayed();
});

Then('an error message for {string} should be displayed', async function (this: CustomWorld, expectedMessage: string) {
  await this.pageManager.loginPage.verifyErrorMessage(expectedMessage);
});

Then('the user should be redirected to the login page', async function (this: CustomWorld) {
    await this.pageManager.loginPage.verifyLoginPageIsDisplayed();
});
