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
│   ├── constants/             # Constantes globales, tipos y mensajes de error
│   ├── features/              # Archivos y configuración de Cucumber BDD
│   │   ├── scenarios/         # Archivos .feature (historias/escenarios Gherkin)
│   │   ├── step-definitions/  # Definición de pasos (Gherkin -> TS)
│   │   └── support/           # Hooks y gestión multinavegador de Playwright
│   ├── pages/                 # Page Object Models (POM) y PageManager
│   └── utils/                 # Utilidades generales y variables de entorno
├── cucumber.json              # Configuración del CLI de Cucumber
├── playwright.config.ts       # Configuración global de Playwright
└── package.json
````

##  ⚙️ Configuración Global de Playwright
En el archivo playwright.config.ts se han definido ajustes globales clave para agilizar el desarrollo de las pruebas:
- baseURL: URL base (https://www.saucedemo.com/) para utilizar rutas relativas (como await page.goto('/')).
- testIdAttribute: Se adapta el identificador de test por defecto a data-test (testIdAttribute: 'data-test').
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
Dado que los escenarios BDD se ejecutan a través del CLI de Cucumber y no mediante el runner nativo de Playwright, se requiere la integración de tsx (TypeScript Execute) para transpilar e interpretar los archivos .ts al vuelo.
- tsx: Necesario (es el ejecutor de TypeScript que estás invocando en los scripts de Cucumber).
- @cucumber/cucumber: Necesario (framework BDD).
- @playwright/test: Necesario (motor de automatización).
- @types/node: Necesario para los tipos de process.env y utilidades de Node.
- cross-env: Necesario para pasar variables como BROWSER=chromium de forma multiplataforma.
- multiple-cucumber-html-reporter: Necesario si generas los reportes HTML visuales a partir del JSON de Cucumber.

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

##  🖥️ Gestión del Ciclo de Vida (tests/features/support/hooks.ts)
La gestión de navegadores se realiza de forma dinámica mediante la variable de entorno BROWSER, permitiendo conmutar entre Chromium, Firefox y WebKit.
- El ciclo de vida del navegador
- La configuración del timeout global para los tests
- El seteo del atributo de los data-testid, por 'data-test'
- Gestor de páginas (pageManager)
```text
setDefaultTimeout(8 * 1000);

let browser: Browser;
let page: Page;
declare const process: any;

BeforeAll(async () => {
  selectors.setTestIdAttribute(config.use?.testIdAttribute || 'data-test');

  const browserType = process.env.BROWSER || 'chromium';
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

Before(async function () {
  const context = await browser.newContext({
    //Configurar la URL de pruebas
    baseURL: config.use?.baseURL
  });

  this.page = await context.newPage();
  this.pageManager = new PageManager(this.page);
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const image = await this.page.screenshot();
    await this.attach(image, 'image/png');
  }
  await this.page.close();
});

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
Puedes ejecutar la suite de pruebas seleccionando el navegador específico o ejecutando la suite completa mediante los scripts definidos en el package.json utilizando cross-env:

Pruebas Nativas de Playwright
```text
# Ejecutar todas las pruebas nativas
npx playwright test

# Ejecutar con interfaz gráfica (UI Mode)
npx playwright test --ui

# Ver reporte nativo de Playwright
npx playwright show-report
````

Pruebas BDD con Cucumber
```text
# Ejecutar todas las features de Cucumber
# Se usa cucumber.json y se genera el reporte nativo de Cucumber en reports/cucumber-report.html.
npm run test:cucumber

# Ejecutar escenarios filtrados por etiqueta (Ejemplo: @test)
npm run test:cucumber -- --tags "@test"

# Ejecutar un archivo .feature específico
npm run test:cucumber -- tests/features/homepage.feature

# Para ejecutar en local en Firefox
BROWSER=firefox npx cucumber-js

# Para ejecutar en local en WebKit (Safari)
BROWSER=webkit npx cucumber-js

# Para ejecutar en local en Chromium
BROWSER=chromium npx cucumber-js
````

##  🧑‍💻Herramientas de Desarrollo y Depuración
```text
# Generar localizadores e interactuar con la web (Playwright Codegen)
npx playwright codegen urlToNavigate
````
ℹ️ Nota: Durante la depuración puedes pausar la ejecución en el código agregando:
```text
await this.page.pause();
````

##  📝 Licencia
Proyecto creado con fines educativos y de aprendizaje personal.
