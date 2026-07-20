'use client'

import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'

const styles = `
  @keyframes scroll-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .animate-scroll {
    animation: scroll-left 30s linear infinite;
  }

  .scroll-container:hover .animate-scroll {
    animation-play-state: paused;
  }
`

export function PartnersSection() {
  const { partners } = useAdmin()
  const { locale } = useLanguage()

  if (partners.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-secondary/50 border-y border-border/50">
      <style>{styles}</style>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {locale === 'az' ? 'Tərəfdaşlarımız' : 'Our Partners'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {locale === 'az' ? 'Etibarlı Əməkdaşlıq' : 'Trusted Collaboration'}
          </h2>
        </div>

        <div className="scroll-container relative overflow-hidden">
          <div className="animate-scroll flex gap-8 px-4 py-6">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex items-center justify-center rounded-2xl border border-border/50 bg-white p-4 h-24 w-36 shrink-0 hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
