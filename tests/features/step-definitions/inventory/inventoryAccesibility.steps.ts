import { Then } from '@cucumber/cucumber';

Then('the Inventory page should not have any automatically detectable accessibility violations', async function () {
    await this.inventoryPage.verifyAccessibilityOnLoginPage();
});
