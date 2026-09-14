'use client'
import { useCmsText } from '@/lib/admin/page-content'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { VideoEmbed } from '@/components/shared/video-embed'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Building2, Ruler, Users, ArrowRight, ArrowLeft } from 'lucide-react'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'
import { useSiteTranslations } from '@/lib/site-translations'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'

interface Project {
  id: string
  slug: string
  title: string
  category: string
  description: string
  client: string
  location: string
  year: number
  area: string
  images: string[]
  videos?: string[]
  featured?: boolean
}

export default function ProjectDetailPage() {
  const cmsText = useCmsText()
  const { getCategoryLabel, translateProject } = useSiteTranslations()

  const params = useParams()
  const slug = params.slug as string
  const { projects, isReady } = useAdmin()
  const { locale } = useLanguage()
  const mergedProjects = useMemo(
    () =>
      projects.map((project) =>
        translateProject(project, locale)
      ),
    [locale, projects, translateProject]
  )

  const project = useMemo(() => mergedProjects.find((p) => p.slug === slug), [mergedProjects, slug])
  const relatedProjects = useMemo(() => {
    if (!project) return []
    return mergedProjects
      .filter((p) => project && p.category === project.category && p.id !== project.id)
      .slice(0, 3)
  }, [mergedProjects, project])

  if (!isReady) {
    return (
      <section className="bg-background px-4 py-32">
        <div className="mx-auto max-w-3xl rounded-3xl bg-card p-10 text-center text-muted-foreground shadow-sm">
          {locale === 'az' ? cmsText("layiheler/[slug]/page.001") : cmsText("layiheler/[slug]/page.002")}
        </div>
      </section>
    )
  }

  if (!project) {
    notFound()
  }

  const details = [
    { icon: Users, label: locale === 'az' ? cmsText("layiheler/[slug]/page.003") : cmsText("layiheler/[slug]/page.004"), value: project.client },
    { icon: MapPin, label: locale === 'az' ? cmsText("layiheler/[slug]/page.005") : cmsText("layiheler/[slug]/page.006"), value: project.location },
    { icon: Calendar, label: locale === 'az' ? cmsText("layiheler/[slug]/page.007") : cmsText("layiheler/[slug]/page.008"), value: project.year.toString() },
    { icon: Ruler, label: locale === 'az' ? cmsText("layiheler/[slug]/page.009") : cmsText("layiheler/[slug]/page.010"), value: project.area },
  ]

  return (
    <>
      <PageHeader
        title={project.title}
        description={getCategoryLabel(project.category, locale)}
        breadcrumbs={[
          { label: locale === 'az' ? cmsText("layiheler/[slug]/page.011") : cmsText("layiheler/[slug]/page.012"), href: cmsText("layiheler/[slug]/page.013") },
          { label: project.title }
        ]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="aspect-video rounded-2xl overflow-hidden bg-primary/10 mb-8 relative">
                {project.images && project.images.length > 0 ? (
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" />
                )}
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">{locale === 'az' ? cmsText("layiheler/[slug]/page.014") : cmsText("layiheler/[slug]/page.015")}</h2>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </div>

              {/* Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6">{locale === 'az' ? cmsText("layiheler/[slug]/page.016") : cmsText("layiheler/[slug]/page.017")}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <div key={index} className="aspect-4/3 rounded-xl overflow-hidden bg-primary/10 relative">
                        <Image
                          src={image}
                          alt={`${project.title} - ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.videos && project.videos.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold text-foreground">
                    {locale === 'az' ? 'Layihə videoları' : 'Project Videos'}
                  </h2>
                  <div className="grid gap-4">
                    {project.videos.map((video, index) => (
                      <div key={`${video}-${index}`} className="aspect-video overflow-hidden rounded-2xl bg-black">
                        <VideoEmbed url={video} title={`${project.title} video ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Project Details Card */}
              <Card className="mb-8 sticky top-32">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-6">{locale === 'az' ? cmsText("layiheler/[slug]/page.018") : cmsText("layiheler/[slug]/page.019")}</h3>
                  <div className="space-y-4">
                    {details.map((detail, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <detail.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{detail.label}</p>
                          <p className="font-medium text-foreground">{detail.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <span className="inline-block px-4 py-2 bg-accent/20 text-accent-foreground text-sm font-medium rounded-full">
                      {getCategoryLabel(project.category, locale)}
                    </span>
                  </div>

                  <Button asChild className="w-full mt-6">
                    <Link href={cmsText("layiheler/[slug]/page.020")}>
                      {locale === 'az' ? cmsText("layiheler/[slug]/page.021") : cmsText("layiheler/[slug]/page.022")}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">{locale === 'az' ? cmsText("layiheler/[slug]/page.023") : cmsText("layiheler/[slug]/page.024")}</h2>
              <Button asChild variant="outline">
                <Link href={cmsText("layiheler/[slug]/page.025")}>
                  {locale === 'az' ? cmsText("layiheler/[slug]/page.026") : cmsText("layiheler/[slug]/page.027")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((relProject) => (
                <Link key={relProject.id} href={`/layiheler/${relProject.slug}`}>
                  <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-lg transition-all">
                    <div className="relative aspect-16/10 overflow-hidden">
                      {relProject.images && relProject.images.length > 0 ? (
                        <Image
                          src={relProject.images[0]}
                          alt={relProject.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-primary/20" />
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {relProject.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">{relProject.location}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="gap-2">
            <Link href={cmsText("layiheler/[slug]/page.028")}>
              <ArrowLeft className="h-4 w-4" />
              {locale === 'az' ? cmsText("layiheler/[slug]/page.029") : cmsText("layiheler/[slug]/page.030")}
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
