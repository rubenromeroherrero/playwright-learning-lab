import { Page, Locator, expect } from '@playwright/test';
import { ERROR_MESSAGES } from './constants/errorMessages';

export class LoginPage {

    //Atributtes
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator; 
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
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

    async verifyErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage, `The error message for ${expectedMessage} is not visible`).toBeVisible();
        await expect(this.errorMessage, `The error message for ${expectedMessage} is not the expected`).toHaveText(this.checkErrorMessageValue(expectedMessage));
    }

    //Private functions
    private checkErrorMessageValue(expectedMessage: string): string {
        switch (expectedMessage) {
            case 'locked out user':
                return ERROR_MESSAGES.LOCKED_OUT_USER;
            case 'wrong user':
            case 'wrong password':
            case 'wrong user and password':
                return ERROR_MESSAGES.INVALID_CREDENTIALS;
            default:
                throw new Error(`Unknown error`);
        }
    }
}
