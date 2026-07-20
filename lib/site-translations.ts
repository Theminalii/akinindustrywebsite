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

const categoryLabels: Record<Locale, Record<string, string>> = {
  en: {
    residential: 'Residential',
    commercial: 'Commercial',
    industrial: 'Industrial',
    infrastructure: 'Infrastructure',
    all: 'All',
  },
  az: {
    residential: 'Yaşayış',
    commercial: 'Kommersiya',
    industrial: 'Sənaye',
    infrastructure: 'İnfrastruktur',
    all: 'Hamısı',
  },
}

const serviceTranslations: Record<
  string,
  Localized<Pick<Service, 'title' | 'description' | 'features'>>
> = {
  '1': {
    az: {
      title: 'Konstruktiv Tikinti İşləri',
      description: 'Qəlib, armatur və beton işləri üzrə tam həcmli həllər.',
      features: ['Qəlib işləri', 'Armatur quraşdırılması', 'Beton tökülməsi', 'Keyfiyyətə nəzarət'],
    },
  },
  '2': {
    az: {
      title: 'Metal Konstruksiyaların İstehsalı və Montajı',
      description: 'Sənaye və infrastruktur layihələri üçün etibarlı metal konstruksiya həlləri.',
      features: ['Metal istehsalı', 'Montaj xidmətləri', 'Çatdırılma və quraşdırma', 'Korroziyadan mühafizə'],
    },
  },
  '3': {
    az: {
      title: 'Fasad İşləri',
      description: 'Bütün bina növləri üçün müasir və davamlı fasad sistemləri.',
      features: ['İzolyasiya sistemləri', 'Keramoqranit üzlük', 'Doğrama quraşdırılması', 'Şüşə fasad sistemləri'],
    },
  },
  '4': {
    az: {
      title: 'Mühəndislik və Layihələndirmə',
      description: 'Layihə planlaması, mühəndis hesablamaları və icra sənədləri.',
      features: ['Layihələndirmə', 'Mühəndis hesablamaları', 'BIM modelləşdirmə', 'Texniki sənədləşmə'],
    },
  },
  '5': {
    az: {
      title: 'Sendviç Panel Quraşdırılması və İzolyasiya',
      description: 'Sendviç panel sistemlərinin sürətli və etibarlı quraşdırılması.',
      features: ['Panel quraşdırılması', 'İzolyasiya tətbiqi', 'Sızdırmazlıq yoxlaması', 'Səth tamamlama işləri'],
    },
  },
  '6': {
    az: {
      title: 'Fit-Out və Landşaft İşləri',
      description: 'Müasir məkanlar üçün interyer və açıq mühit həlləri.',
      features: ['Ofis fit-out işləri', 'Təchizat və dekorasiya', 'Bağ və landşaft dizaynı', 'Təhvil sonrası dəstək'],
    },
  },
  '7': {
    az: {
      title: 'Üzlük, Suvaq və Boya İşləri',
      description: 'Daxili və xarici məkanlar üçün tamamlama həlləri.',
      features: ['Üzlük təmiri', 'Xarici suvaq', 'Daxili boya işləri', 'Səthin hazırlanması'],
    },
  },
  '8': {
    az: {
      title: 'BMU Quraşdırılması və Servisi',
      description: 'Fasada çıxış və təmizləmə sistemlərinin quraşdırılması və xidməti.',
      features: ['BMU quraşdırılması', 'Avadanlıq testləri', 'Texniki xidmət', 'Təhlükəsizlik yoxlamaları'],
    },
  },
  '9': {
    az: {
      title: 'Mexaniki Avadanlıq və Boru Xətlərinin Montajı',
      description: 'Mexaniki sistemlər və boru şəbəkələrinin tam quraşdırılması.',
      features: ['Boru montajı', 'Mexaniki sistemlər', 'İstismar testləri', 'Quraşdırma protokolları'],
    },
  },
}

const projectTranslations: Record<
  string,
  Localized<Pick<Project, 'title' | 'description' | 'location' | 'area'>>
> = {
  'port-baku-towers': {
    az: {
      title: 'BMU Sistemi (Metal Konstruksiya və Mexaniki Montaj İşləri)',
      description:
        'Bakıda yerləşən nüfuzlu biznes mərkəzi üçün müasir memarlıq həlləri və yüksək keyfiyyətli tikinti materialları ilə icra edilmiş layihə.',
      location: 'Bakı, Azərbaycan',
      area: '350 ton',
    },
  },
  'white-city-residences': {
    az: {
      title: 'Çinar Park Dam Konstruksiyası',
      description: 'Metal istehsalı və montaj işlərini əhatə edən davam edən layihə.',
      location: 'Bakı, Azərbaycan',
      area: '28 ton',
    },
  },
  'sumgait-industrial-zone': {
    az: {
      title: 'Crescent Mall Metal İşləri',
      description: 'Böyük həcmli qarışıq istifadəli kommersiya obyekti üçün metal istehsalı, montaj və ankeraj işləri.',
      location: 'Bakı, Azərbaycan',
      area: '55 ton',
    },
  },
  'baku-ring-road': {
    az: {
      title: 'Mingəçevir Elektrik Stansiyası',
      description: 'Beton və metal konstruksiya işləri ilə həyata keçirilmiş iri sənaye infrastrukturu layihəsi.',
      location: 'Mingəçevir, Azərbaycan',
      area: '1500 ton beton / 350 ton polad',
    },
  },
  'flame-towers-renovation': {
    az: {
      title: 'Crescent Mall',
      description: 'Böyük ticarət məkanı üçün metal istehsalı, montaj və ankeraj işləri.',
      location: 'Bakı, Azərbaycan',
      area: '55 ton',
    },
  },
  'ganja-shopping-mall': {
    az: {
      title: 'Şirvan Elektrik Stansiyası',
      description: 'Müasir sənaye həlli çərçivəsində metal və örtük işləri ilə icra olunmuş layihə.',
      location: 'Şirvan, Azərbaycan',
      area: '85 ton polad + trapets formalı örtük',
    },
  },
  'azersulfat-tursu-zavodu': {
    az: {
      title: 'Azersulfat Turşu Zavodu',
      description: 'Azersulfat layihəsi çərçivəsində refrakter montaj işləri.',
      location: 'Sumqayıt, Azərbaycan',
      area: '250 ton',
    },
  },
  'suvelan-elektrik-stansiyasi': {
    az: {
      title: 'Şüvəlan Elektrik Stansiyası',
      description: 'Şimal-2 estakadasında qumlama və boyama işləri.',
      location: 'Şüvəlan, Azərbaycan',
      area: '6000 m²',
    },
  },
  'sangacal-terminal': {
    az: {
      title: 'Səngəçal Terminalı',
      description: 'BP Terminalı üçün hasar işləri.',
      location: 'Səngəçal, Azərbaycan',
      area: '2500 metr',
    },
  },
  'qazax-ada-universitesi': {
    az: {
      title: 'Qazax ADA Universiteti',
      description: 'Qazax ADA Universiteti yataqxanasının yenidənqurma işləri.',
      location: 'Qazax, Azərbaycan',
      area: 'Metal konstruksiya işləri (120 m məhəccər və 7 ton keçid platforması)',
    },
  },
  'qlukometr-ve-strip-istehsal-binasi': {
    az: {
      title: 'Qlükometr və Strip İstehsal Binası',
      description: 'Metal və fasad işləri daxil olmaqla ventilyasiya sistemli istehsal binası layihəsi.',
      location: 'Pirallahı, Azərbaycan',
      area: '150 ton metal işləri və 4000 m² fasad işləri',
    },
  },
  'kalium-sulfat-zavodu': {
    az: {
      title: 'Kalium Sulfat Zavodu',
      description: 'İnşaat, metal konstruksiya və örtük işlərini əhatə edən sənaye layihəsi.',
      location: 'Sumqayıt, Azərbaycan',
      area: '4200 m³ beton, 350 ton armatur, 180 ton metal və 5500 m² örtük',
    },
  },
}

const newsTranslations: Record<
  string,
  Localized<Pick<NewsArticle, 'title' | 'excerpt' | 'content' | 'category'>>
> = {
  'akin-industry-partners-with-pocketvc-venture-studio': {
    az: {
      title: 'Akin Industry Agentic AI İş Axınlarının Tətbiqi üçün PocketVC Venture Studio ilə Tərəfdaşlıq Edir',
      excerpt:
        'Əməliyyat və satış proseslərimizi transformasiya edəcək AI alətlərinin hazırlanması və tətbiqi üçün strateji tərəfdaşlıq.',
      content:
        'PocketVC Venture Studio-nun partnyoru Chinara Askerzade ilə ən son tərəfdaşlığımızı məmnuniyyətlə elan edirik. Bu əməkdaşlıq əməliyyat və satış proseslərimizdə agentic AI iş axınlarının hazırlanması və tətbiqini dəstəkləyəcək.\n\nBu tərəfdaşlıq daxili iş axınlarımızı sadələşdirməyə, səmərəliliyi artırmağa, əsas prosesləri avtomatlaşdırmağa və müştərilərimizlə əlaqə üsulumuzu gücləndirməyə kömək edəcək. Nəticədə daha ağıllı qərarlar və dayanıqlı inkişaf əldə edəcəyik.',
      category: 'Tərəfdaşlıq Elanı',
    },
  },
  'yeni-layihe-imzalandi': {
    az: {
      title: 'Yeni İnfrastruktur Layihəsi İmzalandı',
      excerpt:
        'Akin Industry dəyəri 50 milyon AZN olan və iki il ərzində tamamlanması planlaşdırılan yeni ictimai infrastruktur layihəsinə başlayır.',
      content:
        'Akin Industry tərəfindən yeni infrastruktur layihəsinin başlanmasını məmnuniyyətlə elan edirik. Layihə Azərbaycan Respublikası Dövlət Yol Agentliyi ilə əməkdaşlıq çərçivəsində icra olunacaq və ölkənin nəqliyyat şəbəkəsinə əhəmiyyətli töhfə verəcək.\n\nLayihə 25 km avtomobil yolunu, 4 körpünü və müasir işıqlandırma sistemini əhatə edir. Tikintinin 2024-cü ilin yazında başlaması və 2026-cı ilin sonuna qədər yekunlaşması planlaşdırılır.',
      category: 'Layihələr',
    },
  },
  'iso-sertifikati-alindi': {
    az: {
      title: 'ISO 9001:2015 Sertifikatı Əldə Olundu',
      excerpt:
        'Şirkətimiz keyfiyyət idarəetməsi üzrə beynəlxalq ISO 9001:2015 sertifikatına layiq görülüb.',
      content:
        'Akin Industry keyfiyyət idarəetmə sistemi üzrə nüfuzlu ISO 9001:2015 sertifikatını əldə edib. Bu sertifikat daxili proseslərimizin beynəlxalq səviyyədə tanınan keyfiyyət standartlarına uyğun olduğunu təsdiqləyir.\n\nSertifikatlaşdırma prosesi TÜV Rheinland tərəfindən aparılıb və sistemlərimizin qlobal ən yaxşı təcrübələrlə uyğunluğu təsdiqlənib. Bu nailiyyət müştərilərimizə daha yüksək keyfiyyətli xidmət göstərmək öhdəliyimizi bir daha gücləndirir.',
      category: 'Nailiyyətlər',
    },
  },
  'yeni-texnologiyalar': {
    az: {
      title: 'BIM Texnologiyasına Keçid',
      excerpt:
        'Akin Industry BIM texnologiyasını layihələndirmə və planlaşdırma proseslərinə tətbiq edir.',
      content:
        'Layihələndirmə və icra keyfiyyətini daha da artırmaq üçün şirkətimiz BIM texnologiyasına keçid edir. Bu müasir metodologiya daha dəqiq planlama, daha güclü koordinasiya və daha səmərəli xərc idarəçiliyi imkanı yaradır.\n\nBIM vasitəsilə bütün tikinti prosesi virtual şəkildə modelləşdirilir, potensial problemlər erkən mərhələdə aşkarlanır və icraya başlamazdan əvvəl aradan qaldırılır. Bu da daha qısa təhvil müddəti və daha yüksək keyfiyyət deməkdir.',
      category: 'Texnologiya',
    },
  },
  'yeni-iscilar-axtarilir': {
    az: {
      title: 'İşə Qəbul Kampaniyası Başladı',
      excerpt:
        'Böyüyən layihə portfelimizi dəstəkləmək üçün müxtəlif istiqamətlər üzrə yeni komanda üzvləri axtarırıq.',
      content:
        'Akin Industry komandası genişlənir. Qarşıdakı layihələrimiz üçün mühəndislər, layihə menecerləri və texniki mütəxəssislər axtarırıq.\n\nNamizədlərdən müvafiq tikinti təcrübəsi, güclü komanda işi bacarığı və peşəkar yanaşma gözlənilir. Daha ətraflı məlumat üçün Karyera səhifəmizə baxın.',
      category: 'Karyera',
    },
  },
}

const teamTranslations: Record<string, Localized<Pick<TeamMember, 'position' | 'bio'>>> = {
  '1': {
    az: {
      position: 'Baş İcraçı Direktor',
      bio: 'Tikinti sahəsində 25 illik təcrübəyə malikdir. Azərbaycan Memarlıq və İnşaat Universitetinin məzunudur.',
    },
  },
  '2': {
    az: {
      position: 'Texniki Direktor',
      bio: 'Beynəlxalq tikinti layihələrində 15 illik təcrübəyə malikdir. Almaniyada təhsil alıb.',
    },
  },
  '3': {
    az: {
      position: 'Layihə Direktoru',
      bio: 'Böyükmiqyaslı layihələrin təhvili üzrə ixtisaslaşmış mütəxəssisdir. PMP sertifikatına malikdir.',
    },
  },
  '4': {
    az: {
      position: 'Maliyyə Direktoru',
      bio: '18 illik maliyyə təcrübəsi olan ACCA üzvüdür.',
    },
  },
}

const jobTranslations: Record<
  string,
  Localized<Pick<JobPosition, 'title' | 'department' | 'location' | 'type' | 'description' | 'requirements'>>
> = {
  '1': {
    az: {
      title: 'Baş Mühəndis',
      department: 'Tikinti',
      location: 'Bakı',
      type: 'Tam ştat',
      description: 'Böyükmiqyaslı tikinti layihələrinin texniki icrasına rəhbərlik edəcək təcrübəli mühəndis axtarırıq.',
      requirements: [
        'Mülki və ya tikinti mühəndisliyi üzrə ali təhsil',
        'Minimum 10 il tikinti təcrübəsi',
        'AutoCAD və Revit bilikləri',
        'Güclü layihə idarəetmə bacarıqları',
      ],
    },
  },
  '2': {
    az: {
      title: 'Layihə Meneceri',
      department: 'Layihə İdarəetməsi',
      location: 'Bakı',
      type: 'Tam ştat',
      description: 'Kommersiya tikinti layihələrinin icrası üçün peşəkar menecer tələb olunur.',
      requirements: [
        'İdarəetmə və ya mühəndislik üzrə ali təhsil',
        'Minimum 5 il layihə idarəetmə təcrübəsi',
        'MS Project və Primavera təcrübəsi',
        'Yüksək kommunikasiya və liderlik bacarıqları',
      ],
    },
  },
  '3': {
    az: {
      title: 'BIM Mütəxəssisi',
      department: 'Layihələndirmə',
      location: 'Bakı',
      type: 'Tam ştat',
      description: 'BIM modelləşdirmə və fənlərarası koordinasiyaya fokuslanan mütəxəssis vakansiyası.',
      requirements: [
        'Memarlıq və ya mühəndislik üzrə ali təhsil',
        'Revit, Navisworks və BIM 360 təcrübəsi',
        'BIM standartları üzrə bilik',
        'Güclü əməkdaşlıq bacarıqları',
      ],
    },
  },
}

const certificateTranslations: Record<
  string,
  Localized<Pick<Certificate, 'title' | 'category' | 'description'>>
> = {
  '1': {
    az: {
      title: 'ISO 9001:2015 Keyfiyyət İdarəetməsi',
      category: 'Sertifikat',
      description:
        'Müştəri məmnuniyyəti və davamlı inkişaf öhdəliyimizi təsdiqləyən keyfiyyət idarəetmə sistemi üzrə beynəlxalq sertifikat.',
    },
  },
  '2': {
    az: {
      title: 'ISO 45001 Əməyin Mühafizəsi və Təhlükəsizlik',
      category: 'Sertifikat',
      description:
        'İşçi rifahı və təhlükəsiz əməliyyatlara verdiyimiz önəmi əks etdirən əməyin mühafizəsi sertifikatı.',
    },
  },
  '3': {
    az: {
      title: 'ISO 14001 Ətraf Mühitin İdarəedilməsi',
      category: 'Sertifikat',
      description:
        'Davamlılıq və ətraf mühit məsuliyyətinə bağlılığımızı göstərən beynəlxalq ətraf mühit standartı.',
    },
  },
}

function translateRecord<T extends object>(value: T, locale: Locale, translation?: Partial<T>) {
  if (locale === 'en' || !translation) {
    return value
  }

  return { ...value, ...translation }
}

export function getCategoryLabel(category: string, locale: Locale) {
  return categoryLabels[locale][category] ?? category
}

export function getProjectCategories(locale: Locale) {
  return [
    { key: 'all', label: getCategoryLabel('all', locale) },
    { key: 'residential', label: getCategoryLabel('residential', locale) },
    { key: 'commercial', label: getCategoryLabel('commercial', locale) },
    { key: 'industrial', label: getCategoryLabel('industrial', locale) },
    { key: 'infrastructure', label: getCategoryLabel('infrastructure', locale) },
  ]
}

export function translateService(service: Service, locale: Locale) {
  return translateRecord(service, locale, serviceTranslations[service.id]?.[locale])
}

export function translateProject(project: Project, locale: Locale) {
  return translateRecord(project, locale, projectTranslations[project.slug]?.[locale])
}

export function translateNewsArticle(article: NewsArticle, locale: Locale) {
  return translateRecord(article, locale, newsTranslations[article.slug]?.[locale])
}

export function translateTeamMember(member: TeamMember, locale: Locale) {
  return translateRecord(member, locale, teamTranslations[member.id]?.[locale])
}

export function translateJob(job: JobPosition, locale: Locale) {
  return translateRecord(job, locale, jobTranslations[job.id]?.[locale])
}

export function translateCertificate(certificate: Certificate, locale: Locale) {
  return translateRecord(certificate, locale, certificateTranslations[certificate.id]?.[locale])
}

export function formatLocalizedDate(dateString: string, locale: Locale) {
  const date = new Date(dateString)

  return date.toLocaleDateString(locale === 'az' ? 'az-AZ' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
