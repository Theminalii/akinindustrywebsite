'use client'

import { useState } from 'react'
import { Edit, Plus, Trash2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'

type ServiceFormData = {
  title: string
  description: string
  icon: string
  featuresText: string
}

const emptyForm: ServiceFormData = {
  title: '',
  description: '',
  icon: 'building',
  featuresText: '',
}

export default function AdminServicesPage() {
  const { services, addService, updateService, deleteService } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<ServiceFormData>(emptyForm)

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      alert('Xidmət başlığı və təsviri vacibdir.')
      return
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      features: formData.featuresText
        .split('\n')
        .map((feature) => feature.trim())
        .filter(Boolean),
    }

    if (editingId) {
      updateService(editingId, payload)
    } else {
      addService({ id: Date.now().toString(), ...payload })
    }

    handleCancel()
  }

  const handleEdit = (
    service: {
      id: string
      title: string
      description: string
      icon: string
      features: string[]
    }
  ) => {
    setEditingId(service.id)
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      featuresText: service.features.join('\n'),
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
          <h1 className="text-3xl font-bold text-slate-900">Xidmətlər</h1>
          <p className="mt-2 text-sm text-slate-500">Admin services route əlavə edildi və işləkdir.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni xidmət
        </Button>
      </div>

      {showForm && (
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>{editingId ? 'Xidməti redaktə et' : 'Yeni xidmət əlavə et'}</CardTitle>
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
                placeholder="İkon açarı"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
            </div>

            <textarea
              placeholder="Təsvir"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
            />

            <textarea
              placeholder="Xüsusiyyətlər (hər sətirdə bir dənə)"
              rows={6}
              value={formData.featuresText}
              onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
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

      <div className="grid gap-4 xl:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id} className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{service.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span key={feature} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {feature}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                  <Edit className="h-4 w-4" />
                  Redaktə et
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => deleteService(service.id)}
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
