import { Given, When, Then } from '@cucumber/cucumber';

Given('the user is on the Swag Labs login page', async function () {
  await this.loginPage.navigateToUrl();
  await this.loginPage.verifyLoginPageIsDisplayed();
});

Given('the {string} is logged into the Swag Labs', async function (username: string) {
    await this.loginPage.navigateToUrl();
    await this.loginPage.login(username, 'generic password');
});

When('the user enters {string} in the username field', async function (username: string) {
  await this.loginPage.enterUsername(username);
});

When('the user enters {string} in the password field', async function (password: string) {
  await this.loginPage.enterPassword(password);
});

When('the user selects the {string} button', async function (buttonName: string) {
  await this.loginPage.verifyInitialLoginButtonState();
  await this.loginPage.selectButton(buttonName);
});

When('the user logs out from the side menu', async function () {
    await this.inventoryPage.logoutSession();
});

Then('the user should be redirected to the Inventory page', async function () {
  await this.inventoryPage.verifyInventoryPageIsDisplayed();
});

Then('an error message for {string} should be displayed', async function (expectedMessage: string) {
  await this.loginPage.verifyErrorMessage(expectedMessage);
});

Then('the user should be redirected to the login page', async function () {
    await this.loginPage.verifyLoginPageIsDisplayed();
});
