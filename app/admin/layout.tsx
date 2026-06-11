'use client'

import type { FormEvent, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Award,
  BellRing,
  Briefcase,
  FileText,
  Hammer,
  Handshake,
  Image as ImageIcon,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Mail,
  Newspaper,
  Phone,
  Settings,
  Users,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/lib/admin/context'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Layihələr', icon: FileText },
  { href: '/admin/news', label: 'Xəbərlər', icon: Newspaper },
  { href: '/admin/team', label: 'Komanda', icon: Users },
  { href: '/admin/services', label: 'Xidmətlər', icon: Hammer },
  { href: '/admin/jobs', label: 'Vakansiyalar', icon: Briefcase },
  { href: '/admin/certificates', label: 'Sertifikatlar', icon: Award },
  { href: '/admin/partners', label: 'Tərəfdaşlar', icon: Handshake },
  { href: '/admin/images', label: 'Şəkillər', icon: ImageIcon },
  { href: '/admin/contact', label: 'Əlaqə', icon: Phone },
  { href: '/admin/notifications', label: 'Bildirişlər', icon: BellRing },
  { href: '/admin/settings', label: 'Ayarlar', icon: Settings },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { currentAdmin, isAuthenticated, isReady, login, logout } = useAdmin()
  const [email, setEmail] = useState(currentAdmin?.email ?? 'admin@akinindustry.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isLoggedIn = login(email, password)
    if (!isLoggedIn) {
      setError('Email və ya şifrə yanlışdır.')
      return
    }

    setError('')
    setPassword('')
  }

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-500 shadow-sm">
          Admin panel yüklənir...
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
        <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <LockKeyhole className="h-6 w-6" />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">Admin giriş</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Hesab email-i və şifrəsi ilə admin panelə daxil ol.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent py-3 outline-none"
                  placeholder="admin@akinindustry.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Şifrə</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4">
                <LockKeyhole className="h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent py-3 outline-none"
                  placeholder="Şifrənizi daxil edin"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" className="w-full rounded-2xl">
              Daxil ol
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Admin Panel
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Akin Industry</h2>
            <p className="mt-1 text-sm text-slate-500">
              Məzmunu, hesabları və giriş icazələrini buradan idarə et.
            </p>
          </div>

          <nav className="mt-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">{currentAdmin?.name ?? 'Admin'}</p>
            <p className="mt-1 text-xs text-slate-500">{currentAdmin?.email}</p>
            <Button
              type="button"
              variant="outline"
              className="mt-4 w-full justify-center rounded-xl"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Çıxış et
            </Button>
          </div>
        </aside>

        <section className="min-w-0">{children}</section>
      </div>
    </div>
  )
}
