'use client'
import { useCmsText } from '@/lib/admin/page-content'

import Link from 'next/link'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, PencilRuler, Wrench, Route, ClipboardCheck, Factory, CheckCircle2, ArrowRight, Phone } from 'lucide-react'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'
import { useSiteTranslations } from '@/lib/site-translations'

const iconMap: Record<string, React.ElementType> = {
  'building': Building2,
  'pencil-ruler': PencilRuler,
  'wrench': Wrench,
  'road': Route,
  'clipboard-check': ClipboardCheck,
  'factory': Factory,
}



export default function ServicesPage() {
  const cmsText = useCmsText()
  const { translateService } = useSiteTranslations()

const processStepsEn = [
  {
    step: cmsText("xidmetler/page.001"),
    title: cmsText("xidmetler/page.002"),
    description: cmsText("xidmetler/page.003")
  },
  {
    step: cmsText("xidmetler/page.004"),
    title: cmsText("xidmetler/page.005"),
    description: cmsText("xidmetler/page.006")
  },
  {
    step: cmsText("xidmetler/page.007"),
    title: cmsText("xidmetler/page.008"),
    description: cmsText("xidmetler/page.009")
  },
  {
    step: cmsText("xidmetler/page.010"),
    title: cmsText("xidmetler/page.011"),
    description: cmsText("xidmetler/page.012")
  },
  {
    step: cmsText("xidmetler/page.013"),
    title: cmsText("xidmetler/page.014"),
    description: cmsText("xidmetler/page.015")
  },
]
  const { locale } = useLanguage()
  const { services, contact, stats } = useAdmin()
  const processSteps =
    locale === 'az'
      ? [
          { step: cmsText("xidmetler/page.016"), title: cmsText("xidmetler/page.017"), description: cmsText("xidmetler/page.018") },
          { step: cmsText("xidmetler/page.019"), title: cmsText("xidmetler/page.020"), description: cmsText("xidmetler/page.021") },
          { step: cmsText("xidmetler/page.022"), title: cmsText("xidmetler/page.023"), description: cmsText("xidmetler/page.024") },
          { step: cmsText("xidmetler/page.025"), title: cmsText("xidmetler/page.026"), description: cmsText("xidmetler/page.027") },
          { step: cmsText("xidmetler/page.028"), title: cmsText("xidmetler/page.029"), description: cmsText("xidmetler/page.030") },
        ]
      : processStepsEn
  const advantages =
    locale === 'az'
      ? [
          cmsText("xidmetler/page.031"),
          cmsText("xidmetler/page.032"),
          cmsText("xidmetler/page.template1", { employees: stats.employees }),
          cmsText("xidmetler/page.033"),
          cmsText("xidmetler/page.template2", { years: stats.years }),
          cmsText("xidmetler/page.034"),
        ]
      : [
          cmsText("xidmetler/page.035"),
          cmsText("xidmetler/page.036"),
          cmsText("xidmetler/page.template3", { employees: stats.employees }),
          cmsText("xidmetler/page.037"),
          cmsText("xidmetler/page.template4", { years: stats.years }),
          cmsText("xidmetler/page.038"),
        ]
  const copy =
    locale === 'az'
      ? {
          headerTitle: cmsText("xidmetler/page.039"),
          headerDescription: cmsText("xidmetler/page.040"),
          offerBadge: cmsText("xidmetler/page.041"),
          offerTitle: cmsText("xidmetler/page.042"),
          offerDescription:
            cmsText("xidmetler/page.043"),
          processBadge: cmsText("xidmetler/page.044"),
          processTitle: cmsText("xidmetler/page.045"),
          processDescription: cmsText("xidmetler/page.046"),
          whyBadge: cmsText("xidmetler/page.047"),
          whyTitle: cmsText("xidmetler/page.048"),
          whyDescription:
            cmsText("xidmetler/page.template5", { years: stats.years, projects: stats.projects }),
          success: cmsText("xidmetler/page.049"),
          ctaTitle: cmsText("xidmetler/page.050"),
          ctaDescription: cmsText("xidmetler/page.051"),
          contact: cmsText("xidmetler/page.052"),
        }
      : {
          headerTitle: cmsText("xidmetler/page.053"),
          headerDescription: cmsText("xidmetler/page.054"),
          offerBadge: cmsText("xidmetler/page.055"),
          offerTitle: cmsText("xidmetler/page.056"),
          offerDescription:
            cmsText("xidmetler/page.057"),
          processBadge: cmsText("xidmetler/page.058"),
          processTitle: cmsText("xidmetler/page.059"),
          processDescription: cmsText("xidmetler/page.060"),
          whyBadge: cmsText("xidmetler/page.061"),
          whyTitle: cmsText("xidmetler/page.062"),
          whyDescription:
            cmsText("xidmetler/page.template6", { years: stats.years, projects: stats.projects }),
          success: cmsText("xidmetler/page.063"),
          ctaTitle: cmsText("xidmetler/page.064"),
          ctaDescription: cmsText("xidmetler/page.065"),
          contact: cmsText("xidmetler/page.066"),
        }
  return (
    <>
      <PageHeader
        title={copy.headerTitle}
        description={copy.headerDescription}
        breadcrumbs={[{ label: copy.headerTitle }]}
      />

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              {copy.offerBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              {copy.offerTitle}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {copy.offerDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item) => {
              const service = translateService(item, locale)
              const Icon = iconMap[service.icon] || Building2
              return (
                <Card 
                  key={service.id}
                  className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              {copy.processBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              {copy.processTitle}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {copy.processDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((item, index) => (
              <div key={index} className="relative text-center">
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-border" />
                )}
                
                {/* Step Circle */}
                <div className="relative z-10 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-primary/10 relative shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                <img
                  src={cmsText("xidmetler/page.067")}
                  alt={cmsText("xidmetler/page.068")}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 right-0 md:bottom-8 md:-right-8 bg-accent text-accent-foreground p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold">{stats.projects}{cmsText("xidmetler/page.069")}</div>
                <div className="text-sm">{copy.success}</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                {copy.whyBadge}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                {copy.whyTitle}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {copy.whyDescription}
              </p>

              <ul className="space-y-4">
                {advantages.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 text-balance">
              {copy.ctaTitle}
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-10">
              {copy.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 group"
              >
                <Link href={cmsText("xidmetler/page.070")}>
                  {copy.contact}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground/30 bg-white text-black hover:bg-white hover:text-black"
              >
                <a href={`tel:${contact.phone1}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {contact.phone1}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
