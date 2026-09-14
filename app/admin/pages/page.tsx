'use client'

import { optimizeImageFile } from '@/lib/image-upload'
import { useState } from 'react'
import Link from 'next/link'
import { useAdmin } from '@/lib/admin/context'
import catalog from '@/lib/admin/page-catalog.json'
import { Button } from '@/components/ui/button'

const pages = [
  ['home/', 'Ana səhifə'], ['haqqimizda/', 'Haqqımızda'], ['xidmetler/', 'Xidmətlər'],
  ['layiheler/', 'Layihələr'], ['xeberler/', 'Xəbərlər'], ['karyera/', 'Karyera'],
  ['elaqe/', 'Əlaqə'], ['layout/', 'Menyu və alt hissə'], ['shared/', 'Ümumi başlıqlar'],
  ['lib/site-translations.ts', 'Məlumatların tərcümələri'], ['seo/', 'SEO və brauzer başlıqları'],
]
const sections: Record<string, string> = {
  'hero-carousel': 'Əsas slayder', 'about-preview': 'Haqqımızda bloku', 'services-preview': 'Xidmətlər bloku',
  'featured-projects': 'Seçilmiş layihələr', 'stats-section': 'Statistika', 'video-showcase': 'Videolar',
  'news-preview': 'Xəbərlər bloku', 'partners-section': 'Tərəfdaşlar', 'cta-section': 'Əlaqəyə dəvət',
  header: 'Üst menyu', footer: 'Alt hissə', page: 'Səhifənin məzmunu', 'contact-page-client': 'Əlaqə forması',
  'news-detail-client': 'Xəbərin detalları', 'news-page-client': 'Xəbər siyahısı', 'page-header': 'Səhifə başlığı',
}
const resources: Record<string, [string, string][]> = {
  'home/': [['projects','Layihələr'],['services','Xidmətlər'],['news','Xəbərlər'],['partners','Tərəfdaşlar'],['settings','Statistika']],
  'haqqimizda/': [['team','Komanda'],['settings','Statistika']], 'xidmetler/': [['services','Xidmət siyahısı']],
  'layiheler/': [['projects','Layihə siyahısı və şəkilləri']], 'xeberler/': [['news','Xəbərlər'],['certificates','Sertifikatlar']],
  'karyera/': [['jobs','Vakansiyalar']], 'elaqe/': [['contact','Telefon, email, ünvan və xəritə']],
  'layout/': [['contact','Əlaqə məlumatları']],
}

function ContentField({ fieldKey, value, label, original }: { fieldKey: string; value: string; label: string; original: string }) {
  const { updatePageContent } = useAdmin()
  const [draft, setDraft] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const text = draft ?? value
  const dirty = draft !== null && draft !== value
  return <form className="rounded-xl border bg-white p-5 space-y-3" onSubmit={async e => {
    e.preventDefault(); setBusy(true); setMessage('')
    try {
      const result = await updatePageContent({ [fieldKey]: text })
      setMessage(result.success ? 'Verilənlər bazasında saxlanıldı.' : result.message ?? 'Saxlanmadı.')
      if (result.success) setDraft(null)
    } finally { setBusy(false) }
  }}>
    <label className="block font-medium" htmlFor={fieldKey}>{original.length > 110 ? original.slice(0,110) + '…' : original}</label>
    {label && <p className="text-xs text-slate-500">{label}</p>}
    {/\.(webp|png|jpe?g|svg|gif)(?:$|\?)/i.test(original) && <label className="block text-sm">Şəkil yüklə
      <input type="file" accept="image/*" disabled={busy} className="mt-2 block" onChange={async e => {
        const file = e.target.files?.[0]
        if (!file) return
        setBusy(true)
        try { setDraft(await optimizeImageFile(file)); setMessage('Şəkil hazırdır. Saxla düyməsini basın.') }
        catch (error) { setMessage(error instanceof Error ? error.message : 'Şəkil yüklənmədi.') }
        finally { setBusy(false); e.target.value = '' }
      }} />
    </label>}
    <textarea id={fieldKey} className="w-full rounded-lg border p-3 text-sm" rows={text.length > 180 ? 5 : 2} value={text} disabled={busy} onChange={e => { setDraft(e.target.value); setMessage('') }} />
    <div className="flex items-center gap-3">
      <Button disabled={busy || !dirty} type="submit">{busy ? 'Saxlanılır…' : 'Saxla'}</Button>
      {dirty && <Button type="button" variant="outline" disabled={busy} onClick={() => setDraft(null)}>Dəyişikliyi ləğv et</Button>}
      <span role="status" className="text-sm">{message}</span>
    </div>
  </form>
}

export default function PagesEditor() {
  const { pageContent } = useAdmin()
  const [page, setPage] = useState('home/')
  const [section, setSection] = useState('')
  const [query, setQuery] = useState('')
  const translationGroups: Record<string, string[]> = {
    'home/': ['serviceTranslations','projectTranslations','certificateTranslations','categoryLabels'],
    'haqqimizda/': ['teamTranslations'], 'xidmetler/': ['serviceTranslations'],
    'layiheler/': ['projectTranslations','categoryLabels'], 'xeberler/': ['newsTranslations','certificateTranslations'],
    'karyera/': ['jobTranslations'],
  }
  const entries = Object.entries(catalog).filter(([key, meta]) => key.startsWith(page) || ('record' in meta && translationGroups[page]?.includes(String(meta.record))))
    .sort(([left], [right]) => {
      const shared = Number(!left.startsWith(page)) - Number(!right.startsWith(page))
      if (shared) return shared
      const order = Object.keys(sections)
      const rank = (key: string) => { const index = order.indexOf(key.slice(0,key.lastIndexOf('.')).split('/').pop()!); return index < 0 ? 100 : index }
      return rank(left) - rank(right)
    })
  const groups = [...new Set(entries.map(([key]) => key.slice(0,key.lastIndexOf('.'))))]
  return <div className="space-y-6">
    <div><h1 className="text-3xl font-bold">Səhifələrin məzmunu</h1><p className="mt-2 text-slate-600">Səhifəni seçin, istədiyiniz sahəni dəyişib saxlayın. Azərbaycan və ingilis mətnləri ayrıca redaktə edilir.</p></div>
    <div className="sticky top-0 z-10 rounded-xl border bg-slate-50 p-4 grid gap-3 md:grid-cols-3">
      <select aria-label="Səhifə" className="border rounded-lg p-3" value={page} onChange={e => { setPage(e.target.value);setSection('');setQuery('') }}>{pages.map(([id,label]) => <option key={id} value={id}>{label}</option>)}</select>
      <select aria-label="Bölmə" className="border rounded-lg p-3" value={section} onChange={e => setSection(e.target.value)}><option value="">Bütün bölmələr</option>{groups.map(g => <option key={g} value={g}>{g === 'lib/site-translations.ts' ? 'Azərbaycan dilində məlumatlar və kateqoriyalar' : sections[g.split('/').pop()!] ?? g}</option>)}</select>
      <input aria-label="Mətn axtarışı" placeholder="Mətn axtar…" className="border rounded-lg p-3" value={query} onChange={e => setQuery(e.target.value)} />
    </div>
    <div className="flex flex-wrap gap-3">{resources[page]?.map(([href,label]) => <Button key={href} asChild variant="outline"><Link href={'/admin/'+href}>{label}</Link></Button>)}</div>
    <div className="grid gap-4">{entries.filter(([key,meta]) => (!section || key.slice(0,key.lastIndexOf('.')) === section) && `${pageContent[key]} ${meta.original} ${meta.label}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())).map(([key,meta]) => <ContentField key={key} fieldKey={key} value={pageContent[key] ?? ''} {...meta} />)}</div>
  </div>
}
