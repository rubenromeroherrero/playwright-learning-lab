import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { ChromiumBrowser, Page, chromium } from '@playwright/test';

let browser: ChromiumBrowser;
let page: Page;

// Dado que Cucumber controlará la ejecución en lugar del runner de Playwright, debemos abrir y cerrar el navegador manualmente en un archivo de soporte.
// Se ejecuta una sola vez antes de todas las pruebas
BeforeAll(async () => {
  browser = await chromium.launch({ headless: false }); // Cambia a true en CI/CD
});

// Se ejecuta antes de CADA escenario
Before(async function () {
  const context = await browser.newContext();
  this.page = await context.newPage(); // Guardamos 'page' en el contexto de Cucumber (this)
});

// Se ejecuta después de CADA escenario
After(async function (scenario) {
  // Tomar captura de pantalla si el escenario falla
  if (scenario.result?.status === Status.FAILED) {
    const image = await this.page.screenshot();
    await this.attach(image, 'image/png');
  }
  await this.page.close();
});

// Se ejecuta una sola vez al terminar todas las pruebas
AfterAll(async () => {
  await browser.close();
});