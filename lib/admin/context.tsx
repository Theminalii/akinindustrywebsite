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
  addProject: (project: Project) => Promise<ActionResult>
  updateProject: (id: string, project: Partial<Project>) => Promise<ActionResult>
  deleteProject: (id: string) => Promise<ActionResult>
  news: NewsArticle[]
  addNews: (article: NewsArticle) => Promise<ActionResult>
  updateNews: (id: string, article: Partial<NewsArticle>) => Promise<ActionResult>
  deleteNews: (id: string) => Promise<ActionResult>
  team: TeamMember[]
  addTeam: (member: TeamMember) => Promise<ActionResult>
  updateTeam: (id: string, member: Partial<TeamMember>) => Promise<ActionResult>
  deleteTeam: (id: string) => Promise<ActionResult>
  services: Service[]
  addService: (service: Service) => Promise<ActionResult>
  updateService: (id: string, service: Partial<Service>) => Promise<ActionResult>
  deleteService: (id: string) => Promise<ActionResult>
  jobs: JobPosition[]
  addJob: (job: JobPosition) => Promise<ActionResult>
  updateJob: (id: string, job: Partial<JobPosition>) => Promise<ActionResult>
  deleteJob: (id: string) => Promise<ActionResult>
  certificates: Certificate[]
  addCertificate: (certificate: Certificate) => Promise<ActionResult>
  updateCertificate: (id: string, certificate: Partial<Certificate>) => Promise<ActionResult>
  deleteCertificate: (id: string) => Promise<ActionResult>
  partners: Partner[]
  addPartner: (partner: Partner) => Promise<ActionResult>
  updatePartner: (id: string, partner: Partial<Partner>) => Promise<ActionResult>
  deletePartner: (id: string) => Promise<ActionResult>
  contact: ContactInfo
  updateContact: (info: ContactInfo) => Promise<ActionResult>
  stats: CompanyStats
  updateStats: (stats: CompanyStats) => Promise<ActionResult>
  adminAccounts: AdminAccount[]
  addAdminAccount: (account: Omit<AdminAccount, 'id'>) => Promise<ActionResult>
  updateAdminAccountPassword: (id: string, password: string) => Promise<ActionResult>
  changeCurrentAdminPassword: (currentPassword: string, newPassword: string) => Promise<ActionResult>
  deleteAdminAccount: (id: string) => Promise<ActionResult>
  currentAdmin: AdminAccount | null
  isAuthenticated: boolean
  isReady: boolean
  persistenceError: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

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

async function fetchAdminSession() {
  const response = await fetch('/api/admin/auth', { cache: 'no-store' })
  if (!response.ok) return { authenticated: false, email: null }
  return (await response.json()) as { authenticated: boolean; email: string | null }
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
        const [session, serverPayload] = await Promise.all([
          fetchAdminSession(),
          fetchAdminContent(),
        ])
        const resolvedData = mergeAdminContent(serverPayload.data)

        if (isMounted) {
          applyAdminContent(resolvedData)
          setCurrentAdminEmail(session.authenticated ? session.email : null)
          setPersistenceError(null)
        }
      } catch (error) {
        console.error('Error loading admin data:', error)
        if (isMounted) {
          setPersistenceError('MySQL bağlantısı yoxdur. Dəyişiklik etmək müvəqqəti dayandırılıb.')
        }
      } finally {
        if (!isMounted) return

        setIsLoaded(true)
      }
    }

    loadAdminData()

    return () => {
      isMounted = false
    }
  }, [applyAdminContent])

  const commitAdminContent = useCallback(
    (update: (current: AdminContentData) => AdminContentData): Promise<ActionResult> => {
      const operation = saveQueue.current
        .catch(() => undefined)
        .then(async () => {
          const next = update(contentRef.current)
          const saved = await saveAdminContent(next)
          applyAdminContent(mergeAdminContent(saved))
          setPersistenceError(null)
          return { success: true } satisfies ActionResult
        })
        .catch((error) => {
          console.error('Error saving admin data:', error)
          setPersistenceError('MySQL-ə yazmaq mümkün olmadı. Dəyişiklik tətbiq edilmədi.')
          return {
            success: false,
            message: 'MySQL-ə yazmaq mümkün olmadı. Dəyişiklik yadda saxlanmadı.',
          } satisfies ActionResult
        })
      saveQueue.current = operation.then(() => undefined)
      return operation
    },
    [applyAdminContent]
  )

  const currentAdmin = useMemo(
    () =>
      adminAccounts.find(
        (account) =>
          account.email.trim().toLowerCase() === currentAdminEmail?.trim().toLowerCase()
      ) ?? null,
    [adminAccounts, currentAdminEmail]
  )

  const addProject = useCallback((project: Project) => {
    return commitAdminContent((current) => ({ ...current, projects: [...current.projects, project] }))
  }, [commitAdminContent])

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    return commitAdminContent((current) => ({ ...current, projects: current.projects.map((project) =>
      project.id === id ? { ...project, ...updates } : project) }))
  }, [commitAdminContent])

  const deleteProject = useCallback((id: string) => {
    return commitAdminContent((current) => ({ ...current, projects: current.projects.filter((project) => project.id !== id) }))
  }, [commitAdminContent])

  const addNews = useCallback((article: NewsArticle) => {
    return commitAdminContent((current) => ({ ...current, news: [...current.news, article] }))
  }, [commitAdminContent])

  const updateNews = useCallback((id: string, updates: Partial<NewsArticle>) => {
    return commitAdminContent((current) => ({ ...current, news: current.news.map((article) =>
      article.id === id ? { ...article, ...updates } : article) }))
  }, [commitAdminContent])

  const deleteNews = useCallback((id: string) => {
    return commitAdminContent((current) => ({ ...current, news: current.news.filter((article) => article.id !== id) }))
  }, [commitAdminContent])

  const addTeam = useCallback((member: TeamMember) => {
    return commitAdminContent((current) => ({ ...current, team: [...current.team, member] }))
  }, [commitAdminContent])

  const updateTeam = useCallback((id: string, updates: Partial<TeamMember>) => {
    return commitAdminContent((current) => ({ ...current, team: current.team.map((member) =>
      member.id === id ? { ...member, ...updates } : member) }))
  }, [commitAdminContent])

  const deleteTeam = useCallback((id: string) => {
    return commitAdminContent((current) => ({ ...current, team: current.team.filter((member) => member.id !== id) }))
  }, [commitAdminContent])

  const addService = useCallback((service: Service) => {
    return commitAdminContent((current) => ({ ...current, services: [...current.services, service] }))
  }, [commitAdminContent])

  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    return commitAdminContent((current) => ({ ...current, services: current.services.map((service) =>
      service.id === id ? { ...service, ...updates } : service) }))
  }, [commitAdminContent])

  const deleteService = useCallback((id: string) => {
    return commitAdminContent((current) => ({ ...current, services: current.services.filter((service) => service.id !== id) }))
  }, [commitAdminContent])

  const addJob = useCallback((job: JobPosition) => {
    return commitAdminContent((current) => ({ ...current, jobs: [...current.jobs, job] }))
  }, [commitAdminContent])

  const updateJob = useCallback((id: string, updates: Partial<JobPosition>) => {
    return commitAdminContent((current) => ({ ...current, jobs: current.jobs.map((job) =>
      job.id === id ? { ...job, ...updates } : job) }))
  }, [commitAdminContent])

  const deleteJob = useCallback((id: string) => {
    return commitAdminContent((current) => ({ ...current, jobs: current.jobs.filter((job) => job.id !== id) }))
  }, [commitAdminContent])

  const addCertificate = useCallback((certificate: Certificate) => {
    return commitAdminContent((current) => ({ ...current, certificates: [...current.certificates, certificate] }))
  }, [commitAdminContent])

  const updateCertificate = useCallback((id: string, updates: Partial<Certificate>) => {
    return commitAdminContent((current) => ({ ...current, certificates: current.certificates.map((certificate) =>
      certificate.id === id ? { ...certificate, ...updates } : certificate) }))
  }, [commitAdminContent])

  const deleteCertificate = useCallback((id: string) => {
    return commitAdminContent((current) => ({ ...current, certificates: current.certificates.filter((certificate) => certificate.id !== id) }))
  }, [commitAdminContent])

  const addPartner = useCallback((partner: Partner) => {
    return commitAdminContent((current) => ({ ...current, partners: [...current.partners, partner] }))
  }, [commitAdminContent])

  const updatePartner = useCallback((id: string, updates: Partial<Partner>) => {
    return commitAdminContent((current) => ({ ...current, partners: current.partners.map((partner) =>
      partner.id === id ? { ...partner, ...updates } : partner) }))
  }, [commitAdminContent])

  const deletePartner = useCallback((id: string) => {
    return commitAdminContent((current) => ({ ...current, partners: current.partners.filter((partner) => partner.id !== id) }))
  }, [commitAdminContent])

  const updateContact = useCallback((info: ContactInfo) => {
    return commitAdminContent((current) => ({ ...current, contact: info }))
  }, [commitAdminContent])

  const updateStats = useCallback((newStats: CompanyStats) => {
    return commitAdminContent((current) => ({ ...current, stats: newStats }))
  }, [commitAdminContent])

  const addAdminAccount = useCallback(
    async (account: Omit<AdminAccount, 'id'>): Promise<ActionResult> => {
      const normalizedEmail = account.email.trim().toLowerCase()

      if (!account.name.trim() || !normalizedEmail || !account.password.trim()) {
        return { success: false, message: 'Ad, email və şifrə mütləqdir.' }
      }
      if (account.password.length < 12) {
        return { success: false, message: 'Şifrə minimum 12 simvol olmalıdır.' }
      }

      const exists = adminAccounts.some((item) => item.email.trim().toLowerCase() === normalizedEmail)

      if (exists) {
        return { success: false, message: 'Bu email ilə hesab artıq mövcuddur.' }
      }

      const result = await commitAdminContent((current) => ({
        ...current,
        adminAccounts: [...current.adminAccounts, {
          id: crypto.randomUUID(),
          name: account.name.trim(),
          email: normalizedEmail,
          password: account.password,
        }],
      }))

      return result.success
        ? { success: true, message: 'Yeni hesab əlavə olundu.' }
        : result
    },
    [adminAccounts, commitAdminContent]
  )

  const updateAdminAccountPassword = useCallback(async (id: string, password: string): Promise<ActionResult> => {
    if (!password.trim()) {
      return { success: false, message: 'Şifrə boş ola bilməz.' }
    }
    if (password.length < 12) {
      return { success: false, message: 'Şifrə minimum 12 simvol olmalıdır.' }
    }

    const result = await commitAdminContent((current) => ({ ...current, adminAccounts: current.adminAccounts.map((account) =>
      account.id === id ? { ...account, password } : account) }))

    return result.success ? { success: true, message: 'Şifrə yeniləndi.' } : result
  }, [commitAdminContent])

  const changeCurrentAdminPassword = useCallback(
    async (currentPassword: string, newPassword: string): Promise<ActionResult> => {
      const activeAdmin = adminAccounts.find(
        (account) => account.email.trim().toLowerCase() === currentAdminEmail?.trim().toLowerCase()
      )

      if (!activeAdmin) {
        return { success: false, message: 'Aktiv admin hesabı tapılmadı.' }
      }

      if (!currentPassword.trim() || !newPassword.trim()) {
        return { success: false, message: 'Bütün şifrə sahələri doldurulmalıdır.' }
      }
      if (newPassword.length < 12) {
        return { success: false, message: 'Yeni şifrə minimum 12 simvol olmalıdır.' }
      }

      if (activeAdmin.password !== currentPassword) {
        return { success: false, message: 'Mövcud şifrə yanlışdır.' }
      }

      if (currentPassword === newPassword) {
        return { success: false, message: 'Yeni şifrə əvvəlki ilə eyni ola bilməz.' }
      }

      const result = await commitAdminContent((content) => ({ ...content, adminAccounts: content.adminAccounts.map((account) =>
          account.id === activeAdmin.id ? { ...account, password: newPassword } : account
        ) }))

      return result.success
        ? { success: true, message: 'Login şifrəsi uğurla dəyişdirildi.' }
        : result
    },
    [adminAccounts, currentAdminEmail, commitAdminContent]
  )

  const deleteAdminAccount = useCallback(
    async (id: string): Promise<ActionResult> => {
      if (adminAccounts.length === 1) {
        return { success: false, message: 'Son hesabı silmək olmaz.' }
      }

      const accountToDelete = adminAccounts.find((account) => account.id === id)
      if (!accountToDelete) {
        return { success: false, message: 'Hesab tapılmadı.' }
      }

      const result = await commitAdminContent((current) => ({ ...current, adminAccounts: current.adminAccounts.filter((account) => account.id !== id) }))
      if (!result.success) return result

      if (accountToDelete.email.trim().toLowerCase() === currentAdminEmail?.trim().toLowerCase()) {
        setCurrentAdminEmail(null)
        return { success: true, message: 'Aktiv hesab silindi, sessiya bağlandı.' }
      }

      return { success: true, message: 'Hesab silindi.' }
    },
    [adminAccounts, currentAdminEmail, commitAdminContent]
  )

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) {
        return false
      }

      const session = (await response.json()) as { email: string }
      const serverPayload = await fetchAdminContent()
      applyAdminContent(mergeAdminContent(serverPayload.data))
      setCurrentAdminEmail(session.email)
      return true
    },
    [applyAdminContent]
  )

  const logout = useCallback(() => {
    void fetch('/api/admin/auth', { method: 'DELETE' })
    setCurrentAdminEmail(null)
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
