import type {
  Project,
  NewsArticle,
  Service,
  JobPosition,
  TeamMember,
  Partner,
  CompanyStats,
  Certificate,
} from './types'

export const companyStats: CompanyStats = {
  years: 10,
  projects: 15,
  employees: 100,
  clients: 15
}

export const services: Service[] = [
  {
    id: '1',
    title: 'İnşaat İşləri (Kalıp-Demir-Beton)',
    description: 'Kalıp, beton və dəmir işləri üzrə tam həllər.',
    icon: 'building',
    features: ['Kalıp işləri', 'Demir montajı', 'Beton dökümü', 'Keyfiyyət nəzarəti']
  },
  {
    id: '2',
    title: 'Metal konstruksiyaların istehsalı və montaj işi',
    description: 'Sənaye və infrastruktur layihələri üçün metal konstruksiyalar.',
    icon: 'factory',
    features: ['Metal konstruksiya istehsalı', 'Montaj xidmətləri', 'Çatdırılma və quraşdırma', 'Korroziya qorunması']
  },
  {
    id: '3',
    title: 'Façade İşləri (Mantolama-Kermogranit-Doğrama və Cam İşləri)',
    description: 'Bina fasadlarının modern və davamlı həllərlə bəzənməsi.',
    icon: 'building',
    features: ['Mantolama', 'Kermogranit montajı', 'Doğrama quraşdırılması', 'Cam fasad sistemləri']
  },
  {
    id: '4',
    title: 'Mühəndislik və layihə',
    description: 'Layihə planlaması, mühəndis hesablamaları və icra sənədləri.',
    icon: 'pencil-ruler',
    features: ['Layihə dizaynı', 'Mühəndis hesablamaları', 'BIM modelləşdirmə', 'Texniki sənədləşdirmə']
  },
  {
    id: '5',
    title: 'Sendviç panellərin montajı və izolyasiyası',
    description: 'Sürətli və etibarlı sendviç panel quraşdırılması.',
    icon: 'wrench',
    features: ['Panel montajı', 'İzolyasiya tətbiqi', 'Sızdırmazlıq yoxlaması', 'Səth toxuması']
  },
  {
    id: '6',
    title: 'Fit-out və Landscape İşləri',
    description: 'Müasir interyer və ətraf mühit dizaynı xidmətləri.',
    icon: 'clipboard-check',
    features: ['Ofis fit-out', 'Təchizat və bəzək', 'Bağ və landşaft dizaynı', 'İstismar sonrası dəstək']
  },
  {
    id: '7',
    title: 'Üzleme, Sıva və Boya İşləri',
    description: 'Daxili və xarici səthlərin tam üzlənməsi və boya işi.',
    icon: 'building',
    features: ['Üzleme təmir işləri', 'Xarici sıva', 'Daxili boya', 'Yüzey hazırlığı']
  },
  {
    id: '8',
    title: 'BMU sistemlərinin montajı və texniki xidməti',
    description: 'Fasad təmiri və təmizləmə sistemlərinin quraşdırılması.',
    icon: 'factory',
    features: ['BMU montajı', 'Avadanlıq testləri', 'Texniki xidmət', 'Təhlükəsizlik yoxlaması']
  },
  {
    id: '9',
    title: 'Mexaniki avadanlıqların və boruların montajı',
    description: 'Mekanik sistemlərin və boru şəbəkələrinin tam montajı.',
    icon: 'wrench',
    features: ['Boru montajı', 'Mexaniki sistemlər', 'Əməliyyat sınaqları', 'Quraşdırma protokolları']
  },
   
]

export const projects: Project[] = [
  {
    id: '1',
    slug: 'port-baku-towers',
    title: 'BMU Sistemi (Metal Konstruksiyon ve Mekanik Montaj İşleri)',
    category: 'commercial',
    description: 'Bakının ən prestijli biznes mərkəzlərindən biri olan Port Baku Towers layihəsi. Müasir memarlıq həlləri və yüksək keyfiyyətli tikinti materialları ilə inşa edilmişdir. 35 mərtəbəli bina A sinif ofis sahələri, restoran və kafelər, həmçinin yeraltı dayanacaq ilə təchiz edilmişdir.',
    client: 'GEDA MAJOR',
    location: 'Bakı, Azərbaycan',
    year: 2022,
    area: '350 ton',
    images: ['/images/projects/project1.webp', '/images/projects/project2.webp'],
    featured: true
  },
  {
    id: '2',
    slug: 'white-city-residences',
    title: 'Çınar Park Çatısı (Metal Konstruksiyon Imalat ve Montaj İşleri)',
    category: 'residential',
    description: 'Davam eden layihe 3',
    client: 'ÇINAR PARK',
    location: 'Bakı, Azərbaycan',
    year: 2023,
    area: '28 ton',
    images: ['/images/projects/project3.webp', '/images/projects/project4.webp'],
    featured: true
  },
  {
    id: '3',
    slug: 'sumgait-industrial-zone',
    title: 'Cresent Mall (Metal Konstruksiyon İmalat - Montaj ve Ankraj İşleri )',
    category: 'industrial',
    description: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    client: 'AMAZONE MMC',
    location: 'Baki / Azerbaycan',
    year: 2021,
    area: '55 ton',
    images: ['/images/projects/project4.webp', '/images/projects/project6.webp'],
    featured: true
  },
  {
    id: '4',
    slug: 'baku-ring-road',
    title: 'Mingeçevir Elektrik Stansiyası',
    category: 'infrastructure',
    description: 'Bakı şəhərinin dairəvi yolunun 15 km-lik hissəsinin tikintisi. Layihəyə 3 körpü, 5 yeraltı keçid və müasir işıqlandırma sistemi daxildir.',
    client: 'BCC GROUP',
    location: 'Mingəçevir, Azərbaycan',
    year: 2020,
    area: '1500 ton Beton / 350 ton Metal',
    images: ['/images/projects/project10.webp', '/images/projects/project11.webp'],
    featured: true
  },
  {
    id: '5',
    slug: 'flame-towers-renovation',
    title: 'Cresent Mall',
    category: 'commercial',
    description: 'Cresent Mall (Metal Konstruksiyon İmalat - Montaj ve Ankraj İşleri )',
    client: 'AMAZONE MMC',
    location: 'Bakı, Azərbaycan',
    year: 2023,
    area: '55 ton',
    images: ['/images/projects/project7.webp', '/images/projects/project12.webp'],
    featured: true
  },
  {
    id: '6',
    slug: 'ganja-shopping-mall',
    title: 'Şirvan Elektrik Stansiyası',
    category: 'commercial',
    description: 'Gəncə şəhərində müasir ticarət mərkəzinin tikintisi. 150-dən çox mağaza, kinoteatr, yemək meydançası və əyləncə zonası.',
    client: 'BCC GROUP',
    location: 'Şirvan, Azərbaycan',
    year: 2022,
    area: '85 ton Metal + Trapez Kaplama',
    images: ['/images/projects/project8.webp', '/images/projects/project13.webp'],
    featured: true
  }
]

export const news: NewsArticle[] = [
  {
    id: '0',
    slug: 'akin-industry-partners-with-pocketvc-venture-studio',
    title: 'Akin Industry Partners with PocketVC Venture Studio to Implement Agentic AI Workflows',
    excerpt: 'A strategic partnership to develop and implement AI tools that will transform our operations and sales processes.',
    content: 'We are pleased to announce our latest partnership with Chinara Askerzade, Partner at PocketVC Venture Studio, to support the development and implementation of agentic AI workflows across our operations and sales processes.\n\nThis collaboration will help us streamline internal workflows, improve efficiency, automate key processes, and enhance the way we engage with our clients—driving smarter decisions and sustainable growth.',
    date: '2026-05-11',
    image: '/images/akin-pocketvc-hero-new.png',
    category: 'Partnership Announcement'
  },
  {
    id: '1',
    slug: 'yeni-layihe-imzalandi',
    title: 'Yeni İnfrastruktur Layihəsi İmzalandı',
    excerpt: 'Akin Industry yeni dövlət infrastruktur layihəsinin icrasına başlayır. 50 milyon AZN dəyərində layihə 2 il ərzində tamamlanacaq.',
    content: 'Akin Industry olaraq yeni infrastruktur layihəsinin icrasına başlamağımızı elan etməkdən məmnunluq duyuruq. Bu layihə Azərbaycan Respublikası Dövlət Yol Agentliyi ilə əməkdaşlıq çərçivəsində həyata keçiriləcək və ölkənin nəqliyyat infrastrukturunun inkişafına əhəmiyyətli töhfə verəcəkdir.\n\nLayihə çərçivəsində 25 km uzunluğunda yeni magistral yol, 4 körpü və müasir işıqlandırma sistemi inşa ediləcəkdir. Tikinti işləri 2024-cü ilin yazında başlayacaq və 2026-cı ilin sonunda tamamlanması planlaşdırılır.',
    date: '2024-01-15',
    image: '/homepage.webp',
    category: 'Layihələr'
  },
  {
    id: '2',
    slug: 'iso-sertifikati-alindi',
    title: 'ISO 9001:2015 Sertifikatı Alındı',
    excerpt: 'Şirkətimiz keyfiyyət idarəetmə sistemi üzrə beynəlxalq ISO 9001:2015 sertifikatına layiq görüldü.',
    content: 'Akin Industry keyfiyyət idarəetmə sistemi üzrə prestijli ISO 9001:2015 sertifikatını aldı. Bu sertifikat şirkətimizin beynəlxalq keyfiyyət standartlarına uyğunluğunu təsdiq edir.\n\nSertifikasiya prosesi TÜV Rheinland tərəfindən aparılmış və şirkətimizdə tətbiq olunan bütün proseslərin beynəlxalq standartlara cavab verdiyini müəyyən etmişdir. Bu nailiyyət müştərilərimizə daha yüksək keyfiyyətli xidmət göstərmək öhdəliyimizin təsdiqidir.',
    date: '2024-01-10',
    image: '/images/sertifkat/sertifkat.jpg',
    category: 'Nailiyyətlər'
  },
  {
    id: '3',
    slug: 'yeni-texnologiyalar',
    title: 'BIM Texnologiyasına Keçid',
    excerpt: 'Akin Industry layihələndirmə proseslərində BIM (Building Information Modeling) texnologiyasını tətbiq etməyə başlayır.',
    content: 'Şirkətimiz layihələndirmə və tikinti proseslərini daha da təkmilləşdirmək məqsədilə BIM texnologiyasına keçid edir. Bu müasir texnologiya layihələrin daha dəqiq planlaşdırılmasına və xərclərin optimallaşdırılmasına imkan verir.\n\nBIM texnologiyası vasitəsilə bütün tikinti prosesi virtual mühitdə modelləşdirilir, potensial problemlər əvvəlcədən aşkar edilir və həll yolları tapılır. Bu, tikinti müddətinin qısalmasına və keyfiyyətin artmasına səbəb olur.',
    date: '2024-01-05',
    image: '/images/projects/project14.webp',
    category: 'Texnologiya'
  },
  {
    id: '4',
    slug: 'yeni-iscilar-axtarilir',
    title: 'İşə Qəbul Kampaniyası Başladı',
    excerpt: 'Genişlənən layihə portfelimiz üçün müxtəlif sahələrdə yeni əməkdaşlar axtarırıq.',
    content: 'Akin Industry komandası genişlənir! Yeni layihələrimiz üçün mühəndislər, layihə menecerləri və texniki mütəxəssislər axtarırıq.\n\nNamizədlərdən tikinti sahəsində təcrübə, komanda işi bacarıqları və peşəkar yanaşma tələb olunur. Ətraflı məlumat üçün Karyera səhifəmizi ziyarət edin.',
    date: '2023-12-20',
    image: '/images/projects/project15.webp',
    category: 'Karyera'
  }
]

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Əli Həsənov',
    position: 'Baş Direktor',
    image: '/placeholder-user.jpg',
    bio: '25 illik tikinti sahəsində təcrübə. Azərbaycan Tikinti Universitetinin məzunu.'
  },
  {
    id: '2',
    name: 'Leyla Məmmədova',
    position: 'Texniki Direktor',
    image: '/placeholder-user.jpg',
    bio: 'Beynəlxalq tikinti layihələrində 15 illik təcrübə. Almaniyada təhsil almışdır.'
  },
  {
    id: '3',
    name: 'Rəşad Əliyev',
    position: 'Layihə Direktoru',
    image: '/placeholder-user.jpg',
    bio: 'İri miqyaslı layihələrin idarə edilməsində mütəxəssis. PMP sertifikatlı.'
  },
  {
    id: '4',
    name: 'Nigar Hüseynova',
    position: 'Maliyyə Direktoru',
    image: '/placeholder-user.jpg',
    bio: 'ACCA üzvü, 18 illik maliyyə sektorunda təcrübə.'
  }
]

export const jobs: JobPosition[] = [
  {
    id: '1',
    title: 'Baş Mühəndis',
    department: 'Tikinti',
    location: 'Bakı',
    type: 'full-time',
    description: 'İri miqyaslı tikinti layihələrinin texniki rəhbərliyi üçün təcrübəli mühəndis axtarılır.',
    requirements: [
      'Tikinti mühəndisliyi üzrə ali təhsil',
      'Minimum 10 il tikinti sahəsində təcrübə',
      'AutoCAD, Revit proqramlarını bilmək',
      'Layihə idarəetmə bacarıqları'
    ]
  },
  {
    id: '2',
    title: 'Layihə Meneceri',
    department: 'Layihə İdarəetmə',
    location: 'Bakı',
    type: 'full-time',
    description: 'Kommersiya tikinti layihələrinin idarə edilməsi üçün peşəkar menecer.',
    requirements: [
      'İdarəetmə və ya mühəndislik üzrə ali təhsil',
      'Minimum 5 il layihə idarəetmə təcrübəsi',
      'MS Project, Primavera proqramlarını bilmək',
      'Ünsiyyət və liderlik bacarıqları'
    ]
  },
  {
    id: '3',
    title: 'BIM Mütəxəssisi',
    department: 'Layihələndirmə',
    location: 'Bakı',
    type: 'full-time',
    description: 'BIM modelləşdirmə və koordinasiya üzrə mütəxəssis.',
    requirements: [
      'Memarlıq və ya mühəndislik üzrə ali təhsil',
      'Revit, Navisworks, BIM 360 proqramlarında təcrübə',
      'BIM standartları haqqında biliklər',
      'Komanda ilə işləmə bacarığı'
    ]
  }
]

export const partners: Partner[] = [
  { id: '1', name: 'EJOT', logo: '/images/partner/EJOT-logo.svg.png' },
  { id: '2', name: 'Ertok', logo: '/images/partner/ertok.png' },
  { id: '3', name: 'Matanat', logo: '/images/partner/matanat-a.png' },
  { id: '4', name: 'Mr.Fix', logo: '/images/partner/mr.fix.png' },
  { id: '5', name: 'NB Group', logo: '/images/partner/nbgroup.png' },
  { id: '6', name: 'Oyal', logo: '/images/partner/oyal.webp' },
  { id: '7', name: 'Santral', logo: '/images/partner/santral.png' },
  { id: '8', name: 'Sika', logo: '/images/partner/sika.png' },
  { id: '9', name: 'Star Uniform', logo: '/images/partner/staruniform.png' }
]

export const certificates: Certificate[] = [
  {
    id: '1',
    slug: 'iso-9001',
    title: 'ISO 9001:2015 Keyfiyyət İdarəetməsi',
    category: 'Sertifikat',
    description:
      'Keyfiyyət idarəetməsi sistemi üzrə beynəlxalq standart sertifikası. Müştəri məmnuniyyəti və davamlı təkmilləşdirmə prinsipləri əsasında işləməmiz təsdiqlənir.',
    image: '/images/sertifkat/sertifkat.jpg',
    date: '2024-01-15',
  },
  {
    id: '2',
    slug: 'iso-45001',
    title: 'ISO 45001 İş Təhlükəsizliyi',
    category: 'Sertifikat',
    description:
      'Peşəkar sağlamlıq və təhlükəsizlik idarəetmə sistemi sertifikası. İşçi təhlükəsizliyi və sağlamlığının qorunması bizim ən əsas prioritetlərimizdəndir.',
    image: '/images/sertifkat/sertifkat1.jpg',
    date: '2024-01-15',
  },
  {
    id: '3',
    slug: 'iso-14001',
    title: 'ISO 14001 Ətraf Mühit İdarəetməsi',
    category: 'Sertifikat',
    description:
      'Ətraf mühitin qorunması üzrə beynəlxalq standart. Ekoloji məsuliyyət və davamlı inkişaf prinsiplərinə sadiqliyimizi göstərir.',
    image: '/images/sertifkat/sertifkat2.jpg',
    date: '2024-01-15',
  },
]

export const categoryLabels: Record<string, string> = {
  residential: 'Yaşayış',
  commercial: 'Kommersiya',
  industrial: 'Sənaye',
  infrastructure: 'İnfrastruktur'
}
