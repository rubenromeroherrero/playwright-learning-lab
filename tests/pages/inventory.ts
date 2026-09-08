import { Page, Locator, expect } from '@playwright/test';
import { SOCIAL_MEDIA_URL } from '../constants/footerLinks';
import { BrowserUtils } from '../utils/browserUtils';

export class InventoryPage {
    
    //Atributtes
    readonly page: Page; 
    readonly twitterIcon: Locator;
    readonly facebookIcon: Locator;
    readonly linkedinIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.twitterIcon = this.page.getByTestId('social-twitter');
        this.facebookIcon = this.page.getByTestId('social-facebook');
        this.linkedinIcon = this.page.getByTestId('social-linkedin');
    }
    
    //Navigations
    async navigateToInventoryPage() {
        await expect(this.page, 'The URL does not match the one in the inventory').toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(this.page, 'The inventory page does not have the expected title').toHaveTitle('Swag Labs');
    }

    //Actions
    async selectSocialMediaOption(socialMediaOption: string) {
        await this.selectTypeOfSocialMedia(socialMediaOption);
    }

    //Assertions
    async verifySocialMediaRedirect(socialMediaOption: string) {
        const expectedUrl = this.getExpectedSocialMediaUrl(socialMediaOption);

        await BrowserUtils.verifyUrlInNewTab(
            this.page,
            async () => {
                await this.selectSocialMediaOption(socialMediaOption);
            },
            expectedUrl
        );
    }

    //Private functions
    private async selectTypeOfSocialMedia(socialMediaOption: string) {
        switch (socialMediaOption) {
            case 'Twitter':
                await this.twitterIcon.click();
                break;
            case 'Facebook':
                await this.facebookIcon.click();
                break;
            case 'LinkedIn':
                await this.linkedinIcon.click();
                break; 
            default:
                throw new Error(`The social media is not registered`);
        }
    }

    private getExpectedSocialMediaUrl(socialMediaOption: string):string {
        switch (socialMediaOption) {
            case 'Twitter':
                return SOCIAL_MEDIA_URL.TWITTER;
            case 'Facebook':
                return SOCIAL_MEDIA_URL.FACEBOOK;
            case 'LinkedIn':
                return SOCIAL_MEDIA_URL.LINKEDIN;
            default:
                throw new Error(`The social media URL is not registered`);
        }
    }
}
