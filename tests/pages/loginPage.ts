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
        await expect (this.emailInput, 'El campo no es editable').toBeEditable();
        await this.emailInput.fill(email);
        await expect (this.emailInput, 'El campo email no tiene el valor introducido').toHaveValue(email)
    }

    async enterPassword(password: string) {
        await expect (this.passwordInput, 'El campo no es editable').toBeEditable();
        await this.passwordInput.fill(password);
        await expect (this.passwordInput, 'El campo password no tiene el valor introducido').toHaveValue(password)
    }

    async selectButton(nameOfButton: string) {
        if (nameOfButton === "Login") await this.loginButton.click() ?? '';
    }

    //Assertions
    async verifyPageTitle() {
        await expect(this.page, 'El título de la web de Sauce Labs no es el esperado').toHaveTitle('Swag Labs');
    }

    async verifyInitialLoginButtonState() {
        await expect(this.loginButton, 'El botón está deshabilitado y debería estar habilitado').toBeEnabled();
    }
}
