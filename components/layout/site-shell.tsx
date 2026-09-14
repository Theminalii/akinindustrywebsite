'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { useAdmin } from '@/lib/admin/context'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { isPageEnabled, pageKeyFromPath } from '@/lib/page-visibility'

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')
  const { isReady, persistenceError, pageVisibility } = useAdmin()
  if (!isAdminRoute && (!isReady || persistenceError)) return <main className="min-h-screen flex items-center justify-center p-8" role="status">{persistenceError ? 'Məlumatlar hazırda yüklənmir. Bağlantı bərpa olduqda səhifə yenilənəcək.' : 'Yüklənir...'}</main>
  if (!isAdminRoute && !isPageEnabled(pageVisibility, pageKeyFromPath(pathname))) return (
    <main className="min-h-screen flex items-center justify-center p-8 text-center" role="status">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Səhifə müvəqqəti bağlıdır</h1>
        <p className="mt-3 text-muted-foreground">Bu bölmə hazırda yenilənir.</p>
      </div>
    </main>
  )

  return (
    <>
      {!isAdminRoute && <Header />}
      <main>{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  )
}
