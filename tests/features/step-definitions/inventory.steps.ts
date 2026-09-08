import { Given, When, Then, Before } from '@cucumber/cucumber';

Given('the {string} is logged into the Swag Labs', async function (email: string) {
    await this.pageManager.loginPage.navigateToUrl();
    await this.pageManager.loginPage.enterEmail(email); 
    await this.pageManager.loginPage.enterPassword('generic password');
    await this.pageManager.loginPage.selectLoginButton();
});

When('the user selects the {string} icon in the footer', async function (socialMediaOption: string) {
    await this.pageManager.inventoryPage.selectSocialMediaOption(socialMediaOption);
    //await this.page.pause();
});

Then('the user should be redirected to expected {string} url in a new tab', async function (socialMediaOption: string) {
    await this.pageManager.inventoryPage.verifySocialMediaRedirect(socialMediaOption);
    //await this.page.pause();
});
