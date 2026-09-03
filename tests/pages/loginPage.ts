import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

    //Atributtes
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
    }

    //Navigations
    async navigateToUrl() {
        await this.page.goto('');
    }

    //Actions
    async enterEmail(email: string) {
        await expect (this.emailInput, 'This email field is not editable').toBeEditable();
        await this.emailInput.fill(email);
        await expect (this.emailInput, 'The email field does not contain the entered value').toHaveValue(email)
    }

    async enterPassword(password: string) {
        await expect (this.passwordInput, 'This password field is not editable').toBeEditable();
        await this.passwordInput.fill(password);
        await expect (this.passwordInput, 'The password field does not contain the entered value').toHaveValue(password)
    }

    async selectButton(nameOfButton: string) {
        if (nameOfButton === "Login") await this.loginButton.click() ?? '';
    }

    //Assertions
    async verifyPageTitle() {
        await expect(this.page, 'The title of the Sauce Labs website is not the expected').toHaveTitle('Swag Labs');
    }

    async verifyInitialLoginButtonState() {
        await expect(this.loginButton, 'The button is disabled and should be enabled').toBeEnabled();
    }
}
