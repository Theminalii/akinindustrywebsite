'use client'
import { useCmsText } from '@/lib/admin/page-content'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail, Linkedin, MapPinned, Share2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage, type Locale } from '@/lib/language-context'
import { isHrefEnabled } from '@/lib/page-visibility'
import { cn } from '@/lib/utils'



function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M16.8 7.2h.01" />
    </svg>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 8.5V7.1c0-.7.3-1.1 1.2-1.1H17V3.1C16.7 3 15.7 3 14.7 3 12.5 3 11 4.3 11 6.8v1.7H8.5v3.2H11V21h3.2v-9.3h2.5l.4-3.2H14Z" />
    </svg>
  )
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M15.7 3c.3 2 1.4 3.3 3.4 3.5v3.1c-1.2.1-2.3-.3-3.4-1v6.2c0 3.1-2 5.2-5 5.2-2.8 0-4.8-1.8-4.8-4.4 0-2.8 2.2-4.6 5.3-4.4v3.2c-1.3-.2-2.1.3-2.1 1.2 0 .8.6 1.3 1.5 1.3 1.1 0 1.8-.7 1.8-2.1V3h3.3Z" />
    </svg>
  )
}

export function Header() {
  const cmsText = useCmsText()
  

const labels: Record<Locale, {
  navigation: Array<{ name: string; href: string }>
  companyType: string
  cta: string
}> = {
  en: {
    navigation: [
      { name: cmsText("layout/header.001"), href: cmsText("layout/header.002") },
      { name: cmsText("layout/header.003"), href: cmsText("layout/header.004") },
      { name: cmsText("layout/header.005"), href: cmsText("layout/header.006") },
      { name: cmsText("layout/header.007"), href: cmsText("layout/header.008") },
      { name: cmsText("layout/header.009"), href: cmsText("layout/header.010") },
      { name: cmsText("layout/header.011"), href: cmsText("layout/header.012") },
      { name: cmsText("layout/header.013"), href: cmsText("layout/header.014") },
    ],
    companyType: cmsText("layout/header.015"),
    cta: cmsText("layout/header.016"),
  },
  az: {
    navigation: [
      { name: cmsText("layout/header.017"), href: cmsText("layout/header.018") },
      { name: cmsText("layout/header.019"), href: cmsText("layout/header.020") },
      { name: cmsText("layout/header.021"), href: cmsText("layout/header.022") },
      { name: cmsText("layout/header.023"), href: cmsText("layout/header.024") },
      { name: cmsText("layout/header.025"), href: cmsText("layout/header.026") },
      { name: cmsText("layout/header.027"), href: cmsText("layout/header.028") },
      { name: cmsText("layout/header.029"), href: cmsText("layout/header.030") },
    ],
    companyType: cmsText("layout/header.031"),
    cta: cmsText("layout/header.032"),
  },
}
  const { contact, pageVisibility } = useAdmin()
  const { locale, setLocale } = useLanguage()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [socialOpen, setSocialOpen] = useState(false)
  const copy = labels[locale]
  const navigation = copy.navigation.filter((item) => isHrefEnabled(pageVisibility, item.href))
  const mapUrl = contact.googleMapUrl || 'https://maps.app.goo.gl/wh6PTpetRciTJjmS9'
  const socialLinks: Array<{ label: string; href: string; icon: React.ElementType; external?: boolean }> = [
    { label: 'Telefon', href: `tel:${contact.phone1}`, icon: Phone },
    { label: 'Mail', href: `mailto:${contact.email1}`, icon: Mail },
    { label: 'Google Map', href: mapUrl, icon: MapPinned, external: true },
    { label: 'LinkedIn', href: contact.linkedinUrl, icon: Linkedin, external: true },
    { label: 'Facebook', href: contact.facebookUrl, icon: FacebookIcon, external: true },
    { label: 'Instagram', href: contact.instagramUrl, icon: InstagramIcon, external: true },
    { label: 'TikTok', href: contact.tiktokUrl, icon: TikTokIcon, external: true },
  ].filter((item) => item.href)
  const isPocketVcArticle = pathname === '/xeberler/akin-industry-partners-with-pocketvc-venture-studio'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isPocketVcArticle
          ? isScrolled
            ? 'bg-white shadow-md'
            : 'bg-primary shadow-md'
          : isScrolled
            ? 'bg-white shadow-md'
            : 'bg-transparent backdrop-blur-md'
      )}
    >
      <div
        className={cn(
          'border-b border-border/50 transition-all duration-300',
          isPocketVcArticle
            ? isScrolled
              ? 'py-1 bg-white text-foreground'
              : 'py-1 bg-primary text-white border-white/10'
            : isScrolled
              ? 'py-1 bg-white text-foreground'
              : 'py-2 bg-primary/90 text-white'
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="hidden md:flex items-center gap-6">
            <a
              href={`tel:${contact.phone1}`}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>{contact.phone1}</span>
            </a>
            <a
              href={`mailto:${contact.email1}`}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>{contact.email1}</span>
            </a>
          </div>
          <div className="text-xs md:text-sm">{contact.workingHours}</div>
        </div>
      </div>

      <nav className={cn('transition-all duration-300', isScrolled ? "py-3" : "py-4")}>
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <Link href={cmsText("layout/header.035")} className="flex items-center gap-3">
            <div
              className={cn(
                'flex items-center justify-center rounded-lg overflow-hidden transition-all',
                isScrolled ? "w-10 h-10" : "w-12 h-12",
                'bg-transparent'
              )}
            >
              <Image
                src={cmsText("layout/header.038")}
                alt={cmsText("layout/header.039")}
                width={48}
                height={48}
                className="h-auto w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  'font-bold tracking-tight transition-all',
                  isScrolled ? 'text-lg text-foreground' : 'text-xl text-white'
                )}
              >
                {cmsText("layout/header.040")}</span>
              <span className={cn('text-xs transition-all', isScrolled ? 'text-muted-foreground' : 'text-white/70')}>
                {copy.companyType}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  isScrolled
                    ? 'text-foreground hover:bg-secondary hover:text-primary'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <div
              className={cn(
                'flex items-center rounded-full border px-1 py-1 transition-all duration-300',
                isScrolled ? 'border-border bg-white' : 'border-white/15 bg-white/8'
              )}
            >
              {(["en", "az"] as Locale[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLocale(option)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors',
                    locale === option
                      ? 'bg-accent text-accent-foreground'
                      : isScrolled
                        ? 'text-muted-foreground hover:text-foreground'
                        : 'text-white/70 hover:text-white'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="relative">
              <button
                type="button"
                aria-label="Əlaqə və sosial linklər"
                onClick={() => setSocialOpen((open) => !open)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-accent text-accent-foreground hover:bg-accent/90',
                  isScrolled
                    ? 'shadow-sm'
                    : 'shadow-none'
                )}
              >
                <Share2 className="h-5 w-5" />
              </button>
              {socialOpen && (
                <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-border bg-white py-2 text-sm text-foreground shadow-xl">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-secondary"
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                      <span>{item.label}</span>
                    </a>
                  ))}
                  {socialLinks.length === 0 && <span className="block px-4 py-2 text-muted-foreground">Link əlavə edilməyib</span>}
                </div>
              )}
            </div>
            <Button asChild className="rounded-full px-5 py-3 font-semibold transition-all duration-300 bg-accent text-accent-foreground">
              <Link href={cmsText("layout/header.043")}>{copy.cta}</Link>
            </Button>
          </div>

          <button
            className={cn('lg:hidden p-2 rounded-md transition-colors duration-300', isScrolled ? 'text-foreground bg-muted/80' : 'text-white bg-white/10')}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 bg-background border-b border-border',
          mobileMenuOpen ? "max-h-screen py-4" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 space-y-2">
          <div className="flex items-center justify-end pb-2">
            <div className="flex items-center rounded-full border border-border bg-card px-1 py-1">
              {(["en", "az"] as Locale[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLocale(option)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors',
                    locale === option ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-3 rounded-md text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="grid gap-2 pt-2">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                className="flex items-center gap-3 rounded-xl border border-border px-3 py-3 text-foreground"
              >
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </div>
          <div className="pt-4">
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={cmsText("layout/header.048")}>{copy.cta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
