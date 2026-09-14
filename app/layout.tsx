import { readAdminContentConfig } from '@/lib/server/admin-content-config'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SiteShell } from '@/components/layout/site-shell'
import { Providers } from './providers'
import './globals.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await readAdminContentConfig()
  const content = data.pageContent
  return {
    title: { default: content['seo/site.title'], template: '%s | ' + content['seo/site.author'] },
    description: content['seo/site.description'],
    keywords: content['seo/site.keywords'].split(',').map(value => value.trim()),
    authors: [{ name: content['seo/site.author'] }],
    openGraph: { title: content['seo/site.title'], description: content['seo/site.description'], locale: 'az_AZ', type: 'website' },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="az">
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
