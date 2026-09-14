'use client'
import { useCmsText } from '@/lib/admin/page-content'

import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react'

import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'

export function Footer() {
  const cmsText = useCmsText()
  

  const { contact, stats } = useAdmin()
  const { locale } = useLanguage()

  const quickLinks =
    locale === 'en'
      ? [
          { name: cmsText("layout/footer.001"), href: cmsText("layout/footer.002") },
          { name: cmsText("layout/footer.003"), href: cmsText("layout/footer.004") },
          { name: cmsText("layout/footer.005"), href: cmsText("layout/footer.006") },
          { name: cmsText("layout/footer.007"), href: cmsText("layout/footer.008") },
          { name: cmsText("layout/footer.009"), href: cmsText("layout/footer.010") },
          { name: cmsText("layout/footer.011"), href: cmsText("layout/footer.012") },
        ]
      : [
          { name: cmsText("layout/footer.013"), href: cmsText("layout/footer.014") },
          { name: cmsText("layout/footer.015"), href: cmsText("layout/footer.016") },
          { name: cmsText("layout/footer.017"), href: cmsText("layout/footer.018") },
          { name: cmsText("layout/footer.019"), href: cmsText("layout/footer.020") },
          { name: cmsText("layout/footer.021"), href: cmsText("layout/footer.022") },
          { name: cmsText("layout/footer.023"), href: cmsText("layout/footer.024") },
        ]

  const services =
    locale === 'en'
      ? [
          { name: cmsText("layout/footer.025"), href: cmsText("layout/footer.026") },
          { name: cmsText("layout/footer.027"), href: cmsText("layout/footer.028") },
          { name: cmsText("layout/footer.029"), href: cmsText("layout/footer.030") },
          { name: cmsText("layout/footer.031"), href: cmsText("layout/footer.032") },
          { name: cmsText("layout/footer.033"), href: cmsText("layout/footer.034") },
        ]
      : [
          { name: cmsText("layout/footer.035"), href: cmsText("layout/footer.036") },
          { name: cmsText("layout/footer.037"), href: cmsText("layout/footer.038") },
          { name: cmsText("layout/footer.039"), href: cmsText("layout/footer.040") },
          { name: cmsText("layout/footer.041"), href: cmsText("layout/footer.042") },
          { name: cmsText("layout/footer.043"), href: cmsText("layout/footer.044") },
        ]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-transparent rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={cmsText("layout/footer.045")}
                  alt={cmsText("layout/footer.046")}
                  width={48}
                  height={48}
                  className="h-auto w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-xl">{cmsText("layout/footer.047")}</h3>
                <p className="text-primary-foreground/70 text-sm">
                  {locale === 'en' ? cmsText("layout/footer.048") : cmsText("layout/footer.049")}
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              {locale === 'en'
                ? cmsText("layout/footer.template1", { years: stats.years })
                : cmsText("layout/footer.template2", { years: stats.years })}
            </p>
            {contact.linkedinUrl && (
              <div className="flex gap-4">
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={cmsText("layout/footer.050")}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">
              {locale === 'en' ? cmsText("layout/footer.051") : cmsText("layout/footer.052")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-primary-foreground/80 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">
              {locale === 'en' ? cmsText("layout/footer.053") : cmsText("layout/footer.054")}
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-primary-foreground/80 hover:text-accent transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">{locale === 'en' ? cmsText("layout/footer.055") : cmsText("layout/footer.056")}</h4>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${contact.phone1}`} className="flex items-start gap-3 text-primary-foreground/80 hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 mt-0.5 shrink-0" />
                  <span>{contact.phone1}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email1}`} className="flex items-start gap-3 text-primary-foreground/80 hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 mt-0.5 shrink-0" />
                  <span>{contact.email1}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-primary-foreground/80">
                  <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                  <span>{contact.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm flex items-center gap-2">
              {cmsText("layout/footer.057")}{new Date().getFullYear()} {cmsText("layout/footer.058")}{locale === 'en' ? cmsText("layout/footer.059") : cmsText("layout/footer.060")}
              <span className="text-primary-foreground/40">{cmsText("layout/footer.061")}</span>
              <span className="flex items-center gap-1 hover:text-accent transition-colors cursor-pointer">
                <span>{cmsText("layout/footer.062")}</span>
                <Image
                  src={cmsText("layout/footer.063")}
                  alt={cmsText("layout/footer.064")}
                  width={60}
                  height={24}
                  className="object-contain h-5 w-auto"
                />
                <span className="font-semibold">{cmsText("layout/footer.065")}</span>
              </span>
            </p>
            <div className="flex gap-6 text-sm text-primary-foreground/60">
              <span>
                {locale === 'en' ? cmsText("layout/footer.066") : cmsText("layout/footer.067")}
              </span>
              <span>
                {locale === 'en' ? cmsText("layout/footer.068") : cmsText("layout/footer.069")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
