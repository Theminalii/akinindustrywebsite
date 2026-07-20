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
  persistenceError: string | null
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

  const payload = (await response.json()) as { data: AdminContentData }
  return payload.data
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
  const saveQueue = useRef<Promise<void>>(Promise.resolve())
  const contentRef = useRef<AdminContentData>(defaultData)
  const [persistenceError, setPersistenceError] = useState<string | null>(null)

  const applyAdminContent = useCallback((data: AdminContentData) => {
    contentRef.current = data
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

  useEffect(() => {
    let isMounted = true

    const loadAdminData = async () => {
      try {
        const serverPayload = await fetchAdminContent()
        const resolvedData = mergeAdminContent(serverPayload.data)

        if (isMounted) {
          applyAdminContent(resolvedData)
          setPersistenceError(null)
        }
      } catch (error) {
        console.error('Error loading admin data:', error)
        if (isMounted) {
          setPersistenceError('MySQL bağlantısı yoxdur. Dəyişiklik etmək müvəqqəti dayandırılıb.')
        }
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

  const commitAdminContent = useCallback(
    (update: (current: AdminContentData) => AdminContentData) => {
      saveQueue.current = saveQueue.current
        .catch(() => undefined)
        .then(async () => {
          const next = update(contentRef.current)
          const saved = await saveAdminContent(next)
          applyAdminContent(mergeAdminContent(saved))
          setPersistenceError(null)
        })
        .catch((error) => {
          console.error('Error saving admin data:', error)
          setPersistenceError('MySQL-ə yazmaq mümkün olmadı. Dəyişiklik tətbiq edilmədi.')
        })
    },
    [applyAdminContent]
  )

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
    commitAdminContent((current) => ({ ...current, projects: [...current.projects, project] }))
  }, [commitAdminContent])

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    commitAdminContent((current) => ({ ...current, projects: current.projects.map((project) =>
      project.id === id ? { ...project, ...updates } : project) }))
  }, [commitAdminContent])

  const deleteProject = useCallback((id: string) => {
    commitAdminContent((current) => ({ ...current, projects: current.projects.filter((project) => project.id !== id) }))
  }, [commitAdminContent])

  const addNews = useCallback((article: NewsArticle) => {
    commitAdminContent((current) => ({ ...current, news: [...current.news, article] }))
  }, [commitAdminContent])

  const updateNews = useCallback((id: string, updates: Partial<NewsArticle>) => {
    commitAdminContent((current) => ({ ...current, news: current.news.map((article) =>
      article.id === id ? { ...article, ...updates } : article) }))
  }, [commitAdminContent])

  const deleteNews = useCallback((id: string) => {
    commitAdminContent((current) => ({ ...current, news: current.news.filter((article) => article.id !== id) }))
  }, [commitAdminContent])

  const addTeam = useCallback((member: TeamMember) => {
    commitAdminContent((current) => ({ ...current, team: [...current.team, member] }))
  }, [commitAdminContent])

  const updateTeam = useCallback((id: string, updates: Partial<TeamMember>) => {
    commitAdminContent((current) => ({ ...current, team: current.team.map((member) =>
      member.id === id ? { ...member, ...updates } : member) }))
  }, [commitAdminContent])

  const deleteTeam = useCallback((id: string) => {
    commitAdminContent((current) => ({ ...current, team: current.team.filter((member) => member.id !== id) }))
  }, [commitAdminContent])

  const addService = useCallback((service: Service) => {
    commitAdminContent((current) => ({ ...current, services: [...current.services, service] }))
  }, [commitAdminContent])

  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    commitAdminContent((current) => ({ ...current, services: current.services.map((service) =>
      service.id === id ? { ...service, ...updates } : service) }))
  }, [commitAdminContent])

  const deleteService = useCallback((id: string) => {
    commitAdminContent((current) => ({ ...current, services: current.services.filter((service) => service.id !== id) }))
  }, [commitAdminContent])

  const addJob = useCallback((job: JobPosition) => {
    commitAdminContent((current) => ({ ...current, jobs: [...current.jobs, job] }))
  }, [commitAdminContent])

  const updateJob = useCallback((id: string, updates: Partial<JobPosition>) => {
    commitAdminContent((current) => ({ ...current, jobs: current.jobs.map((job) =>
      job.id === id ? { ...job, ...updates } : job) }))
  }, [commitAdminContent])

  const deleteJob = useCallback((id: string) => {
    commitAdminContent((current) => ({ ...current, jobs: current.jobs.filter((job) => job.id !== id) }))
  }, [commitAdminContent])

  const addCertificate = useCallback((certificate: Certificate) => {
    commitAdminContent((current) => ({ ...current, certificates: [...current.certificates, certificate] }))
  }, [commitAdminContent])

  const updateCertificate = useCallback((id: string, updates: Partial<Certificate>) => {
    commitAdminContent((current) => ({ ...current, certificates: current.certificates.map((certificate) =>
      certificate.id === id ? { ...certificate, ...updates } : certificate) }))
  }, [commitAdminContent])

  const deleteCertificate = useCallback((id: string) => {
    commitAdminContent((current) => ({ ...current, certificates: current.certificates.filter((certificate) => certificate.id !== id) }))
  }, [commitAdminContent])

  const addPartner = useCallback((partner: Partner) => {
    commitAdminContent((current) => ({ ...current, partners: [...current.partners, partner] }))
  }, [commitAdminContent])

  const updatePartner = useCallback((id: string, updates: Partial<Partner>) => {
    commitAdminContent((current) => ({ ...current, partners: current.partners.map((partner) =>
      partner.id === id ? { ...partner, ...updates } : partner) }))
  }, [commitAdminContent])

  const deletePartner = useCallback((id: string) => {
    commitAdminContent((current) => ({ ...current, partners: current.partners.filter((partner) => partner.id !== id) }))
  }, [commitAdminContent])

  const updateContact = useCallback((info: ContactInfo) => {
    commitAdminContent((current) => ({ ...current, contact: info }))
  }, [commitAdminContent])

  const updateStats = useCallback((newStats: CompanyStats) => {
    commitAdminContent((current) => ({ ...current, stats: newStats }))
  }, [commitAdminContent])

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

      commitAdminContent((current) => ({
        ...current,
        adminAccounts: [...current.adminAccounts, {
          id: Date.now().toString(),
          name: account.name.trim(),
          email: normalizedEmail,
          password: account.password,
        }],
      }))

      return { success: true, message: 'Yeni hesab əlavə olundu.' }
    },
    [adminAccounts, commitAdminContent]
  )

  const updateAdminAccountPassword = useCallback((id: string, password: string): ActionResult => {
    if (!password.trim()) {
      return { success: false, message: 'Şifrə boş ola bilməz.' }
    }

    commitAdminContent((current) => ({ ...current, adminAccounts: current.adminAccounts.map((account) =>
      account.id === id ? { ...account, password } : account) }))

    return { success: true, message: 'Şifrə yeniləndi.' }
  }, [commitAdminContent])

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

      commitAdminContent((content) => ({ ...content, adminAccounts: content.adminAccounts.map((account) =>
          account.id === activeAdmin.id ? { ...account, password: newPassword } : account
        ) }))

      return { success: true, message: 'Login şifrəsi uğurla dəyişdirildi.' }
    },
    [adminAccounts, currentAdminEmail, commitAdminContent]
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

      commitAdminContent((current) => ({ ...current, adminAccounts: current.adminAccounts.filter((account) => account.id !== id) }))

      if (accountToDelete.email.trim().toLowerCase() === currentAdminEmail?.trim().toLowerCase()) {
        setCurrentAdminEmail(null)
        localStorage.removeItem(AUTH_STORAGE_KEY)
        return { success: true, message: 'Aktiv hesab silindi, sessiya bağlandı.' }
      }

      return { success: true, message: 'Hesab silindi.' }
    },
    [adminAccounts, currentAdminEmail, commitAdminContent]
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
    persistenceError,
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
