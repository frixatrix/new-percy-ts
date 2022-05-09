/**
 * @jest-environment puppeteer
 */

describe("Simple Jest test", () => {
    beforeAll(async () => {
        await page.goto('https://google.com')
    })
    test('Has correct page title', async () => {
        await expect(page.title()).resolves.toMatch('Google')
    })
})