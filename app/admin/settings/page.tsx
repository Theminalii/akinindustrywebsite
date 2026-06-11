'use client'

import { useState, useEffect } from 'react'
import { KeyRound, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/lib/admin/context'

export default function SettingsAdmin() {
  const {
    stats,
    updateStats,
    teamSectionEnabled,
    updateTeamSectionEnabled,
    adminAccounts,
    addAdminAccount,
    updateAdminAccountPassword,
    deleteAdminAccount,
    currentAdmin,
  } = useAdmin()
  const [localStats, setLocalStats] = useState(stats)
  const [saved, setSaved] = useState(false)
  const [accountMessage, setAccountMessage] = useState('')
  const [newAccount, setNewAccount] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [passwordEdits, setPasswordEdits] = useState<Record<string, string>>({})

  useEffect(() => {
    setLocalStats(stats)
  }, [stats])

  useEffect(() => {
    setPasswordEdits(
      Object.fromEntries(adminAccounts.map((account) => [account.id, '']))
    )
  }, [adminAccounts])

  const handleChange = (key: string, value: number) => {
    setLocalStats(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    updateStats(localStats)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleAddAccount = () => {
    const result = addAdminAccount({
      name: newAccount.name,
      email: newAccount.email,
      password: newAccount.password,
    })

    setAccountMessage(result.message ?? '')

    if (result.success) {
      setNewAccount({ name: '', email: '', password: '' })
    }
  }

  const handlePasswordUpdate = (id: string) => {
    const result = updateAdminAccountPassword(id, passwordEdits[id] ?? '')
    setAccountMessage(result.message ?? '')
  }

  const handleDeleteAccount = (id: string) => {
    const result = deleteAdminAccount(id)
    setAccountMessage(result.message ?? '')
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Ayarlar</h1>
        <p className="text-muted-foreground">Sayt ayarlarını idarə edin</p>
      </div>

      <Card className="border-slate-200 max-w-2xl">
        <CardHeader>
          <CardTitle>Şirkət Statistikası</CardTitle>
          <CardDescription>Anasəhifədə göstərilən statistikaları dəyişin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tamamlanmış Layihələr
            </label>
            <input
              type="number"
              value={localStats.projects}
              onChange={(e) => handleChange('projects', Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Peşəkar İşçi
            </label>
            <input
              type="number"
              value={localStats.employees}
              onChange={(e) => handleChange('employees', Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              İllik Təcrübə
            </label>
            <input
              type="number"
              value={localStats.years}
              onChange={(e) => handleChange('years', Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Razı Müştəri
            </label>
            <input
              type="number"
              value={localStats.clients}
              onChange={(e) => handleChange('clients', Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleSave} className="flex-1">
              Dəyişiklikləri Yadda Saxla
            </Button>
            {saved && (
              <span className="text-sm text-green-600">✓ Yadda saxlandı</span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 max-w-2xl mt-6">
        <CardHeader>
          <CardTitle>About Page Team Section</CardTitle>
          <CardDescription>
            Hide or show the leadership team block on the About page. Team members can still be managed from the Team admin page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="font-medium text-foreground">Show leadership team section</p>
              <p className="text-sm text-slate-500">
                When disabled, the "Our Team / Leadership Team" section will not appear on `/haqqimizda`.
              </p>
            </div>
            <button
              type="button"
              onClick={() => updateTeamSectionEnabled(!teamSectionEnabled)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                teamSectionEnabled ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  teamSectionEnabled ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-slate-500">
            Current status: <span className="font-medium text-slate-700">{teamSectionEnabled ? 'Visible' : 'Hidden'}</span>
          </p>
        </CardContent>
      </Card>

      <Card className="border-slate-200 max-w-2xl mt-6">
        <CardHeader>
          <CardTitle>İstifadəçi Hesabları</CardTitle>
          <CardDescription>Email və şifrə ilə giriş edən admin hesablarını idarə edin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-semibold text-foreground">Yeni hesab əlavə et</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <input
                value={newAccount.name}
                onChange={(e) => setNewAccount((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ad"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                value={newAccount.email}
                onChange={(e) => setNewAccount((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="email@example.com"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                value={newAccount.password}
                onChange={(e) => setNewAccount((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Şifrə"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button onClick={handleAddAccount} className="mt-4 gap-2">
              <Plus className="h-4 w-4" />
              Hesab əlavə et
            </Button>
          </div>

          {accountMessage && (
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              {accountMessage}
            </div>
          )}

          <div className="space-y-4">
            {adminAccounts.map((account) => (
              <div key={account.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{account.name}</p>
                      {currentAdmin?.id === account.id && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          Aktiv sessiya
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{account.email}</p>
                  </div>

                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
                      <KeyRound className="h-4 w-4 text-slate-400" />
                      <input
                        type="password"
                        value={passwordEdits[account.id] ?? ''}
                        onChange={(e) =>
                          setPasswordEdits((prev) => ({ ...prev, [account.id]: e.target.value }))
                        }
                        placeholder="Yeni şifrə"
                        className="w-full min-w-48 bg-transparent py-2 outline-none"
                      />
                    </div>

                    <Button variant="outline" size="sm" onClick={() => handlePasswordUpdate(account.id)}>
                      Şifrəni yenilə
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Sil
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
