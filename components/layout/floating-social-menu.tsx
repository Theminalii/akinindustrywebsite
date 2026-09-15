'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Mail, MapPinned, Phone, Send } from 'lucide-react'

import { useAdmin } from '@/lib/admin/context'
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

export function FloatingSocialMenu() {
  const { contact } = useAdmin()
  const [open, setOpen] = useState(false)
  const mapUrl = contact.googleMapUrl || 'https://maps.app.goo.gl/wh6PTpetRciTJjmS9'
  const links = [
    { label: 'Telefon', href: `tel:${contact.phone1}`, icon: Phone, color: 'bg-amber-400 text-white', show: Boolean(contact.phone1), x: -12, y: -92 },
    { label: 'Mail', href: `mailto:${contact.email1}`, icon: Mail, color: 'bg-amber-400 text-white', show: Boolean(contact.email1), x: -92, y: -48 },
    { label: 'Google Map', href: mapUrl, icon: MapPinned, color: 'bg-blue-500 text-white', show: Boolean(mapUrl), x: -104, y: 44, external: true },
    { label: 'Instagram', href: contact.instagramUrl, icon: InstagramIcon, color: 'bg-pink-500 text-white', show: Boolean(contact.instagramUrl), x: -28, y: 96, external: true },
    { label: 'Facebook', href: contact.facebookUrl, icon: FacebookIcon, color: 'bg-blue-600 text-white', show: Boolean(contact.facebookUrl), x: 58, y: 62, external: true },
    { label: 'TikTok', href: contact.tiktokUrl, icon: TikTokIcon, color: 'bg-slate-950 text-white', show: Boolean(contact.tiktokUrl), x: 82, y: -24, external: true },
    { label: 'Telegram', href: '', icon: Send, color: 'bg-blue-500 text-white', show: false, x: 44, y: -92, external: true },
  ].filter((item) => item.show)

  return (
    <div className="fixed bottom-6 right-6 z-60 h-48 w-48 pointer-events-none">
      <div className="absolute bottom-0 right-0 h-16 w-16 pointer-events-auto">
        {links.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer' : undefined}
            aria-label={item.label}
            className={cn(
              'absolute right-0 bottom-0 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300',
              item.color,
              open ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            )}
            style={{
              transform: open
                ? `translate(${item.x}px, ${item.y}px) rotate(${index * 18}deg)`
                : 'translate(0, 0) rotate(0deg)',
            }}
          >
            <item.icon className="h-7 w-7" />
          </a>
        ))}
        <button
          type="button"
          aria-label="Sosial və əlaqə linkləri"
          onClick={() => setOpen((value) => !value)}
          className={cn(
            'relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl ring-1 ring-black/10 transition-transform duration-300',
            open && 'rotate-180'
          )}
        >
          <Image src="/logo.png" alt="Akin Industry" width={42} height={42} className="h-10 w-10 object-contain" />
          <span className="absolute inset-0 rounded-full bg-primary/5" />
        </button>
      </div>
    </div>
  )
}
