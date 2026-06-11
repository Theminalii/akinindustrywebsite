'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Download } from 'lucide-react'

const imageGallery = [
  { id: '1', name: 'project1.webp', size: '2.4 MB', date: '2024-01-15', category: 'Layihələr' },
  { id: '2', name: 'project2.webp', size: '1.8 MB', date: '2024-01-15', category: 'Layihələr' },
  { id: '3', name: 'project3.webp', size: '2.1 MB', date: '2024-01-14', category: 'Layihələr' },
  { id: '4', name: 'hero-1.png', size: '3.2 MB', date: '2024-01-10', category: 'Qəhvə' },
]

export default function ImagesAdmin() {
  const [images, setImages] = useState(imageGallery)

  const handleDelete = (id: string) => {
    setImages(images.filter(img => img.id !== id))
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Şəkillər</h1>
          <p className="text-muted-foreground">Sayt şəkillərini yönetə</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Şəkil Yüklə
        </Button>
      </div>

      <Card className="border-slate-200 overflow-hidden">
        <CardHeader>
          <CardTitle>Şəkil Siyahısı</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Dosya Adı</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Kateqoriya</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Ölçü</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tarix</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {images.map((image) => (
                  <tr key={image.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{image.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{image.category}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{image.size}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{image.date}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(image.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
