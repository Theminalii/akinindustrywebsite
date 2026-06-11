'use client'

import { useState } from 'react'
import { Edit, Plus, Trash2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'

type JobFormData = {
  title: string
  department: string
  location: string
  type: string
  description: string
  requirementsText: string
}

const emptyForm: JobFormData = {
  title: '',
  department: '',
  location: 'Bakı',
  type: 'full-time',
  description: '',
  requirementsText: '',
}

export default function AdminJobsPage() {
  const { jobs, addJob, updateJob, deleteJob } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<JobFormData>(emptyForm)

  const handleSubmit = () => {
    if (!formData.title || !formData.department || !formData.description) {
      alert('Vəzifə, şöbə və təsvir sahələri vacibdir.')
      return
    }

    const payload = {
      title: formData.title,
      department: formData.department,
      location: formData.location,
      type: formData.type,
      description: formData.description,
      requirements: formData.requirementsText
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    }

    if (editingId) {
      updateJob(editingId, payload)
    } else {
      addJob({ id: Date.now().toString(), ...payload })
    }

    handleCancel()
  }

  const handleEdit = (
    job: {
      id: string
      title: string
      department: string
      location: string
      type: string
      description: string
      requirements: string[]
    }
  ) => {
    setEditingId(job.id)
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirementsText: job.requirements.join('\n'),
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
          <h1 className="text-3xl font-bold text-slate-900">Vakansiyalar</h1>
          <p className="mt-2 text-sm text-slate-500">Admin jobs bölməsi artıq route kimi mövcuddur.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni vakansiya
        </Button>
      </div>

      {showForm && (
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>{editingId ? 'Vakansiyanı redaktə et' : 'Yeni vakansiya əlavə et'}</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="Vəzifə"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
              <input
                placeholder="Şöbə"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="Məkan"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              >
                <option value="full-time">Tam ştat</option>
                <option value="part-time">Yarım ştat</option>
                <option value="contract">Müqavilə</option>
              </select>
            </div>

            <textarea
              placeholder="Vakansiya təsviri"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
            />

            <textarea
              placeholder="Tələblər (hər sətirdə bir dənə)"
              rows={6}
              value={formData.requirementsText}
              onChange={(e) => setFormData({ ...formData, requirementsText: e.target.value })}
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
        {jobs.map((job) => (
          <Card key={job.id} className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{job.title}</h2>
                <p className="text-sm text-slate-500">
                  {job.department} • {job.location} • {job.type}
                </p>
              </div>
              <p className="text-sm leading-6 text-slate-600">{job.description}</p>
              <div className="space-y-1 text-sm text-slate-600">
                {job.requirements.map((requirement) => (
                  <p key={requirement}>• {requirement}</p>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                  <Edit className="h-4 w-4" />
                  Redaktə et
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => deleteJob(job.id)}
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
