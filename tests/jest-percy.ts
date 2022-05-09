/**
 * @jest-environment puppeteer
 */

import percySnapshot from "@percy/puppeteer";

describe("Jest Percy with import test", () => {
    beforeAll(async () => {
        await page.goto('https://google.com')
    })
    test('Has correct page title', async () => {
        await expect(page.title()).resolves.toMatch('Google')
        await percySnapshot(page, 'Google Home page')
    })
})