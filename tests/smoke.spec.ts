import { expect, test } from '@playwright/test';

test('canvas renders with no console errors', async ({ page }) => {
  const errors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });

  page.on('pageerror', (error) => {
    errors.push(error.message);
  });

  await page.goto('/', { waitUntil: 'load' });
  await expect(page.locator('canvas')).toBeVisible();

  expect(errors).toEqual([]);
});
