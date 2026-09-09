import { Then } from '@cucumber/cucumber';

Then('the login page should not have any automatically detectable accessibility violations', async function () {
    await this.pageManager.loginPage.verifyAccessibilityOnLoginPage();
});
