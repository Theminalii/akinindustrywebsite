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
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.455627253573!2d49.8456633!3d40.4087192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI0JzMxLjQiTiA0OcKwNTAnNDQuNCJF!5e0!3m2!1sen!2saz!4v1625567000000!5m2!1sen!2saz',
  linkedinUrl: 'https://www.linkedin.com/',
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

export function ensureDefaultAdminAccount(accounts?: AdminAccount[]) {
  return accounts?.length ? accounts : defaultAdminAccounts
}

export function getDefaultAdminContent(): AdminContentData {
  return {
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
