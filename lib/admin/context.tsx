'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

import {
  defaultAdminAccounts,
  defaultContact,
  ensureDefaultAdminAccount,
  getDefaultAdminContent,
} from '@/lib/admin/defaults'
import type { AdminAccount, AdminContentData, ContactInfo } from '@/lib/admin/types'
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
  adminAccounts: AdminAccount[]
  addAdminAccount: (account: Omit<AdminAccount, 'id'>) => ActionResult
  updateAdminAccountPassword: (id: string, password: string) => ActionResult
  changeCurrentAdminPassword: (currentPassword: string, newPassword: string) => ActionResult
  deleteAdminAccount: (id: string) => ActionResult
  currentAdmin: AdminAccount | null
  isAuthenticated: boolean
  isReady: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AUTH_STORAGE_KEY = 'akin_admin_auth'

const AdminContext = createContext<AdminContextType | undefined>(undefined)

function mergeAdminContent(config?: Partial<AdminContentData>): AdminContentData {
  const defaults = getDefaultAdminContent()

  return {
    projects: config?.projects ?? defaults.projects,
    news: config?.news ?? defaults.news,
    team: config?.team ?? defaults.team,
    services: config?.services ?? defaults.services,
    jobs: config?.jobs ?? defaults.jobs,
    certificates: config?.certificates ?? defaults.certificates,
    partners: config?.partners ?? defaults.partners,
    contact: {
      ...defaultContact,
      ...config?.contact,
    },
    stats: config?.stats ?? defaults.stats,
    adminAccounts: ensureDefaultAdminAccount(config?.adminAccounts),
  }
}

async function fetchAdminContent() {
  const response = await fetch('/api/admin/content', { cache: 'no-store' })
  if (!response.ok) {
    throw new Error('Admin məlumatları yüklənmədi.')
  }

  return (await response.json()) as {
    data: AdminContentData
    hasStoredData: boolean
  }
}

async function saveAdminContent(data: AdminContentData) {
  const response = await fetch('/api/admin/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Admin məlumatları saxlanmadı.')
  }
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const defaultData = getDefaultAdminContent()
  const [projects, setProjects] = useState<Project[]>(defaultData.projects)
  const [news, setNews] = useState<NewsArticle[]>(defaultData.news)
  const [team, setTeam] = useState<TeamMember[]>(defaultData.team)
  const [services, setServices] = useState<Service[]>(defaultData.services)
  const [jobs, setJobs] = useState<JobPosition[]>(defaultData.jobs)
  const [certificates, setCertificates] = useState<Certificate[]>(defaultData.certificates)
  const [partners, setPartners] = useState<Partner[]>(defaultData.partners)
  const [contact, setContact] = useState<ContactInfo>(defaultData.contact)
  const [stats, setStats] = useState<CompanyStats>(defaultData.stats)
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>(defaultData.adminAccounts)
  const [currentAdminEmail, setCurrentAdminEmail] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const hasSkippedInitialSave = useRef(false)
  const saveQueue = useRef<Promise<void>>(Promise.resolve())

  const applyAdminContent = useCallback((data: AdminContentData) => {
    setProjects(data.projects)
    setNews(data.news)
    setTeam(data.team)
    setServices(data.services)
    setJobs(data.jobs)
    setCertificates(data.certificates)
    setPartners(data.partners)
    setContact(data.contact)
    setStats(data.stats)
    setAdminAccounts(ensureDefaultAdminAccount(data.adminAccounts))
  }, [])

  const snapshot = useMemo<AdminContentData>(
    () => ({
      projects,
      news,
      team,
      services,
      jobs,
      certificates,
      partners,
      contact,
      stats,
      adminAccounts,
    }),
    [projects, news, team, services, jobs, certificates, partners, contact, stats, adminAccounts]
  )

  useEffect(() => {
    let isMounted = true

    const loadAdminData = async () => {
      try {
        const serverPayload = await fetchAdminContent()
        const resolvedData = mergeAdminContent(serverPayload.data)

        if (isMounted) {
          applyAdminContent(resolvedData)
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
  }, [applyAdminContent])

  useEffect(() => {
    if (!isLoaded) return

    // Loading content must never write it back. Only actual CMS edits are persisted.
    if (!hasSkippedInitialSave.current) {
      hasSkippedInitialSave.current = true
      return
    }

    // Serialize writes so an older, slower request can never overwrite a newer edit.
    saveQueue.current = saveQueue.current
      .catch(() => undefined)
      .then(() => saveAdminContent(snapshot))
      .catch((error) => {
        console.error('Error saving admin data:', error)
      })
  }, [snapshot, isLoaded])

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

  const addAdminAccount = useCallback(
    (account: Omit<AdminAccount, 'id'>): ActionResult => {
      const normalizedEmail = account.email.trim().toLowerCase()

      if (!account.name.trim() || !normalizedEmail || !account.password.trim()) {
        return { success: false, message: 'Ad, email və şifrə mütləqdir.' }
      }

      const exists = adminAccounts.some((item) => item.email.trim().toLowerCase() === normalizedEmail)

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

  const changeCurrentAdminPassword = useCallback(
    (currentPassword: string, newPassword: string): ActionResult => {
      const activeAdmin = adminAccounts.find(
        (account) => account.email.trim().toLowerCase() === currentAdminEmail?.trim().toLowerCase()
      )

      if (!activeAdmin) {
        return { success: false, message: 'Aktiv admin hesabı tapılmadı.' }
      }

      if (!currentPassword.trim() || !newPassword.trim()) {
        return { success: false, message: 'Bütün şifrə sahələri doldurulmalıdır.' }
      }

      if (activeAdmin.password !== currentPassword) {
        return { success: false, message: 'Mövcud şifrə yanlışdır.' }
      }

      if (currentPassword === newPassword) {
        return { success: false, message: 'Yeni şifrə əvvəlki ilə eyni ola bilməz.' }
      }

      setAdminAccounts((prev) =>
        prev.map((account) =>
          account.id === activeAdmin.id ? { ...account, password: newPassword } : account
        )
      )

      return { success: true, message: 'Login şifrəsi uğurla dəyişdirildi.' }
    },
    [adminAccounts, currentAdminEmail]
  )

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
    adminAccounts,
    addAdminAccount,
    updateAdminAccountPassword,
    changeCurrentAdminPassword,
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

export type { ContactInfo }
