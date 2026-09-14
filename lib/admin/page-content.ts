'use client'

import { useAdmin } from './context'

export function useCmsText() {
  const { pageContent } = useAdmin()
  return (key: string, values: Record<string, string | number> = {}): string =>
    (pageContent[key] ?? '').replace(/\{(\w+)\}/g, (placeholder, name: string) =>
      values[name] === undefined ? placeholder : String(values[name]))
}
