import { Page, Locator, expect } from '@playwright/test';
import { BrowserUtils } from '../utils/browserUtils';
import { SOCIAL_MEDIA_URL } from '../constants/footerLinks';
import { URLS } from '../constants/urls';

export class InventoryPage {
    
    //Atributtes
    readonly page: Page; 
    readonly twitterIcon: Locator;
    readonly facebookIcon: Locator;
    readonly linkedinIcon: Locator;
    readonly menuButton: Locator;
    readonly logoutButton: Locator; 
    readonly inventoryItem: Locator; 
    readonly filterDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.twitterIcon = this.page.getByTestId('social-x');
        this.facebookIcon = this.page.getByTestId('social-facebook');
        this.linkedinIcon = this.page.getByTestId('social-linkedin');
        this.menuButton = this.page.locator('#react-burger-menu-btn');
        this.logoutButton = this.page.getByTestId('logout-sidebar-link');
        this.inventoryItem = this.page.getByTestId('inventory-item');
        this.filterDropdown = this.page.getByTestId('product-sort-container');
    }
    
    //Navigations

    //Actions
    async selectSocialMediaOption(socialMediaOption: string) {
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

    async selectFilterOption(filterOption: string) {
        await this.filterDropdown.selectOption({ label: filterOption });
    }

    async getInventoryItems(): Promise<{ name: string; price: string }[]> {
        try {
            return await this.inventoryItem.evaluateAll(items => {
                return items.map(item => {
                    const name = item.querySelector('[data-test="inventory-item-description"] a')?.textContent?.trim() || '';
                    const rawPrice = item.querySelector('[data-test="inventory-item-description"] [data-test="inventory-item-price"]')?.textContent || '';
                    const price = rawPrice.replace('$', '').trim();
                    
                    return { name, price };
                });
            });
        } catch (error) {
            throw new Error(`The inventory-item element did not appear on the current page.`);
        }
    }

    async selectMenuButton() {
        await expect(this.menuButton, 'The menu button is not visible').toBeVisible();
        await this.menuButton.click();
    }

    async logoutSession() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

    //Assertions
    async verifyInventoryPageIsDisplayed() {
        await expect(this.page, 'The URL does not match the one in the inventory').toHaveURL(URLS.INVENTORY);
        await expect(this.page, 'The inventory page does not have the expected title').toHaveTitle('Swag Labs');
    }

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

    async verifyInventoryItemsOrder(filterOption: string) {
        const isAscending = this.getFilterOption(filterOption);
        const items = await this.getInventoryItems(); 

        const isOrderCorrect = items.every((item, index) => {
            if (index === items.length - 1) return true;
            
            const currentPrice = parseFloat(item.price);
            const nextPrice = parseFloat(items[index + 1].price);
            
            return isAscending ? currentPrice <= nextPrice : currentPrice >= nextPrice;
        });
        await expect(isOrderCorrect, `The inventory items are not sorted correctly for the filter option: ${filterOption}`).toBe(true);
    }

    async verifyAccessibilityOnInventoryPage() {
        await BrowserUtils.checkPageAccessibility(this.page);
    }
    

    //Private functions
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

    private getFilterOption(filterOption: string):boolean {
        switch (filterOption) {
            case 'Price (low to high)':
                return true;
            case 'Price (high to low)':
                return false;
            default:
                throw new Error(`The filter option is not registered`);
        }
    }
}
