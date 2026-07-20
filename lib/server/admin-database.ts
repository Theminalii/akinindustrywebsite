import 'server-only'

import mysql, { type RowDataPacket } from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST ?? 'srv1368.hstgr.io',
  port: Number(process.env.MYSQL_PORT ?? 3306),
  database: process.env.MYSQL_DATABASE ?? 'u709020705_akinindustry',
  user: process.env.MYSQL_USER ?? 'u709020705_akinindustry',
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 2,
  maxIdle: 1,
  idleTimeout: 10_000,
  enableKeepAlive: false,
  queueLimit: 20,
  connectTimeout: 10_000,
  charset: 'utf8mb4',
})

let schemaPromise: Promise<void> | null = null

function ensureSchema() {
  if (!process.env.MYSQL_PASSWORD) throw new Error('MYSQL_PASSWORD is required.')

  schemaPromise ??= (async () => {
    await pool.execute(`CREATE TABLE IF NOT EXISTS admin_state (
      id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
      data LONGTEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`)
    await pool.execute(`CREATE TABLE IF NOT EXISTS admin_settings (
      setting_key VARCHAR(191) NOT NULL PRIMARY KEY,
      data LONGTEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`)
  })().catch((error) => {
    schemaPromise = null
    throw error
  })

  return schemaPromise
}

export async function readAdminState<T>(): Promise<T | null> {
  await ensureSchema()
  const [rows] = await pool.execute<(RowDataPacket & { data: string })[]>(
    'SELECT data FROM admin_state WHERE id = 1 LIMIT 1'
  )
  if (!rows[0]) return null

  try {
    return JSON.parse(rows[0].data) as T
  } catch {
    return null
  }
}

export async function writeAdminState<T>(value: T): Promise<T> {
  await ensureSchema()
  await pool.execute(
    `INSERT INTO admin_state (id, data) VALUES (1, ?)
     ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = CURRENT_TIMESTAMP`,
    [JSON.stringify(value)]
  )
  return value
}

export async function readSetting<T>(key: string): Promise<T | null> {
  await ensureSchema()
  const [rows] = await pool.execute<(RowDataPacket & { data: string })[]>(
    'SELECT data FROM admin_settings WHERE setting_key = ? LIMIT 1', [key]
  )
  if (!rows[0]) return null

  try {
    return JSON.parse(rows[0].data) as T
  } catch {
    return null
  }
}

export async function writeSetting<T>(key: string, value: T): Promise<T> {
  await ensureSchema()
  await pool.execute(
    `INSERT INTO admin_settings (setting_key, data) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = CURRENT_TIMESTAMP`,
    [key, JSON.stringify(value)]
  )
  return value
}
