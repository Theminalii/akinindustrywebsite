import pageDefaults from '@/lib/admin/page-defaults.json'
import type { AdminAccount, AdminContentData, ContactInfo } from '@/lib/admin/types'
import {
  certificates as initialCertificates,
  companyStats,
  jobs as initialJobs,
  news as initialNews,
  partners as initialPartners,
  projects as initialProjects,
  services as initialServices,
  team as initialTeam,
} from '@/lib/data'

export const defaultContact: ContactInfo = {
  phone1: '+994 55 350 30 69',
  phone2: '+994 55 350 30 69',
  email1: 'selim@akinindustry.com',
  email2: 'sales@akinindustry.az',
  address: 'Bakı şəhəri, Atatürk prospekti 45',
  workingHours: 'Bazar ertəsi - Cümə: 09:00 - 18:00',
  googleMapEmbedUrl:
    'https://www.google.com/maps?q=Arena%20Plaza%20Baku&output=embed',
  googleMapUrl: 'https://maps.app.goo.gl/wh6PTpetRciTJjmS9',
  linkedinUrl: 'https://www.linkedin.com/',
  facebookUrl: '',
  instagramUrl: '',
  tiktokUrl: '',
}

export const defaultAdminAccounts: AdminAccount[] = [
  {
    id: 'admin-default',
    name: 'Admin',
    email: 'admin',
    // Fail closed until an admin password is configured in persistent storage.
    password: '',
  },
]

export const defaultPageVisibility = {
  home: true,
  haqqimizda: true,
  layiheler: true,
  xidmetler: true,
  xeberler: true,
  karyera: true,
  elaqe: true,
}

export function ensureDefaultAdminAccount(accounts?: AdminAccount[]) {
  return accounts?.length ? accounts : defaultAdminAccounts
}

export function getDefaultAdminContent(): AdminContentData {
  return {
    pageContent: { ...pageDefaults },
    pageVisibility: { ...defaultPageVisibility },
    projects: initialProjects,
    news: initialNews,
    team: initialTeam,
    services: initialServices,
    jobs: initialJobs,
    certificates: initialCertificates,
    partners: initialPartners,
    contact: defaultContact,
    stats: companyStats,
    adminAccounts: defaultAdminAccounts,
  }
}
