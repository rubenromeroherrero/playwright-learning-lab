import { test, expect } from '@playwright/test';

/* Selectores más robustos para QA
  // getByTestId > Añadir en código el data-testid
    // Se configura en el fichero playwright.config.ts (en el caso de que usen otro nombre que no sea data-testid)
    // En el objeto de "use" poner el nombre que vaya a usarse > testIdAttribute: 'pw-id'
  
  // Filtrar por texto en elementos iguales
    await page.getByRole('listitem')
      .filter({ hasText: 'Playstation 5' })
      .getByRole('button', { name: 'Add to cart' })
      .click();
    
  // Filtrar por otro locator en elementos iguales, pero con un hijo dentro del elemento principal
    await page.getByRole('listitem')
      .filter({has: page.getByRole('heading',{name: 'Xbox Series X'})})
      .getByRole('button', {name: 'Add to cart'})
      .click();

  // Hacer click sobre elemento visible, y descartar un posible display: none.
    page.locator('button').locator('visible=true').click();

  // Filtrar por elementos de una lista
    page.getByLocator('listitem')
      .filter({ hasText: 'banana' }).click();
    page.getByLocator('listitem').nth(0);
    page.getByLocator('listitem').first();
    page.getByLocator('listitem').last();
});
*/

test.describe('Navegación en Free Range Testers Sandbox', () => {
  // Se ejecuta una sola vez antes de comenzar las acciones
  test.beforeEach(async ({ page }) => {
    await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
  });

  test('Análisis de locators en playwright', async ({ page }) => {
    await test.step('Locator getByRole', async () => {
      await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();
    });

    await test.step('Locator getByText', async () => {
      // exact: true > Nos permite indicar que sea exactamente solo ese literal, sin ambigüedades
      await expect(page.getByText('Este es un ejemplo de Shadow DOM para practicar automation testing.', { exact: true })).toBeVisible();
    });

    await test.step('Locator getByXpath', async () => {
      //Intentar evitar xpath
      await page.locator('xpath=/html/body/div/div/div[3]/div/form/div[1]/input').click();
      await page.locator('xpath=/html/body/div/div/div[3]/div/form/div[1]/input').fill('Pruebas');
    });
  });
});

test.describe('Navegación en FreeRangeTesters.com', () => {
  // Se ejecuta una sola vez antes de comenzar las acciones
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.freerangetesters.com/');
  });

  test('Análisis de locators en playwright', async ({ page }) => {
    // Se encontrará en imágenes como texto alternativo de accesibilidad
    await test.step('Locator getByAltText', async () => {
      await expect(page.getByAltText('Un bicho entre corchetes, manos trabajando en una laptop, un café y un celular')).toBeVisible();
    });
  });
});

test.describe('Navegación al login de Free Range Testers Sandbox', () => {
  // Se ejecuta una sola vez antes de comenzar las acciones
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.freerangetesters.com/account/sessions/new');
  });

  test('Análisis de locators en playwright', async ({ page }) => {
    await test.step('Locator getByLabel', async () => {
      // Se encontrará en formularios
      await expect(page.getByLabel('Email')).toBeVisible();
    });

    await test.step('Locator getByPlaceholder', async () => {
      // Se encontrará en formularios como input placeholder
      await expect(page.getByPlaceholder('Tu correo electrónico')).toBeVisible();
      await expect(page.getByLabel('Email')).toHaveAttribute('placeholder', 'Tu correo electrónico');
      await page.getByPlaceholder('Tu correo electrónico').fill('jhon@gmail.com');
      await expect(page.getByPlaceholder('Tu correo electrónico')).toHaveValue('jhon@gmail.com');
    });
  });
});
