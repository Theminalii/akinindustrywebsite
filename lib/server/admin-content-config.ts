import {
  defaultContact,
  ensureDefaultAdminAccount,
  getDefaultAdminContent,
} from '@/lib/admin/defaults'
import type { AdminContentData } from '@/lib/admin/types'
import { readAdminState, writeAdminState } from '@/lib/server/admin-database'

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
      data: mergeAdminContent(content),
      hasStoredData: true,
    }
  }

  return { data: getDefaultAdminContent(), hasStoredData: false }
}

export async function writeAdminContentConfig(config: AdminContentData) {
  const normalized = mergeAdminContent(config)
  return writeAdminState(normalized)
}
