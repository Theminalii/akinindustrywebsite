'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  BrainCircuit,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronRight,
  Quote,
  Settings,
  Users2,
} from 'lucide-react'

import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'
import { news as seededNews } from '@/lib/data'
import { formatLocalizedDate, translateNewsArticle } from '@/lib/site-translations'
import type { NewsArticle } from '@/lib/types'

const targetSlug = 'akin-industry-partners-with-pocketvc-venture-studio'

function mergeNews(adminNews: NewsArticle[], locale: 'en' | 'az') {
  const merged = new Map<string, NewsArticle>()

  for (const article of [...adminNews, ...seededNews]) {
    merged.set(article.slug, translateNewsArticle(article, locale))
  }

  return [...merged.values()].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

function PremiumNewsPage({ article, locale }: { article: NewsArticle; locale: 'en' | 'az' }) {
  const featureItems =
    locale === 'az'
      ? [
          { icon: BrainCircuit, title: 'Agentic AI İş Axınları', description: 'Daha ağıllı avtomatlaşdırma və qərarvermə' },
          { icon: Settings, title: 'Əməliyyat Mükəmməlliyi', description: 'Sadələşdirilmiş proseslər və yüksək səmərəlilik' },
          { icon: ChartNoAxesCombined, title: 'Satışların Gücləndirilməsi', description: 'Daha yaxşı analiz və güclü müştəri əlaqələri' },
          { icon: Users2, title: 'Strateji Tərəfdaşlıq', description: 'Uzunmüddətli təsir üçün innovasiya yönümlü əməkdaşlıq' },
        ]
      : [
          { icon: BrainCircuit, title: 'Agentic AI Workflows', description: 'Smarter automation and decision-making' },
          { icon: Settings, title: 'Operational Excellence', description: 'Streamlined processes and greater efficiency' },
          { icon: ChartNoAxesCombined, title: 'Sales Enablement', description: 'Better insights and stronger client engagement' },
          { icon: Users2, title: 'Strategic Partnership', description: 'Innovation-focused collaboration for long-term impact' },
        ]
  const premiumCopy =
    locale === 'az'
      ? {
          subtitle:
            'Əməliyyat və satış proseslərimizi transformasiya edəcək AI alətlərinin hazırlanması və tətbiqi üçün strateji tərəfdaşlıq.',
          bodyOne:
            'PocketVC Venture Studio-nun partnyoru Chinara Askerzade ilə ən son tərəfdaşlığımızı məmnuniyyətlə elan edirik. Bu əməkdaşlıq əməliyyat və satış proseslərimizdə agentic AI iş axınlarının hazırlanması və tətbiqini dəstəkləyəcək.',
          bodyTwo:
            'Bu tərəfdaşlıq daxili iş axınlarımızı sadələşdirməyə, səmərəliliyi artırmağa, əsas prosesləri avtomatlaşdırmağa və müştərilərimizlə əlaqə üsulumuzu gücləndirməyə kömək edəcək. Nəticədə daha ağıllı qərarlar və dayanıqlı inkişaf əldə edəcəyik.',
          quote:
            'Akin Industry ilə birlikdə real əməliyyat və kommersiya təsiri yaradan agentic AI həlləri qurmaq və tətbiq etmək bizi çox həyəcanlandırır.',
          heroAlt: 'Akin Industry və PocketVC Venture Studio tərəfdaşlıq vizualı',
          portraitAlt: 'Chinara Askerzade portreti',
        }
      : {
          subtitle:
            'A strategic partnership to develop and implement AI tools that will transform our operations and sales processes.',
          bodyOne:
            'We are pleased to announce our latest partnership with Chinara Askerzade, Partner at PocketVC Venture Studio, to support the development and implementation of agentic AI workflows across our operations and sales processes.',
          bodyTwo:
            'This collaboration will help us streamline internal workflows, improve efficiency, automate key processes, and enhance the way we engage with our clients-driving smarter decisions and sustainable growth.',
          quote:
            'We’re excited to partner with Akin Industry to build and implement agentic AI solutions that drive real operational and commercial impact.',
          heroAlt: 'Akin Industry and PocketVC Venture Studio partnership visual',
          portraitAlt: 'Chinara Askerzade portrait',
        }
  return (
    <div className="min-h-screen bg-[#f7f6f3] text-[#070b16]">
      <section className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pt-32 md:pt-36 lg:px-8 lg:pb-16">
        <div className="pointer-events-none absolute inset-0 opacity-[0.42]">
          <div className="absolute left-[-10%] top-[6%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(219,186,120,0.16),rgba(219,186,120,0))]" />
          <div className="absolute right-[-8%] top-[16%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(88,123,180,0.10),rgba(88,123,180,0))]" />
          <div className="absolute bottom-[-6rem] left-[18%] h-[20rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(219,186,120,0.10),rgba(219,186,120,0))]" />
        </div>

        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-[13px] text-[#7b818b]">
            <Link href="/" className="transition-colors hover:text-[#070b16]">
              {locale === 'az' ? 'Ana səhifə' : 'Home'}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/xeberler" className="transition-colors hover:text-[#070b16]">
              {locale === 'az' ? 'Xəbərlər' : 'News'}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#6b7280]">
              {locale === 'az'
                ? 'Akin Industry PocketVC Venture Studio ilə tərəfdaşlıq edir'
                : 'Akin Industry Partners with PocketVC Venture Studio'}
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,47%)_minmax(0,53%)] lg:items-start lg:gap-14">
            <div className="order-2 flex flex-col justify-center pt-2 sm:pt-4 lg:order-1 lg:pt-14">
              <span className="mb-4 inline-flex text-[12px] font-semibold uppercase tracking-[0.02em] text-[#d89b22]">
                {locale === 'az' ? 'TƏRƏFDAŞLIQ ELANI' : 'PARTNERSHIP ANNOUNCEMENT'}
              </span>

              <h1
                className="max-w-[12ch] text-[2.15rem] font-extrabold leading-[1.08] tracking-[-0.05em] text-[#111827] sm:text-[2.75rem] md:text-[3.2rem] lg:text-[4rem]"
                style={{ fontFamily: '"Inter", "Manrope", sans-serif' }}
              >
                Akin Industry Partners with PocketVC Venture Studio to Implement Agentic AI
                Workflows
              </h1>

              <p className="mt-5 max-w-[34rem] text-[1rem] leading-[1.55] text-[#374151] sm:text-[1.08rem] lg:text-[1.18rem]">
                {premiumCopy.subtitle}
              </p>

              <span className="mt-7 h-[3px] w-12 rounded-full bg-[#d89b22]" />

              <div className="mt-8 flex items-center gap-3 text-[0.98rem] text-[#374151]">
                <CalendarDays className="h-[18px] w-[18px] text-[#6b7280]" />
                <span>{locale === 'az' ? '11 may 2026' : 'May 11th 2026'}</span>
              </div>
            </div>

            <div className="order-1 relative overflow-hidden rounded-[18px] shadow-[0_28px_80px_rgba(6,11,19,0.18)] lg:order-2">
              <Image
                src="/images/akin-pocketvc-hero-new.png"
                alt={premiumCopy.heroAlt}
                width={1600}
                height={1100}
                className="h-full min-h-[220px] w-full object-cover object-center sm:min-h-[320px] md:min-h-[420px] lg:min-h-[540px]"
                priority
              />
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[minmax(0,47%)_minmax(0,53%)] lg:items-start lg:gap-14">
            <article className="order-2 space-y-7 pt-1 lg:order-1 lg:pt-2">
              <p className="max-w-[34rem] text-[1rem] leading-[1.75] text-[#111827] sm:text-[1.05rem]">
                {premiumCopy.bodyOne}
              </p>
              <p className="max-w-[34rem] text-[1rem] leading-[1.75] text-[#111827] sm:text-[1.05rem]">
                {premiumCopy.bodyTwo}
              </p>
            </article>

            <aside className="order-1 rounded-[18px] bg-[#faf8f4] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] ring-1 ring-[#f1ede5] sm:p-8 lg:order-2">
              <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between md:gap-8">
                <div className="min-w-0 flex-1">
                  <Quote className="h-12 w-12 text-[#d89b22]" strokeWidth={1.8} />
                  <p className="mt-3 max-w-[33rem] text-[0.98rem] leading-[1.7] text-[#111827] sm:text-[1.04rem]">
                    {premiumCopy.quote}
                  </p>
                  <span className="mt-5 block h-[2px] w-10 rounded-full bg-[#d89b22]" />
                  <div className="mt-5">
                    <p className="text-[1rem] font-bold text-[#111827]">Chinara Askerzade</p>
                    <p className="mt-1 text-[0.96rem] leading-7 text-[#4b5563]">
                      {locale === 'az' ? 'Partnyor, PocketVC Venture Studio' : 'Partner, PocketVC Venture Studio'}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center md:justify-end">
                  <div className="overflow-hidden rounded-full ring-2 ring-[#ece4d4]">
                    <Image
                      src="/images/chinara-askerzade.jpeg"
                      alt={premiumCopy.portraitAlt}
                      width={136}
                      height={136}
                      className="h-[108px] w-[108px] object-cover object-center sm:h-[120px] sm:w-[120px] md:h-[136px] md:w-[136px]"
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <section className="mt-8 rounded-[18px] bg-[#faf8f4] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.05)] ring-1 ring-[#f1ede5] sm:p-5 lg:mt-7 lg:p-6">
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {featureItems.map((item, index) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className={`flex gap-4 rounded-[14px] px-4 py-5 sm:px-5 lg:min-h-[110px] lg:items-start lg:px-6 lg:py-4 ${
                      index < featureItems.length - 1 ? 'md:border-r-0 lg:border-r lg:border-[#e7e2d9]' : ''
                    }`}
                  >
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center text-[#d89b22]">
                      <Icon className="h-9 w-9" strokeWidth={1.55} />
                    </div>
                    <div>
                      <h2 className="text-[0.98rem] font-bold text-[#111827]">{item.title}</h2>
                      <p className="mt-1.5 max-w-[18ch] text-[0.94rem] leading-6 text-[#374151]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}

function GenericNewsPage({ article, locale }: { article: NewsArticle; locale: 'en' | 'az' }) {
  const paragraphs = article.content.split('\n\n')

  return (
    <section className="bg-background px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-accent/15 px-4 py-2 font-medium text-[#d89b22]">
            {article.category}
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {formatLocalizedDate(article.date, locale)}
          </span>
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{article.excerpt}</p>

        <div className="relative mt-10 overflow-hidden rounded-[24px] bg-[#0d1624] shadow-[0_25px_60px_rgba(15,23,42,0.18)]">
          <Image
            src={article.image}
            alt={article.title}
            width={1600}
            height={960}
            className="h-full w-full object-cover"
          />
        </div>

        <article className="mt-10 rounded-[24px] bg-card p-7 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-10">
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${article.slug}-${index}`}
              className={`text-[1.02rem] leading-8 text-muted-foreground ${index < paragraphs.length - 1 ? 'mb-6' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </article>
      </div>
    </section>
  )
}

export function NewsDetailClient({ slug }: { slug: string }) {
  const { news: adminNews, isReady } = useAdmin()
  const { locale } = useLanguage()

  const allNews = useMemo(() => mergeNews(adminNews, locale), [adminNews, locale])
  const article = allNews.find((item) => item.slug === slug)

  if (!isReady && slug !== targetSlug) {
    return (
      <section className="bg-background px-4 py-24">
        <div className="mx-auto max-w-4xl rounded-[24px] bg-card p-10 text-center text-muted-foreground shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          {locale === 'az' ? 'Məqalə yüklənir...' : 'Loading article...'}
        </div>
      </section>
    )
  }

  if (!article) {
    return (
      <section className="bg-background px-4 py-24">
        <div className="mx-auto max-w-3xl rounded-[24px] bg-card p-10 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <h1 className="text-3xl font-bold text-foreground">{locale === 'az' ? 'Məqalə tapılmadı' : 'Article not found'}</h1>
          <p className="mt-4 text-muted-foreground">
            {locale === 'az'
              ? 'Bu məqalə mövcud deyil və ya keçidi dəyişib.'
              : 'This article does not exist or its link has changed.'}
          </p>
          <Link
            href="/xeberler"
            className="mt-6 inline-flex rounded-full bg-[#060b13] px-6 py-3 text-sm font-semibold text-white"
          >
            {locale === 'az' ? 'Bütün xəbərlərə qayıt' : 'Back to all news'}
          </Link>
        </div>
      </section>
    )
  }

  if (article.slug === targetSlug) {
    return <PremiumNewsPage article={article} locale={locale} />
  }

  return <GenericNewsPage article={article} locale={locale} />
}
