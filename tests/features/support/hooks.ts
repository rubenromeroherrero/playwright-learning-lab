import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, chromium, firefox, webkit, selectors } from '@playwright/test';
import config from '../../../playwright.config';
import { CustomWorld } from './custom-world';

// Configura el timeout global para todos los pasos (ejemplo: 8 segundos)
setDefaultTimeout(8 * 1000);
setWorldConstructor(CustomWorld);

let browser: Browser;
declare const process: any;

// Dado que Cucumber controlará la ejecución en lugar del runner de Playwright, debemos abrir y cerrar el navegador manualmente en un archivo de soporte.
// Se ejecuta una sola vez antes de todas las pruebas
BeforeAll(async () => {
  // Configura el atributo global para getByTestId
  selectors.setTestIdAttribute(config.use?.testIdAttribute || 'data-test');

  const browserType = process.env.BROWSER || 'chromium';
  // Cambia a true el headless en CI/CD
  const headless = process.env.CI ? true : false;

  switch (browserType.toLowerCase()) {
    case 'firefox':
      browser = await firefox.launch({ headless });
      break;
    case 'webkit':
      browser = await webkit.launch({ headless });
      break;
    default:
      browser = await chromium.launch({ headless });
      break;
  }
});

// Se ejecuta antes de CADA escenario
Before(async function () {
  await this.init(browser, config.use?.baseURL);
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
