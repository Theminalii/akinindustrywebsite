'use client'

import Link from 'next/link'
import { ArrowRight, Award, Image as ImageIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'
import { translateCertificate } from '@/lib/site-translations'

export function NewsPreview() {
  const { certificates } = useAdmin()
  const { locale } = useLanguage()
  const copy =
    locale === 'az'
      ? {
          badge: 'Sertifikatlar',
          title: 'Sertifikatlarımız',
          learnMore: 'Daha Ətraflı',
          readMore: 'Ətraflı oxu',
        }
      : {
          badge: 'Certifications',
          title: 'Our Certifications',
          learnMore: 'Learn More',
          readMore: 'Read more',
        }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              {copy.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              {copy.title}
            </h2>
          </div>
          <Button asChild variant="outline" className="group w-fit">
            <Link href="/haqqimizda">
              {copy.learnMore}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((item) => {
            const certificate = translateCertificate(item, locale)
            return (
            <Link key={certificate.id} href={`#${certificate.slug}`}>
              <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/30">
                <div className="relative aspect-[16/10] overflow-hidden bg-primary/10">
                  {certificate.image ? (
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-primary/40">
                      <ImageIcon className="h-10 w-10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/10" />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                      <Award className="h-3 w-3" />
                      {certificate.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {certificate.title}
                  </h3>

                  <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                    {certificate.description}
                  </p>

                  <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    <span>{copy.readMore}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
