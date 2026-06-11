'use client'

import { useState } from 'react'
import { Edit, Plus, Trash2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'

type NewsFormData = {
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  image: string
  category: string
}

const emptyForm: NewsFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  date: new Date().toISOString().slice(0, 10),
  image: '',
  category: 'Xəbərlər',
}

export default function AdminNewsPage() {
  const { news, addNews, updateNews, deleteNews } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<NewsFormData>(emptyForm)

  const handleSubmit = () => {
    if (!formData.title || !formData.slug || !formData.excerpt) {
      alert('Basliq, slug ve qisa tesvir doldurulmalidir.')
      return
    }

    if (editingId) {
      updateNews(editingId, formData)
    } else {
      addNews({ id: Date.now().toString(), ...formData })
    }

    handleCancel()
  }

  const handleEdit = (article: NewsFormData & { id: string }) => {
    setEditingId(article.id)
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      date: article.date,
      image: article.image,
      category: article.category,
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
          <h1 className="text-3xl font-bold text-slate-900">Xəbərlər</h1>
          <p className="mt-2 text-sm text-slate-500">Admin news route artıq real page kimi işləyir.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni xəbər
        </Button>
      </div>

      {showForm && (
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>{editingId ? 'Xəbəri redaktə et' : 'Yeni xəbər əlavə et'}</CardTitle>
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

            <div className="grid gap-4 md:grid-cols-3">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
              <input
                placeholder="Kateqoriya"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
              <input
                placeholder="Şəkil URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
            </div>

            <textarea
              placeholder="Qısa təsvir"
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
            />

            <textarea
              placeholder="Tam məzmun"
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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

      <Card className="rounded-3xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Xəbər siyahısı</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Başlıq</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Kateqoriya</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Tarix</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-900">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {news.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{article.title}</p>
                    <p className="text-xs text-slate-500">/{article.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{article.category}</td>
                  <td className="px-6 py-4 text-slate-600">{article.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => deleteNews(article.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
