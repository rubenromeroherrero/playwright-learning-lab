import { Page, expect } from '@playwright/test';

export class BrowserUtils {
  /*
   * Ejecuta una acción que abre una nueva pestaña, valida su URL y la cierra.
   * @param page Página actual de Playwright.
   * @param action Función asíncrona que desencadena la apertura de la nueva ventana (ej: hacer clic).
   * @param expectedUrl URL o expresión regular esperada.
  */
  static async verifyUrlInNewTab(
    page: Page,
    action: () => Promise<void>,
    expectedUrl: string
  ): Promise<void> {
    const pagePromise = page.context().waitForEvent('page');
    await action();
    
    const newPage = await pagePromise;
    await newPage.waitForLoadState('domcontentloaded');
    
    await expect(newPage).toHaveURL(new RegExp(expectedUrl));
    await newPage.close();
  }
}
