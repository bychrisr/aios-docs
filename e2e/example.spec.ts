import { test, expect } from '@playwright/test';

const BASE = 'http://127.0.0.1:3000';

test('has title and renders main heading', async ({ page }) => {
  // Navigate directly to bypass Next.js plain-text redirect on localhost
  await page.goto(`${BASE}/pt-BR`);

  await expect(page).toHaveTitle(/AIOS Docs/i);

  const heading = page.locator('h1').first();
  await expect(heading).toBeVisible();
});

test('synchronized document renders without MDX errors', async ({ page }) => {
  await page.goto(`${BASE}/pt-BR/docs/standards/OPEN-SOURCE-VS-SERVICE-DIFFERENCES`);

  const contentElement = page.locator('h1', {
    hasText: 'Open-Source vs Service Implementation Differences',
  });
  await expect(contentElement).toBeVisible();

  // Confirm problematic MDX content (curly braces) rendered correctly
  await expect(page.locator('text=squads/[squad]/')).toBeVisible();
});

test('workflow doc renders in English', async ({ page }) => {
  await page.goto(
    `${BASE}/en/docs/guides/workflows/STORY-DEVELOPMENT-CYCLE-WORKFLOW`
  );

  await expect(page).toHaveTitle(/AIOS Docs/i);
  const heading = page.locator('h1').first();
  await expect(heading).toBeVisible();
  await expect(heading).toContainText('Story Development Cycle');
});

test('language navigation: EN and ES share same doc slug', async ({ page }) => {
  await page.goto(`${BASE}/en/docs/getting-started`);
  await expect(page).toHaveTitle(/AIOS Docs/i);
  await expect(page.locator('h1').first()).toBeVisible();

  await page.goto(`${BASE}/es/docs/getting-started`);
  await expect(page).toHaveTitle(/AIOS Docs/i);
  await expect(page.locator('h1').first()).toBeVisible();
});

test('playbook index renders without broken links', async ({ page }) => {
  await page.goto(`${BASE}/pt-BR/playbook`);

  await expect(page).toHaveTitle(/AIOS Docs/i);
  // Confirm the page renders content (not an error page)
  await expect(page.locator('h1').first()).toBeVisible();
  // The broken /playbook/workflows link should no longer appear
  const brokenLink = page.locator('a[href="/playbook/workflows"]');
  await expect(brokenLink).toHaveCount(0);
});
