'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/lib/admin/context'
import { optimizeImageFile } from '@/lib/image-upload'
import { Edit, Trash2, Plus, X, Upload, Video } from 'lucide-react'

export default function ProjectsAdmin() {
  const { projects, addProject, updateProject, deleteProject } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '', 
    slug: '', 
    category: 'residential', 
    description: '', 
    client: '', 
    location: '', 
    year: new Date().getFullYear(), 
    area: '', 
    images: [] as string[],
    videos: [] as string[],
    featured: false
  })
  const [videoUrl, setVideoUrl] = useState('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    try {
      const optimizedImages = await Promise.all(
        Array.from(files).map((file) =>
          optimizeImageFile(file, { maxDimension: 1400, quality: 0.78 })
        )
      )

      setFormData((prev) => ({ ...prev, images: [...prev.images, ...optimizedImages] }))
    } catch (error) {
      console.error('Project image upload failed:', error)
      alert('Şəkil emal olunarkən problem yarandı. Daha kiçik fayl sınayın.')
    }

    e.target.value = ''
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug) return alert('Başlıq və slug mütləqdir')
    const normalizedFormData = {
      ...formData,
      videos: formData.videos.map((video) => video.trim()).filter(Boolean),
      slug: formData.slug
        .trim()
        .toLocaleLowerCase('az')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9əğıöşüç-]/g, '')
        .replace(/-+/g, '-'),
    }
    const result = editingId
      ? await updateProject(editingId, normalizedFormData)
      : await addProject({ ...normalizedFormData, id: crypto.randomUUID() })
    if (!result.success) return alert(result.message)
    handleCancel()
  }

  const handleEdit = (project: any) => {
    setFormData({ ...project, videos: project.videos ?? [] })
    setEditingId(project.id)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setVideoUrl('')
    setFormData({ title: '', slug: '', category: 'residential', description: '', client: '', location: '', year: new Date().getFullYear(), area: '', images: [], videos: [], featured: false })
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Layihələr</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2"><Plus className="h-4 w-4" /> Yeni Layihə</Button>
      </div>

      {showForm && (
        <Card className="mb-8 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{editingId ? 'Layihəni Redaktə Et' : 'Yeni Layihə Əlavə Et'}</CardTitle>
            <Button variant="ghost" onClick={handleCancel}><X /></Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Başlıq" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="p-2 border rounded bg-white" />
              <input placeholder="Slug (URL)" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="p-2 border rounded bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="p-2 border rounded bg-white">
                <option value="residential">Yaşayış</option>
                <option value="commercial">Kommersiya</option>
                <option value="industrial">Sənaye</option>
                <option value="infrastructure">İnfrastruktur</option>
              </select>
              <input type="number" placeholder="İl" value={formData.year} onChange={e => setFormData({...formData, year: Number(e.target.value)})} className="p-2 border rounded bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Müştəri" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="p-2 border rounded bg-white" />
              <input placeholder="Məkan" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="p-2 border rounded bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <input placeholder="Sahə/Həcm" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} className="p-2 border rounded bg-white" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
                <span className="text-sm">Seçilmiş Layihə (Anasəhifədə göstər)</span>
              </label>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Şəkillər</label>
              <div className="flex gap-2 flex-wrap p-2 border rounded bg-white min-h-24">
                {formData.images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 group">
                    <img src={img} className="w-full h-full object-cover rounded border" />
                    <button onClick={() => setFormData(prev => ({...prev, images: prev.images.filter((_, idx) => idx !== i)}))} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={10} />
                    </button>
                  </div>
                ))}
                <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed rounded cursor-pointer hover:bg-slate-50">
                  <Upload size={20} className="text-slate-400" />
                  <input type="file" multiple className="hidden" accept="image/*" onChange={handleFileUpload} />
                </label>
              </div>
              <p className="text-xs text-slate-500">Şəkillər avtomatik sıxılır ki, hostingdə səhifə çökməsin.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Videolar</label>
              <div className="space-y-3 rounded border bg-white p-3">
                <div className="flex gap-2">
                  <input
                    placeholder="YouTube/Vimeo linki və ya /videos/layihe.mp4"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="flex-1 rounded border p-2"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const url = videoUrl.trim()
                      if (!url) return
                      setFormData((prev) => ({ ...prev, videos: [...prev.videos, url] }))
                      setVideoUrl('')
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Əlavə et
                  </Button>
                </div>
                {formData.videos.length > 0 && (
                  <div className="space-y-2">
                    {formData.videos.map((video, index) => (
                      <div key={`${video}-${index}`} className="flex items-center gap-3 rounded-lg border bg-slate-50 px-3 py-2">
                        <Video className="h-4 w-4 shrink-0 text-slate-500" />
                        <span className="min-w-0 flex-1 truncate text-sm">{video}</span>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, videos: prev.videos.filter((_, itemIndex) => itemIndex !== index) }))}
                          className="rounded-full bg-red-500 p-1 text-white"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500">Böyük video fayllarını Hostinger File Manager-ə yükləyib linkini yazın. YouTube/Vimeo linkləri də işləyir.</p>
            </div>

            <textarea placeholder="Təsvir" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded bg-white" />
            
            <div className="flex gap-2">
              <Button onClick={handleSubmit} className="flex-1">Yadda Saxla</Button>
              <Button variant="outline" onClick={handleCancel} className="flex-1">Ləğv Et</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card><CardContent className="p-0 overflow-hidden"><table className="w-full text-sm">
        <thead className="bg-slate-50 border-b"><tr><th className="p-4 text-left font-semibold">Layihə</th><th className="p-4 text-left font-semibold">Kateqoriya</th><th className="p-4 text-right font-semibold">Əməliyyatlar</th></tr></thead>
        <tbody>{projects.map(p => (
          <tr key={p.id} className="border-b hover:bg-slate-50">
            <td className="p-4 font-medium">
              <div>{p.title}</div>
              {(p.videos?.length ?? 0) > 0 && <div className="mt-1 text-xs text-slate-500">{p.videos?.length} video</div>}
            </td><td className="p-4 text-slate-500">{p.category}</td>
            <td className="p-4 text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(p)}><Edit size={16} /></Button>
              <Button variant="ghost" size="sm" onClick={() => deleteProject(p.id)} className="text-red-500 hover:bg-red-50"><Trash2 size={16} /></Button>
            </td>
          </tr>
        ))}</tbody>
      </table></CardContent></Card>
    </>
  )
}
