import type {
  Certificate,
  CompanyStats,
  JobPosition,
  NewsArticle,
  Partner,
  Project,
  Service,
  TeamMember,
} from '@/lib/types'

export interface ContactInfo {
  phone1: string
  phone2: string
  email1: string
  email2: string
  address: string
  workingHours: string
  googleMapEmbedUrl: string
  googleMapUrl: string
  linkedinUrl: string
  facebookUrl: string
  instagramUrl: string
  tiktokUrl: string
}

export interface AdminAccount {
  id: string
  name: string
  email: string
  password: string
}

export interface AdminContentData {
  pageContent: Record<string, string>
  pageVisibility: Record<string, boolean>
  projects: Project[]
  news: NewsArticle[]
  team: TeamMember[]
  services: Service[]
  jobs: JobPosition[]
  certificates: Certificate[]
  partners: Partner[]
  contact: ContactInfo
  stats: CompanyStats
  adminAccounts: AdminAccount[]
}
