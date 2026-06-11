'use client'

const DB_NAME = 'akin-admin-db'
const STORE_NAME = 'keyval'
const DB_VERSION = 1

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME)
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function withStore<T>(
  mode: IDBTransactionMode,
  handler: (store: IDBObjectStore, resolve: (value: T) => void, reject: (reason?: unknown) => void) => void
) {
  const database = await openDatabase()

  return new Promise<T>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode)
    const store = transaction.objectStore(STORE_NAME)

    transaction.oncomplete = () => database.close()
    transaction.onerror = () => {
      database.close()
      reject(transaction.error)
    }
    transaction.onabort = () => {
      database.close()
      reject(transaction.error)
    }

    handler(store, resolve, reject)
  })
}

export async function readPersistedJson<T>(key: string): Promise<T | null> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) {
    const fallback = localStorage.getItem(key)
    return fallback ? (JSON.parse(fallback) as T) : null
  }

  try {
    const storedValue = await withStore<T | null>('readonly', (store, resolve, reject) => {
      const request = store.get(key)
      request.onsuccess = () => resolve((request.result as T | null) ?? null)
      request.onerror = () => reject(request.error)
    })

    if (storedValue) {
      return storedValue
    }
  } catch (error) {
    console.error('IndexedDB read failed, falling back to localStorage.', error)
  }

  const fallback = localStorage.getItem(key)
  return fallback ? (JSON.parse(fallback) as T) : null
}

export async function writePersistedJson<T>(key: string, value: T) {
  const serialized = JSON.stringify(value)

  if (typeof window === 'undefined' || !('indexedDB' in window)) {
    localStorage.setItem(key, serialized)
    return
  }

  try {
    await withStore<void>('readwrite', (store, resolve, reject) => {
      const request = store.put(value, key)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('IndexedDB write failed, falling back to localStorage.', error)
    localStorage.setItem(key, serialized)
    return
  }

  try {
    if (serialized.length < 1_500_000) {
      localStorage.setItem(key, serialized)
    } else {
      localStorage.removeItem(key)
    }
  } catch (error) {
    console.error('localStorage mirror write failed.', error)
  }
}
