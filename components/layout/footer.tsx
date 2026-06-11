'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'

import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'

export function Footer() {
  const { contact } = useAdmin()
  const { locale } = useLanguage()

  const quickLinks =
    locale === 'en'
      ? [
          { name: 'About Us', href: '/haqqimizda' },
          { name: 'Projects', href: '/layiheler' },
          { name: 'Services', href: '/xidmetler' },
          { name: 'News', href: '/xeberler' },
          { name: 'Careers', href: '/karyera' },
          { name: 'Contact', href: '/elaqe' },
        ]
      : [
          { name: 'Haqqımızda', href: '/haqqimizda' },
          { name: 'Layihələr', href: '/layiheler' },
          { name: 'Xidmətlər', href: '/xidmetler' },
          { name: 'Xəbərlər', href: '/xeberler' },
          { name: 'Karyera', href: '/karyera' },
          { name: 'Əlaqə', href: '/elaqe' },
        ]

  const services =
    locale === 'en'
      ? [
          { name: 'Construction Services', href: '/xidmetler' },
          { name: 'Design & Engineering', href: '/xidmetler' },
          { name: 'Renovation & Fit-Out', href: '/xidmetler' },
          { name: 'Infrastructure', href: '/xidmetler' },
          { name: 'Consulting', href: '/xidmetler' },
        ]
      : [
          { name: 'Tikinti Xidmətləri', href: '/xidmetler' },
          { name: 'Layihələndirmə', href: '/xidmetler' },
          { name: 'Təmir və Yenidənqurma', href: '/xidmetler' },
          { name: 'İnfrastruktur', href: '/xidmetler' },
          { name: 'Konsaltinq', href: '/xidmetler' },
        ]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-transparent rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Akin Industry Logo"
                  width={48}
                  height={48}
                  className="h-auto w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-xl">Akin Industry</h3>
                <p className="text-primary-foreground/70 text-sm">
                  {locale === 'en' ? 'Construction Company' : 'Tikinti Şirkəti'}
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              {locale === 'en'
                ? 'One of Azerbaijan’s leading construction companies, backed by more than 25 years of experience. Quality and reliability remain our top priorities.'
                : '25 ildən artıq təcrübə ilə Azərbaycanda tikinti sektorunun lider şirkətlərindən biri. Keyfiyyət və etibarlılıq bizim prioritetimizdir.'}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={contact.linkedinUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">
              {locale === 'en' ? 'Quick Links' : 'Əsas Səhifələr'}
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
              {locale === 'en' ? 'Our Services' : 'Xidmətlərimiz'}
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
            <h4 className="font-semibold text-lg mb-6">{locale === 'en' ? 'Contact' : 'Əlaqə'}</h4>
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
              © {new Date().getFullYear()} Akin Industry. {locale === 'en' ? 'All rights reserved.' : 'Bütün hüquqlar qorunur.'}
              <span className="text-primary-foreground/40">•</span>
              <span className="flex items-center gap-1 hover:text-accent transition-colors cursor-pointer">
                <span>Site By</span>
                <Image
                  src="/cervision.webp"
                  alt="CER Vision"
                  width={60}
                  height={24}
                  className="object-contain h-5 w-auto"
                />
                <span className="font-semibold">CER Vision</span>
              </span>
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                {locale === 'en' ? 'Privacy Policy' : 'Məxfilik Siyasəti'}
              </Link>
              <Link href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                {locale === 'en' ? 'Terms of Use' : 'İstifadə Şərtləri'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
