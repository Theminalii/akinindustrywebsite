import type {
  Certificate,
  CompanyStats,
  JobPosition,
  NewsArticle,
  Partner,
  Project,
  Service,
  TeamMember,
} from './types'

export const companyStats: CompanyStats = {
  years: 25,
  projects: 500,
  employees: 350,
  clients: 200,
}

export const services: Service[] = [
  {
    id: '1',
    title: 'Structural Construction Works',
    description: 'End-to-end solutions for formwork, rebar, and concrete works.',
    icon: 'building',
    features: ['Formwork works', 'Rebar installation', 'Concrete casting', 'Quality control'],
  },
  {
    id: '2',
    title: 'Metal Structure Fabrication & Installation',
    description: 'Reliable metal structure solutions for industrial and infrastructure projects.',
    icon: 'factory',
    features: ['Metal fabrication', 'Installation services', 'Delivery and assembly', 'Corrosion protection'],
  },
  {
    id: '3',
    title: 'Facade Works',
    description: 'Modern and durable facade systems for all building types.',
    icon: 'building',
    features: ['Insulation systems', 'Porcelain cladding', 'Joinery installation', 'Glass facade systems'],
  },
  {
    id: '4',
    title: 'Engineering & Design',
    description: 'Project planning, engineering calculations, and execution documentation.',
    icon: 'pencil-ruler',
    features: ['Project design', 'Engineering calculations', 'BIM modeling', 'Technical documentation'],
  },
  {
    id: '5',
    title: 'Sandwich Panel Installation & Insulation',
    description: 'Fast and dependable installation of sandwich panel systems.',
    icon: 'wrench',
    features: ['Panel installation', 'Insulation application', 'Sealing checks', 'Surface finishing'],
  },
  {
    id: '6',
    title: 'Fit-Out & Landscape Works',
    description: 'Interior fit-out and outdoor environment solutions for modern spaces.',
    icon: 'clipboard-check',
    features: ['Office fit-out', 'Supply and decoration', 'Garden and landscape design', 'Post-handover support'],
  },
  {
    id: '7',
    title: 'Cladding, Plaster & Paint Works',
    description: 'Complete interior and exterior finishing solutions.',
    icon: 'building',
    features: ['Cladding repairs', 'Exterior plaster', 'Interior painting', 'Surface preparation'],
  },
  {
    id: '8',
    title: 'BMU Installation & Maintenance',
    description: 'Installation and servicing of facade access and cleaning systems.',
    icon: 'factory',
    features: ['BMU installation', 'Equipment testing', 'Maintenance services', 'Safety inspections'],
  },
  {
    id: '9',
    title: 'Mechanical Equipment & Piping Installation',
    description: 'Full installation of mechanical systems and piping networks.',
    icon: 'wrench',
    features: ['Pipe installation', 'Mechanical systems', 'Operational testing', 'Installation protocols'],
  },
]

export const projects: Project[] = [
  {
    id: '1',
    slug: 'port-baku-towers',
    title: 'BMU System (Metal Structure and Mechanical Installation Works)',
    category: 'commercial',
    description:
      'A landmark business center in Baku delivered with modern architectural solutions and high-quality construction materials. The 35-storey building includes Class A office spaces, restaurants, cafes, and underground parking.',
    client: 'GEDA MAJOR',
    location: 'Baku, Azerbaijan',
    year: 2022,
    area: '350 tons',
    images: ['/images/projects/project1.webp', '/images/projects/project2.webp'],
    featured: true,
  },
  {
    id: '2',
    slug: 'white-city-residences',
    title: 'Chinar Park Roof Structure',
    category: 'residential',
    description: 'Ongoing project with metal fabrication and installation works.',
    client: 'CHINAR PARK',
    location: 'Baku, Azerbaijan',
    year: 2023,
    area: '28 tons',
    images: ['/images/projects/project3.webp', '/images/projects/project4.webp'],
    featured: true,
  },
  {
    id: '3',
    slug: 'sumgait-industrial-zone',
    title: 'Crescent Mall Metal Works',
    category: 'industrial',
    description:
      'Metal fabrication, installation, and anchorage works delivered for a large-scale mixed-use commercial facility.',
    client: 'AMAZONE MMC',
    location: 'Baku, Azerbaijan',
    year: 2021,
    area: '55 tons',
    images: ['/images/projects/project4.webp', '/images/projects/project6.webp'],
    featured: true,
  },
  {
    id: '4',
    slug: 'baku-ring-road',
    title: 'Mingachevir Power Station',
    category: 'infrastructure',
    description:
      'Construction of a 15 km section of Baku’s ring road, including 3 bridges, 5 underpasses, and a modern lighting system.',
    client: 'BCC GROUP',
    location: 'Mingachevir, Azerbaijan',
    year: 2020,
    area: '1500 tons concrete / 350 tons steel',
    images: ['/images/projects/project10.webp', '/images/projects/project11.webp'],
    featured: true,
  },
  {
    id: '5',
    slug: 'flame-towers-renovation',
    title: 'Crescent Mall',
    category: 'commercial',
    description: 'Metal fabrication, installation, and anchorage works for a major retail destination.',
    client: 'AMAZONE MMC',
    location: 'Baku, Azerbaijan',
    year: 2023,
    area: '55 tons',
    images: ['/images/projects/project7.webp', '/images/projects/project12.webp'],
    featured: true,
  },
  {
    id: '6',
    slug: 'ganja-shopping-mall',
    title: 'Shirvan Power Station',
    category: 'commercial',
    description:
      'Development of a modern commercial complex with retail, entertainment, and public-use areas.',
    client: 'BCC GROUP',
    location: 'Shirvan, Azerbaijan',
    year: 2022,
    area: '85 tons steel + trapezoidal cladding',
    images: ['/images/projects/project8.webp', '/images/projects/project13.webp'],
    featured: true,
  },
  {
    id: '7',
    slug: 'azersulfat-tursu-zavodu',
    title: 'AZERSULFAT TURSU ZAVODU',
    category: 'industrial',
    description: 'Azersulfat (Refrakter Montaj Isleri)',
    client: 'BCC GROUP',
    location: 'Sumqait / Azerbaycan',
    year: 2025,
    area: '250 ton',
    images: ['/images/projects/live-azersulfat.webp'],
  },
  {
    id: '8',
    slug: 'suvelan-elektrik-stansiyasi',
    title: 'SUVELAN ELEKTRIK STANSIYASI',
    category: 'infrastructure',
    description: 'Simal-2 Estakada Kumlama Boyama Isleri',
    client: 'BCC GROUP',
    location: 'Suvelan / Azerbaycan',
    year: 2025,
    area: '6000 m2',
    images: ['/images/projects/live-suvelan.webp'],
  },
  {
    id: '9',
    slug: 'sangacal-terminal',
    title: 'SANGACAL TERMINAL',
    category: 'infrastructure',
    description: 'BP Terminal Fence Isleri',
    client: 'BCC GROUP-ENCOTEC',
    location: 'Sangacal / Azerbaycan',
    year: 2025,
    area: '2500 metre',
    images: ['/images/projects/live-sangacal.webp'],
  },
  {
    id: '10',
    slug: 'qazax-ada-universitesi',
    title: 'QAZAX ADA UNIVERSITESI',
    category: 'commercial',
    description: 'Qazax Ada Universitesi Yatakhane Yeniden Kurma Isleri',
    client: 'SINERJI-PRO',
    location: 'Qazax / Azerbaycan',
    year: 2025,
    area: 'Metal Konstruksiyon Isleri (120mt Meheccer ve 7 ton Gecis Platformu)',
    images: ['/images/projects/live-qazax-ada.webp'],
  },
  {
    id: '11',
    slug: 'qlukometr-ve-strip-istehsal-binasi',
    title: 'QLUKOMETR ve STRIP ISTEHSAL BINASI',
    category: 'industrial',
    description: 'Qlukometr ve Strip Istehsal Binasi Metal ve Facade Isleri (Ventilation System)',
    client: 'MEDTEST',
    location: 'Pirallahi / Azerbaycan',
    year: 2025,
    area: 'Metal Isleri 150t ve Facade Isleri 4000m2 (Sandvic Panel + Kermogranit)',
    images: ['/images/projects/live-glukometr.webp'],
  },
  {
    id: '12',
    slug: 'kalium-sulfat-zavodu',
    title: 'KALIUM SULFAT ZAVODU',
    category: 'industrial',
    description: 'Kalium Sulfat Zavodu Insaat Metal Konstruksiyon ve Kaplama Isleri',
    client: 'ELBA-CHEM',
    location: 'Sumqait / Azerbaycan',
    year: 2025,
    area: 'Insaat Isleri (4200m3 beton 350t demir) Metal Isleri 180t ve Kaplama Isleri 5500m2',
    images: ['/images/projects/live-kalium-sulfat.webp'],
  },
]

export const news: NewsArticle[] = [
  {
    id: '0',
    slug: 'akin-industry-partners-with-pocketvc-venture-studio',
    title: 'Akin Industry Partners with PocketVC Venture Studio to Implement Agentic AI Workflows',
    excerpt:
      'A strategic partnership to develop and implement AI tools that will transform our operations and sales processes.',
    content:
      'We are pleased to announce our latest partnership with Chinara Askerzade, Partner at PocketVC Venture Studio, to support the development and implementation of agentic AI workflows across our operations and sales processes.\n\nThis collaboration will help us streamline internal workflows, improve efficiency, automate key processes, and enhance the way we engage with our clients—driving smarter decisions and sustainable growth.',
    date: '2026-05-11',
    image: '/images/akin-pocketvc-hero-new.png',
    category: 'Partnership Announcement',
  },
  {
    id: '1',
    slug: 'yeni-layihe-imzalandi',
    title: 'New Infrastructure Project Signed',
    excerpt:
      'Akin Industry is launching a new public infrastructure project valued at 50 million AZN, scheduled for completion within two years.',
    content:
      'We are pleased to announce the launch of a new infrastructure project by Akin Industry. The project will be delivered in cooperation with the State Road Agency of the Republic of Azerbaijan and will contribute significantly to the country’s transportation network.\n\nThe scope includes a 25 km highway, 4 bridges, and a modern lighting system. Construction is planned to begin in spring 2024 and conclude by the end of 2026.',
    date: '2024-01-15',
    image: '/homepage.webp',
    category: 'Projects',
  },
  {
    id: '2',
    slug: 'iso-sertifikati-alindi',
    title: 'ISO 9001:2015 Certification Achieved',
    excerpt:
      'Our company has been awarded the international ISO 9001:2015 certification for quality management.',
    content:
      'Akin Industry has received the prestigious ISO 9001:2015 certification for its quality management system. This certification confirms that our internal processes meet internationally recognized quality standards.\n\nThe certification process was conducted by TÜV Rheinland, which verified that our systems and procedures align with global best practices. This achievement reinforces our commitment to delivering higher-quality service to our clients.',
    date: '2024-01-10',
    image: '/images/sertifkat/sertifkat.jpg',
    category: 'Achievements',
  },
  {
    id: '3',
    slug: 'yeni-texnologiyalar',
    title: 'Transition to BIM Technology',
    excerpt:
      'Akin Industry is introducing BIM (Building Information Modeling) into its design and planning processes.',
    content:
      'To further improve project design and delivery, our company is transitioning to BIM technology. This modern methodology enables more accurate planning, stronger coordination, and better cost optimization.\n\nWith BIM, the entire construction process can be modeled virtually, allowing teams to identify potential issues early and solve them before execution. This leads to shorter delivery times and higher build quality.',
    date: '2024-01-05',
    image: '/images/projects/project14.webp',
    category: 'Technology',
  },
  {
    id: '4',
    slug: 'yeni-iscilar-axtarilir',
    title: 'Recruitment Campaign Launched',
    excerpt:
      'We are hiring new team members across multiple disciplines to support our growing project portfolio.',
    content:
      'The Akin Industry team is expanding. We are looking for engineers, project managers, and technical specialists to join our upcoming projects.\n\nCandidates should have relevant construction experience, strong teamwork skills, and a professional mindset. Visit our Careers page to learn more.',
    date: '2023-12-20',
    image: '/images/projects/project15.webp',
    category: 'Careers',
  },
]

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Ali Hasanov',
    position: 'Chief Executive Officer',
    image: '/placeholder-user.jpg',
    bio: '25 years of experience in construction. Graduate of Azerbaijan University of Architecture and Construction.',
  },
  {
    id: '2',
    name: 'Leyla Mammadova',
    position: 'Technical Director',
    image: '/placeholder-user.jpg',
    bio: '15 years of experience in international construction projects. Educated in Germany.',
  },
  {
    id: '3',
    name: 'Rashad Aliyev',
    position: 'Project Director',
    image: '/placeholder-user.jpg',
    bio: 'Specialist in large-scale project delivery. PMP certified.',
  },
  {
    id: '4',
    name: 'Nigar Huseynova',
    position: 'Finance Director',
    image: '/placeholder-user.jpg',
    bio: 'ACCA member with 18 years of experience in finance.',
  },
]

export const jobs: JobPosition[] = [
  {
    id: '1',
    title: 'Chief Engineer',
    department: 'Construction',
    location: 'Baku',
    type: 'full-time',
    description:
      'We are seeking an experienced engineer to lead the technical delivery of large-scale construction projects.',
    requirements: [
      'Degree in civil or construction engineering',
      'Minimum 10 years of construction experience',
      'Proficiency in AutoCAD and Revit',
      'Strong project management skills',
    ],
  },
  {
    id: '2',
    title: 'Project Manager',
    department: 'Project Management',
    location: 'Baku',
    type: 'full-time',
    description: 'Professional manager needed for commercial construction project delivery.',
    requirements: [
      'Degree in management or engineering',
      'Minimum 5 years of project management experience',
      'Experience with MS Project and Primavera',
      'Excellent communication and leadership skills',
    ],
  },
  {
    id: '3',
    title: 'BIM Specialist',
    department: 'Design',
    location: 'Baku',
    type: 'full-time',
    description: 'Specialist role focused on BIM modeling and interdisciplinary coordination.',
    requirements: [
      'Degree in architecture or engineering',
      'Experience with Revit, Navisworks, and BIM 360',
      'Knowledge of BIM standards',
      'Strong collaboration skills',
    ],
  },
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
  { id: '9', name: 'Star Uniform', logo: '/images/partner/staruniform.png' },
]

export const certificates: Certificate[] = [
  {
    id: '1',
    slug: 'iso-9001',
    title: 'ISO 9001:2015 Quality Management',
    category: 'Certificate',
    description:
      'International certification for quality management systems, validating our commitment to client satisfaction and continuous improvement.',
    image: '/images/sertifkat/sertifkat.jpg',
    date: '2024-01-15',
  },
  {
    id: '2',
    slug: 'iso-45001',
    title: 'ISO 45001 Occupational Safety',
    category: 'Certificate',
    description:
      'Certification for occupational health and safety management, reflecting our strong focus on worker wellbeing and safe operations.',
    image: '/images/sertifkat/sertifkat1.jpg',
    date: '2024-01-15',
  },
  {
    id: '3',
    slug: 'iso-14001',
    title: 'ISO 14001 Environmental Management',
    category: 'Certificate',
    description:
      'International environmental management standard demonstrating our commitment to sustainability and environmental responsibility.',
    image: '/images/sertifkat/sertifkat2.jpg',
    date: '2024-01-15',
  },
]

export const categoryLabels: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  industrial: 'Industrial',
  infrastructure: 'Infrastructure',
}
