import type { Metadata } from 'next'

import { NewsPageClient } from './news-page-client'

export const metadata: Metadata = {
  title: 'News',
  description: 'Akin Industry news, project updates, and company announcements.',
}

export default function NewsPage() {
  return <NewsPageClient />
}
