export interface Project {
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
  featured?: boolean
}

export interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  image: string
  category: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  image: string
  bio: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface JobPosition {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
}

export interface Certificate {
  id: string
  slug: string
  title: string
  category: string
  description: string
  image: string
  date: string
}

export interface Partner {
  id: string
  name: string
  logo: string
}

export interface CompanyStats {
  years: number
  projects: number
  employees: number
  clients: number
}
