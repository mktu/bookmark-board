import { test, expect } from '@playwright/test';

test.describe('Basic test', () => {
  test('show signin page', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.locator(`text='ログインまたは登録する'`).click()
    await page.waitForURL('http://localhost:3000/signin')
    const l = page.locator('#google-login')
    expect(l.isVisible).toBeTruthy()
  })

  test('show public bookmark page', async ({ page }) => {
    await page.goto('http://localhost:3000/public-bookmarks/PHnQx8Q7An9JlMr8EwGl')
    expect(await page.textContent('h1')).toBe('開発全般')
  })
})