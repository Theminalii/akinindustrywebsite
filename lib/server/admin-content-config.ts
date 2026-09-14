import { createHash } from 'node:crypto'
import {
  ensureDefaultAdminAccount,
  getDefaultAdminContent,
} from '@/lib/admin/defaults'
import type { AdminContentData } from '@/lib/admin/types'
import { readAdminState, updateAdminState } from '@/lib/server/admin-database'

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
    pageContent: { ...defaults.pageContent, ...config?.pageContent },
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

export function contentVersion(data: AdminContentData) {
  return createHash('sha256').update(JSON.stringify(data)).digest('hex')
}

export async function readAdminContentConfig() {
  const stored = await readAdminState<AdminContentData>()
  if (stored) {
    const normalized = withBootstrapAdmin(mergeAdminContent(stored))
    if (JSON.stringify(stored) === JSON.stringify(normalized)) return { data: stored, hasStoredData: true }
  }
  // Seed a new database or migrate missing fields without overwriting existing edits.
  const data = await updateAdminState(withBootstrapAdmin(getDefaultAdminContent()),
    (current) => withBootstrapAdmin(mergeAdminContent(current)))
  return { data, hasStoredData: true }
}

export async function writeAdminContentConfig(config: AdminContentData, expectedVersion: string) {
  return updateAdminState(withBootstrapAdmin(getDefaultAdminContent()), (current) => {
    const normalized = withBootstrapAdmin(mergeAdminContent(current))
    if (contentVersion(normalized) !== expectedVersion) throw new Error('content_conflict')
    return mergeAdminContent(config)
  })
}
