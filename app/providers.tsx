'use client'

import { AdminProvider } from '@/lib/admin/context'
import { LanguageProvider } from '@/lib/language-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AdminProvider>{children}</AdminProvider>
    </LanguageProvider>
  )
}
