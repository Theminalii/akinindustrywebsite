'use client'

import { PageHeader } from '@/components/shared/page-header'
import { CheckCircle2, Target, Eye, Shield, Award, Users, Building2, Clock, Image as ImageIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'
import { translateTeamMember } from '@/lib/site-translations'

const valuesEn = [
  {
    icon: Shield,
    title: 'Quality',
    description: 'We deliver high-quality construction solutions aligned with international standards.'
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'Projects are completed within the agreed schedule and budget.'
  },
  {
    icon: Users,
    title: 'Professionalism',
    description: 'A strong team of experienced and highly qualified professionals.'
  },
  {
    icon: Award,
    title: 'Reliability',
    description: 'Trust earned through 25 years of experience and hundreds of successful projects.'
  },
]

const timelineEn = [
  { year: '1999', title: 'Company Founded', description: 'Akin Industry began operations as a small construction company.' },
  { year: '2005', title: 'First Major Project', description: 'We successfully completed our first large commercial construction project in Baku.' },
  { year: '2010', title: 'Entry Into the Industrial Sector', description: 'We expanded our portfolio by entering industrial construction.' },
  { year: '2015', title: 'ISO Certification', description: 'We achieved ISO 9001 quality management certification.' },
  { year: '2020', title: 'BIM Technology', description: 'We improved our design process by integrating modern BIM technology.' },
  { year: '2024', title: '500+ Projects', description: 'Over 500 projects completed successfully across 25 years.' },
]

const certificationsEn = [
  'ISO 9001:2015 Quality Management',
  'ISO 14001:2015 Environmental Management',
  'ISO 45001:2018 Occupational Health & Safety',
  'State Construction License (Grade I)',
]

export default function AboutPage() {
  const { team, stats: companyStats, teamSectionEnabled } = useAdmin()
  const { locale } = useLanguage()
  const values =
    locale === 'az'
      ? [
          { icon: Shield, title: 'Keyfiyyət', description: 'Beynəlxalq standartlara uyğun yüksək keyfiyyətli tikinti həlləri təqdim edirik.' },
          { icon: Clock, title: 'Vaxtında Təhvil', description: 'Layihələri razılaşdırılmış qrafik və büdcə daxilində tamamlayırıq.' },
          { icon: Users, title: 'Peşəkarlıq', description: 'Təcrübəli və yüksək ixtisaslı mütəxəssislərdən ibarət güclü komanda.' },
          { icon: Award, title: 'Etibarlılıq', description: '25 illik təcrübə və yüzlərlə uğurlu layihə ilə qazanılmış etibar.' },
        ]
      : valuesEn
  const timeline =
    locale === 'az'
      ? [
          { year: '1999', title: 'Şirkətin Təsis Edilməsi', description: 'Akin Industry kiçik tikinti şirkəti kimi fəaliyyətə başladı.' },
          { year: '2005', title: 'İlk Böyük Layihə', description: 'Bakıda ilk iri kommersiya tikinti layihəmizi uğurla tamamladıq.' },
          { year: '2010', title: 'Sənaye Sektoruna Giriş', description: 'Portfelimizi genişləndirərək sənaye tikintisinə başladıq.' },
          { year: '2015', title: 'ISO Sertifikatı', description: 'ISO 9001 keyfiyyət idarəetmə sertifikatını əldə etdik.' },
          { year: '2020', title: 'BIM Texnologiyası', description: 'Müasir BIM texnologiyasını layihələndirmə prosesimizə inteqrasiya etdik.' },
          { year: '2024', title: '500+ Layihə', description: '25 il ərzində 500-dən çox layihəni uğurla tamamladıq.' },
        ]
      : timelineEn
  const certifications =
    locale === 'az'
      ? [
          'ISO 9001:2015 Keyfiyyət İdarəetməsi',
          'ISO 14001:2015 Ətraf Mühitin İdarəedilməsi',
          'ISO 45001:2018 Əməyin Mühafizəsi və Təhlükəsizlik',
          'Dövlət Tikinti Lisenziyası (I dərəcə)',
        ]
      : certificationsEn
  const copy =
    locale === 'az'
      ? {
          headerTitle: 'Haqqımızda',
          headerDescription: 'Azərbaycanın tikinti sektorunda etibarlı tərəfdaş',
          mission: 'Missiyamız',
          missionText:
            'Müştəri ehtiyaclarına uyğun yüksək keyfiyyətli, innovativ və dayanıqlı tikinti həlləri təqdim etməklə Azərbaycanın infrastruktur inkişafına töhfə vermək. Hər layihədə mükəmməlliyi, etik dəyərləri və müştəri məmnuniyyətini əsas tuturuq.',
          vision: 'Vizyonumuz',
          visionText:
            'Beynəlxalq standartlara uyğun xidmətlərlə regionun aparıcı tikinti şirkətlərindən birinə çevrilmək və qlobal bazarlarda tanınmaq. Texnoloji yenilikləri tətbiq etməklə tikintinin gələcəyini bu gündən formalaşdırırıq.',
          storyBadge: 'Hekayəmiz',
          storyTitle: '25 İllik Uğur Yolu',
          storyLead:
            '1999-cu ildə kiçik bir tikinti şirkəti olaraq fəaliyyətə başlayan Akin Industry, bu gün Azərbaycanın ən etibarlı tikinti şirkətlərindən birinə çevrilmişdir.',
          storyText:
            'İllər ərzində yaşayış binalarından sənaye komplekslərinə, yol infrastrukturundan kommersiya mərkəzlərinə qədər müxtəlif sahələrdə 500-dən çox layihəni uğurla tamamlamışıq. Hər layihədə keyfiyyət və müştəri məmnuniyyətini əsas tutaraq, sektorda etibarlı bir mövqe qazanmışıq.',
          years: 'İllik Təcrübə',
          projects: 'Tamamlanmış Layihə',
          employees: 'Peşəkar Əməkdaş',
          clients: 'Məmnun Müştəri',
          valuesBadge: 'Dəyərlərimiz',
          valuesTitle: 'Bizi İrəli Aparan Prinsiplər',
          valuesText: 'Hər layihədə bu dəyərlərə sadiq qalaraq müştərilərimizin etibarını qazanırıq.',
          timelineBadge: 'Tarixçə',
          timelineTitle: 'İnkişaf Yolumuz',
          teamBadge: 'Komandamız',
          teamTitle: 'Rəhbərlik Heyəti',
          teamText: 'Rəhbərlik komandamız təcrübəli peşəkarlardan ibarətdir.',
          certTitle: 'Sertifikatlar və Lisenziyalar',
          certText: 'Beynəlxalq standartlara uyğunluğumuzu təsdiqləyən sertifikatlar.',
          imageAlt: 'Akin Industry-nin 25 illik etibarlı tikinti təcrübəsi',
        }
      : {
          headerTitle: 'About Us',
          headerDescription: 'A trusted partner in Azerbaijan’s construction sector',
          mission: 'Our Mission',
          missionText:
            'To contribute to the development of Azerbaijan’s infrastructure by delivering high-quality, innovative, and sustainable construction solutions tailored to our clients’ needs. We prioritize excellence, ethics, and client satisfaction in every project.',
          vision: 'Our Vision',
          visionText:
            'To become a leading construction company in the region and gain recognition in global markets through services aligned with international standards. By applying technological innovation, we help shape the future of construction today.',
          storyBadge: 'Our Story',
          storyTitle: '25 Years of Growth',
          storyLead:
            'Founded in 1999 as a small construction company, Akin Industry has grown into one of Azerbaijan’s most trusted names in the sector.',
          storyText:
            'Over the years, we have successfully delivered more than 500 projects across residential buildings, industrial complexes, road infrastructure, and commercial facilities. By maintaining a strong focus on quality and client satisfaction, we have earned a trusted position in the market.',
          years: 'Years of Experience',
          projects: 'Completed Projects',
          employees: 'Skilled Employees',
          clients: 'Satisfied Clients',
          valuesBadge: 'Our Values',
          valuesTitle: 'Principles That Guide Us',
          valuesText: 'We earn our clients’ trust by staying committed to these values on every project.',
          timelineBadge: 'Timeline',
          timelineTitle: 'Our Development Journey',
          teamBadge: 'Our Team',
          teamTitle: 'Leadership Team',
          teamText: 'Our leadership team is made up of experienced professionals.',
          certTitle: 'Certifications & Licenses',
          certText: 'Certifications that validate our compliance with international standards.',
          imageAlt: 'Akin Industry 25 years of trusted construction experience',
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
                  <div className="text-3xl font-bold text-primary mb-1">{companyStats.years}+</div>
                  <div className="text-muted-foreground text-sm">{copy.years}</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-1">{companyStats.projects}+</div>
                  <div className="text-muted-foreground text-sm">{copy.projects}</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-1">{companyStats.employees}+</div>
                  <div className="text-muted-foreground text-sm">{copy.employees}</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-1">{companyStats.clients}+</div>
                  <div className="text-muted-foreground text-sm">{copy.clients}</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-linear-to-br from-[#081426] via-[#0b1830] to-[#132642] p-3 shadow-[0_18px_50px_rgba(15,23,42,0.12)] sm:p-4">
                <img
                  src="/images/about-history-ai.png"
                  alt={copy.imageAlt}
                  className="h-full w-full rounded-xl object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      {teamSectionEnabled && (
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
      )}

      {/* Timeline */}
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
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
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

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              {copy.teamBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              {copy.teamTitle}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {copy.teamText}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((item) => {
              const member = translateTeamMember(item, locale)
              return (
              <Card key={member.id} className="overflow-hidden border-border/50 group">
                <div className="aspect-[4/5] bg-primary/10 relative">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-primary/40">
                      <ImageIcon className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{member.position}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
              {copy.certTitle}
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              {copy.certText}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4"
              >
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="text-primary-foreground font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
