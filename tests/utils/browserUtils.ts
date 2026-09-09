import { Page, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

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

  /**
   * Analiza la accesibilidad de la página actual utilizando Axe Core.
   * @param page Instancia de la página de Playwright.
   * @param tags Etiquetas WCAG opcionales a validar (por defecto WCAG 2.0 y 2.1 A/AA).
  */
  static async checkPageAccessibility(
    page: Page,
    tags: string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
  ): Promise<void> {
    const scanResults = await new AxeBuilder({ page })
      .withTags(tags)
      .analyze();

    // Formateamos las violaciones para que la consola muestre un resumen limpio
    const violationsSummary = scanResults.violations.map(violation => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      nodes: violation.nodes.map(node => ({
        html: node.html,
        target: node.target,
        failureSummary: node.failureSummary
      }))
    }));

    expect(violationsSummary).toEqual([]);
  }
}
