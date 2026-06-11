'use client'

import { type ChangeEvent, useState } from 'react'
import { Edit, Image as ImageIcon, Plus, Trash2, Upload, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'
import { optimizeImageFile } from '@/lib/image-upload'

type PartnerFormData = {
  name: string
  logo: string
}

const emptyForm: PartnerFormData = {
  name: '',
  logo: '',
}

export default function AdminPartnersPage() {
  const { partners, addPartner, updatePartner, deletePartner } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<PartnerFormData>(emptyForm)

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const optimizedImage = await optimizeImageFile(file, { maxDimension: 1000, quality: 0.76 })
      setFormData((prev) => ({ ...prev, logo: optimizedImage }))
    } catch (error) {
      console.error('Partner logo upload failed:', error)
      alert('Logo emal olunarkən problem yarandı. Daha kiçik fayl sınayın.')
    }
    e.target.value = ''
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.logo) {
      alert('Şirkət adı və logo mütləqdir.')
      return
    }

    if (editingId) {
      updatePartner(editingId, formData)
    } else {
      addPartner({ id: Date.now().toString(), ...formData })
    }

    handleCancel()
  }

  const handleEdit = (partner: PartnerFormData & { id: string }) => {
    setEditingId(partner.id)
    setFormData({
      name: partner.name,
      logo: partner.logo,
    })
    setShowForm(true)
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData(emptyForm)
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tərəfdaşlar</h1>
          <p className="mt-2 text-sm text-slate-500">
            Tərəfdaş şirkət loqolarını kompüterdən əlavə edib idarə et.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni tərəfdaş
        </Button>
      </div>

      {showForm && (
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>{editingId ? 'Tərəfdaşı redaktə et' : 'Yeni tərəfdaş əlavə et'}</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              placeholder="Şirkət adı"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
            />

            <input
              placeholder="Logo URL və ya base64 data"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
            />

            <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:flex-row sm:items-center">
              <div className="flex h-28 w-40 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                {formData.logo ? (
                  <img src={formData.logo} alt={formData.name || 'Partner'} className="max-h-full max-w-full object-contain" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-slate-300" />
                )}
              </div>

              <div className="space-y-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                  <Upload className="h-4 w-4" />
                  Kompüterdən logo yüklə
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
                <p className="text-xs leading-5 text-slate-500">
                  Logo seçildikdən sonra avtomatik sıxılır və ana səhifədə daha stabil görünür.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSubmit}>{editingId ? 'Yenilə' : 'Yadda saxla'}</Button>
              <Button variant="outline" onClick={handleCancel}>
                Ləğv et
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {partners.map((partner) => (
          <Card key={partner.id} className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div className="flex h-28 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-slate-300" />
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{partner.name}</h2>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(partner)}>
                  <Edit className="h-4 w-4" />
                  Redaktə et
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => deletePartner(partner.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
