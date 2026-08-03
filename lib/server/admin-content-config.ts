import {
  defaultContact,
  ensureDefaultAdminAccount,
  getDefaultAdminContent,
} from '@/lib/admin/defaults'
import type { AdminContentData } from '@/lib/admin/types'
import { readAdminState, writeAdminState } from '@/lib/server/admin-database'

function withBootstrapAdmin(data: AdminContentData): AdminContentData {
  if (data.adminAccounts.some((account) => account.password.trim())) return data

  const password = process.env.ADMIN_INITIAL_PASSWORD?.trim()
  if (!password) return data

  return {
    ...data,
    adminAccounts: [
      {
        id: 'admin-bootstrap',
        name: process.env.ADMIN_INITIAL_NAME?.trim() || 'Admin',
        email: process.env.ADMIN_INITIAL_EMAIL?.trim().toLowerCase() || 'admin',
        password,
      },
    ],
  }
}

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
      ...defaults.contact,
      ...config?.contact,
    },
    stats: config?.stats ?? defaults.stats,
    adminAccounts: ensureDefaultAdminAccount(config?.adminAccounts),
  }
}

export async function readAdminContentConfig() {
  const content = await readAdminState<Partial<AdminContentData>>()
  if (content) {
    return {
      data: withBootstrapAdmin(mergeAdminContent(content)),
      hasStoredData: true,
    }
  }

  return { data: withBootstrapAdmin(getDefaultAdminContent()), hasStoredData: false }
}

export async function writeAdminContentConfig(config: AdminContentData) {
  const normalized = mergeAdminContent(config)
  return writeAdminState(normalized)
}
