import type { Metadata } from 'next'

import { readAdminContentConfig } from '@/lib/server/admin-content-config'

import { NewsDetailClient } from './news-detail-client'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { data } = await readAdminContentConfig()
  const article = data.news.find((item) => item.slug === slug)

  if (!article) {
    return {
      title: data.pageContent['seo/news.title'],
      description: data.pageContent['seo/news.description'],
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params

  return <NewsDetailClient slug={slug} />
}
