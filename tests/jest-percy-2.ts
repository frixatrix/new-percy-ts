/**
 * @jest-environment puppeteer
 */

const percySnapshot = require('@percy/puppeteer');

describe("Jest Percy with require test", () => {
    beforeAll(async () => {
        await page.goto('https://google.com')
    })
    test('Has correct page title', async () => {
        await expect(page.title()).resolves.toMatch('Google')
        await percySnapshot(page, 'Google Home page')
    })
})