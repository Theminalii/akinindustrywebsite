'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail, Linkedin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage, type Locale } from '@/lib/language-context'
import { cn } from '@/lib/utils'

const labels: Record<Locale, {
  navigation: Array<{ name: string; href: string }>
  companyType: string
  cta: string
}> = {
  en: {
    navigation: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/haqqimizda' },
      { name: 'Projects', href: '/layiheler' },
      { name: 'Services', href: '/xidmetler' },
      { name: 'News', href: '/xeberler' },
      { name: 'Careers', href: '/karyera' },
      { name: 'Contact', href: '/elaqe' },
    ],
    companyType: 'Construction Company',
    cta: 'Contact Us',
  },
  az: {
    navigation: [
      { name: 'Əsas səhifə', href: '/' },
      { name: 'Haqqımızda', href: '/haqqimizda' },
      { name: 'Layihələr', href: '/layiheler' },
      { name: 'Xidmətlər', href: '/xidmetler' },
      { name: 'Xəbərlər', href: '/xeberler' },
      { name: 'Karyera', href: '/karyera' },
      { name: 'Əlaqə', href: '/elaqe' },
    ],
    companyType: 'Tikinti Şirkəti',
    cta: 'Bizimlə Əlaqə',
  },
}

export function Header() {
  const { contact } = useAdmin()
  const { locale, setLocale } = useLanguage()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const copy = labels[locale]
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

      <nav className={cn('transition-all duration-300', isScrolled ? 'py-3' : 'py-4')}>
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div
              className={cn(
                'flex items-center justify-center rounded-lg overflow-hidden transition-all',
                isScrolled ? 'w-10 h-10' : 'w-12 h-12',
                'bg-transparent'
              )}
            >
              <Image
                src="/logo.png"
                alt="Akin Industry Logo"
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
                Akin Industry
              </span>
              <span className={cn('text-xs transition-all', isScrolled ? 'text-muted-foreground' : 'text-white/70')}>
                {copy.companyType}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {copy.navigation.map((item) => (
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
              {(['en', 'az'] as Locale[]).map((option) => (
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
            <a
              href={`tel:${contact.phone1}`}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                isScrolled
                  ? 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'
                  : 'bg-white/10 text-white hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Phone className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${contact.email1}`}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                isScrolled
                  ? 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'
                  : 'bg-white/10 text-white hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href={contact.linkedinUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                isScrolled
                  ? 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'
                  : 'bg-white/10 text-white hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <Button asChild className="rounded-full px-5 py-3 font-semibold transition-all duration-300 bg-accent text-accent-foreground">
              <Link href="/elaqe">{copy.cta}</Link>
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
          mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
        )}
      >
        <div className="container mx-auto px-4 space-y-2">
          <div className="flex items-center justify-end pb-2">
            <div className="flex items-center rounded-full border border-border bg-card px-1 py-1">
              {(['en', 'az'] as Locale[]).map((option) => (
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
          {copy.navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-3 rounded-md text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <a
              href={`tel:${contact.phone1}`}
              className="flex items-center justify-center rounded-xl border border-border px-3 py-3 text-foreground"
            >
              <Phone className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${contact.email1}`}
              className="flex items-center justify-center rounded-xl border border-border px-3 py-3 text-foreground"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href={contact.linkedinUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-xl border border-border px-3 py-3 text-foreground"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <div className="pt-4">
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/elaqe">{copy.cta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
