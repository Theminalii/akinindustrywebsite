'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { useAdmin } from '@/lib/admin/context'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')
  const { isReady, persistenceError } = useAdmin()
  if (!isAdminRoute && (!isReady || persistenceError)) return <main className="min-h-screen flex items-center justify-center p-8" role="status">{persistenceError ? 'Məlumatlar hazırda yüklənmir. Bağlantı bərpa olduqda səhifə yenilənəcək.' : 'Yüklənir...'}</main>

  return (
    <>
      {!isAdminRoute && <Header />}
      <main>{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  )
}
