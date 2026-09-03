import { test, Browser, Page, expect } from '@playwright/test';

(async () => {
    let browser: Browser;
    let page: Page;

    let dataInput = 'Hola estamos haciendo pruebas 😊';

    test.describe('Acciones en el Automation Sandbox', () => {
        test('Click en el botón ID dinámico', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('El usuario hace click en el botón ID dinámico', async () => {
                const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });
                await botonIDDinamico.click({ force: true });
                //await botonIDDinamico.dblclick();
                //await botonIDDinamico.click({ button: 'right' });
                //await botonIDDinamico.click({ button: 'shift' });
                //await botonIDDinamico.hover();
            })
        })
        
        test('Rellenar un campo de texto', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('El usuario rellena el campo de texto', async () => {
                const inputText = page.getByRole('textbox', { name: 'Un aburrido texto' });
                await inputText.fill(dataInput);
                //type > simula escritura
                //await inputText.type(dataInput);
                await inputText.press('Enter');
            })
        })
        
        test('Selección de checkboxes', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('El usuario selecciona un checkbox', async () => {
                await page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }).check();
                await page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }).uncheck();
            })
        })
        
        test('Selección de radio button', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('El usuario selecciona un radio button', async () => {
                await page.getByRole('radio', { name: 'Si' }).check();
            })
        })

        test('Selección de un elemento de un listado o dropdown', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('El usuario selecciona un elemento del listado de deportes', async () => {
                await page.getByLabel('Dropdown').selectOption('Fútbol');
            })
            await test.step('El usuario selecciona un elemento del listado de días de la semana', async () => {
                await page.getByRole('button', { name: 'Día de la semana' }).click();
                await page.getByRole('link', { name: 'Viernes' }).click();
            })
        })
    })
})();
