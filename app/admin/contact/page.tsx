'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type ContactInfo, useAdmin } from '@/lib/admin/context'

export default function AdminContactPage() {
  const { contact, updateContact } = useAdmin()
  const [formData, setFormData] = useState<ContactInfo>(contact)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setFormData(contact)
  }, [contact])

  const handleSave = () => {
    updateContact(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Əlaqə məlumatları</h1>
        <p className="mt-2 text-sm text-slate-500">
          Admin contact route əlavə edildi və məlumatlar artıq buradan yenilənir.
        </p>
      </div>

      <Card className="rounded-3xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Əsas kontakt blokları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Telefon 1"
              value={formData.phone1}
              onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2"
            />
            <input
              placeholder="Telefon 2"
              value={formData.phone2}
              onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Email 1"
              value={formData.email1}
              onChange={(e) => setFormData({ ...formData, email1: e.target.value })}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2"
            />
            <input
              placeholder="Email 2"
              value={formData.email2}
              onChange={(e) => setFormData({ ...formData, email2: e.target.value })}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2"
            />
          </div>

          <input
            placeholder="LinkedIn URL"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
          />

          <textarea
            placeholder="Ünvan"
            rows={3}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
          />

          <input
            placeholder="İş saatları"
            value={formData.workingHours}
            onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
          />

          <textarea
            placeholder="Google Maps embed URL"
            rows={4}
            value={formData.googleMapEmbedUrl}
            onChange={(e) => setFormData({ ...formData, googleMapEmbedUrl: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
          />

          <div className="flex items-center gap-3">
            <Button onClick={handleSave}>Yadda saxla</Button>
            {saved && <span className="text-sm text-green-600">Dəyişiklik saxlanıldı</span>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
