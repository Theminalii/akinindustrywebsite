'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

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
import { readPersistedJson, writePersistedJson } from '@/lib/browser-storage'
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
  linkedinUrl: string
}

interface AdminAccount {
  id: string
  name: string
  email: string
  password: string
}

interface ActionResult {
  success: boolean
  message?: string
}

interface AdminContextType {
  projects: Project[]
  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void
  news: NewsArticle[]
  addNews: (article: NewsArticle) => void
  updateNews: (id: string, article: Partial<NewsArticle>) => void
  deleteNews: (id: string) => void
  team: TeamMember[]
  addTeam: (member: TeamMember) => void
  updateTeam: (id: string, member: Partial<TeamMember>) => void
  deleteTeam: (id: string) => void
  services: Service[]
  addService: (service: Service) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void
  jobs: JobPosition[]
  addJob: (job: JobPosition) => void
  updateJob: (id: string, job: Partial<JobPosition>) => void
  deleteJob: (id: string) => void
  certificates: Certificate[]
  addCertificate: (certificate: Certificate) => void
  updateCertificate: (id: string, certificate: Partial<Certificate>) => void
  deleteCertificate: (id: string) => void
  partners: Partner[]
  addPartner: (partner: Partner) => void
  updatePartner: (id: string, partner: Partial<Partner>) => void
  deletePartner: (id: string) => void
  contact: ContactInfo
  updateContact: (info: ContactInfo) => void
  stats: CompanyStats
  updateStats: (stats: CompanyStats) => void
  teamSectionEnabled: boolean
  updateTeamSectionEnabled: (enabled: boolean) => void
  adminAccounts: AdminAccount[]
  addAdminAccount: (account: Omit<AdminAccount, 'id'>) => ActionResult
  updateAdminAccountPassword: (id: string, password: string) => ActionResult
  deleteAdminAccount: (id: string) => ActionResult
  currentAdmin: AdminAccount | null
  isAuthenticated: boolean
  isReady: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const defaultContact: ContactInfo = {
  phone1: '+994 55 350 30 69',
  phone2: '+994 55 350 30 69',
  email1: 'selim@akinindustry.com',
  email2: 'sales@akinindustry.az',
  address: '45 Ataturk Avenue, Baku, Azerbaijan',
  workingHours: 'Monday - Friday: 09:00 - 18:00',
  googleMapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.455627253573!2d49.8456633!3d40.4087192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI0JzMxLjQiTiA0OcKwNTAnNDQuNCJF!5e0!3m2!1sen!2saz!4v1625567000000!5m2!1sen!2saz',
  linkedinUrl: 'https://www.linkedin.com/',
}

const defaultAdminAccounts: AdminAccount[] = [
  {
    id: 'admin-default',
    name: 'Admin',
    email: 'admin@akinindustry.com',
    password: 'admin123',
  },
]

const STORAGE_KEY = 'akin_admin_data_v3'
const AUTH_STORAGE_KEY = 'akin_admin_auth'

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [news, setNews] = useState<NewsArticle[]>(initialNews)
  const [team, setTeam] = useState<TeamMember[]>(initialTeam)
  const [services, setServices] = useState<Service[]>(initialServices)
  const [jobs, setJobs] = useState<JobPosition[]>(initialJobs)
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates)
  const [partners, setPartners] = useState<Partner[]>(initialPartners)
  const [contact, setContact] = useState<ContactInfo>(defaultContact)
  const [stats, setStats] = useState<CompanyStats>(companyStats)
  const [teamSectionEnabled, setTeamSectionEnabled] = useState(true)
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>(defaultAdminAccounts)
  const [currentAdminEmail, setCurrentAdminEmail] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadAdminData = async () => {
      try {
        const parsed = await readPersistedJson<Partial<{
          projects: Project[]
          news: NewsArticle[]
          team: TeamMember[]
          services: Service[]
          jobs: JobPosition[]
          certificates: Certificate[]
          partners: Partner[]
          contact: ContactInfo
          stats: CompanyStats
          teamSectionEnabled: boolean
          adminAccounts: AdminAccount[]
        }>>(STORAGE_KEY)

        if (parsed && isMounted) {
          if (parsed.projects) setProjects(parsed.projects)
          if (parsed.news) setNews(parsed.news)
          if (parsed.team) setTeam(parsed.team)
          if (parsed.services) setServices(parsed.services)
          if (parsed.jobs) setJobs(parsed.jobs)
          if (parsed.certificates) setCertificates(parsed.certificates)
          if (parsed.partners) setPartners(parsed.partners)
          if (parsed.contact) setContact({ ...defaultContact, ...parsed.contact })
          if (parsed.stats) setStats(parsed.stats)
          if (typeof parsed.teamSectionEnabled === 'boolean') {
            setTeamSectionEnabled(parsed.teamSectionEnabled)
          }
          if (parsed.adminAccounts?.length) setAdminAccounts(parsed.adminAccounts)
        }
      } catch (error) {
        console.error('Error loading admin data:', error)
      } finally {
        if (!isMounted) return

        const auth = localStorage.getItem(AUTH_STORAGE_KEY)
        if (auth) {
          const normalizedEmail =
            auth === 'true' ? defaultAdminAccounts[0].email : auth.trim().toLowerCase()
          setCurrentAdminEmail(normalizedEmail)
        }

        setIsLoaded(true)
      }
    }

    loadAdminData()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    writePersistedJson(STORAGE_KEY, {
        projects,
        news,
        team,
        services,
        jobs,
        certificates,
        partners,
        contact,
        stats,
        teamSectionEnabled,
        adminAccounts,
      }).catch((error) => {
        console.error('Error saving admin data:', error)
      })
  }, [
    projects,
    news,
    team,
    services,
    jobs,
    certificates,
    partners,
    contact,
    stats,
    teamSectionEnabled,
    adminAccounts,
    isLoaded,
  ])

  useEffect(() => {
    if (!isLoaded) return

    if (!currentAdminEmail) {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return
    }

    const exists = adminAccounts.some(
      (account) => account.email.trim().toLowerCase() === currentAdminEmail.trim().toLowerCase()
    )

    if (!exists) {
      setCurrentAdminEmail(null)
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return
    }

    localStorage.setItem(AUTH_STORAGE_KEY, currentAdminEmail)
  }, [adminAccounts, currentAdminEmail, isLoaded])

  const currentAdmin = useMemo(
    () =>
      adminAccounts.find(
        (account) =>
          account.email.trim().toLowerCase() === currentAdminEmail?.trim().toLowerCase()
      ) ?? null,
    [adminAccounts, currentAdminEmail]
  )

  const addProject = useCallback((project: Project) => {
    setProjects((prev) => [...prev, project])
  }, [])

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === id ? { ...project, ...updates } : project))
    )
  }, [])

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id))
  }, [])

  const addNews = useCallback((article: NewsArticle) => {
    setNews((prev) => [...prev, article])
  }, [])

  const updateNews = useCallback((id: string, updates: Partial<NewsArticle>) => {
    setNews((prev) => prev.map((article) => (article.id === id ? { ...article, ...updates } : article)))
  }, [])

  const deleteNews = useCallback((id: string) => {
    setNews((prev) => prev.filter((article) => article.id !== id))
  }, [])

  const addTeam = useCallback((member: TeamMember) => {
    setTeam((prev) => [...prev, member])
  }, [])

  const updateTeam = useCallback((id: string, updates: Partial<TeamMember>) => {
    setTeam((prev) => prev.map((member) => (member.id === id ? { ...member, ...updates } : member)))
  }, [])

  const deleteTeam = useCallback((id: string) => {
    setTeam((prev) => prev.filter((member) => member.id !== id))
  }, [])

  const addService = useCallback((service: Service) => {
    setServices((prev) => [...prev, service])
  }, [])

  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    setServices((prev) => prev.map((service) => (service.id === id ? { ...service, ...updates } : service)))
  }, [])

  const deleteService = useCallback((id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id))
  }, [])

  const addJob = useCallback((job: JobPosition) => {
    setJobs((prev) => [...prev, job])
  }, [])

  const updateJob = useCallback((id: string, updates: Partial<JobPosition>) => {
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, ...updates } : job)))
  }, [])

  const deleteJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id))
  }, [])

  const addCertificate = useCallback((certificate: Certificate) => {
    setCertificates((prev) => [...prev, certificate])
  }, [])

  const updateCertificate = useCallback((id: string, updates: Partial<Certificate>) => {
    setCertificates((prev) =>
      prev.map((certificate) => (certificate.id === id ? { ...certificate, ...updates } : certificate))
    )
  }, [])

  const deleteCertificate = useCallback((id: string) => {
    setCertificates((prev) => prev.filter((certificate) => certificate.id !== id))
  }, [])

  const addPartner = useCallback((partner: Partner) => {
    setPartners((prev) => [...prev, partner])
  }, [])

  const updatePartner = useCallback((id: string, updates: Partial<Partner>) => {
    setPartners((prev) => prev.map((partner) => (partner.id === id ? { ...partner, ...updates } : partner)))
  }, [])

  const deletePartner = useCallback((id: string) => {
    setPartners((prev) => prev.filter((partner) => partner.id !== id))
  }, [])

  const updateContact = useCallback((info: ContactInfo) => {
    setContact(info)
  }, [])

  const updateStats = useCallback((newStats: CompanyStats) => {
    setStats(newStats)
  }, [])

  const updateTeamSectionEnabled = useCallback((enabled: boolean) => {
    setTeamSectionEnabled(enabled)
  }, [])

  const addAdminAccount = useCallback(
    (account: Omit<AdminAccount, 'id'>): ActionResult => {
      const normalizedEmail = account.email.trim().toLowerCase()

      if (!account.name.trim() || !normalizedEmail || !account.password.trim()) {
        return { success: false, message: 'Ad, email və şifrə mütləqdir.' }
      }

      const exists = adminAccounts.some(
        (item) => item.email.trim().toLowerCase() === normalizedEmail
      )

      if (exists) {
        return { success: false, message: 'Bu email ilə hesab artıq mövcuddur.' }
      }

      setAdminAccounts((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: account.name.trim(),
          email: normalizedEmail,
          password: account.password,
        },
      ])

      return { success: true, message: 'Yeni hesab əlavə olundu.' }
    },
    [adminAccounts]
  )

  const updateAdminAccountPassword = useCallback((id: string, password: string): ActionResult => {
    if (!password.trim()) {
      return { success: false, message: 'Şifrə boş ola bilməz.' }
    }

    setAdminAccounts((prev) =>
      prev.map((account) => (account.id === id ? { ...account, password } : account))
    )

    return { success: true, message: 'Şifrə yeniləndi.' }
  }, [])

  const deleteAdminAccount = useCallback(
    (id: string): ActionResult => {
      if (adminAccounts.length === 1) {
        return { success: false, message: 'Son hesabı silmək olmaz.' }
      }

      const accountToDelete = adminAccounts.find((account) => account.id === id)
      if (!accountToDelete) {
        return { success: false, message: 'Hesab tapılmadı.' }
      }

      setAdminAccounts((prev) => prev.filter((account) => account.id !== id))

      if (accountToDelete.email.trim().toLowerCase() === currentAdminEmail?.trim().toLowerCase()) {
        setCurrentAdminEmail(null)
        localStorage.removeItem(AUTH_STORAGE_KEY)
        return { success: true, message: 'Aktiv hesab silindi, sessiya bağlandı.' }
      }

      return { success: true, message: 'Hesab silindi.' }
    },
    [adminAccounts, currentAdminEmail]
  )

  const login = useCallback(
    (email: string, password: string) => {
      const normalizedEmail = email.trim().toLowerCase()
      const matchedAccount = adminAccounts.find(
        (account) =>
          account.email.trim().toLowerCase() === normalizedEmail && account.password === password
      )

      if (!matchedAccount) {
        return false
      }

      setCurrentAdminEmail(matchedAccount.email)
      localStorage.setItem(AUTH_STORAGE_KEY, matchedAccount.email)
      return true
    },
    [adminAccounts]
  )

  const logout = useCallback(() => {
    setCurrentAdminEmail(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const value: AdminContextType = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    news,
    addNews,
    updateNews,
    deleteNews,
    team,
    addTeam,
    updateTeam,
    deleteTeam,
    services,
    addService,
    updateService,
    deleteService,
    jobs,
    addJob,
    updateJob,
    deleteJob,
    certificates,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    partners,
    addPartner,
    updatePartner,
    deletePartner,
    contact,
    updateContact,
    stats,
    updateStats,
    teamSectionEnabled,
    updateTeamSectionEnabled,
    adminAccounts,
    addAdminAccount,
    updateAdminAccountPassword,
    deleteAdminAccount,
    currentAdmin,
    isAuthenticated: Boolean(currentAdmin),
    isReady: isLoaded,
    login,
    logout,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)

  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }

  return context
}
