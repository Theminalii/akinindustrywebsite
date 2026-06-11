'use client'

import { type ChangeEvent, useState } from 'react'
import { Edit, Image as ImageIcon, Plus, Trash2, Upload, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'
import { optimizeImageFile } from '@/lib/image-upload'

type TeamFormData = {
  name: string
  position: string
  image: string
  bio: string
}

const emptyForm: TeamFormData = {
  name: '',
  position: '',
  image: '',
  bio: '',
}

export default function AdminTeamPage() {
  const { team, addTeam, updateTeam, deleteTeam } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<TeamFormData>(emptyForm)

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const optimizedImage = await optimizeImageFile(file, { maxDimension: 1200, quality: 0.76 })
      setFormData((prev) => ({ ...prev, image: optimizedImage }))
    } catch (error) {
      console.error('Team image upload failed:', error)
      alert('Şəkil emal olunarkən problem yarandı. Daha kiçik fayl sınayın.')
    }
    e.target.value = ''
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.position) {
      alert('Ad ve vezife sahesi bos qala bilmez.')
      return
    }

    if (editingId) {
      updateTeam(editingId, formData)
    } else {
      addTeam({ id: Date.now().toString(), ...formData })
    }

    handleCancel()
  }

  const handleEdit = (member: TeamFormData & { id: string }) => {
    setEditingId(member.id)
    setFormData({
      name: member.name,
      position: member.position,
      image: member.image,
      bio: member.bio,
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
          <h1 className="text-3xl font-bold text-slate-900">Komanda</h1>
          <p className="mt-2 text-sm text-slate-500">404 verən komanda bölməsi artıq aktivdir.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni üzv
        </Button>
      </div>

      {showForm && (
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>{editingId ? 'Komanda üzvünü redaktə et' : 'Yeni üzv əlavə et'}</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="Ad və soyad"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
              <input
                placeholder="Vəzifə"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
            </div>

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
                    <img
                      src={formData.image}
                      alt={formData.name || 'Komanda üzvü'}
                      className="h-full w-full object-cover"
                    />
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
                    JPG, PNG və WEBP seçə bilərsən. Şəkil avtomatik sıxılır və dərhal preview görünür.
                  </p>

                  {formData.image && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => setFormData({ ...formData, image: '' })}
                    >
                      <X className="h-4 w-4" />
                      Şəkli sil
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <textarea
              placeholder="Qısa bio"
              rows={5}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
            />

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
        {team.map((member) => (
          <Card key={member.id} className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div className="overflow-hidden rounded-2xl bg-slate-100">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center text-slate-300">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">{member.name}</h2>
                <p className="text-sm text-slate-500">{member.position}</p>
              </div>
              <p className="text-sm leading-6 text-slate-600">{member.bio}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                  <Edit className="h-4 w-4" />
                  Redaktə et
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => deleteTeam(member.id)}
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
