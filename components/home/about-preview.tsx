'use client'

import Link from 'next/link'
import { ArrowRight, Wrench, Clock, Shield, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'

const features = {
  en: [
    {
      icon: Shield,
      title: 'Quality & Safety',
      description: 'We uphold the highest standards on every project.',
    },
    {
      icon: Wrench,
      title: 'Modern Technologies',
      description: 'We apply the latest construction technologies.',
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: 'Projects are completed on time and within budget.',
    },
  ],
  az: [
    {
      icon: Shield,
      title: 'Keyfiyyət və Təhlükəsizlik',
      description: 'Hər layihədə ən yüksək standartlara sadiq qalırıq.',
    },
    {
      icon: Wrench,
      title: 'Müasir Texnologiyalar',
      description: 'Ən son tikinti texnologiyalarını tətbiq edirik.',
    },
    {
      icon: Clock,
      title: 'Vaxtında Təhvil',
      description: 'Layihələri vaxtında və büdcəyə uyğun tamamlayırıq.',
    },
  ],
}

export function AboutPreview() {
  const { locale } = useLanguage()
  const copy =
    locale === 'az'
      ? {
          badge: 'Azərbaycanın tikinti sektorunda etibarlı lider',
          titleStart: '25+ illik təcrübə ilə',
          titleAccent: 'etibarlı',
          titleEnd: 'tikinti həlləri',
          description:
            'Biz Azərbaycanın ən güvənilən tikinti şirkətlərindən biriyik və yaşayış, kommersiya və sənaye layihələrini yüksək keyfiyyətlə həyata keçiririk.',
          ctaTitle: 'Layihənizi Bizimlə Reallaşdırın',
          ctaDescription:
            'Keyfiyyət, təhlükəsizlik və müştəri məmnuniyyəti bizim üçün hər zaman prioritetdir.',
          learnMore: 'Daha Ətraflı',
          projects: 'Layihələrimiz',
        }
      : {
          badge: 'A Leader in Azerbaijan’s Construction Industry',
          titleStart: 'construction solutions backed by 25+ years of experience',
          titleAccent: 'Reliable',
          titleEnd: '',
          description:
            'We are one of Azerbaijan’s most trusted construction companies, delivering high-quality residential, commercial, and industrial projects.',
          ctaTitle: 'Bring Your Project to Life With Us',
          ctaDescription:
            'We put quality, safety, and client satisfaction first to earn long-term trust.',
          learnMore: 'Learn More',
          projects: 'Our Projects',
        }

  return (
    <section className="py-24 bg-linear-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4" />
            {copy.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 max-w-4xl mx-auto leading-tight">
            {locale === 'az' ? (
              <>
                <span className="text-accent">{copy.titleAccent}</span> {copy.titleEnd} {copy.titleStart}
              </>
            ) : (
              <>
                <span className="text-accent">{copy.titleAccent}</span> {copy.titleStart}
              </>
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {copy.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features[locale].map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center p-8 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">{copy.ctaTitle}</h3>
            <p className="text-muted-foreground">
              {copy.ctaDescription}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link href="/haqqimizda">
                {copy.learnMore}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/layiheler">{copy.projects}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
