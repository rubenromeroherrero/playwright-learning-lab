import { Given, When, Then, Before } from '@cucumber/cucumber';

When('the user selects the {string} icon in the footer', async function (socialMediaOption: string) {
    await this.pageManager.inventoryPage.selectSocialMediaOption(socialMediaOption);
});

Then('the user should be redirected to expected {string} url in a new tab', async function (socialMediaOption: string) {
    await this.pageManager.inventoryPage.verifySocialMediaRedirect(socialMediaOption);
});
