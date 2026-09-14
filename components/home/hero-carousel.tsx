'use client'
import { useCmsText } from '@/lib/admin/page-content'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { cn } from '@/lib/utils'



export function HeroCarousel() {
  const cmsText = useCmsText()
  

const slides = {
  en: [
    {
      id: 1,
      title: cmsText("home/hero-carousel.001"),
      description: cmsText("home/hero-carousel.002"),
      image: cmsText("home/hero-carousel.003"),
    },
    {
      id: 2,
      title: cmsText("home/hero-carousel.004"),
      description: cmsText("home/hero-carousel.005"),
      image: cmsText("home/hero-carousel.006"),
    },
    {
      id: 3,
      title: cmsText("home/hero-carousel.007"),
      description: cmsText("home/hero-carousel.008"),
      image: cmsText("home/hero-carousel.009"),
    },
  ],
  az: [
    {
      id: 1,
      title: cmsText("home/hero-carousel.010"),
      description: cmsText("home/hero-carousel.011"),
      image: cmsText("home/hero-carousel.012"),
    },
    {
      id: 2,
      title: cmsText("home/hero-carousel.013"),
      description: cmsText("home/hero-carousel.014"),
      image: cmsText("home/hero-carousel.015"),
    },
    {
      id: 3,
      title: cmsText("home/hero-carousel.016"),
      description: cmsText("home/hero-carousel.017"),
      image: cmsText("home/hero-carousel.018"),
    },
  ],
}
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
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
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
            aria-label={cmsText("home/hero-carousel.template1", { number: index + 1 })}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/70">
        <span className="text-xs tracking-widest uppercase">{locale === 'az' ? cmsText("home/hero-carousel.021") : cmsText("home/hero-carousel.022")}</span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-white animate-pulse" />
        </div>
      </div>
    </section>
  )
}
