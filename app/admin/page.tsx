'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  Award,
  Briefcase,
  FileText,
  Hammer,
  Handshake,
  KeyRound,
  Newspaper,
  Phone,
  Settings,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'

export default function AdminDashboard() {
  const {
    projects,
    news,
    team,
    services,
    jobs,
    certificates,
    partners,
    contact,
    stats,
    currentAdmin,
    changeCurrentAdminPassword,
  } = useAdmin()
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const sections = [
    {
      label: 'Layihələr',
      description: 'Portfel ve secilmis layiheler',
      value: projects.length,
      href: '/admin/projects',
      icon: FileText,
      accent: 'text-blue-600',
    },
    {
      label: 'Xəbərlər',
      description: 'Xeber listi ve elanlar',
      value: news.length,
      href: '/admin/news',
      icon: Newspaper,
      accent: 'text-emerald-600',
    },
    {
      label: 'Komanda',
      description: 'Komanda uzvleri',
      value: team.length,
      href: '/admin/team',
      icon: Users,
      accent: 'text-violet-600',
    },
    {
      label: 'Xidmətlər',
      description: 'Sirket xidmet paketleri',
      value: services.length,
      href: '/admin/services',
      icon: Hammer,
      accent: 'text-amber-600',
    },
    {
      label: 'Vakansiyalar',
      description: 'Aktiv is elanlari',
      value: jobs.length,
      href: '/admin/jobs',
      icon: Briefcase,
      accent: 'text-rose-600',
    },
    {
      label: 'Sertifikatlar',
      description: 'Sertifikat kartlari',
      value: certificates.length,
      href: '/admin/certificates',
      icon: Award,
      accent: 'text-amber-500',
    },
    {
      label: 'Tərəfdaşlar',
      description: 'Sirket loqolari',
      value: partners.length,
      href: '/admin/partners',
      icon: Handshake,
      accent: 'text-teal-600',
    },
  ]

  const quickLinks = [
    {
      label: 'Əlaqə məlumatları',
      value: contact.email1,
      href: '/admin/contact',
      icon: Phone,
    },
    {
      label: 'Sayt statistikası',
      value: `${stats.projects} layihə`,
      href: '/admin/settings',
      icon: Settings,
    },
  ]

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPasswordMessage('')
    setPasswordError('')

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Yeni şifrələr eyni deyil.')
      return
    }

    const result = await changeCurrentAdminPassword(
      passwordForm.currentPassword,
      passwordForm.newPassword
    )

    if (!result.success) {
      setPasswordError(result.message ?? 'Şifrə dəyişdirilə bilmədi.')
      return
    }

    setPasswordMessage(result.message ?? 'Şifrə dəyişdirildi.')
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900 px-6 py-8 text-white shadow-sm">
        <p className="text-sm font-medium text-slate-300">Admin dashboard</p>
        <h1 className="mt-2 text-3xl font-bold">Akin Industry idarəetmə paneli</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Saytdakı bütün əsas bölmələri, əlaqə məlumatlarını və admin hesablarını bir yerdən idarə et.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.href} className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader className="space-y-3">
              <div className={section.accent}>
                <section.icon className="h-7 w-7" />
              </div>
              <div>
                <CardTitle>{section.label}</CardTitle>
                <p className="mt-1 text-sm text-slate-500">{section.description}</p>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900">{section.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Məzmun</p>
              </div>
              <Button asChild variant="outline">
                <Link href={section.href}>
                  Aç
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Qisa kecidler</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 transition hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <p className="font-medium text-slate-900">{item.label}</p>
                  <p className="truncate text-sm text-slate-500">{item.value}</p>
                </div>
                <item.icon className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Login şifrəsini dəyiş</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Aktiv hesab: <span className="font-medium text-slate-900">{currentAdmin?.email}</span>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Mövcud şifrə</label>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4">
                  <KeyRound className="h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(event) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        currentPassword: event.target.value,
                      }))
                    }
                    className="w-full bg-transparent py-3 outline-none"
                    placeholder="Hazırkı şifrə"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Yeni şifrə</label>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4">
                  <KeyRound className="h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(event) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        newPassword: event.target.value,
                      }))
                    }
                    className="w-full bg-transparent py-3 outline-none"
                    placeholder="Yeni şifrə"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Yeni şifrəni təkrarla
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4">
                  <KeyRound className="h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(event) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmPassword: event.target.value,
                      }))
                    }
                    className="w-full bg-transparent py-3 outline-none"
                    placeholder="Yeni şifrəni yenidən yaz"
                  />
                </div>
              </div>

              {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
              {passwordMessage && <p className="text-sm text-emerald-600">{passwordMessage}</p>}

              <Button type="submit" className="w-full rounded-2xl">
                Şifrəni dəyiş
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
