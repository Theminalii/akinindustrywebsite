import { chromium } from 'playwright-core'

const baseUrl = process.env.CMS_BASE_URL ?? 'https://akinindustry.com'
const chromePath =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const marker = `CMS TEST ${new Date().toISOString().replace(/[:.]/g, '-')}`

const contentResponse = await fetch(`${baseUrl}/api/admin/content`, { cache: 'no-store' })
if (!contentResponse.ok) {
  throw new Error(`Admin content could not be loaded: HTTP ${contentResponse.status}`)
}

const contentPayload = await contentResponse.json()
const account = contentPayload?.data?.adminAccounts?.find(
  (item) => item.email && item.password
)
if (!account) {
  throw new Error('No configured admin account is available for the smoke test.')
}

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
})
const page = await browser.newPage()
const errors = []

page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`)
})
page.on('pageerror', (error) => errors.push(`page: ${error.message}`))

async function saveAndVerify(path, openButton, fields, saveButton, expectedText) {
  await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: openButton }).click()

  for (const [placeholder, value] of Object.entries(fields)) {
    await page.getByPlaceholder(placeholder).fill(value)
  }

  const saveResponse = page.waitForResponse(
    (response) =>
      response.url() === `${baseUrl}/api/admin/content` &&
      response.request().method() === 'POST',
    { timeout: 20_000 }
  )
  await page.getByRole('button', { name: saveButton, exact: true }).click()
  const response = await saveResponse
  if (!response.ok()) {
    throw new Error(`${path} save failed: HTTP ${response.status()}`)
  }

  await page.reload({ waitUntil: 'networkidle' })
  await page.getByText(expectedText, { exact: true }).first().waitFor()
}

try {
  await page.goto(`${baseUrl}/admin`, { waitUntil: 'networkidle' })
  await page.getByPlaceholder('admin').fill(account.email)
  await page.getByPlaceholder('Şifrənizi daxil edin').fill(account.password)
  await page.getByRole('button', { name: 'Daxil ol' }).click()
  await page.getByText('Dashboard', { exact: true }).waitFor()

  await saveAndVerify(
    '/admin/projects',
    'Yeni Layihə',
    {
      Başlıq: `${marker} Layihə`,
      'Slug (URL)': `${marker.toLowerCase().replaceAll(' ', '-')}-layihe`,
      Müştəri: 'Akin Industry test',
      Məkan: 'Bakı',
      'Sahə/Həcm': '100 m²',
      Təsvir: 'CMS persistent save yoxlaması üçün test layihəsi.',
    },
    'Yadda Saxla',
    `${marker} Layihə`
  )

  await saveAndVerify(
    '/admin/news',
    'Yeni xəbər',
    {
      Başlıq: `${marker} Xəbər`,
      Slug: `${marker.toLowerCase().replaceAll(' ', '-')}-xeber`,
      'Qısa təsvir': 'CMS persistent save yoxlaması üçün test xəbəri.',
      'Tam məzmun': 'Səhifə yeniləndikdən sonra məlumatın MySQL-dən qayıtması yoxlanılır.',
    },
    'Yadda saxla',
    `${marker} Xəbər`
  )

  await saveAndVerify(
    '/admin/team',
    'Yeni üzv',
    {
      'Ad və soyad': `${marker} Komanda`,
      Vəzifə: 'Test mütəxəssisi',
      'Qısa bio': 'CMS persistent save yoxlaması üçün test komanda üzvü.',
    },
    'Yadda saxla',
    `${marker} Komanda`
  )

  await saveAndVerify(
    '/admin/jobs',
    'Yeni vakansiya',
    {
      Vəzifə: `${marker} Vakansiya`,
      Şöbə: 'Test',
      Məkan: 'Bakı',
      'Vakansiya təsviri': 'CMS persistent save yoxlaması üçün test vakansiyası.',
      'Tələblər (hər sətirdə bir dənə)': 'Məsuliyyət\nDiqqət',
    },
    'Yadda saxla',
    `${marker} Vakansiya`
  )

  await saveAndVerify(
    '/admin/certificates',
    'Yeni sertifikat',
    {
      Başlıq: `${marker} Sertifikat`,
      Slug: `${marker.toLowerCase().replaceAll(' ', '-')}-sertifikat`,
      Kateqoriya: 'Test',
      Təsvir: 'CMS persistent save yoxlaması üçün test sertifikatı.',
    },
    'Yadda saxla',
    `${marker} Sertifikat`
  )

  const freshResponse = await fetch(
    `${baseUrl}/api/admin/content?smoke=${encodeURIComponent(Date.now())}`,
    { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } }
  )
  const freshPayload = await freshResponse.json()
  const data = freshPayload.data
  const checks = {
    projects: data.projects.some((item) => item.title === `${marker} Layihə`),
    news: data.news.some((item) => item.title === `${marker} Xəbər`),
    team: data.team.some((item) => item.name === `${marker} Komanda`),
    jobs: data.jobs.some((item) => item.title === `${marker} Vakansiya`),
    certificates: data.certificates.some((item) => item.title === `${marker} Sertifikat`),
  }

  if (Object.values(checks).some((value) => !value)) {
    throw new Error(`Persistence verification failed: ${JSON.stringify(checks)}`)
  }

  console.log(JSON.stringify({ marker, checks, browserErrors: errors }, null, 2))
} finally {
  await browser.close()
}
