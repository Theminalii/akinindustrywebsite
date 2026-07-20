import {
  defaultContactNotificationSettings,
  type ContactNotificationSettings,
} from '@/lib/contact-notifications'
import { readContactNotificationEnv } from '@/lib/server/env'
import { readSetting, writeSetting } from '@/lib/server/admin-database'

function mergeConfig(
  config?: Partial<ContactNotificationSettings>
): ContactNotificationSettings {
  const envConfig = readContactNotificationEnv()

  return {
    gmail: {
      ...defaultContactNotificationSettings.gmail,
      ...config?.gmail,
      ...envConfig.gmail,
    },
    whatsapp: {
      ...defaultContactNotificationSettings.whatsapp,
      ...config?.whatsapp,
      ...envConfig.whatsapp,
    },
  }
}

export async function readContactNotificationConfig(): Promise<ContactNotificationSettings> {
  return mergeConfig(
    (await readSetting<ContactNotificationSettings>('contact-notifications')) ?? undefined
  )
}

export async function writeContactNotificationConfig(
  config: ContactNotificationSettings
): Promise<ContactNotificationSettings> {
  const normalized = mergeConfig(config)
  return writeSetting('contact-notifications', normalized)
}
