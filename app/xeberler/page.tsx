import { readAdminContentConfig } from '@/lib/server/admin-content-config'
import type { Metadata } from 'next'

import { NewsPageClient } from './news-page-client'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await readAdminContentConfig()
  return { title: data.pageContent['seo/news.title'], description: data.pageContent['seo/news.description'] }
}

export default function NewsPage() {
  return <NewsPageClient />
}
