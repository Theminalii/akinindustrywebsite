'use client'
import { useSiteTranslations } from '@/lib/site-translations'
import { useCmsText } from '@/lib/admin/page-content'

import { PageHeader } from '@/components/shared/page-header'
import { Target, Eye, Shield, Award, Users, Clock, UserRound } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'





export default function AboutPage() {
  const cmsText = useCmsText()
  

const valuesEn = [
  {
    icon: Shield,
    title: cmsText("haqqimizda/page.001"),
    description: cmsText("haqqimizda/page.002")
  },
  {
    icon: Clock,
    title: cmsText("haqqimizda/page.003"),
    description: cmsText("haqqimizda/page.004")
  },
  {
    icon: Users,
    title: cmsText("haqqimizda/page.005"),
    description: cmsText("haqqimizda/page.006")
  },
  {
    icon: Award,
    title: cmsText("haqqimizda/page.007"),
    description: cmsText("haqqimizda/page.008")
  },
]
const timelineEn = [
  { year: cmsText("haqqimizda/page.009"), title: cmsText("haqqimizda/page.010"), description: cmsText("haqqimizda/page.011") },
  { year: cmsText("haqqimizda/page.012"), title: cmsText("haqqimizda/page.013"), description: cmsText("haqqimizda/page.014") },
  { year: cmsText("haqqimizda/page.015"), title: cmsText("haqqimizda/page.016"), description: cmsText("haqqimizda/page.017") },
  { year: cmsText("haqqimizda/page.018"), title: cmsText("haqqimizda/page.019"), description: cmsText("haqqimizda/page.020") },
  { year: cmsText("haqqimizda/page.021"), title: cmsText("haqqimizda/page.022"), description: cmsText("haqqimizda/page.023") },
  { year: cmsText("haqqimizda/page.024"), title: cmsText("haqqimizda/page.025"), description: cmsText("haqqimizda/page.026") },
]
  const { stats: companyStats, team: teamData } = useAdmin()
  const { translateTeamMember } = useSiteTranslations()
  const { locale } = useLanguage()
  const team = teamData.map(member => translateTeamMember(member, locale))
  const values =
    locale === 'az'
      ? [
          { icon: Shield, title: cmsText("haqqimizda/page.027"), description: cmsText("haqqimizda/page.028") },
          { icon: Clock, title: cmsText("haqqimizda/page.029"), description: cmsText("haqqimizda/page.030") },
          { icon: Users, title: cmsText("haqqimizda/page.031"), description: cmsText("haqqimizda/page.032") },
          { icon: Award, title: cmsText("haqqimizda/page.033"), description: cmsText("haqqimizda/page.034") },
        ]
      : valuesEn
  const timeline =
    locale === 'az'
      ? [
          { year: cmsText("haqqimizda/page.035"), title: cmsText("haqqimizda/page.036"), description: cmsText("haqqimizda/page.037") },
          { year: cmsText("haqqimizda/page.038"), title: cmsText("haqqimizda/page.039"), description: cmsText("haqqimizda/page.040") },
          { year: cmsText("haqqimizda/page.041"), title: cmsText("haqqimizda/page.042"), description: cmsText("haqqimizda/page.043") },
          { year: cmsText("haqqimizda/page.044"), title: cmsText("haqqimizda/page.045"), description: cmsText("haqqimizda/page.046") },
          { year: cmsText("haqqimizda/page.047"), title: cmsText("haqqimizda/page.048"), description: cmsText("haqqimizda/page.049") },
          { year: cmsText("haqqimizda/page.050"), title: cmsText("haqqimizda/page.051"), description: cmsText("haqqimizda/page.052") },
        ]
      : timelineEn
  const copy =
    locale === 'az'
      ? {
          headerTitle: cmsText("haqqimizda/page.053"),
          headerDescription: cmsText("haqqimizda/page.054"),
          mission: cmsText("haqqimizda/page.055"),
          missionText:
            cmsText("haqqimizda/page.056"),
          vision: cmsText("haqqimizda/page.057"),
          visionText:
            cmsText("haqqimizda/page.058"),
          storyBadge: cmsText("haqqimizda/page.059"),
          storyTitle: cmsText("haqqimizda/page.060"),
          storyLead:
            cmsText("haqqimizda/page.061"),
          storyText:
            cmsText("haqqimizda/page.062"),
          years: cmsText("haqqimizda/page.063"),
          projects: cmsText("haqqimizda/page.064"),
          employees: cmsText("haqqimizda/page.065"),
          clients: cmsText("haqqimizda/page.066"),
          valuesBadge: cmsText("haqqimizda/page.067"),
          valuesTitle: cmsText("haqqimizda/page.068"),
          valuesText: cmsText("haqqimizda/page.069"),
          timelineBadge: cmsText("haqqimizda/page.070"),
          timelineTitle: cmsText("haqqimizda/page.071"),
          imageAlt: cmsText("haqqimizda/page.072"),
        }
      : {
          headerTitle: cmsText("haqqimizda/page.073"),
          headerDescription: cmsText("haqqimizda/page.074"),
          mission: cmsText("haqqimizda/page.075"),
          missionText:
            cmsText("haqqimizda/page.076"),
          vision: cmsText("haqqimizda/page.077"),
          visionText:
            cmsText("haqqimizda/page.078"),
          storyBadge: cmsText("haqqimizda/page.079"),
          storyTitle: cmsText("haqqimizda/page.080"),
          storyLead:
            cmsText("haqqimizda/page.081"),
          storyText:
            cmsText("haqqimizda/page.082"),
          years: cmsText("haqqimizda/page.083"),
          projects: cmsText("haqqimizda/page.084"),
          employees: cmsText("haqqimizda/page.085"),
          clients: cmsText("haqqimizda/page.086"),
          valuesBadge: cmsText("haqqimizda/page.087"),
          valuesTitle: cmsText("haqqimizda/page.088"),
          valuesText: cmsText("haqqimizda/page.089"),
          timelineBadge: cmsText("haqqimizda/page.090"),
          timelineTitle: cmsText("haqqimizda/page.091"),
          imageAlt: cmsText("haqqimizda/page.092"),
        }

  return (
    <>
      <PageHeader
        title={copy.headerTitle}
        description={copy.headerDescription}
        breadcrumbs={[{ label: copy.headerTitle }]}
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-card rounded-2xl p-8 border border-border/50">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{copy.mission}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {copy.missionText}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card rounded-2xl p-8 border border-border/50">
              <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{copy.vision}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {copy.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                {copy.storyBadge}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                {copy.storyTitle}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {copy.storyLead}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {copy.storyText}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-1">{companyStats.years}{cmsText("haqqimizda/page.093")}</div>
                  <div className="text-muted-foreground text-sm">{copy.years}</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-1">{companyStats.projects}{cmsText("haqqimizda/page.094")}</div>
                  <div className="text-muted-foreground text-sm">{copy.projects}</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-1">{companyStats.employees}{cmsText("haqqimizda/page.095")}</div>
                  <div className="text-muted-foreground text-sm">{copy.employees}</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-1">{companyStats.clients}{cmsText("haqqimizda/page.096")}</div>
                  <div className="text-muted-foreground text-sm">{copy.clients}</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-linear-to-br from-[#081426] via-[#0b1830] to-[#132642] p-3 shadow-[0_18px_50px_rgba(15,23,42,0.12)] sm:p-4">
                <img
                  src={cmsText("haqqimizda/page.097")}
                  alt={copy.imageAlt}
                  className="h-full w-full rounded-xl object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              {copy.valuesBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              {copy.valuesTitle}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {copy.valuesText}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      {team.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {locale === 'az' ? cmsText("haqqimizda/page.098") : cmsText("haqqimizda/page.099")}
              </span>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                {locale === 'az' ? cmsText("haqqimizda/page.100") : cmsText("haqqimizda/page.101")}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <Card key={member.id} className="overflow-hidden border-border/50">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-72 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-72 items-center justify-center bg-secondary/40">
                      <UserRound className="h-16 w-16 text-muted-foreground/40" />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">{member.position}</p>
                    {member.bio && (
                      <p className="mt-4 text-sm leading-6 text-muted-foreground">{member.bio}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              {copy.timelineBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              {copy.timelineTitle}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

              {/* Items */}
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : "md:pl-12"}`}>
                    <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
                      <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground text-sm font-semibold rounded-full mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
