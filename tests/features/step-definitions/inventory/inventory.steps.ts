import { When, Then } from '@cucumber/cucumber';

When('the user selects the {string} icon in the footer', async function (socialMediaOption: string) {
    await this.inventoryPage.selectSocialMediaOption(socialMediaOption);
});

When('the user selects {string} from the product sort dropdown', async function (filterOption: string) {
    await this.inventoryPage.selectFilterOption(filterOption);
});

Then('the user should be redirected to expected {string} url in a new tab', async function (socialMediaOption: string) {
    await this.inventoryPage.verifySocialMediaRedirect(socialMediaOption);
});

Then('the inventory items should be ordered by price from {string}', async function (filterOption: string) {
    await this.inventoryPage.verifyInventoryItemsOrder(filterOption);
});
