import { Then } from '@cucumber/cucumber';

Then('the Login page should not have any automatically detectable accessibility violations', async function () {
    await this.pageManager.loginPage.verifyAccessibilityOnLoginPage();
});
