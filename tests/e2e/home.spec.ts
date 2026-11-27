import { expect, test } from '@playwright/test'

test('home page renders the starter learning paths', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /du premier script/i })).toBeVisible()
  await expect(page.getByText('Découvrir Luau')).toBeVisible()
})
