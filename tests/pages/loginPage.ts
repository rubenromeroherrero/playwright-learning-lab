import { Page, Locator, expect } from '@playwright/test';
import { ERROR_MESSAGES } from './constants/errorMessages';
import { TYPE_OF_PASSWORDS, TYPE_OF_USERS } from './constants/typeOfUsers';

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
        await expect(this.emailInput, 'This email field is not editable').toBeEditable();
        await this.emailInput.fill(this.selectTypeOfUser(email));
        await expect (this.emailInput, 'The email field does not contain the entered value').toHaveValue(this.selectTypeOfUser(email))
    }

    async enterPassword(password: string) {
        await expect (this.passwordInput, 'This password field is not editable').toBeEditable();
        await this.passwordInput.fill(this.selectTypeOfPassword(password));
        await expect (this.passwordInput, 'The password field does not contain the entered value').toHaveValue(this.selectTypeOfPassword(password))
    }

    async selectButton(nameOfButton: string) {
        if (nameOfButton === "Login") await this.loginButton.click() ?? '';
    }

    async selectLoginButton() {
        await this.loginButton.click();
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
            case 'empty user':
                return ERROR_MESSAGES.REQUIRED_USERNAME;
            case 'empty password':
                return ERROR_MESSAGES.REQUIRED_PASSWORD;
            default:
                throw new Error(`The error message is not registered`);
        }
    }

    private selectTypeOfUser(email: string): string {
        switch (email) {
            case 'standard user':
                return TYPE_OF_USERS.STANDARD_USER;
            case 'performance user':
                return TYPE_OF_USERS.PERFORMANCE_USER;
            case 'visual user':
                return TYPE_OF_USERS.VISUAL_USER;
            case 'locked out user':
                return TYPE_OF_USERS.LOCKED_OUT_USER;
            case 'invalid user':
                return TYPE_OF_USERS.INVALID_USER;
            case 'wrong user':
                return TYPE_OF_USERS.WRONG_USER;
            case 'empty user':
                return TYPE_OF_USERS.EMPTY_USER;
            default:
                throw new Error(`The user is not registered`);
        }
    }

        private selectTypeOfPassword(password: string): string {
        switch (password) {
            case 'generic password':
                return TYPE_OF_PASSWORDS.GENERIC_PASSWORD;
            case 'wrong password':
                return TYPE_OF_PASSWORDS.WRONG_PASSWORD;
            case 'empty password':
                return TYPE_OF_PASSWORDS.EMPTY_PASSWORD;
            default:
                throw new Error(`The password is not registered`);
        }
    }
}
