import type { Metadata } from 'next'

import { ContactPageClient } from './contact-page-client'

export const metadata: Metadata = {
  title: 'Əlaqə',
  description: 'Akin Industry ilə əlaqə saxlayın. Tikinti layihəniz üçün pulsuz məsləhət alın.',
}

export default function ContactPage() {
  return <ContactPageClient />
}
