import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

import {
  defaultCareerNotificationSettings,
  type CareerNotificationSettings,
} from '@/lib/career-notifications'

const DATA_DIR = path.join(process.cwd(), 'data')
const CONFIG_PATH = path.join(DATA_DIR, 'career-notifications.json')

function mergeConfig(
  config?: Partial<CareerNotificationSettings>
): CareerNotificationSettings {
  return {
    gmail: {
      ...defaultCareerNotificationSettings.gmail,
      ...config?.gmail,
    },
    telegram: {
      ...defaultCareerNotificationSettings.telegram,
      ...config?.telegram,
    },
    whatsapp: {
      ...defaultCareerNotificationSettings.whatsapp,
      ...config?.whatsapp,
    },
  }
}

export async function readCareerNotificationConfig(): Promise<CareerNotificationSettings> {
  try {
    const content = await readFile(CONFIG_PATH, 'utf8')
    return mergeConfig(JSON.parse(content))
  } catch {
    return defaultCareerNotificationSettings
  }
}

export async function writeCareerNotificationConfig(
  config: CareerNotificationSettings
): Promise<CareerNotificationSettings> {
  const normalized = mergeConfig(config)
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(CONFIG_PATH, JSON.stringify(normalized, null, 2), 'utf8')
  return normalized
}
