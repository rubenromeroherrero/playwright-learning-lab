import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { ChromiumBrowser, Page, chromium, selectors } from '@playwright/test';
import config from '../../../playwright.config.ts';
import { PageManager } from '../../pages/pageManager';

// Configura el timeout global para todos los pasos (ejemplo: 20 segundos)
setDefaultTimeout(8 * 1000);

let browser: ChromiumBrowser;
let page: Page;
declare const process: any;

// Dado que Cucumber controlará la ejecución en lugar del runner de Playwright, debemos abrir y cerrar el navegador manualmente en un archivo de soporte.
// Se ejecuta una sola vez antes de todas las pruebas
BeforeAll(async () => {
  // Configura el atributo global para getByTestId
  selectors.setTestIdAttribute(config.use?.testIdAttribute || 'data-test');
  // Cambia a true el headless en CI/CD
  browser = await chromium.launch({ 
    headless: process.env.CI ? true : false 
  });
});

// Se ejecuta antes de CADA escenario
Before(async function () {
  //const context = await browser.newContext();
  const context = await browser.newContext({
    //Configurar la URL de pruebas
    baseURL: config.use?.baseURL
  });

  this.page = await context.newPage();
  // Inicializas el PageManager y lo guardas en this.pm
  this.pageManager = new PageManager(this.page);
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
