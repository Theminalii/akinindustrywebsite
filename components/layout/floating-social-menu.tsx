'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Mail, Phone, Linkedin } from 'lucide-react'

import { useAdmin } from '@/lib/admin/context'
import { cn } from '@/lib/utils'
import styles from './floating-social-menu.module.css'

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

export function FloatingSocialMenu() {
  const { contact } = useAdmin()
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'Telefon', href: `tel:${contact.phone1}`, icon: Phone, color: 'bg-amber-400 text-white', show: Boolean(contact.phone1), x: -12, y: -92 },
    { label: 'Mail', href: `mailto:${contact.email1}`, icon: Mail, color: 'bg-amber-400 text-white', show: Boolean(contact.email1), x: -92, y: -48 },
    { label: 'Instagram', href: contact.instagramUrl, icon: InstagramIcon, color: 'bg-pink-500 text-white', show: Boolean(contact.instagramUrl), x: -28, y: 96, external: true },
    { label: 'Facebook', href: contact.facebookUrl, icon: FacebookIcon, color: 'bg-blue-600 text-white', show: Boolean(contact.facebookUrl), x: 58, y: 62, external: true },
    { label: 'TikTok', href: contact.tiktokUrl, icon: TikTokIcon, color: 'bg-slate-950 text-white', show: Boolean(contact.tiktokUrl), x: 82, y: -24, external: true },
    { label: 'LinkedIn', href: contact.linkedinUrl, icon: Linkedin, color: 'bg-blue-700 text-white', show: Boolean(contact.linkedinUrl), external: true },
  ].filter((item) => item.show)

  return (
    <div
      className={styles.menu}
      data-open={open}
      onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false) }}
    >
      <div className={styles.center}>
        <div id="floating-contact-links" className={styles.orbit} inert={!open}>
          {links.map((item, index) => {
            const angle = (index / links.length) * Math.PI * 2 - Math.PI / 2
            return (
              <div
                key={item.label}
                className={styles.position}
                style={{ left: 32 + Math.cos(angle) * 100, top: 32 + Math.sin(angle) * 100 }}
              >
                <a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  aria-label={item.label}
                  title={item.label}
                  className={cn(styles.link, item.color)}
                >
                  <item.icon className="h-6 w-6" />
                </a>
              </div>
            )
          })}
        </div>
        <button
          type="button"
          aria-label="Sosial və əlaqə linkləri"
          aria-expanded={open}
          aria-controls="floating-contact-links"
          onClick={() => setOpen((value) => !value)}
          className={styles.toggle}
        >
          <Image src="/logo.png" alt="Akin Industry" width={42} height={42} className="h-10 w-10 object-contain" />
        </button>
      </div>
    </div>
  )
}
