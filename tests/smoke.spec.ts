import { test, expect } from '@playwright/test';

test('game loads without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('/');
  await page.waitForSelector('canvas', { timeout: 10_000 });

  expect(errors, `Console errors:\n${errors.join('\n')}`).toHaveLength(0);
});
