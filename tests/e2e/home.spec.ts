import { expect, test } from '@playwright/test'

test('home page opens the Luau tutorial and navigates its lessons', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /du premier script/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Préparer son environnement' })).toBeVisible()
  await page.getByRole('button', { name: 'Suivant' }).click()
  await expect(page.getByRole('heading', { name: 'Variables et valeurs' })).toBeVisible()
})
