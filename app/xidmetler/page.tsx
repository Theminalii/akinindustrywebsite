'use client'

import Link from 'next/link'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, PencilRuler, Wrench, Route, ClipboardCheck, Factory, CheckCircle2, ArrowRight, Phone } from 'lucide-react'
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

const processStepsEn = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'We review your project requirements, goals, and expectations.'
  },
  {
    step: '02',
    title: 'Design & Engineering',
    description: 'We develop the architectural and engineering solutions.'
  },
  {
    step: '03',
    title: 'Budget Proposal',
    description: 'We provide a detailed quotation and execution timeline.'
  },
  {
    step: '04',
    title: 'Construction',
    description: 'We execute the works with strict quality control.'
  },
  {
    step: '05',
    title: 'Handover',
    description: 'We deliver the completed project together with its documentation.'
  },
]

const advantagesEn = [
  'ISO 9001:2015 certified quality management system',
  'Construction materials aligned with international standards',
  '350+ professional engineers and field specialists',
  'Modern construction technologies and equipment',
  '25 years of sector experience and successful delivery',
  'Projects completed on time and within budget',
]

export default function ServicesPage() {
  const { locale } = useLanguage()
  const processSteps =
    locale === 'az'
      ? [
          { step: '01', title: 'İlkin Konsultasiya', description: 'Layihə tələblərinizi, məqsədlərinizi və gözləntilərinizi analiz edirik.' },
          { step: '02', title: 'Layihələndirmə və Mühəndislik', description: 'Memarlıq və mühəndislik həllərini hazırlayırıq.' },
          { step: '03', title: 'Büdcə Təklifi', description: 'Ətraflı qiymət təklifi və icra qrafiki təqdim edirik.' },
          { step: '04', title: 'Tikinti', description: 'İşləri ciddi keyfiyyət nəzarəti ilə icra edirik.' },
          { step: '05', title: 'Təhvil', description: 'Tamamlanmış layihəni sənədləri ilə birlikdə təhvil veririk.' },
        ]
      : processStepsEn
  const advantages =
    locale === 'az'
      ? [
          'ISO 9001:2015 sertifikatlı keyfiyyət idarəetmə sistemi',
          'Beynəlxalq standartlara uyğun tikinti materialları',
          '350+ peşəkar mühəndis və sahə mütəxəssisi',
          'Müasir tikinti texnologiyaları və avadanlıqları',
          '25 illik sektor təcrübəsi və uğurlu təhvil',
          'Vaxtında və büdcə daxilində tamamlanan layihələr',
        ]
      : advantagesEn
  const copy =
    locale === 'az'
      ? {
          headerTitle: 'Xidmətlərimiz',
          headerDescription: 'Tikintinin hər mərhələsi üçün kompleks dəstək',
          offerBadge: 'Nə Təklif Edirik',
          offerTitle: 'Tam Tikinti Həlləri',
          offerDescription:
            'Mühəndislikdən tikintiyə, təmirdən konsaltinqə qədər bütün əsas xidmətləri bir çatı altında təqdim edirik.',
          processBadge: 'İş Prosesimiz',
          processTitle: 'Necə İşləyirik',
          processDescription: 'Hər layihədə şəffaf və sistemli iş axını tətbiq edirik.',
          whyBadge: 'Niyə Biz?',
          whyTitle: 'Etibarlı Tikinti Tərəfdaşınız',
          whyDescription:
            '25 ildən artıq təcrübə və yüzlərlə tamamlanmış layihə ilə peşəkar komandamız sizin tikinti ehtiyaclarınız üçün doğru seçimdir.',
          success: 'Uğurlu Layihə',
          ctaTitle: 'Layihəniz Üçün Ödənişsiz Təklif Alın',
          ctaDescription: 'Layihənizi müzakirə etmək və ətraflı təklif almaq üçün bizimlə əlaqə saxlayın.',
          contact: 'Əlaqə',
        }
      : {
          headerTitle: 'Our Services',
          headerDescription: 'Comprehensive support across every stage of construction',
          offerBadge: 'What We Offer',
          offerTitle: 'End-to-End Construction Solutions',
          offerDescription:
            'From engineering and construction to renovation and consulting, we provide every key service under one roof.',
          processBadge: 'Our Process',
          processTitle: 'How We Work',
          processDescription: 'We apply a transparent and structured workflow to every project.',
          whyBadge: 'Why Us?',
          whyTitle: 'Your Reliable Construction Partner',
          whyDescription:
            'With more than 25 years of experience and hundreds of completed projects, our professional team is the right choice for your construction needs.',
          success: 'Successful Projects',
          ctaTitle: 'Get a Free Quote for Your Project',
          ctaDescription: 'Contact us today to discuss your project and receive a detailed quotation.',
          contact: 'Contact Us',
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
                  src="/images/services-whyus-ai.png"
                  alt="Construction team reviewing plans on a modern building site"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-accent text-accent-foreground p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold">500+</div>
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
                <Link href="/elaqe">
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
                <a href="tel:+994123456789">
                  <Phone className="mr-2 h-4 w-4" />
                  +994 55 350 30 69
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
