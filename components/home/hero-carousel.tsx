'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'

const slides = {
  en: [
    {
      id: 1,
      title: 'High-Quality Construction Solutions',
      description: 'We bring ambitious ideas to life with modern technology and a highly skilled team.',
      image: '/images/hero/hero-1.png',
    },
    {
      id: 2,
      title: 'A Leader in Industrial Construction',
      description: 'A trusted partner for factories, warehouses, and large-scale industrial facilities.',
      image: '/images/hero/hero-2.png',
    },
    {
      id: 3,
      title: 'Modern Living Spaces',
      description: 'We create comfortable and contemporary spaces designed for modern life.',
      image: '/images/hero/hero-3.png',
    },
  ],
  az: [
    {
      id: 1,
      title: 'Yüksək Keyfiyyətli Tikinti Həlləri',
      description: 'Müasir texnologiya və güclü peşəkar komanda ilə böyük ideyaları reallığa çeviririk.',
      image: '/images/hero/hero-1.png',
    },
    {
      id: 2,
      title: 'Sənaye Tikintisində Etibarlı Lider',
      description: 'Zavodlar, anbarlar və iri sənaye obyektləri üçün güvənilən tərəfdaş.',
      image: '/images/hero/hero-2.png',
    },
    {
      id: 3,
      title: 'Müasir Yaşam Məkanları',
      description: 'Müasir həyat üçün rahat və funksional məkanlar yaradırıq.',
      image: '/images/hero/hero-3.png',
    },
  ],
}

export function HeroCarousel() {
  const { locale } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const localizedSlides = slides[locale]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % localizedSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [localizedSlides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }


  return (
    <section className="relative h-screen min-h-150 max-h-225 overflow-hidden">
      {/* Slides */}
      {localizedSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/70 to-primary/40" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className={cn(
              'max-w-2xl text-white transition-all duration-700 delay-300',
              index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      ))}


      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {localizedSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'h-3 rounded-full transition-all',
              index === currentSlide ? 'w-8 bg-accent' : 'w-3 bg-white/50 hover:bg-white/70'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/70">
        <span className="text-xs tracking-widest uppercase">{locale === 'az' ? 'Sürüşdür' : 'Scroll'}</span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-white animate-pulse" />
        </div>
      </div>
    </section>
  )
}
