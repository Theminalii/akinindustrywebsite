import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SiteShell } from '@/components/layout/site-shell'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),
  title: {
    default: 'Akin Industry - Construction Company',
    template: '%s | Akin Industry'
  },
  description: 'A leading construction company in Azerbaijan with more than 25 years of experience across residential, commercial, and industrial projects.',
  keywords: ['construction', 'building', 'Azerbaijan', 'Baku', 'project', 'architecture', 'residential', 'commercial'],
  authors: [{ name: 'Akin Industry' }],
  openGraph: {
    title: 'Akin Industry - Construction Company',
    description: 'A leading construction company in Azerbaijan with more than 25 years of experience.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
    siteName: 'Akin Industry',
    locale: 'az_AZ',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
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
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
