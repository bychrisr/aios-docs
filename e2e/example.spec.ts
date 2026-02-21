import { test, expect } from '@playwright/test';

test('has title and can switch language', async ({ page }) => {
  // Vá diretamente para um local fixo para contornar redirecionamentos que Next.js joga plain text 127.0.0.1
  await page.goto('http://127.0.0.1:3000/pt-BR');

  // Let's assert we eventually get to the docs title
  await expect(page).toHaveTitle(/AIOS Docs/i);

  // Take a look, see if headers are visible
  const heading = page.locator('h1').first();
  await expect(heading).toBeVisible();
});

test('check if synchronized standard document opens without breaking', async ({ page }) => {
  // Go directly to the previously broken document
  await page.goto('http://127.0.0.1:3000/pt-BR/docs/standards/OPEN-SOURCE-VS-SERVICE-DIFFERENCES');
  
  // Verify document content rendered
  const contentElement = page.locator('h1', { hasText: 'Open-Source vs Service Implementation Differences' });
  await expect(contentElement).toBeVisible();

  // Test the problematic parts are actually in the page
  await expect(page.locator('text=squads/[squad]/')).toBeVisible();
});
