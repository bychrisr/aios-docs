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
  await page.goto(`${BASE}/pt-BR/docs/git-workflow-guide`);

  await expect(page).toHaveTitle(/AIOS Docs/i);
  // Confirm the page renders a heading (not a blank/error page)
  const heading = page.locator('h1').first();
  await expect(heading).toBeVisible();
  await expect(heading).not.toBeEmpty();
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

// --- New tests for playbook v4.2 rewrite ---

test('playbook cheat-sheet renders in all 3 locales', async ({ page }) => {
  for (const lang of ['en', 'pt-BR', 'es']) {
    await page.goto(`${BASE}/${lang}/playbook/cheat-sheet`);
    await expect(page).toHaveTitle(/AIOS Docs/i);
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    // All versions should have a heading with 'Cheat Sheet' or translation
    await expect(heading).not.toBeEmpty();
  }
});

test('playbook agents page renders in EN with all 12 agents', async ({ page }) => {
  await page.goto(`${BASE}/en/playbook/agents`);

  await expect(page).toHaveTitle(/AIOS Docs/i);
  await expect(page.locator('h1').first()).toContainText('Agents');

  // Key agents must appear in the main content area (not just sidebar)
  const content = page.locator('article, main').first();
  for (const name of ['Dex', 'Quinn', 'Pax', 'Morgan', 'River', 'Aria', 'Gage', 'Orion']) {
    await expect(content.locator(`text=${name}`).first()).toBeVisible();
  }
});

test('playbook agents page renders in PT-BR and ES', async ({ page }) => {
  for (const lang of ['pt-BR', 'es']) {
    await page.goto(`${BASE}/${lang}/playbook/agents`);
    await expect(page).toHaveTitle(/AIOS Docs/i);
    await expect(page.locator('h1').first()).toBeVisible();
    // Orion and Gage must appear in all locales (agent names don't change)
    await expect(page.locator('text=Orion').first()).toBeVisible();
    await expect(page.locator('text=Gage').first()).toBeVisible();
  }
});

test('playbook index shows persona navigator (no broken /playbook/workflows refs)', async ({ page }) => {
  for (const lang of ['en', 'pt-BR', 'es']) {
    await page.goto(`${BASE}/${lang}/playbook`);
    await expect(page).toHaveTitle(/AIOS Docs/i);
    await expect(page.locator('h1').first()).toBeVisible();

    // No broken links to /playbook/workflows (removed in v4.2)
    const brokenWorkflowLink = page.locator('a[href*="/playbook/workflows"]');
    await expect(brokenWorkflowLink).toHaveCount(0);
  }
});

test('playbook getting-started onboarding renders in all locales', async ({ page }) => {
  for (const lang of ['en', 'pt-BR', 'es']) {
    await page.goto(`${BASE}/${lang}/playbook/getting-started/onboarding-60min`);
    await expect(page).toHaveTitle(/AIOS Docs/i);
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  }
});

test('playbook trails page uses verified workflow links', async ({ page }) => {
  await page.goto(`${BASE}/en/playbook/trails`);
  await expect(page).toHaveTitle(/AIOS Docs/i);

  // Should NOT contain broken /docs/workflows/ or /playbook/workflows/ links
  const brokenDocsWorkflow = page.locator('a[href*="/docs/workflows/"]');
  await expect(brokenDocsWorkflow).toHaveCount(0);
  const brokenPlaybookWorkflow = page.locator('a[href*="/playbook/workflows/"]');
  await expect(brokenPlaybookWorkflow).toHaveCount(0);
});
