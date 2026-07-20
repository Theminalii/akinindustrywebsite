'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Image as ImageIcon } from 'lucide-react'

import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'
import { news as seededNews } from '@/lib/data'
import { formatLocalizedDate, translateNewsArticle } from '@/lib/site-translations'
import type { NewsArticle } from '@/lib/types'

export function NewsPageClient() {
  const { news, isReady } = useAdmin()
  const { locale } = useLanguage()

  const sortedNews = useMemo(() => {
    const merged = new Map<string, NewsArticle>()

    for (const article of [...news, ...seededNews]) {
      merged.set(article.slug, article)
    }

    return [...merged.values()].map((article) => translateNewsArticle(article, locale)).sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [locale, news])

  const standardOnlySlug = 'akin-industry-partners-with-pocketvc-venture-studio'
  const featuredArticle = sortedNews.find((article) => article.slug !== standardOnlySlug)
  const gridArticles = sortedNews.filter((article) => article.slug !== featuredArticle?.slug)

  if (!isReady) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-border/50 bg-card p-8 text-center text-muted-foreground">
            {locale === 'az' ? 'Xəbərlər yüklənir...' : 'Loading news...'}
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <PageHeader
        title={locale === 'az' ? 'Xəbərlər' : 'News'}
        description={locale === 'az' ? 'Son şirkət yenilikləri və elanlar' : 'Our latest company updates and announcements'}
        breadcrumbs={[{ label: locale === 'az' ? 'Xəbərlər' : 'News' }]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {featuredArticle && (
            <Link href={`/xeberler/${featuredArticle.slug}`} className="block mb-12">
              <Card className="group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl transition-all">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden bg-primary/10">
                    {featuredArticle.image ? (
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-primary/40">
                        <ImageIcon className="h-12 w-12" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full">
                        {featuredArticle.category}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4" />
                        {formatLocalizedDate(featuredArticle.date, locale)}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      <span>{locale === 'az' ? 'Ətraflı oxu' : 'Read more'}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          )}

          {!featuredArticle && (
            <div className="mb-12 rounded-2xl border border-border/50 bg-card p-8 text-center">
              <h2 className="text-2xl font-semibold text-foreground">
                {locale === 'az' ? 'Hələ xəbər yoxdur' : 'No news available yet'}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {locale === 'az'
                  ? 'Admin paneldən əlavə edilən xəbərlər burada görünəcək.'
                  : 'News items added from the admin panel will appear here.'}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridArticles.map((article) => (
              <Link key={article.id} href={`/xeberler/${article.slug}`}>
                <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/30">
                  <div className="relative aspect-[16/10] overflow-hidden bg-primary/10">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-primary/40">
                        <ImageIcon className="h-10 w-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4" />
                        {formatLocalizedDate(article.date, locale)}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      <span>{locale === 'az' ? 'Ətraflı oxu' : 'Read more'}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
