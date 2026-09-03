import { test, Browser, Page, expect } from '@playwright/test';

(async () => {
    let browser: Browser;
    let page: Page;

    let dataInput = 'Hola estamos haciendo pruebas 😊';

    test.describe('Aserciones/Validaciones en el Automation Sandbox', () => {
        test('Aserciones de checkboxes', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('El usuario puede seleccionar y deseleccionar un checkbox', async () => {
                await page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }).check();
                await expect(page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }), 'El checkbox no estaba seleccionado').toBeChecked();
            })
            await test.step('El usuario puede seleccionar y deseleccionar un checkbox', async () => {
                await page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }).uncheck();
                await expect(page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }), 'El checkbox estaba seleccionado').not.toBeChecked();
            })
        })

        test('Aserciones de radio button', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('El usuario selecciona un radio button', async () => {
                await page.getByRole('radio', { name: 'Si' }).check();
                await expect(page.getByRole('radio', { name: 'Si' }), 'El radio button no está checkeado').toBeChecked();
            })
        })

        test('Aserciones con el botón ID dinámico', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('El usuario hace click en el botón ID dinámico y valida el texto mostrado', async () => {
                const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });
                await botonIDDinamico.click({ force: true });
                await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
            })
        })

        test('Aserciones en un campo de texto', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('El usuario rellena el campo de texto y valida su contenido', async () => {
                const inputText = page.getByRole('textbox', { name: 'Un aburrido texto' });
                await expect(inputText, 'El campo de texto no es editable').toBeEditable();
                await inputText.fill(dataInput);
                await expect(inputText, 'El campo de texto no tiene el texto introducido').toHaveValue(dataInput);
            })
        })

        test('Aserciones de un elemento de un listado o dropdown', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('El usuario selecciona un elemento del listado de deportes', async () => {
                //Obtener valores de un array > allInnerTexts()
                const expectedDropdownListValues = ['Seleccioná un deporte', 'Fútbol', 'Tennis', 'Basketball'];
                const dropdownList = await page.getByLabel('Dropdown').locator('option').allInnerTexts();
                expect(dropdownList, 'Los elementos del menú no son los definidos').toEqual(expectedDropdownListValues);
            })
        })

        test('Aserciones de la columna Nombres de la tabla estática', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
                /*
                const nombres = await page
                    .locator('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)')
                    .allInnerTexts();
                */
                const expectedColumnTableName = ['Messi', 'Ronaldo', 'Mbappe'];
                const idColumn = 2;
                const columnTableName = await page
                    .locator('div.col')
                    .filter({ has: page.locator('h2', { hasText: 'Tabla estática' }) })
                    .locator(`tbody tr td:nth-child(${idColumn})`)
                    .allInnerTexts();
                expect(columnTableName, 'Los elementos de la tabla no son los esperados').toEqual(expectedColumnTableName);
            })
        })

        test('Aserciones de la tabla dinámica', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));

                //Recargar la página
                await page.reload();

                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
            })
        })

        //Soft assertions expect.soft() > Te permiten validar e identificar campos de un formulario etc pero que no bloqueen el E2E del test.
        test('Ejemplo de las soft assertions', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
                await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
                    await expect.soft(page.getByText('Pizzau 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
                    await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
                    await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
                    await expect.soft(page.getByText('Helado 🍨'), 'No se encontró el elemento Helado 🍨').toBeVisible();
                    await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
                })
            })
        })

        test('Validando dentro de un popup', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Cuando hago click en el botón popup', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })

            await test.step('Puedo validar un elemento dentro del popup', async () => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();
            })

            /* Lógica para un popup nativo
            const popupPromise = page.waitForEvent('popup');
            await page.getByText('open the popup').click();
            const popup = await popupPromise;
            await popup.waitForLoadState();
            console.log(await popup.title());
            */
        })
    })
})();
