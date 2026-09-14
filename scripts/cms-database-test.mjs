import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'

// Explicit target and credentials prevent accidental writes to a production website.
const baseURL = process.env.CMS_BASE_URL
const email = process.env.CMS_TEST_EMAIL
const password = process.env.CMS_TEST_PASSWORD
if (!baseURL || !email || !password) throw new Error('Set CMS_BASE_URL, CMS_TEST_EMAIL, and CMS_TEST_PASSWORD for an isolated test database.')
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const editor = await browser.newContext({ baseURL })
const visitor = await browser.newContext({ baseURL })
const errors = []
let original
const get = async context => {
  const response = await context.request.get('/api/admin/content')
  assert.equal(response.status(), 200)
  assert.match(response.headers()['cache-control'], /no-store/)
  return response.json()
}
const save = async (data, version) => editor.request.post('/api/admin/content', { data, headers: { 'If-Match': version } })
try {
  const publicData = await get(visitor)
  assert.equal(publicData.data.adminAccounts.length, 0)
  assert.ok(Object.keys(publicData.data.pageContent).length > 800)
  assert.equal((await visitor.request.post('/api/admin/content', { data: publicData.data })).status(), 401)
  const adminPage = await editor.newPage()
  adminPage.on('pageerror', error => errors.push(error.message))
  await adminPage.goto('/admin/pages')
  await adminPage.getByPlaceholder('admin').fill(email)
  await adminPage.getByPlaceholder('Şifrənizi daxil edin').fill(password)
  await adminPage.getByRole('button', { name: 'Daxil ol', exact: true }).click()
  await adminPage.getByRole('heading', { name: 'Səhifələrin məzmunu' }).waitFor()
  original = (await get(editor)).data
  const publicPage = await visitor.newPage()
  publicPage.on('pageerror', error => errors.push(error.message))
  await publicPage.goto('/')
  const key = 'home/hero-carousel.001'
  await publicPage.getByRole('heading', { name: original.pageContent[key], exact: true }).waitFor()
  const marker = `CMS database test ${Date.now()}`
  const input = adminPage.locator('[id="home/hero-carousel.001"]')
  await input.fill(marker)
  await input.locator('..').getByRole('button', { name: 'Saxla', exact: true }).click()
  await input.locator('..').getByRole('status').filter({ hasText: 'Verilənlər bazasında saxlanıldı.' }).waitFor()
  await publicPage.getByRole('heading', { name: marker, exact: true }).waitFor({ timeout: 20000 })
  assert.equal((await get(visitor)).data.pageContent[key], marker)
  assert.deepEqual(await publicPage.evaluate(() => ({ local: Object.keys(localStorage), session: Object.keys(sessionStorage).filter(key => !key.startsWith('__next_debug_channel:')) })), { local: [], session: [] })
  await publicPage.reload()
  await publicPage.getByRole('heading', { name: marker, exact: true }).waitFor()
  console.log('PASS: CMS save persisted, second browser refreshed automatically, reload preserved data, no browser storage.')
  const imageInput = adminPage.locator('[id="home/hero-carousel.003"]')
  const imageForm = imageInput.locator('..')
  await imageForm.locator('input[type="file"]').setInputFiles('public/images/hero/hero-1.webp')
  await imageForm.getByRole('status').filter({ hasText: 'Şəkil hazırdır.' }).waitFor()
  await imageForm.getByRole('button', { name: 'Saxla', exact: true }).click()
  await imageForm.getByRole('status').filter({ hasText: 'Verilənlər bazasında saxlanıldı.' }).waitFor()
  assert.match((await get(visitor)).data.pageContent['home/hero-carousel.003'], /^data:image\//)
  await publicPage.waitForFunction(() => [...document.querySelectorAll('[style]')].some(el => el.style.backgroundImage.includes('data:image/')), { timeout: 20000 })
  console.log('PASS: uploaded image persisted in MySQL and appeared in the independent browser.')

  let snapshot = await get(editor)
  const change = { ...snapshot.data, pageContent: { ...snapshot.data.pageContent, 'seo/site.title': marker } }
  const responses = await Promise.all([save(change, snapshot.version), save(change, snapshot.version)])
  assert.deepEqual(responses.map(r => r.status()).sort(), [200,409])
  assert.equal((await save({ ...change, projects: 'invalid' }, (await get(editor)).version)).status(),400)
  console.log('PASS: concurrent stale writes rejected; malformed content rejected.')

  snapshot = await get(editor)
  const deleted = snapshot.data.projects[0]
  if (deleted) {
    assert.equal((await save({ ...snapshot.data, projects: snapshot.data.projects.filter(p => p.id !== deleted.id) }, snapshot.version)).status(),200)
    await publicPage.goto(`/layiheler/${deleted.slug}`)
    await publicPage.getByText('This page could not be found.').waitFor({ timeout: 15000 })
    assert.ok(!(await get(visitor)).data.projects.some(p => p.id === deleted.id))
  }
  for (const route of ['/', '/haqqimizda','/xidmetler','/layiheler','/xeberler','/karyera','/elaqe']) {
    await publicPage.goto(route)
    await publicPage.locator('header').waitFor()
    assert.ok((await publicPage.locator('main').innerText()).length > 20, route)
  }
  assert.deepEqual(errors, [])
  console.log('PASS: deleted seed project stays deleted; all public pages render without runtime errors.')
} finally {
  if (original) {
    const latest = await get(editor)
    assert.equal((await save(original, latest.version)).status(), 200, 'Restore failed')
  }
  await browser.close()
}
