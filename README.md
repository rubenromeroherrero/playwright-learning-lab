# 🧪 Playwright Learning Lab

<p align="center">
  <img src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white" alt="Playwright" />
  <img src="https://img.shields.io/badge/Cucumber-23D96C?style=for-the-badge&logo=Cucumber&logoColor=white" alt="Cucumber" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
</p>

Repositorio práctico de laboratorio y aprendizaje dedicado a la automatización de pruebas end-to-end (E2E) con **Playwright**, **TypeScript** e integración **BDD (Behavior-Driven Development)** mediante **Cucumber**.

---

## 🎯 Objetivo del Repositorio

El propósito de este proyecto es servir como un espacio de práctica y referencia para:
- Aprender y experimentar con las funcionalidades fundamentales de **Playwright**.
- Implementar arquitecturas de automatización BDD utilizando **Cucumber (Gherkin)**.
- Resolver casos de uso reales de pruebas web (localizadores, acciones, aserciones y manejo de contextos).
- Integrar ejecuciones nativas de Playwright y ejecuciones basadas en escenarios BDD.

---

## 🛠️ Tecnologías e Herramientas

- **Core:** [Playwright Test](https://playwright.dev/)
- **Lenguaje:** TypeScript
- **Framework BDD:** `@cucumber/cucumber`
- **Runner TypeScript:** `tsx`
- **Reportes:** Playwright HTML Report & Cucumber HTML Reporter

---

## 📁 Estructura del Proyecto

```text
playwright-learning-lab/
├── tests/
│   ├── features/                # Escenarios BDD
│   │   ├── step-definitions/    # Definición de pasos (Gherkin -> TS)
│   │   ├── support/             # Hooks y gestión del navegador Playwright
│   │   └── *.feature            # Archivos de historias/escenarios Gherkin
│   ├── pages/                   # Page Object Models (POM)
│   └── *.spec.ts                # Pruebas nativas con Playwright Test Runner
├── cucumber.json                # Configuración del CLI de Cucumber
├── playwright.config.ts         # Configuración global de Playwright
└── package.json
````

##  ⚙️ Configuración Global de Playwright
En el archivo playwright.config.ts se han definido ajustes globales clave para agilizar el desarrollo de las pruebas:
- baseURL: Se define la URL base (https://www.saucedemo.com/) para poder utilizar rutas relativas (como await page.goto('/')) y evitar declararla manualmente en cada step o test.
- testIdAttribute: Se renombra el identificador de test por defecto de Playwright a data-test (testIdAttribute: 'data-test'), adaptándolo al atributo utilizado por el sitio web bajo prueba en lugar del estándar data-testid.
```text
// playwright.config.ts (extracto)
use: {
  baseURL: 'https://www.saucedemo.com',
  testIdAttribute: 'data-test',
}
````

##  🚀 Guía de Inicio Rápido
💻1. Requisitos Previos
- Node.js (versión 18 o superior)
- VS Code (recomendado, con las extensiones de Playwright y Cucumber)

⚙️2. Instalación de Dependencias
Requisitos Previos:
- Clona el repositorio e instala las dependencias del proyecto
```text
# Clonar el repositorio
git clone <URL_DE_TU_REPOSITORIO>

# Entrar a la carpeta del proyecto
cd playwright-learning-lab

# Instalar dependencias de Node
npm install

# Instalar los navegadores de Playwright
npx playwright install
````

ℹ️Nota: Si estás inicializando este proyecto desde cero, el comando inicial de Playwright fue:
```text
npm init playwright@latest
````
---

##  ⚙️ Configuración BDD (Playwright + Cucumber)
Para integrar Cucumber sobre el proyecto de Playwright se agregaron los paquetes @cucumber/cucumber y tsx. La ejecución se gestiona mediante el archivo cucumber.json:
```text
{
    "default": {
        "formatOptions": {
            "snippetInterface": "async-await"
        },
        "paths": [
            "tests/features/**/*.feature"
        ],
        "require": [
            "tests/features/step-definitions/**/*.ts",
            "tests/features/support/**/*.ts"
        ],
        "requireModule": [
            "tsx"
        ],
        "format": [
            "progress-bar",
            "html:reports/cucumber-report.html",
            "json:reports/cucumber-report.json"
        ]
    }
}
````

Por otro lado, se creó un fichero hooks.ts donde se gestionó: 
- El ciclo de vida del navegador
- La configuración del timeout global para los tests
- El seteo del atributo de los data-testid, por 'data-test'
```text
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { ChromiumBrowser, Page, chromium, selectors } from '@playwright/test';
import config from '../../../playwright.config.ts';

// Configura el timeout global para todos los pasos (ejemplo: 20 segundos)
setDefaultTimeout(8 * 1000);

let browser: ChromiumBrowser;
let page: Page;

// Dado que Cucumber controlará la ejecución en lugar del runner de Playwright, debemos abrir y cerrar el navegador manualmente en un archivo de soporte.
// Se ejecuta una sola vez antes de todas las pruebas
BeforeAll(async () => {
  // Configura el atributo global para getByTestId
  selectors.setTestIdAttribute(config.use?.testIdAttribute || 'data-test');
  browser = await chromium.launch({ headless: false }); // Cambia a true en CI/CD
});

// Se ejecuta antes de CADA escenario
Before(async function () {
  //const context = await browser.newContext();
  const context = await browser.newContext({
    //Configurar la URL de pruebas
    baseURL: config.use?.baseURL
  });
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

````

ℹ️ Extensión de VS Code
Para habilitar el salto de definiciones (Ctrl + Clic / F12) en los archivos .feature, añade lo siguiente a tu .vscode/settings.json:
```text
{
  "cucumber.features": ["tests/features/**/*.feature"],
  "cucumber.glue": ["tests/features/step-definitions/**/*.ts"]
}
````

##  🧪 Comandos de Ejecución
Pruebas Nativas de Playwright
```text
# Ejecutar todas las pruebas nativas en modo headless
npx playwright test

# Ejecutar con interfaz gráfica (UI Mode)
npx playwright test --ui

# Ver reporte de Playwright
npx playwright show-report
````

Pruebas BDD con Cucumber
```text
# Ejecutar todas las features de Cucumber
npm run test:cucumber

# Ejecutar escenarios filtrados por etiqueta (Ejemplo: @test)
npm run test:cucumber -- --tags "@test"

# Ejecutar un archivo .feature específico
npm run test:cucumber -- tests/features/homepage.feature

# Ejecutar un fichero cucumber y extraer los identificadores/localizadores: 
npx playwright codegen urlToNavigate

# Pausar la ejecución
await this.page.pause();
````

##  📝 Licencia
Proyecto creado con fines educativos y de aprendizaje personal.
