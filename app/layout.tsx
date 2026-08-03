import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SiteShell } from '@/components/layout/site-shell'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Akin Industry - Tikinti Şirkəti',
    template: '%s | Akin Industry'
  },
  description: 'Azərbaycanda yaşayış, kommersiya və sənaye tikintisi üzrə peşəkar həllər təqdim edən Akin Industry.',
  keywords: ['tikinti', 'inşaat', 'Azərbaycan', 'Bakı', 'layihə', 'memarlıq', 'yaşayış binası', 'kommersiya'],
  authors: [{ name: 'Akin Industry' }],
  openGraph: {
    title: 'Akin Industry - Tikinti Şirkəti',
    description: 'Azərbaycanda yaşayış, kommersiya və sənaye tikintisi üzrə peşəkar həllər təqdim edən Akin Industry.',
    locale: 'az_AZ',
    type: 'website',
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
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
