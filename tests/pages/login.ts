import { Page, Locator, expect } from '@playwright/test';
import { BrowserUtils } from '../utils/browserUtils';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { TYPE_OF_PASSWORDS, TYPE_OF_USERS } from '../constants/typeOfUsers';
import { URLS } from '../constants/urls';

export class LoginPage {

    //Atributtes
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator; 
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
    }

    //Navigations
    async navigateToUrl() {
        await this.page.goto('');
    }

    //Actions
    async enterUsername(username: string) {
        await expect(this.usernameInput, 'This username field is not editable').toBeEditable();
        await this.usernameInput.fill(this.selectTypeOfUser(username));
        await expect (this.usernameInput, 'The username field does not contain the entered value').toHaveValue(this.selectTypeOfUser(username))
    }

    async enterPassword(password: string) {
        await expect (this.passwordInput, 'This password field is not editable').toBeEditable();
        await this.passwordInput.fill(this.selectTypeOfPassword(password));
        await expect (this.passwordInput, 'The password field does not contain the entered value').toHaveValue(this.selectTypeOfPassword(password))
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.selectLoginButton();
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

    async verifyLoginPageIsDisplayed() {
        await expect(this.page, 'The title of the Sauce Labs website is not the expected').toHaveTitle('Swag Labs');
        await expect(this.page, 'The URL of login is not the expected').toHaveURL(URLS.BASE_URL);
    }

    async verifyInitialLoginButtonState() {
        await expect(this.loginButton, 'The button is disabled and should be enabled').toBeEnabled();
    }

    async verifyErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage, `The error message for ${expectedMessage} is not visible`).toBeVisible();
        await expect(this.errorMessage, `The error message for ${expectedMessage} is not the expected`).toHaveText(this.checkErrorMessageValue(expectedMessage));
    }

    async verifyAccessibilityOnLoginPage() {
        await BrowserUtils.checkPageAccessibility(this.page);
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

    private selectTypeOfUser(username: string): string {
        switch (username) {
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
