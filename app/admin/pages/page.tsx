'use client'

import { optimizeImageFile } from '@/lib/image-upload'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  CheckCircle2,
  ExternalLink,
  ImageIcon,
  Loader2,
  Save,
  Search,
  Upload,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAdmin } from '@/lib/admin/context'
import catalog from '@/lib/admin/page-catalog.json'
import { cn } from '@/lib/utils'

type CatalogMeta = { label: string; original: string; record?: string }
type PageConfig = { id: string; label: string; description: string; publicHref: string }
type Entry = [string, CatalogMeta]
type FieldGroup = { primary: Entry; secondary?: Entry }

const pageList: PageConfig[] = [
  { id: 'home/', label: 'Ana səhifə', description: 'Hero, kartlar, statistikalar, video və əlaqə blokları', publicHref: '/' },
  { id: 'haqqimizda/', label: 'Haqqımızda', description: 'Şirkət haqqında mətnlər və komanda tərcümələri', publicHref: '/haqqimizda' },
  { id: 'layiheler/', label: 'Layihələr', description: 'Layihələr səhifəsi və layihə kartlarının tərcümələri', publicHref: '/layiheler' },
  { id: 'xidmetler/', label: 'Xidmətlər', description: 'Xidmətlər səhifəsi və xidmət mətnləri', publicHref: '/xidmetler' },
  { id: 'xeberler/', label: 'Xəbərlər', description: 'Xəbər siyahısı, detallar və sertifikat mətnləri', publicHref: '/xeberler' },
  { id: 'karyera/', label: 'Karyera', description: 'Vakansiya səhifəsi və iş elanlarının tərcümələri', publicHref: '/karyera' },
  { id: 'elaqe/', label: 'Əlaqə', description: 'Əlaqə səhifəsi və forma mətnləri', publicHref: '/elaqe' },
  { id: 'layout/', label: 'Menyu və footer', description: 'Üst menyu, alt hissə, düymələr və ümumi sayt mətnləri', publicHref: '/' },
  { id: 'shared/', label: 'Ümumi başlıqlar', description: 'Səhifələrdə ortaq istifadə olunan başlıq blokları', publicHref: '/' },
]

const pageVisibilityKeys: Record<string, string> = {
  'home/': 'home',
  'haqqimizda/': 'haqqimizda',
  'layiheler/': 'layiheler',
  'xidmetler/': 'xidmetler',
  'xeberler/': 'xeberler',
  'karyera/': 'karyera',
  'elaqe/': 'elaqe',
}

const sectionLabels: Record<string, string> = {
  'hero-carousel': 'Əsas slayder',
  'about-preview': 'Haqqımızda bloku',
  'services-preview': 'Xidmətlər bloku',
  'featured-projects': 'Seçilmiş layihələr',
  'stats-section': 'Statistika',
  'video-showcase': 'Videolar',
  'news-preview': 'Xəbərlər bloku',
  'partners-section': 'Tərəfdaşlar',
  'cta-section': 'Əlaqəyə dəvət',
  header: 'Üst menyu',
  footer: 'Alt hissə',
  page: 'Səhifənin məzmunu',
  'contact-page-client': 'Əlaqə forması',
  'news-detail-client': 'Xəbərin detalları',
  'news-page-client': 'Xəbər siyahısı',
  'page-header': 'Səhifə başlığı',
}

const recordGroups: Record<string, string[]> = {
  'home/': ['serviceTranslations', 'projectTranslations', 'certificateTranslations', 'categoryLabels'],
  'haqqimizda/': ['teamTranslations'],
  'xidmetler/': ['serviceTranslations'],
  'layiheler/': ['projectTranslations', 'categoryLabels'],
  'xeberler/': ['newsTranslations', 'certificateTranslations'],
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

function isImageField(value: string, meta: CatalogMeta) {
  return isImageValue(value) || isImageValue(meta.original) || meta.label.includes('Şəkil')
}

function fieldTitle(meta: CatalogMeta) {
  const parts = meta.label.split('·').map((part) => part.trim()).filter(Boolean)
  return parts.at(-1) ?? meta.label
}

function fieldLanguage(meta: CatalogMeta) {
  if (meta.label.includes('Azərbaycan dili')) return 'Azərbaycan dili'
  if (meta.label.includes('İngilis dili')) return 'İngilis dili'
  return ''
}

function normalizedPairTitle(meta: CatalogMeta) {
  return meta.label
    .replace('Azərbaycan dili', '')
    .replace('İngilis dili', '')
    .replace(/\s*·\s*/g, ' ')
    .trim()
}

function groupEntries(entries: Entry[]) {
  const grouped = new Map<string, { az: Entry[]; en: Entry[]; other: Entry[] }>()
  const groupOrder: string[] = []
  const groups: FieldGroup[] = []

  for (const entry of entries) {
    const [key, meta] = entry
    const language = fieldLanguage(meta)
    const pairKey = `${sectionKey(key)}::${normalizedPairTitle(meta)}::${isImageField('', meta) ? 'image' : 'text'}`
    if (!grouped.has(pairKey)) {
      grouped.set(pairKey, { az: [], en: [], other: [] })
      groupOrder.push(pairKey)
    }
    const bucket = grouped.get(pairKey)!
    if (language === 'Azərbaycan dili') bucket.az.push(entry)
    else if (language === 'İngilis dili') bucket.en.push(entry)
    else bucket.other.push(entry)
  }

  for (const key of groupOrder) {
    const bucket = grouped.get(key)!
    const pairCount = Math.max(bucket.az.length, bucket.en.length)
    for (let index = 0; index < pairCount; index++) {
      const en = bucket.en[index]
      const az = bucket.az[index]
      if (en && az) groups.push({ primary: en, secondary: az })
      else groups.push({ primary: en ?? az })
    }
    for (const entry of bucket.other) groups.push({ primary: entry })
  }

  return groups
}

function EditableValue({
  fieldKey,
  value,
  meta,
  draft,
  busy,
  onDraft,
}: {
  fieldKey: string
  value: string
  meta: CatalogMeta
  draft: string | undefined
  busy: boolean
  onDraft: (key: string, value: string) => void
}) {
  const text = draft ?? value
  const image = isImageField(text, meta)

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700" htmlFor={fieldKey}>
        {fieldLanguage(meta) || fieldTitle(meta)}
      </label>
      {image && (
        <div className="space-y-3">
          {isImageValue(text) && (
            <div className="max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <Image src={text} alt={fieldTitle(meta)} width={560} height={320} className="h-44 w-full object-cover" unoptimized />
            </div>
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            <Upload className="h-4 w-4" />
            Şəkil seç
            <input
              type="file"
              accept="image/*"
              disabled={busy}
              className="sr-only"
              onChange={async (event) => {
                const file = event.target.files?.[0]
                if (!file) return
                onDraft(fieldKey, await optimizeImageFile(file))
                event.target.value = ''
              }}
            />
          </label>
        </div>
      )}
      <textarea
        id={fieldKey}
        className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
        rows={text.length > 180 ? 6 : 3}
        value={text}
        disabled={busy}
        onChange={(event) => onDraft(fieldKey, event.target.value)}
      />
    </div>
  )
}

function ContentGroup({ group, index }: { group: FieldGroup; index: number }) {
  const { updatePageContent, pageContent } = useAdmin()
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const entries = [group.primary, group.secondary].filter(Boolean) as Entry[]
  const firstMeta = group.primary[1]
  const dirtyEntries = entries.filter(([key]) => drafts[key] !== undefined && drafts[key] !== pageContent[key])
  const image = entries.some(([key, meta]) => isImageField(drafts[key] ?? pageContent[key] ?? '', meta))

  const saveGroup = async () => {
    if (!dirtyEntries.length) return
    setBusy(true)
    setMessage('')
    setSuccess(false)

    const changes = Object.fromEntries(dirtyEntries.map(([key]) => [key, drafts[key]]))
    const result = await updatePageContent(changes)

    setBusy(false)
    setSuccess(result.success)
    setMessage(result.success ? 'Saxlanıldı. Canlı səhifədə bir neçə saniyəyə görünməlidir.' : result.message ?? 'Saxlanmadı.')
    if (result.success) setDrafts({})
  }

  return (
    <form className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" onSubmit={async (event) => { event.preventDefault(); await saveGroup() }}>
      <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span>{fieldSectionName(group.primary[0])}</span>
          </div>
          <h3 className="mt-2 text-base font-semibold text-slate-950">{fieldTitle(firstMeta)}</h3>
          <p className="mt-1 text-xs text-slate-500">{normalizedPairTitle(firstMeta) || firstMeta.label}</p>
        </div>
        {image && (
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            <ImageIcon className="h-3.5 w-3.5" />
            Şəkil
          </div>
        )}
      </div>

      <div className="space-y-5 p-4">
        {entries.map(([key, meta]) => (
          <EditableValue
            key={key}
            fieldKey={key}
            value={pageContent[key] ?? ''}
            meta={meta}
            draft={drafts[key]}
            busy={busy}
            onDraft={(draftKey, value) => {
              setDrafts((current) => ({ ...current, [draftKey]: value }))
              setMessage('')
              setSuccess(false)
            }}
          />
        ))}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className={cn('min-h-5 text-sm', success ? 'text-emerald-700' : 'text-slate-500')}>
            {message && <span className="inline-flex items-center gap-2">{success && <CheckCircle2 className="h-4 w-4" />}{message}</span>}
          </div>
          <div className="flex items-center gap-2">
            {dirtyEntries.length > 0 && <Button type="button" variant="outline" disabled={busy} onClick={() => setDrafts({})}>Ləğv et</Button>}
            <Button disabled={busy || dirtyEntries.length === 0} type="submit">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {busy ? 'Saxlanılır' : 'Saxla'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default function PagesEditor() {
  const { pageContent, pageVisibility, updatePageVisibility } = useAdmin()
  const searchParams = useSearchParams()
  const requestedPage = searchParams.get('page') ?? 'home/'
  const selectedPage = pageList.some((item) => item.id === requestedPage) ? requestedPage : 'home/'
  const [section, setSection] = useState('')
  const [query, setQuery] = useState('')
  const pageConfig = pageList.find((item) => item.id === selectedPage) ?? pageList[0]
  const visibilityKey = pageVisibilityKeys[selectedPage]
  const pageEnabled = !visibilityKey || pageVisibility[visibilityKey] !== false
  const [visibilityBusy, setVisibilityBusy] = useState(false)
  const [visibilityMessage, setVisibilityMessage] = useState('')

  const entries = useMemo(() => Object.entries(catalog as Record<string, CatalogMeta>)
    .filter(([key, meta]) => key.startsWith(selectedPage) || (meta.record && recordGroups[selectedPage]?.includes(meta.record)))
    .sort(([left], [right]) => {
      const shared = Number(!left.startsWith(selectedPage)) - Number(!right.startsWith(selectedPage))
      if (shared) return shared
      const rank = (key: string) => {
        const name = sectionKey(key).split('/').pop() ?? ''
        const index = sectionOrder.indexOf(name)
        return index < 0 ? 100 : index
      }
      return rank(left) - rank(right) || left.localeCompare(right)
    }), [selectedPage])

  const groups = useMemo(() => [...new Set(entries.map(([key]) => sectionKey(key)))], [entries])
  const visibleEntries = entries.filter(([key, meta]) => {
    const text = `${pageContent[key] ?? ''} ${meta.original} ${meta.label}`.toLocaleLowerCase('az')
    return (!section || sectionKey(key) === section) && text.includes(query.toLocaleLowerCase('az'))
  })
  const fieldGroups = groupEntries(visibleEntries)

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Səhifə redaktoru</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">{pageConfig.label}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{pageConfig.description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {visibilityKey && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <label className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={pageEnabled}
                    disabled={visibilityBusy}
                    className="h-5 w-5 accent-slate-950"
                    onChange={async (event) => {
                      const enabled = event.target.checked
                      setVisibilityBusy(true)
                      setVisibilityMessage('')
                      const result = await updatePageVisibility(visibilityKey, enabled)
                      setVisibilityBusy(false)
                      setVisibilityMessage(result.success ? (enabled ? 'Səhifə aktiv edildi.' : 'Səhifə müvəqqəti bağlandı.') : result.message ?? 'Dəyişiklik saxlanmadı.')
                    }}
                  />
                  {pageEnabled ? 'Səhifə aktivdir' : 'Səhifə bağlıdır'}
                </label>
                {visibilityMessage && <p className="mt-1 text-xs text-slate-500">{visibilityMessage}</p>}
              </div>
            )}
            <Button asChild variant="outline"><Link href={pageConfig.publicHref} target="_blank">Saytda aç<ExternalLink className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <main className="min-w-0 space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4">
                <Search className="h-4 w-4 text-slate-400" />
                <input aria-label="Mətn axtarışı" placeholder="Bu səhifədə mətn axtar..." className="w-full bg-transparent py-3 text-sm outline-none" value={query} onChange={(event) => setQuery(event.target.value)} />
              </div>
              <select aria-label="Bölmə" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" value={section} onChange={(event) => setSection(event.target.value)}>
                <option value="">Bütün bölmələr</option>
                {groups.map((group) => <option key={group} value={group}>{group === 'lib/site-translations.ts' ? 'Kart və siyahı tərcümələri' : fieldSectionName(`${group}.000`)}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {fieldGroups.map((group, index) => <ContentGroup key={group.primary[0]} group={group} index={index} />)}
          </div>
        </main>

        {resourceLinks[selectedPage] && (
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-6">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Əlaqəli siyahılar</p>
            <div className="space-y-1">
              {resourceLinks[selectedPage].map(([href, label]) => (
                <Link key={href} href={`/admin/${href}`} className="block rounded-2xl px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950">{label}</Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
