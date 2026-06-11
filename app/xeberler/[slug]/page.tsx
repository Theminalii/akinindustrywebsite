import type { Metadata } from 'next'

import { news } from '@/lib/data'

import { NewsDetailClient } from './news-detail-client'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return news.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = news.find((item) => item.slug === slug)

  if (!article) {
    return {
      title: 'News',
      description: 'Akin Industry news detail page.',
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
