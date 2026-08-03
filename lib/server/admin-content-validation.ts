import 'server-only'

import { z } from 'zod'

const shortText = z.string().trim().min(1).max(500)
const longText = z.string().max(20_000)
const imageValue = z.string().max(1_500_000)
const id = z.string().min(1).max(100)
const slug = z.string().trim().min(1).max(200).regex(/^[a-z0-9əğıöşüç-]+$/)

const project = z.object({
  id,
  slug,
  title: shortText,
  category: shortText,
  description: longText,
  client: z.string().max(500),
  location: z.string().max(500),
  year: z.number().int().min(1900).max(2200),
  area: z.string().max(500),
  images: z.array(imageValue).max(20),
  featured: z.boolean().optional(),
})
const news = z.object({
  id,
  slug,
  title: shortText,
  excerpt: z.string().max(2_000),
  content: longText,
  date: z.string().max(30),
  image: imageValue,
  category: z.string().max(200),
})
const teamMember = z.object({
  id,
  name: shortText,
  position: shortText,
  image: imageValue,
  bio: longText,
})
const service = z.object({
  id,
  title: shortText,
  description: longText,
  icon: z.string().max(100),
  features: z.array(z.string().max(1_000)).max(50),
})
const job = z.object({
  id,
  title: shortText,
  department: shortText,
  location: z.string().max(500),
  type: z.string().max(100),
  description: longText,
  requirements: z.array(z.string().max(2_000)).max(100),
})
const certificate = z.object({
  id,
  slug,
  title: shortText,
  category: z.string().max(200),
  description: longText,
  image: imageValue,
  date: z.string().max(30),
})
const partner = z.object({
  id,
  name: shortText,
  logo: imageValue,
})
const adminAccount = z.object({
  id,
  name: shortText,
  email: z.string().trim().min(1).max(254),
  password: z.string().min(1).max(500),
})

export const adminContentSchema = z
  .object({
    projects: z.array(project).max(500),
    news: z.array(news).max(500),
    team: z.array(teamMember).max(500),
    services: z.array(service).max(200),
    jobs: z.array(job).max(500),
    certificates: z.array(certificate).max(500),
    partners: z.array(partner).max(500),
    contact: z.object({
      phone1: z.string().max(100),
      phone2: z.string().max(100),
      email1: z.string().max(254),
      email2: z.string().max(254),
      address: z.string().max(2_000),
      workingHours: z.string().max(500),
      googleMapEmbedUrl: z.string().max(5_000),
      linkedinUrl: z.string().max(2_000),
    }),
    stats: z.object({
      years: z.number().int().min(0).max(1_000),
      projects: z.number().int().min(0).max(1_000_000),
      employees: z.number().int().min(0).max(1_000_000),
      clients: z.number().int().min(0).max(1_000_000),
    }),
    adminAccounts: z.array(adminAccount).min(1).max(50),
  })
  .superRefine((data, context) => {
    const uniqueSets = [
      ['projects', data.projects.map((item) => item.slug)],
      ['news', data.news.map((item) => item.slug)],
      ['certificates', data.certificates.map((item) => item.slug)],
      ['adminAccounts', data.adminAccounts.map((item) => item.email.trim().toLowerCase())],
    ] as const
    for (const [field, values] of uniqueSets) {
      if (new Set(values).size !== values.length) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field],
          message: `${field} daxilində təkrarlanan unikal dəyər var.`,
        })
      }
    }
  })
