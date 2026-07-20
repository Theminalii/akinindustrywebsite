import {
  defaultCareerNotificationSettings,
  type CareerNotificationSettings,
} from '@/lib/career-notifications'
import { readCareerNotificationEnv } from '@/lib/server/env'
import { readSetting, writeSetting } from '@/lib/server/admin-database'

function mergeConfig(
  config?: Partial<CareerNotificationSettings>
): CareerNotificationSettings {
  const envConfig = readCareerNotificationEnv()

  return {
    gmail: {
      ...defaultCareerNotificationSettings.gmail,
      ...envConfig.gmail,
      ...config?.gmail,
    },
    telegram: {
      ...defaultCareerNotificationSettings.telegram,
      ...envConfig.telegram,
      ...config?.telegram,
    },
    whatsapp: {
      ...defaultCareerNotificationSettings.whatsapp,
      ...envConfig.whatsapp,
      ...config?.whatsapp,
    },
  }
}

export async function readCareerNotificationConfig(): Promise<CareerNotificationSettings> {
  return mergeConfig(
    (await readSetting<CareerNotificationSettings>('career-notifications')) ?? undefined
  )
}

export async function writeCareerNotificationConfig(
  config: CareerNotificationSettings
): Promise<CareerNotificationSettings> {
  const normalized = mergeConfig(config)
  return writeSetting('career-notifications', normalized)
}
