import { chromium } from 'playwright-core'

const baseUrl = process.env.SITE_BASE_URL ?? 'https://akinindustry.com'
const chromePath =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const routes = [
  '/',
  '/haqqimizda',
  '/xidmetler',
  '/layiheler',
  '/xeberler',
  '/karyera',
  '/elaqe',
]
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

const browser = await chromium.launch({ executablePath: chromePath, headless: true })
const report = []

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport })
    const responseErrors = new Set()
    const consoleErrors = new Set()
    page.on('response', (response) => {
      if (response.status() >= 400) {
        responseErrors.add(`${response.status()} ${response.url()}`)
      }
    })
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.add(message.text())
    })
    page.on('pageerror', (error) => consoleErrors.add(error.message))

    for (const route of routes) {
      responseErrors.clear()
      consoleErrors.clear()
      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: 'load',
        timeout: 30_000,
      })
      await page.waitForTimeout(750)
      const checks = await page.evaluate(() => {
        const duplicateIds = [...document.querySelectorAll('[id]')]
          .map((element) => element.id)
          .filter((id, index, all) => id && all.indexOf(id) !== index)
        const imagesWithoutAlt = [...document.querySelectorAll('img')].filter(
          (image) => !image.hasAttribute('alt')
        ).length
        const emptyLinks = [...document.querySelectorAll('a')].filter((link) => {
          const href = link.getAttribute('href')
          return !href || href === '#'
        }).length
        return {
          title: document.title,
          duplicateIds: [...new Set(duplicateIds)],
          imagesWithoutAlt,
          emptyLinks,
          horizontalOverflow:
            document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
        }
      })

      report.push({
        viewport: viewport.name,
        route,
        http: response?.status() ?? null,
        ...checks,
        responseErrors: [...responseErrors],
        consoleErrors: [...consoleErrors],
      })
    }
    await page.close()
  }
} finally {
  await browser.close()
}

console.log(JSON.stringify(report, null, 2))
if (
  report.some(
    (item) =>
      item.http !== 200 ||
      item.horizontalOverflow ||
      item.responseErrors.some((error) => !error.includes('/_vercel/insights/script.js')) ||
      item.consoleErrors.some((error) => !error.includes('404'))
  )
) {
  process.exitCode = 1
}
