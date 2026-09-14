'use client'
import { useCmsText } from '@/lib/admin/page-content'

import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { useAdmin } from '@/lib/admin/context'

export function CTASection() {
  const cmsText = useCmsText()
  

  const { locale } = useLanguage()
  const { contact } = useAdmin()
  const copy =
    locale === 'az'
      ? {
          title: cmsText("home/cta-section.001"),
          description: cmsText("home/cta-section.002"),
          contact: cmsText("home/cta-section.003"),
        }
      : {
          title: cmsText("home/cta-section.004"),
          description: cmsText("home/cta-section.005"),
          contact: cmsText("home/cta-section.006"),
        }
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            {copy.title}
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-10">
            {copy.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 group"
            >
              <Link href={cmsText("home/cta-section.007")}>
                {copy.contact}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="bg-white text-black hover:bg-white/90 hover:text-primary"
            >
              <a href={`tel:${contact.phone1}`}>
                <Phone className="mr-2 h-4 w-4" />
                {contact.phone1}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
