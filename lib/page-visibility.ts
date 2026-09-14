export const publicPages = [
  { key: 'home', path: '/' },
  { key: 'haqqimizda', path: '/haqqimizda' },
  { key: 'layiheler', path: '/layiheler' },
  { key: 'xidmetler', path: '/xidmetler' },
  { key: 'xeberler', path: '/xeberler' },
  { key: 'karyera', path: '/karyera' },
  { key: 'elaqe', path: '/elaqe' },
] as const

export type PublicPageKey = (typeof publicPages)[number]['key']

export function pageKeyFromPath(path: string) {
  const normalized = path === '' ? '/' : path
  const match = publicPages
    .filter((page) => page.path !== '/')
    .find((page) => normalized === page.path || normalized.startsWith(`${page.path}/`))
  return match?.key ?? (normalized === '/' ? 'home' : null)
}

export function isPageEnabled(visibility: Record<string, boolean> | undefined, key: string | null) {
  if (!key) return true
  return visibility?.[key] !== false
}

export function isHrefEnabled(visibility: Record<string, boolean> | undefined, href: string) {
  return isPageEnabled(visibility, pageKeyFromPath(href))
}
