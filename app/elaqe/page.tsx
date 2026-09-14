import { readAdminContentConfig } from '@/lib/server/admin-content-config'
import type { Metadata } from 'next'

import { ContactPageClient } from './contact-page-client'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await readAdminContentConfig()
  return { title: data.pageContent['seo/contact.title'], description: data.pageContent['seo/contact.description'] }
}

export default function ContactPage() {
  return <ContactPageClient />
}
