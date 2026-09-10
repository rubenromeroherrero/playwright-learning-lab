import { Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/customWorld';

Then('the Login page should not have any automatically detectable accessibility violations', async function (this: CustomWorld) {
    await this.pageManager.loginPage.verifyAccessibilityOnLoginPage();
});
