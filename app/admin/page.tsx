'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Award,
  Briefcase,
  FileText,
  Hammer,
  Handshake,
  Image as ImageIcon,
  Newspaper,
  Phone,
  Settings,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'

export default function AdminDashboard() {
  const { projects, news, team, services, jobs, certificates, partners, contact, stats } = useAdmin()

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
    {
      label: 'Şəkillər',
      description: 'Media ve qalereya qeydlari',
      value: stats.clients,
      href: '/admin/images',
      icon: ImageIcon,
      accent: 'text-cyan-600',
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
    </div>
  )
}
