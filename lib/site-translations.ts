import { useCmsText } from '@/lib/admin/page-content'
import type {
  Certificate,
  JobPosition,
  NewsArticle,
  Project,
  Service,
  TeamMember,
} from './types'
import type { Locale } from './language-context'

type Localized<T> = Partial<Record<Locale, T>>

export function useSiteTranslations() {
  const cmsText = useCmsText()
  

const categoryLabels: Record<Locale, Record<string, string>> = {
  en: {
    residential: cmsText("lib/site-translations.ts.001"),
    commercial: cmsText("lib/site-translations.ts.002"),
    industrial: cmsText("lib/site-translations.ts.003"),
    infrastructure: cmsText("lib/site-translations.ts.004"),
    all: cmsText("lib/site-translations.ts.005"),
  },
  az: {
    residential: cmsText("lib/site-translations.ts.006"),
    commercial: cmsText("lib/site-translations.ts.007"),
    industrial: cmsText("lib/site-translations.ts.008"),
    infrastructure: cmsText("lib/site-translations.ts.009"),
    all: cmsText("lib/site-translations.ts.010"),
  },
}

const serviceTranslations: Record<
  string,
  Localized<Pick<Service, 'title' | 'description' | 'features'>>
> = {
  "1": {
    az: {
      title: cmsText("lib/site-translations.ts.012"),
      description: cmsText("lib/site-translations.ts.013"),
      features: [cmsText("lib/site-translations.ts.014"), cmsText("lib/site-translations.ts.015"), cmsText("lib/site-translations.ts.016"), cmsText("lib/site-translations.ts.017")],
    },
  },
  "2": {
    az: {
      title: cmsText("lib/site-translations.ts.019"),
      description: cmsText("lib/site-translations.ts.020"),
      features: [cmsText("lib/site-translations.ts.021"), cmsText("lib/site-translations.ts.022"), cmsText("lib/site-translations.ts.023"), cmsText("lib/site-translations.ts.024")],
    },
  },
  "3": {
    az: {
      title: cmsText("lib/site-translations.ts.026"),
      description: cmsText("lib/site-translations.ts.027"),
      features: [cmsText("lib/site-translations.ts.028"), cmsText("lib/site-translations.ts.029"), cmsText("lib/site-translations.ts.030"), cmsText("lib/site-translations.ts.031")],
    },
  },
  "4": {
    az: {
      title: cmsText("lib/site-translations.ts.033"),
      description: cmsText("lib/site-translations.ts.034"),
      features: [cmsText("lib/site-translations.ts.035"), cmsText("lib/site-translations.ts.036"), cmsText("lib/site-translations.ts.037"), cmsText("lib/site-translations.ts.038")],
    },
  },
  "5": {
    az: {
      title: cmsText("lib/site-translations.ts.040"),
      description: cmsText("lib/site-translations.ts.041"),
      features: [cmsText("lib/site-translations.ts.042"), cmsText("lib/site-translations.ts.043"), cmsText("lib/site-translations.ts.044"), cmsText("lib/site-translations.ts.045")],
    },
  },
  "6": {
    az: {
      title: cmsText("lib/site-translations.ts.047"),
      description: cmsText("lib/site-translations.ts.048"),
      features: [cmsText("lib/site-translations.ts.049"), cmsText("lib/site-translations.ts.050"), cmsText("lib/site-translations.ts.051"), cmsText("lib/site-translations.ts.052")],
    },
  },
  "7": {
    az: {
      title: cmsText("lib/site-translations.ts.054"),
      description: cmsText("lib/site-translations.ts.055"),
      features: [cmsText("lib/site-translations.ts.056"), cmsText("lib/site-translations.ts.057"), cmsText("lib/site-translations.ts.058"), cmsText("lib/site-translations.ts.059")],
    },
  },
  "8": {
    az: {
      title: cmsText("lib/site-translations.ts.061"),
      description: cmsText("lib/site-translations.ts.062"),
      features: [cmsText("lib/site-translations.ts.063"), cmsText("lib/site-translations.ts.064"), cmsText("lib/site-translations.ts.065"), cmsText("lib/site-translations.ts.066")],
    },
  },
  "9": {
    az: {
      title: cmsText("lib/site-translations.ts.068"),
      description: cmsText("lib/site-translations.ts.069"),
      features: [cmsText("lib/site-translations.ts.070"), cmsText("lib/site-translations.ts.071"), cmsText("lib/site-translations.ts.072"), cmsText("lib/site-translations.ts.073")],
    },
  },
}

const projectTranslations: Record<
  string,
  Localized<Pick<Project, 'title' | 'description' | 'location' | 'area'>>
> = {
  "port-baku-towers": {
    az: {
      title: cmsText("lib/site-translations.ts.075"),
      description:
        cmsText("lib/site-translations.ts.076"),
      location: cmsText("lib/site-translations.ts.077"),
      area: cmsText("lib/site-translations.ts.078"),
    },
  },
  "white-city-residences": {
    az: {
      title: cmsText("lib/site-translations.ts.080"),
      description: cmsText("lib/site-translations.ts.081"),
      location: cmsText("lib/site-translations.ts.082"),
      area: cmsText("lib/site-translations.ts.083"),
    },
  },
  "sumgait-industrial-zone": {
    az: {
      title: cmsText("lib/site-translations.ts.085"),
      description: cmsText("lib/site-translations.ts.086"),
      location: cmsText("lib/site-translations.ts.087"),
      area: cmsText("lib/site-translations.ts.088"),
    },
  },
  "baku-ring-road": {
    az: {
      title: cmsText("lib/site-translations.ts.090"),
      description: cmsText("lib/site-translations.ts.091"),
      location: cmsText("lib/site-translations.ts.092"),
      area: cmsText("lib/site-translations.ts.093"),
    },
  },
  "flame-towers-renovation": {
    az: {
      title: cmsText("lib/site-translations.ts.095"),
      description: cmsText("lib/site-translations.ts.096"),
      location: cmsText("lib/site-translations.ts.097"),
      area: cmsText("lib/site-translations.ts.098"),
    },
  },
  "ganja-shopping-mall": {
    az: {
      title: cmsText("lib/site-translations.ts.100"),
      description: cmsText("lib/site-translations.ts.101"),
      location: cmsText("lib/site-translations.ts.102"),
      area: cmsText("lib/site-translations.ts.103"),
    },
  },
  "azersulfat-tursu-zavodu": {
    az: {
      title: cmsText("lib/site-translations.ts.105"),
      description: cmsText("lib/site-translations.ts.106"),
      location: cmsText("lib/site-translations.ts.107"),
      area: cmsText("lib/site-translations.ts.108"),
    },
  },
  "suvelan-elektrik-stansiyasi": {
    az: {
      title: cmsText("lib/site-translations.ts.110"),
      description: cmsText("lib/site-translations.ts.111"),
      location: cmsText("lib/site-translations.ts.112"),
      area: cmsText("lib/site-translations.ts.113"),
    },
  },
  "sangacal-terminal": {
    az: {
      title: cmsText("lib/site-translations.ts.115"),
      description: cmsText("lib/site-translations.ts.116"),
      location: cmsText("lib/site-translations.ts.117"),
      area: cmsText("lib/site-translations.ts.118"),
    },
  },
  "qazax-ada-universitesi": {
    az: {
      title: cmsText("lib/site-translations.ts.120"),
      description: cmsText("lib/site-translations.ts.121"),
      location: cmsText("lib/site-translations.ts.122"),
      area: cmsText("lib/site-translations.ts.123"),
    },
  },
  "qlukometr-ve-strip-istehsal-binasi": {
    az: {
      title: cmsText("lib/site-translations.ts.125"),
      description: cmsText("lib/site-translations.ts.126"),
      location: cmsText("lib/site-translations.ts.127"),
      area: cmsText("lib/site-translations.ts.128"),
    },
  },
  "kalium-sulfat-zavodu": {
    az: {
      title: cmsText("lib/site-translations.ts.130"),
      description: cmsText("lib/site-translations.ts.131"),
      location: cmsText("lib/site-translations.ts.132"),
      area: cmsText("lib/site-translations.ts.133"),
    },
  },
  "stalcay-production-plant": {
    az: {
      title: cmsText("lib/site-translations.ts.135"),
      description:
        cmsText("lib/site-translations.ts.136"),
      location: cmsText("lib/site-translations.ts.137"),
      area: cmsText("lib/site-translations.ts.138"),
    },
  },
  "pirallahi-derman-zavodu": {
    az: {
      title: cmsText("lib/site-translations.ts.140"),
      description: cmsText("lib/site-translations.ts.141"),
      location: cmsText("lib/site-translations.ts.142"),
      area: cmsText("lib/site-translations.ts.143"),
    },
  },
}

const newsTranslations: Record<
  string,
  Localized<Pick<NewsArticle, 'title' | 'excerpt' | 'content' | 'category'>>
> = {
  "akin-industry-partners-with-pocketvc-venture-studio": {
    az: {
      title: cmsText("lib/site-translations.ts.145"),
      excerpt:
        cmsText("lib/site-translations.ts.146"),
      content:
        cmsText("lib/site-translations.ts.147"),
      category: cmsText("lib/site-translations.ts.148"),
    },
  },
  "yeni-layihe-imzalandi": {
    az: {
      title: cmsText("lib/site-translations.ts.150"),
      excerpt:
        cmsText("lib/site-translations.ts.151"),
      content:
        cmsText("lib/site-translations.ts.152"),
      category: cmsText("lib/site-translations.ts.153"),
    },
  },
  "iso-sertifikati-alindi": {
    az: {
      title: cmsText("lib/site-translations.ts.155"),
      excerpt:
        cmsText("lib/site-translations.ts.156"),
      content:
        cmsText("lib/site-translations.ts.157"),
      category: cmsText("lib/site-translations.ts.158"),
    },
  },
  "yeni-texnologiyalar": {
    az: {
      title: cmsText("lib/site-translations.ts.160"),
      excerpt:
        cmsText("lib/site-translations.ts.161"),
      content:
        cmsText("lib/site-translations.ts.162"),
      category: cmsText("lib/site-translations.ts.163"),
    },
  },
  "yeni-iscilar-axtarilir": {
    az: {
      title: cmsText("lib/site-translations.ts.165"),
      excerpt:
        cmsText("lib/site-translations.ts.166"),
      content:
        cmsText("lib/site-translations.ts.167"),
      category: cmsText("lib/site-translations.ts.168"),
    },
  },
}

const teamTranslations: Record<string, Localized<Pick<TeamMember, 'position' | 'bio'>>> = {
  "1": {
    az: {
      position: cmsText("lib/site-translations.ts.position1"),
      bio: cmsText("lib/site-translations.ts.170"),
    },
  },
  "2": {
    az: {
      position: cmsText("lib/site-translations.ts.position2"),
      bio: cmsText("lib/site-translations.ts.172"),
    },
  },
  "3": {
    az: {
      position: cmsText("lib/site-translations.ts.position3"),
      bio: cmsText("lib/site-translations.ts.174"),
    },
  },
  "4": {
    az: {
      position: cmsText("lib/site-translations.ts.position4"),
      bio: cmsText("lib/site-translations.ts.176"),
    },
  },
}

const jobTranslations: Record<
  string,
  Localized<Pick<JobPosition, 'title' | 'department' | 'location' | 'type' | 'description' | 'requirements'>>
> = {
  "1": {
    az: {
      title: cmsText("lib/site-translations.ts.178"),
      department: cmsText("lib/site-translations.ts.179"),
      location: cmsText("lib/site-translations.ts.180"),
      type: 'Tam ştat',
      description: cmsText("lib/site-translations.ts.181"),
      requirements: [
        cmsText("lib/site-translations.ts.182"),
        cmsText("lib/site-translations.ts.183"),
        cmsText("lib/site-translations.ts.184"),
        cmsText("lib/site-translations.ts.185"),
      ],
    },
  },
  "2": {
    az: {
      title: cmsText("lib/site-translations.ts.187"),
      department: cmsText("lib/site-translations.ts.188"),
      location: cmsText("lib/site-translations.ts.189"),
      type: 'Tam ştat',
      description: cmsText("lib/site-translations.ts.190"),
      requirements: [
        cmsText("lib/site-translations.ts.191"),
        cmsText("lib/site-translations.ts.192"),
        cmsText("lib/site-translations.ts.193"),
        cmsText("lib/site-translations.ts.194"),
      ],
    },
  },
  "3": {
    az: {
      title: cmsText("lib/site-translations.ts.196"),
      department: cmsText("lib/site-translations.ts.197"),
      location: cmsText("lib/site-translations.ts.198"),
      type: 'Tam ştat',
      description: cmsText("lib/site-translations.ts.199"),
      requirements: [
        cmsText("lib/site-translations.ts.200"),
        cmsText("lib/site-translations.ts.201"),
        cmsText("lib/site-translations.ts.202"),
        cmsText("lib/site-translations.ts.203"),
      ],
    },
  },
}

const certificateTranslations: Record<
  string,
  Localized<Pick<Certificate, 'title' | 'category' | 'description'>>
> = {
  "1": {
    az: {
      title: cmsText("lib/site-translations.ts.205"),
      category: cmsText("lib/site-translations.ts.206"),
      description:
        cmsText("lib/site-translations.ts.207"),
    },
  },
  "2": {
    az: {
      title: cmsText("lib/site-translations.ts.209"),
      category: cmsText("lib/site-translations.ts.210"),
      description:
        cmsText("lib/site-translations.ts.211"),
    },
  },
  "3": {
    az: {
      title: cmsText("lib/site-translations.ts.213"),
      category: cmsText("lib/site-translations.ts.214"),
      description:
        cmsText("lib/site-translations.ts.215"),
    },
  },
}

function translateRecord<T extends object>(value: T, locale: Locale, translation?: Partial<T>) {
  if (locale === 'en' || !translation) {
    return value
  }

  return { ...value, ...translation }
}

function getCategoryLabel(category: string, locale: Locale) {
  return categoryLabels[locale][category] ?? category
}

function getProjectCategories(locale: Locale) {
  return [
    { key: 'all', label: getCategoryLabel('all', locale) },
    { key: 'residential', label: getCategoryLabel('residential', locale) },
    { key: 'commercial', label: getCategoryLabel('commercial', locale) },
    { key: 'industrial', label: getCategoryLabel('industrial', locale) },
    { key: 'infrastructure', label: getCategoryLabel('infrastructure', locale) },
  ]
}

function translateService(service: Service, locale: Locale) {
  return translateRecord(service, locale, serviceTranslations[service.id]?.[locale])
}

function translateProject(project: Project, locale: Locale) {
  return translateRecord(project, locale, projectTranslations[project.slug]?.[locale])
}

function translateNewsArticle(article: NewsArticle, locale: Locale) {
  return translateRecord(article, locale, newsTranslations[article.slug]?.[locale])
}

function translateTeamMember(member: TeamMember, locale: Locale) {
  return translateRecord(member, locale, teamTranslations[member.id]?.[locale])
}

function translateJob(job: JobPosition, locale: Locale) {
  return translateRecord(job, locale, jobTranslations[job.id]?.[locale])
}

function translateCertificate(certificate: Certificate, locale: Locale) {
  return translateRecord(certificate, locale, certificateTranslations[certificate.id]?.[locale])
}


return { getCategoryLabel, getProjectCategories, translateService, translateProject, translateNewsArticle, translateTeamMember, translateJob, translateCertificate }
}
export function formatLocalizedDate(dateString: string, locale: Locale) {
  const date = new Date(dateString)

  return date.toLocaleDateString(locale === 'az' ? 'az-AZ' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
