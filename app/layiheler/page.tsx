'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, ArrowRight, Building2 } from 'lucide-react'
import { projects as seededProjects } from '@/lib/data'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'
import { getCategoryLabel, getProjectCategories, translateProject } from '@/lib/site-translations'
import { cn } from '@/lib/utils'

export default function ProjectsPage() {
  const { projects } = useAdmin()
  const { locale } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const categories = getProjectCategories(locale)

  const mergedProjects = Array.from(
    new Map([...seededProjects, ...projects].map((project) => [project.slug, project])).values()
  ).map((project) => translateProject(project, locale))

  const filteredProjects = activeCategory === 'all' 
    ? mergedProjects
    : mergedProjects.filter(p => p.category === activeCategory)

  return (
    <>
      <PageHeader
        title={locale === 'az' ? 'Layihələrimiz' : 'Our Projects'}
        description={locale === 'az' ? '25 il ərzində uğurla təhvil verilmiş layihələr' : 'Projects delivered successfully over 25 years'}
        breadcrumbs={[{ label: locale === 'az' ? 'Layihələr' : 'Projects' }]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat.key}
                variant={activeCategory === cat.key ? 'default' : 'outline'}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  'rounded-full',
                  activeCategory === cat.key && 'bg-primary text-primary-foreground'
                )}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={`/layiheler/${project.slug}`}>
                <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-16/10 overflow-hidden">
                    {project.images && project.images.length > 0 ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-primary/20" />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full z-10">
                      {getCategoryLabel(project.category, locale)}
                    </span>

                    {/* Hover Arrow */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full 
                      flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {project.year}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {locale === 'az' ? 'Bu kateqoriyada layihə tapılmadı.' : 'No projects were found in this category.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
