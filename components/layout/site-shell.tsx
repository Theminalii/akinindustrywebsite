'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Header />}
      <main>{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  )
}
