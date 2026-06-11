'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categoryLabels, projects as seededProjects } from '@/lib/data'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'
import { getCategoryLabel, translateProject } from '@/lib/site-translations'
import { cn } from '@/lib/utils'

export function FeaturedProjects() {
  const { projects } = useAdmin()
  const { locale } = useLanguage()
  const mergedProjects = Array.from(
    new Map([...seededProjects, ...projects].map((project) => [project.slug, project])).values()
  )
  const featuredProjects = mergedProjects.filter(p => p.featured).map((project) => translateProject(project, locale))
  const copy =
    locale === 'az'
      ? {
          badge: 'Layihələrimiz',
          title: 'Seçilmiş Layihələr',
          cta: 'Bütün Layihələr',
        }
      : {
          badge: 'Our Projects',
          title: 'Featured Projects',
          cta: 'View All Projects',
        }
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              {copy.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              {copy.title}
            </h2>
          </div>
          <Button asChild variant="outline" className="group w-fit">
            <Link href="/layiheler">
              {copy.cta}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/layiheler/${project.slug}`}
              className={cn(
                'group relative overflow-hidden rounded-xl bg-card',
                index === 0 && 'md:col-span-2 md:row-span-2'
              )}
            >
              {/* Image */}
              <div className={cn(
                'relative overflow-hidden w-full h-full',
                index === 0 ? 'aspect-16/10' : 'aspect-4/3'
              )}>
                <Image
                  src={project.images[0] || `https://picsum.photos/800/600?random=${project.id}`}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end pb-8">
                {/* Dark Background */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black/95 z-0" />
                
                {/* Content */}
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full w-fit mb-3">
                    {getCategoryLabel(project.category, locale) || categoryLabels[project.category]}
                  </span>
                  <h3 className={cn(
                    'font-bold text-white mb-2 wrap-break-word leading-tight tracking-tight',
                    index === 0 ? 'text-2xl md:text-3xl max-w-[90%] md:max-w-[80%]' : 'text-xl max-w-[90%]'
                  )}>
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-white text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full 
                  flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all
                  group-hover:bg-accent">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
