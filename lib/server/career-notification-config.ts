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
      ...config?.gmail,
      ...envConfig.gmail,
    },
    telegram: {
      ...defaultCareerNotificationSettings.telegram,
      ...config?.telegram,
      ...envConfig.telegram,
    },
    whatsapp: {
      ...defaultCareerNotificationSettings.whatsapp,
      ...config?.whatsapp,
      ...envConfig.whatsapp,
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
