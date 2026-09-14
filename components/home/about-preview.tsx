'use client'
import { useCmsText } from '@/lib/admin/page-content'

import Link from 'next/link'
import { ArrowRight, Wrench, Clock, Shield, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'



export function AboutPreview() {
  const cmsText = useCmsText()
  

const features = {
  en: [
    {
      icon: Shield,
      title: cmsText("home/about-preview.001"),
      description: cmsText("home/about-preview.002"),
    },
    {
      icon: Wrench,
      title: cmsText("home/about-preview.003"),
      description: cmsText("home/about-preview.004"),
    },
    {
      icon: Clock,
      title: cmsText("home/about-preview.005"),
      description: cmsText("home/about-preview.006"),
    },
  ],
  az: [
    {
      icon: Shield,
      title: cmsText("home/about-preview.007"),
      description: cmsText("home/about-preview.008"),
    },
    {
      icon: Wrench,
      title: cmsText("home/about-preview.009"),
      description: cmsText("home/about-preview.010"),
    },
    {
      icon: Clock,
      title: cmsText("home/about-preview.011"),
      description: cmsText("home/about-preview.012"),
    },
  ],
}
  const { locale } = useLanguage()
  const copy =
    locale === 'az'
      ? {
          badge: cmsText("home/about-preview.013"),
          titleStart: cmsText("home/about-preview.014"),
          titleAccent: cmsText("home/about-preview.015"),
          titleEnd: cmsText("home/about-preview.016"),
          description:
            cmsText("home/about-preview.017"),
          ctaTitle: cmsText("home/about-preview.018"),
          ctaDescription:
            cmsText("home/about-preview.019"),
          learnMore: cmsText("home/about-preview.020"),
          projects: cmsText("home/about-preview.021"),
        }
      : {
          badge: cmsText("home/about-preview.022"),
          titleStart: cmsText("home/about-preview.023"),
          titleAccent: cmsText("home/about-preview.024"),
          titleEnd: '',
          description:
            cmsText("home/about-preview.025"),
          ctaTitle: cmsText("home/about-preview.026"),
          ctaDescription:
            cmsText("home/about-preview.027"),
          learnMore: cmsText("home/about-preview.028"),
          projects: cmsText("home/about-preview.029"),
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
              <Link href={cmsText("home/about-preview.030")}>
                {copy.learnMore}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={cmsText("home/about-preview.031")}>{copy.projects}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
