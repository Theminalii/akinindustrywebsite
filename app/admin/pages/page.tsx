'use client'

import { optimizeImageFile } from '@/lib/image-upload'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, ExternalLink, FileText, ImageIcon, Loader2, Save, Search, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAdmin } from '@/lib/admin/context'
import catalog from '@/lib/admin/page-catalog.json'
import { cn } from '@/lib/utils'

type CatalogMeta = { label: string; original: string; record?: string }
type PageConfig = { id: string; label: string; description: string; publicHref: string }

const pageList: PageConfig[] = [
  { id: 'home/', label: 'Ana səhifə', description: 'Hero, kartlar, statistikalar, video və CTA', publicHref: '/' },
  { id: 'haqqimizda/', label: 'Haqqımızda', description: 'Şirkət haqqında mətnlər və komanda tərcümələri', publicHref: '/haqqimizda' },
  { id: 'layiheler/', label: 'Layihələr', description: 'Layihələr səhifəsi və layihə kartlarının tərcümələri', publicHref: '/layiheler' },
  { id: 'xidmetler/', label: 'Xidmətlər', description: 'Xidmətlər səhifəsi və xidmət mətnləri', publicHref: '/xidmetler' },
  { id: 'xeberler/', label: 'Xəbərlər', description: 'Xəbər siyahısı, detallar və sertifikat mətnləri', publicHref: '/xeberler' },
  { id: 'karyera/', label: 'Karyera', description: 'Vakansiya səhifəsi və iş elanlarının tərcümələri', publicHref: '/karyera' },
  { id: 'elaqe/', label: 'Əlaqə', description: 'Əlaqə səhifəsi və forma mətnləri', publicHref: '/elaqe' },
  { id: 'layout/', label: 'Menyu və alt hissə', description: 'Header, footer, düymələr və ümumi sayt mətnləri', publicHref: '/' },
  { id: 'shared/', label: 'Ümumi başlıqlar', description: 'Səhifələrdə ortaq istifadə olunan başlıq blokları', publicHref: '/' },
  { id: 'lib/site-translations.ts', label: 'Tərcümələr', description: 'AZ/EN kart mətnləri, kateqoriyalar və siyahı tərcümələri', publicHref: '/' },
  { id: 'seo/', label: 'SEO', description: 'Brauzer başlıqları və meta açıqlamalar', publicHref: '/' },
]

const sectionLabels: Record<string, string> = {
  'hero-carousel': 'Əsas slayder', 'about-preview': 'Haqqımızda bloku', 'services-preview': 'Xidmətlər bloku',
  'featured-projects': 'Seçilmiş layihələr', 'stats-section': 'Statistika', 'video-showcase': 'Videolar',
  'news-preview': 'Xəbərlər bloku', 'partners-section': 'Tərəfdaşlar', 'cta-section': 'Əlaqəyə dəvət',
  header: 'Üst menyu', footer: 'Alt hissə', page: 'Səhifənin məzmunu', 'contact-page-client': 'Əlaqə forması',
  'news-detail-client': 'Xəbərin detalları', 'news-page-client': 'Xəbər siyahısı', 'page-header': 'Səhifə başlığı',
}

const recordGroups: Record<string, string[]> = {
  'home/': ['serviceTranslations', 'projectTranslations', 'certificateTranslations', 'categoryLabels'],
  'haqqimizda/': ['teamTranslations'], 'xidmetler/': ['serviceTranslations'],
  'layiheler/': ['projectTranslations', 'categoryLabels'], 'xeberler/': ['newsTranslations', 'certificateTranslations'],
  'karyera/': ['jobTranslations'],
}

const resourceLinks: Record<string, [string, string][]> = {
  'home/': [['projects', 'Layihə kartları'], ['services', 'Xidmət kartları'], ['news', 'Xəbər kartları'], ['partners', 'Tərəfdaşlar'], ['settings', 'Statistika']],
  'haqqimizda/': [['team', 'Komanda üzvləri'], ['settings', 'Statistika']],
  'xidmetler/': [['services', 'Xidmət siyahısı']],
  'layiheler/': [['projects', 'Layihə siyahısı və şəkilləri']],
  'xeberler/': [['news', 'Xəbərlər'], ['certificates', 'Sertifikatlar']],
  'karyera/': [['jobs', 'Vakansiyalar']],
  'elaqe/': [['contact', 'Telefon, email, ünvan və xəritə']],
  'layout/': [['contact', 'Əlaqə məlumatları']],
}

const sectionOrder = Object.keys(sectionLabels)
const sectionKey = (key: string) => key.slice(0, key.lastIndexOf('.'))
function fieldSectionName(key: string) {
  const name = sectionKey(key).split('/').pop() ?? key
  return sectionLabels[name] ?? (key.startsWith('lib/site-translations.ts') ? 'Kart və siyahı tərcümələri' : name)
}
function isImageValue(value: string) {
  return value.startsWith('data:image/') || /^https?:\/\/.+\.(webp|png|jpe?g|svg|gif)(?:$|\?)/i.test(value) || /^\/.+\.(webp|png|jpe?g|svg|gif)(?:$|\?)/i.test(value)
}
const isProbablyMediaField = (value: string, original: string) => isImageValue(value) || isImageValue(original)
function fieldTitle(meta: CatalogMeta) {
  const parts = meta.label.split('·').map((part) => part.trim()).filter(Boolean)
  return parts.at(-1) ?? meta.label
}

function ContentField({ fieldKey, value, meta, index }: { fieldKey: string; value: string; meta: CatalogMeta; index: number }) {
  const { updatePageContent } = useAdmin()
  const [draft, setDraft] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const text = draft ?? value
  const dirty = draft !== null && draft !== value
  const imageField = isProbablyMediaField(text, meta.original)
  const saveField = async () => {
    setBusy(true); setMessage(''); setSuccess(false)
    try {
      const result = await updatePageContent({ [fieldKey]: text })
      setSuccess(result.success)
      setMessage(result.success ? 'Saxlanıldı. Canlı səhifədə bir neçə saniyəyə görünməlidir.' : result.message ?? 'Saxlanmadı.')
      if (result.success) setDraft(null)
    } finally { setBusy(false) }
  }
  return <form className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" onSubmit={async e => { e.preventDefault(); await saveField() }}>
    <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400"><span>{String(index + 1).padStart(2, '0')}</span><span>{fieldSectionName(fieldKey)}</span></div><h3 className="mt-2 text-base font-semibold text-slate-950">{fieldTitle(meta)}</h3><p className="mt-1 text-xs text-slate-500">{meta.label}</p></div><div className="flex shrink-0 items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{imageField ? <ImageIcon className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}{imageField ? 'Şəkil' : 'Mətn'}</div></div>
    <div className="grid gap-4 p-4 lg:grid-cols-[220px_minmax(0,1fr)]"><div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">{imageField && isImageValue(text) ? <div className="overflow-hidden rounded-xl border border-slate-200 bg-white"><Image src={text} alt={fieldTitle(meta)} width={420} height={260} className="h-40 w-full object-cover" unoptimized /></div> : <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white px-4 text-center text-sm text-slate-400">{imageField ? 'Şəkil URL və ya yüklənmiş şəkil burada görünəcək' : 'Mətn sahəsi'}</div>}{imageField && <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"><Upload className="h-4 w-4" />Şəkil seç<input type="file" accept="image/*" disabled={busy} className="sr-only" onChange={async e => { const file = e.target.files?.[0]; if (!file) return; setBusy(true); setMessage(''); setSuccess(false); try { setDraft(await optimizeImageFile(file)); setMessage('Şəkil hazırdır. İndi Saxla düyməsini bas.') } catch (error) { setMessage(error instanceof Error ? error.message : 'Şəkil yüklənmədi.') } finally { setBusy(false); e.target.value = '' } }} /></label>}</div><div className="space-y-3"><textarea className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100" rows={text.length > 180 ? 6 : 3} value={text} disabled={busy} onChange={e => { setDraft(e.target.value); setMessage(''); setSuccess(false) }} /><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className={cn('min-h-5 text-sm', success ? 'text-emerald-700' : 'text-slate-500')}>{message && <span className="inline-flex items-center gap-2">{success && <CheckCircle2 className="h-4 w-4" />}{message}</span>}</div><div className="flex items-center gap-2">{dirty && <Button type="button" variant="outline" disabled={busy} onClick={() => setDraft(null)}>Ləğv et</Button>}<Button disabled={busy || !dirty} type="submit">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{busy ? 'Saxlanılır' : 'Saxla'}</Button></div></div></div></div>
  </form>
}

export default function PagesEditor() {
  const { pageContent } = useAdmin()
  const searchParams = useSearchParams()
  const requestedPage = searchParams.get('page') ?? 'home/'
  const selectedPage = pageList.some((item) => item.id === requestedPage) ? requestedPage : 'home/'
  const [section, setSection] = useState('')
  const [query, setQuery] = useState('')
  const pageConfig = pageList.find((item) => item.id === selectedPage) ?? pageList[0]
  const entries = useMemo(() => Object.entries(catalog as Record<string, CatalogMeta>).filter(([key, meta]) => key.startsWith(selectedPage) || (meta.record && recordGroups[selectedPage]?.includes(meta.record))).sort(([left], [right]) => { const shared = Number(!left.startsWith(selectedPage)) - Number(!right.startsWith(selectedPage)); if (shared) return shared; const rank = (key: string) => { const name = sectionKey(key).split('/').pop() ?? ''; const i = sectionOrder.indexOf(name); return i < 0 ? 100 : i }; return rank(left) - rank(right) || left.localeCompare(right) }), [selectedPage])
  const groups = useMemo(() => [...new Set(entries.map(([key]) => sectionKey(key)))], [entries])
  const filteredEntries = entries.filter(([key, meta]) => (!section || sectionKey(key) === section) && ((pageContent[key] ?? '') + ' ' + meta.original + ' ' + meta.label).toLocaleLowerCase('az').includes(query.toLocaleLowerCase('az')))
  return <div className="space-y-6"><div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Səhifə redaktoru</p><h1 className="mt-2 text-3xl font-bold text-slate-950">{pageConfig.label}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{pageConfig.description}</p></div><Button asChild variant="outline"><Link href={pageConfig.publicHref} target="_blank">Saytda aç<ExternalLink className="h-4 w-4" /></Link></Button></div></div><div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]"><aside className="h-fit space-y-4 xl:sticky xl:top-6"><div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm"><p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Sayt menyusu</p><div className="space-y-1">{pageList.map(item => <Link key={item.id} href={'/admin/pages?page=' + encodeURIComponent(item.id)} className={cn('block rounded-2xl px-3 py-3 text-sm font-medium transition-colors', selectedPage === item.id ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950')}>{item.label}</Link>)}</div></div>{resourceLinks[selectedPage] && <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm"><p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Siyahılar</p><div className="space-y-1">{resourceLinks[selectedPage].map(([href, label]) => <Link key={href} href={'/admin/' + href} className="block rounded-2xl px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950">{label}</Link>)}</div></div>}</aside><main className="min-w-0 space-y-5"><div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"><div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]"><div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4"><Search className="h-4 w-4 text-slate-400" /><input aria-label="Mətn axtarışı" placeholder="Bu səhifədə mətn axtar..." className="w-full bg-transparent py-3 text-sm outline-none" value={query} onChange={e => setQuery(e.target.value)} /></div><select aria-label="Bölmə" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" value={section} onChange={e => setSection(e.target.value)}><option value="">Bütün bölmələr</option>{groups.map(group => <option key={group} value={group}>{group === 'lib/site-translations.ts' ? 'Kart və siyahı tərcümələri' : fieldSectionName(group + '.000')}</option>)}</select></div></div><div className="space-y-4">{filteredEntries.map(([key, meta], index) => <ContentField key={key} fieldKey={key} value={pageContent[key] ?? ''} meta={meta} index={index} />)}</div></main></div></div>
}
