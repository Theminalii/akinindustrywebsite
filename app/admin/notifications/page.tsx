'use client'

import { useEffect, useState } from 'react'
import { BellRing, Mail, MessageCircleMore, Send } from 'lucide-react'

import {
  defaultContactNotificationSettings,
  type ContactNotificationSettings,
} from '@/lib/contact-notifications'
import {
  defaultCareerNotificationSettings,
  type CareerNotificationSettings,
} from '@/lib/career-notifications'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function AdminNotificationsPage() {
  const [careerConfig, setCareerConfig] = useState<CareerNotificationSettings>(defaultCareerNotificationSettings)
  const [contactConfig, setContactConfig] = useState<ContactNotificationSettings>(defaultContactNotificationSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadConfig() {
      try {
        const [careerResponse, contactResponse] = await Promise.all([
          fetch('/api/admin/career-notifications'),
          fetch('/api/admin/contact-notifications'),
        ])

        const careerData = (await careerResponse.json()) as CareerNotificationSettings
        const contactData = (await contactResponse.json()) as ContactNotificationSettings

        setCareerConfig(careerData)
        setContactConfig(contactData)
      } catch {
        setMessage('Bildiriş ayarları yüklənə bilmədi.')
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const [careerResponse, contactResponse] = await Promise.all([
        fetch('/api/admin/career-notifications', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(careerConfig),
        }),
        fetch('/api/admin/contact-notifications', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactConfig),
        }),
      ])

      if (!careerResponse.ok || !contactResponse.ok) {
        throw new Error('save_failed')
      }

      const savedCareer = (await careerResponse.json()) as CareerNotificationSettings
      const savedContact = (await contactResponse.json()) as ContactNotificationSettings

      setCareerConfig(savedCareer)
      setContactConfig(savedContact)
      setMessage('Bildiriş ayarları yadda saxlanıldı.')
    } catch {
      setMessage('Yadda saxlama zamanı xəta baş verdi.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm text-sm text-slate-500">
        Bildiriş ayarları yüklənir...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <BellRing className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Bildiriş ayarları</h1>
            <p className="mt-2 text-sm text-slate-500">
              Vakansiya və əlaqə formaları üçün Gmail, Telegram və WhatsApp bildirişlərini buradan idarə et.
            </p>
          </div>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Vakansiya Gmail</CardTitle>
          <CardDescription>
            Gmail App Password ilə emailə müraciət məlumatlarını və CV-ni göndər.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Vakansiya Gmail aktivdir</p>
                <p className="text-sm text-slate-500">CV əlavə ilə email göndərişi</p>
              </div>
            </div>
            <Switch
              checked={careerConfig.gmail.enabled}
              onCheckedChange={(checked) =>
                setCareerConfig((prev) => ({ ...prev, gmail: { ...prev.gmail, enabled: checked } }))
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Göndərən Gmail</Label>
              <Input
                value={careerConfig.gmail.senderEmail}
                onChange={(e) =>
                  setCareerConfig((prev) => ({
                    ...prev,
                    gmail: { ...prev.gmail, senderEmail: e.target.value },
                  }))
                }
                placeholder="yourgmail@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Qəbul edən Gmail</Label>
              <Input
                value={careerConfig.gmail.recipientEmail}
                onChange={(e) =>
                  setCareerConfig((prev) => ({
                    ...prev,
                    gmail: { ...prev.gmail, recipientEmail: e.target.value },
                  }))
                }
                placeholder="hr@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Gmail App Password</Label>
              <Input
                type="password"
                value={careerConfig.gmail.appPassword}
                onChange={(e) =>
                  setCareerConfig((prev) => ({
                    ...prev,
                    gmail: { ...prev.gmail, appPassword: e.target.value },
                  }))
                }
                placeholder="16 rəqəmli App Password"
              />
            </div>
            <div className="space-y-2">
              <Label>Subject prefix</Label>
              <Input
                value={careerConfig.gmail.subjectPrefix}
                onChange={(e) =>
                  setCareerConfig((prev) => ({
                    ...prev,
                    gmail: { ...prev.gmail, subjectPrefix: e.target.value },
                  }))
                }
                placeholder="Akin Career"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Vakansiya Telegram</CardTitle>
          <CardDescription>
            Bot token və chat ID ilə müraciəti mətni və CV faylı kimi Telegram-a ötür.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <Send className="h-5 w-5 text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Vakansiya Telegram aktivdir</p>
                <p className="text-sm text-slate-500">Bot API üzərindən mesaj və CV göndərişi</p>
              </div>
            </div>
            <Switch
              checked={careerConfig.telegram.enabled}
              onCheckedChange={(checked) =>
                setCareerConfig((prev) => ({
                  ...prev,
                  telegram: { ...prev.telegram, enabled: checked },
                }))
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Bot token</Label>
              <Input
                type="password"
                value={careerConfig.telegram.botToken}
                onChange={(e) =>
                  setCareerConfig((prev) => ({
                    ...prev,
                    telegram: { ...prev.telegram, botToken: e.target.value },
                  }))
                }
                placeholder="123456:ABC..."
              />
            </div>
            <div className="space-y-2">
              <Label>Chat ID</Label>
              <Input
                value={careerConfig.telegram.chatId}
                onChange={(e) =>
                  setCareerConfig((prev) => ({
                    ...prev,
                    telegram: { ...prev.telegram, chatId: e.target.value },
                  }))
                }
                placeholder="-100xxxxxxxxxx"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Vakansiya WhatsApp</CardTitle>
          <CardDescription>
            Meta WhatsApp Cloud API ilə mətni və CV sənədini seçilmiş nömrəyə ötür.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <MessageCircleMore className="h-5 w-5 text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Vakansiya WhatsApp aktivdir</p>
                <p className="text-sm text-slate-500">Cloud API ilə text + document göndərişi</p>
              </div>
            </div>
            <Switch
              checked={careerConfig.whatsapp.enabled}
              onCheckedChange={(checked) =>
                setCareerConfig((prev) => ({
                  ...prev,
                  whatsapp: { ...prev.whatsapp, enabled: checked },
                }))
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Access token</Label>
              <Input
                type="password"
                value={careerConfig.whatsapp.accessToken}
                onChange={(e) =>
                  setCareerConfig((prev) => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, accessToken: e.target.value },
                  }))
                }
                placeholder="EAA..."
              />
            </div>
            <div className="space-y-2">
              <Label>Phone number ID</Label>
              <Input
                value={careerConfig.whatsapp.phoneNumberId}
                onChange={(e) =>
                  setCareerConfig((prev) => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, phoneNumberId: e.target.value },
                  }))
                }
                placeholder="106540352242922"
              />
            </div>
            <div className="space-y-2">
              <Label>Qəbul edən WhatsApp nömrəsi</Label>
              <Input
                value={careerConfig.whatsapp.recipientPhone}
                onChange={(e) =>
                  setCareerConfig((prev) => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, recipientPhone: e.target.value },
                  }))
                }
                placeholder="9945XXXXXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label>API version</Label>
              <Input
                value={careerConfig.whatsapp.apiVersion}
                onChange={(e) =>
                  setCareerConfig((prev) => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, apiVersion: e.target.value },
                  }))
                }
                placeholder="v23.0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Əlaqə Gmail</CardTitle>
          <CardDescription>
            `/elaqe` formu göndəriləndə email bildirişinin hansı Gmail-ə düşəcəyini buradan idarə et.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Əlaqə Gmail aktivdir</p>
                <p className="text-sm text-slate-500">Əlaqə formu email olaraq göndərilsin</p>
              </div>
            </div>
            <Switch
              checked={contactConfig.gmail.enabled}
              onCheckedChange={(checked) =>
                setContactConfig((prev) => ({ ...prev, gmail: { ...prev.gmail, enabled: checked } }))
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Göndərən Gmail</Label>
              <Input
                value={contactConfig.gmail.senderEmail}
                onChange={(e) =>
                  setContactConfig((prev) => ({
                    ...prev,
                    gmail: { ...prev.gmail, senderEmail: e.target.value },
                  }))
                }
                placeholder="yourgmail@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Qəbul edən Gmail</Label>
              <Input
                value={contactConfig.gmail.recipientEmail}
                onChange={(e) =>
                  setContactConfig((prev) => ({
                    ...prev,
                    gmail: { ...prev.gmail, recipientEmail: e.target.value },
                  }))
                }
                placeholder="sales@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Gmail App Password</Label>
              <Input
                type="password"
                value={contactConfig.gmail.appPassword}
                onChange={(e) =>
                  setContactConfig((prev) => ({
                    ...prev,
                    gmail: { ...prev.gmail, appPassword: e.target.value },
                  }))
                }
                placeholder="16 rəqəmli App Password"
              />
            </div>
            <div className="space-y-2">
              <Label>Subject prefix</Label>
              <Input
                value={contactConfig.gmail.subjectPrefix}
                onChange={(e) =>
                  setContactConfig((prev) => ({
                    ...prev,
                    gmail: { ...prev.gmail, subjectPrefix: e.target.value },
                  }))
                }
                placeholder="Akin Contact"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Əlaqə WhatsApp</CardTitle>
          <CardDescription>
            `/elaqe` formu göndəriləndə mesajı WhatsApp Cloud API ilə seçilmiş nömrəyə ötür.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <MessageCircleMore className="h-5 w-5 text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Əlaqə WhatsApp aktivdir</p>
                <p className="text-sm text-slate-500">Əlaqə formu mətni WhatsApp-a düşsün</p>
              </div>
            </div>
            <Switch
              checked={contactConfig.whatsapp.enabled}
              onCheckedChange={(checked) =>
                setContactConfig((prev) => ({
                  ...prev,
                  whatsapp: { ...prev.whatsapp, enabled: checked },
                }))
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Access token</Label>
              <Input
                type="password"
                value={contactConfig.whatsapp.accessToken}
                onChange={(e) =>
                  setContactConfig((prev) => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, accessToken: e.target.value },
                  }))
                }
                placeholder="EAA..."
              />
            </div>
            <div className="space-y-2">
              <Label>Phone number ID</Label>
              <Input
                value={contactConfig.whatsapp.phoneNumberId}
                onChange={(e) =>
                  setContactConfig((prev) => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, phoneNumberId: e.target.value },
                  }))
                }
                placeholder="1234567890"
              />
            </div>
            <div className="space-y-2">
              <Label>Qəbul edən WhatsApp nömrəsi</Label>
              <Input
                value={contactConfig.whatsapp.recipientPhone}
                onChange={(e) =>
                  setContactConfig((prev) => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, recipientPhone: e.target.value },
                  }))
                }
                placeholder="9945XXXXXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label>API version</Label>
              <Input
                value={contactConfig.whatsapp.apiVersion}
                onChange={(e) =>
                  setContactConfig((prev) => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, apiVersion: e.target.value },
                  }))
                }
                placeholder="v23.0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Yadda saxlanılır...' : 'Yadda saxla'}
        </Button>
        {message && <p className="text-sm text-slate-500">{message}</p>}
      </div>
    </div>
  )
}
