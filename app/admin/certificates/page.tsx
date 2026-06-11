'use client'

import { type ChangeEvent, useState } from 'react'
import { Edit, Image as ImageIcon, Plus, Trash2, Upload, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'
import { optimizeImageFile } from '@/lib/image-upload'

type CertificateFormData = {
  title: string
  slug: string
  category: string
  description: string
  image: string
  date: string
}

const emptyForm: CertificateFormData = {
  title: '',
  slug: '',
  category: 'Sertifikat',
  description: '',
  image: '',
  date: new Date().toISOString().slice(0, 10),
}

export default function AdminCertificatesPage() {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<CertificateFormData>(emptyForm)

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const optimizedImage = await optimizeImageFile(file, { maxDimension: 1400, quality: 0.78 })
      setFormData((prev) => ({ ...prev, image: optimizedImage }))
    } catch (error) {
      console.error('Certificate image upload failed:', error)
      alert('Şəkil emal olunarkən problem yarandı. Daha kiçik fayl sınayın.')
    }
    e.target.value = ''
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.slug || !formData.description) {
      alert('Başlıq, slug və təsvir sahələri mütləqdir.')
      return
    }

    if (editingId) {
      updateCertificate(editingId, formData)
    } else {
      addCertificate({ id: Date.now().toString(), ...formData })
    }

    handleCancel()
  }

  const handleEdit = (certificate: CertificateFormData & { id: string }) => {
    setEditingId(certificate.id)
    setFormData({
      title: certificate.title,
      slug: certificate.slug,
      category: certificate.category,
      description: certificate.description,
      image: certificate.image,
      date: certificate.date,
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
          <h1 className="text-3xl font-bold text-slate-900">Sertifikatlar</h1>
          <p className="mt-2 text-sm text-slate-500">
            Ana səhifədə görünən sertifikat kartlarını buradan idarə et.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni sertifikat
        </Button>
      </div>

      {showForm && (
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>{editingId ? 'Sertifikatı redaktə et' : 'Yeni sertifikat əlavə et'}</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="Başlıq"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
              <input
                placeholder="Slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="Kateqoriya"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
            </div>

            <textarea
              placeholder="Təsvir"
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
            />

            <div className="space-y-3">
              <input
                placeholder="Şəkil URL və ya base64 data"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
              />

              <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:flex-row sm:items-center">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                  {formData.image ? (
                    <img src={formData.image} alt={formData.title || 'Sertifikat'} className="h-full w-full object-cover" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-slate-300" />
                  )}
                </div>

                <div className="space-y-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                    <Upload className="h-4 w-4" />
                    Kompüterdən şəkil yüklə
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                  <p className="text-xs leading-5 text-slate-500">
                    Yüklənən şəkil sıxılır ki, sertifikat kartı hostingdə daha stabil açılsın.
                  </p>
                </div>
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
        {certificates.map((certificate) => (
          <Card key={certificate.id} className="overflow-hidden rounded-3xl border-slate-200 shadow-sm">
            <div className="h-48 bg-slate-100">
              {certificate.image ? (
                <img src={certificate.image} alt={certificate.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-300">
                  <ImageIcon className="h-10 w-10" />
                </div>
              )}
            </div>
            <CardContent className="space-y-4 p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{certificate.category}</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">{certificate.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{certificate.description}</p>
              </div>
              <p className="text-xs text-slate-500">Slug: /{certificate.slug}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(certificate)}>
                  <Edit className="h-4 w-4" />
                  Redaktə et
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => deleteCertificate(certificate.id)}
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
