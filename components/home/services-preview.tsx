'use client'

import Link from 'next/link'
import { Building2, PencilRuler, Wrench, Route, ClipboardCheck, Factory, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/data'
import { useLanguage } from '@/lib/language-context'
import { translateService } from '@/lib/site-translations'

const iconMap: Record<string, React.ElementType> = {
  'building': Building2,
  'pencil-ruler': PencilRuler,
  'wrench': Wrench,
  'road': Route,
  'clipboard-check': ClipboardCheck,
  'factory': Factory,
}

export function ServicesPreview() {
  const { locale } = useLanguage()
  const copy =
    locale === 'az'
      ? {
          badge: 'Xidmətlərimiz',
          title: 'Tam Tikinti Həlləri',
          description:
            'Mühəndislikdən tikintiyə, təmirdən konsaltinqə qədər bütün əsas xidmətləri bir çatı altında təqdim edirik.',
          cta: 'Bütün Xidmətlər',
        }
      : {
          badge: 'Our Services',
          title: 'End-to-End Construction Solutions',
          description:
            'From engineering and construction to renovation and consulting, we provide every key service under one roof.',
          cta: 'View All Services',
        }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {copy.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {copy.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {copy.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => {
            const service = translateService(item, locale)
            const Icon = iconMap[service.icon] || Building2
            return (
              <Card 
                key={service.id}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="group">
              <Link href="/xidmetler">
              {copy.cta}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
