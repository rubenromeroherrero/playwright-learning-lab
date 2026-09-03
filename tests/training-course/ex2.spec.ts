import { test, Browser, Page, expect } from '@playwright/test';

(async () => {
  let browser: Browser;
  let page: Page;

  test.describe('Navegación en www.freerangetesters.com', () => {

  const sections = [
    { name: 'Cursos', url: '/cursos', expectedTitle: 'Cursos' },
    { name: 'Mentorías', url: '/mentoria-1-1-con-pato', expectedTitle: 'Mentoría personalizada de avance de carrera para testers de software' },
    { name: 'Blog', url: '/blog', expectedTitle: 'Free Range Testers' }
  ];

  for (const section of sections) {
    test(`Validar redirección a la sección "${section.name}"`, async ({ page }) => {
      await test.step(`Estando yo en la web principal www.freerangetesters.com`, async () => {
        await page.goto('https://www.freerangetesters.com');
        await expect(page).toHaveTitle('Free Range Testers');
      });

      await test.step(`Cuando hago click en "${section.name}"`, async () => {
        page.locator('#page_header').getByRole('link', { name: section.name, exact: true }).click();
        await page.waitForURL(`**${section.url}`);
      });

      await test.step(`Soy redirigido a la sección de título "${section.expectedTitle}"`, async () => {
        await expect(page).toHaveTitle(section.expectedTitle);
      });
    });
  }
})
})();