import type { MetadataRoute } from 'next'

import { news, projects } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
  const now = new Date()

  const staticRoutes = ['', '/haqqimizda', '/xidmetler', '/layiheler', '/xeberler', '/karyera', '/elaqe']

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap

  const projectEntries = projects.map((project) => ({
    url: `${siteUrl}/layiheler/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const newsEntries = news.map((article) => ({
    url: `${siteUrl}/xeberler/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...projectEntries, ...newsEntries]
}
