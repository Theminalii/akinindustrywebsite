'use client'
import { useCmsText } from '@/lib/admin/page-content'

import { type ChangeEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Briefcase,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  ShieldCheck,
  Send,
  Users,
} from 'lucide-react'

import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'
import { useSiteTranslations } from '@/lib/site-translations'





type ApplicationForm = {
  fullName: string
  email: string
  phone: string
  city: string
  position: string
  department: string
  experienceYears: string
  education: string
  specialization: string
  currentCompany: string
  currentRole: string
  expectedSalary: string
  availability: string
  employmentType: string
  projectExperience: string
  softwareSkills: string
  certifications: string
  languages: string
  references: string
  coverLetter: string
  drivingLicense: string
  hseTraining: string
  travelReady: string
  shiftReady: string
  englishLevel: string
  cvFileName: string
}

const emptyForm: ApplicationForm = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  position: '',
  department: '',
  experienceYears: '',
  education: '',
  specialization: '',
  currentCompany: '',
  currentRole: '',
  expectedSalary: '',
  availability: '',
  employmentType: 'full-time',
  projectExperience: '',
  softwareSkills: '',
  certifications: '',
  languages: '',
  references: '',
  coverLetter: '',
  drivingLicense: 'yes',
  hseTraining: 'yes',
  travelReady: 'yes',
  shiftReady: 'no',
  englishLevel: 'intermediate',
  cvFileName: '',
}

export default function CareersPage() {
  const cmsText = useCmsText()
  const { translateJob } = useSiteTranslations()

const benefitsEn = [
  cmsText("karyera/page.001"),
  cmsText("karyera/page.002"),
  cmsText("karyera/page.003"),
  cmsText("karyera/page.004"),
]
const processStepsEn = [
  cmsText("karyera/page.005"),
  cmsText("karyera/page.006"),
  cmsText("karyera/page.007"),
  cmsText("karyera/page.008"),
]
  const { jobs } = useAdmin()
  const { locale } = useLanguage()
  const [formData, setFormData] = useState<ApplicationForm>(emptyForm)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const localizedJobs = useMemo(() => jobs.map((job) => translateJob(job, locale)), [jobs, locale, translateJob])
  const benefits =
    locale === 'az'
      ? [
          cmsText("karyera/page.009"),
          cmsText("karyera/page.010"),
          cmsText("karyera/page.011"),
          cmsText("karyera/page.012"),
        ]
      : benefitsEn
  const processSteps =
    locale === 'az'
      ? [
          cmsText("karyera/page.013"),
          cmsText("karyera/page.014"),
          cmsText("karyera/page.015"),
          cmsText("karyera/page.016"),
        ]
      : processStepsEn
  const copy =
    locale === 'az'
      ? {
          headerTitle: cmsText("karyera/page.017"),
          headerDescription: cmsText("karyera/page.018"),
          heroBadge: cmsText("karyera/page.019"),
          heroTitle: cmsText("karyera/page.020"),
          heroText:
            cmsText("karyera/page.021"),
          processTitle: cmsText("karyera/page.022"),
          apply: cmsText("karyera/page.023"),
          requirements: cmsText("karyera/page.024"),
          formBadge: cmsText("karyera/page.025"),
          formTitle: cmsText("karyera/page.026"),
          formText:
            cmsText("karyera/page.027"),
          successPrefix: cmsText("karyera/page.028"),
          success: cmsText("karyera/page.029"),
          submitError: cmsText("karyera/page.030"),
          submitError2: cmsText("karyera/page.031"),
          sending: cmsText("karyera/page.032"),
          submit: cmsText("karyera/page.033"),
          contactPrefix: cmsText("karyera/page.034"),
          contactLink: cmsText("karyera/page.035"),
          contactSuffix: cmsText("karyera/page.036"),
        }
      : {
          headerTitle: cmsText("karyera/page.037"),
          headerDescription: cmsText("karyera/page.038"),
          heroBadge: cmsText("karyera/page.039"),
          heroTitle: cmsText("karyera/page.040"),
          heroText:
            cmsText("karyera/page.041"),
          processTitle: cmsText("karyera/page.042"),
          apply: cmsText("karyera/page.043"),
          requirements: cmsText("karyera/page.044"),
          formBadge: cmsText("karyera/page.045"),
          formTitle: cmsText("karyera/page.046"),
          formText:
            cmsText("karyera/page.047"),
          successPrefix: cmsText("karyera/page.048"),
          success: cmsText("karyera/page.049"),
          submitError: cmsText("karyera/page.050"),
          submitError2: cmsText("karyera/page.051"),
          sending: cmsText("karyera/page.052"),
          submit: cmsText("karyera/page.053"),
          contactPrefix: cmsText("karyera/page.054"),
          contactLink: "contact",
          contactSuffix: cmsText("karyera/page.056"),
        }

  const departmentOptions = useMemo(() => {
    return Array.from(new Set(localizedJobs.map((job) => job.department)))
  }, [localizedJobs])

  const handleCvUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setCvFile(file)
    setFormData((prev) => ({ ...prev, cvFileName: file.name }))
    e.target.value = ''
  }

  const handleApplyToJob = (title: string, department: string, type: string) => {
    setFormData((prev) => ({
      ...prev,
      position: title,
      department,
      employmentType: type,
    }))
    setSubmitted(false)
    document.getElementById('career-application-form')?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitMessage('')
    setSubmitted(false)

    try {
      const requestFormData = new FormData()

      Object.entries(formData).forEach(([key, value]) => {
        requestFormData.append(key, value)
      })

      if (cvFile) {
        requestFormData.append('cvFile', cvFile)
      }

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: requestFormData,
      })

      const result = (await response.json()) as {
        success: boolean
        message?: string
        results?: Array<{ channel: string; success: boolean; message: string }>
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || copy.submitError)
      }

      const successfulChannels = result.results
        ?.filter((item) => item.success)
        .map((item) => item.channel)
        .join(', ')

      setSubmitted(true)
      setSubmitMessage(
        successfulChannels
          ? `${copy.successPrefix} ${successfulChannels}.`
          : result.message || copy.success
      )
      setFormData(emptyForm)
      setCvFile(null)
    } catch (error) {
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : copy.submitError2
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        title={copy.headerTitle}
        description={copy.headerDescription}
        breadcrumbs={[{ label: copy.headerTitle }]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <Card className="overflow-hidden border-border/50 shadow-sm">
              <CardContent className="p-8 md:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Building2 className="h-4 w-4" />
                  {copy.heroBadge}
                </span>
                <h2 className="mt-6 text-3xl md:text-4xl font-bold text-foreground">
                  {copy.heroTitle}
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  {copy.heroText}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                      <p className="text-sm leading-6 text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>{copy.processTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-border/50 bg-card p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-6">
            {localizedJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden border-border/50 hover:border-primary/30 transition-all">
                <CardHeader className="bg-slate-50/50">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase size={16} /> {job.department}</span>
                        <span className="flex items-center gap-1"><Clock size={16} /> {job.type}</span>
                      </div>
                    </div>
                    <Button onClick={() => handleApplyToJob(job.title, job.department, job.type)}>
                      {copy.apply}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed">{job.description}</p>
                  <h4 className="text-lg font-semibold mb-3">{copy.requirements}</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="career-application-form" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <FileText className="h-4 w-4" />
                {copy.formBadge}
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">
                {copy.formTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-muted-foreground leading-7">
                {copy.formText}
              </p>
            </div>

            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-6 md:p-8">
                {submitMessage && (
                  <div
                    className={`mb-6 rounded-2xl px-4 py-3 text-sm ${
                      submitted
                        ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border border-red-200 bg-red-50 text-red-700'
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2 xl:col-span-2">
                      <Label htmlFor="fullName">{locale === 'az' ? cmsText("karyera/page.059") : cmsText("karyera/page.060")}</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{locale === 'az' ? cmsText("karyera/page.061") : cmsText("karyera/page.062")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{locale === 'az' ? cmsText("karyera/page.063") : cmsText("karyera/page.064")}</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">{locale === 'az' ? cmsText("karyera/page.065") : cmsText("karyera/page.066")}</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2 xl:col-span-2">
                      <Label htmlFor="position">{locale === 'az' ? cmsText("karyera/page.067") : cmsText("karyera/page.068")}</Label>
                      <select
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                        required
                      >
                        <option value="">{locale === 'az' ? cmsText("karyera/page.069") : cmsText("karyera/page.070")}</option>
                        {localizedJobs.map((job) => (
                          <option key={job.id} value={job.title}>
                            {job.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">{locale === 'az' ? cmsText("karyera/page.071") : cmsText("karyera/page.072")}</Label>
                      <select
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="">{locale === 'az' ? cmsText("karyera/page.073") : cmsText("karyera/page.074")}</option>
                        {departmentOptions.map((department) => (
                          <option key={department} value={department}>
                            {department}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="experienceYears">{locale === 'az' ? cmsText("karyera/page.075") : cmsText("karyera/page.076")}</Label>
                      <Input
                        id="experienceYears"
                        value={formData.experienceYears}
                        onChange={(e) => setFormData((prev) => ({ ...prev, experienceYears: e.target.value }))}
                        placeholder={locale === 'az' ? cmsText("karyera/page.077") : cmsText("karyera/page.078")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education">{locale === 'az' ? cmsText("karyera/page.079") : cmsText("karyera/page.080")}</Label>
                      <Input
                        id="education"
                        value={formData.education}
                        onChange={(e) => setFormData((prev) => ({ ...prev, education: e.target.value }))}
                        placeholder={locale === 'az' ? cmsText("karyera/page.081") : cmsText("karyera/page.082")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">{locale === 'az' ? cmsText("karyera/page.083") : cmsText("karyera/page.084")}</Label>
                      <Input
                        id="specialization"
                        value={formData.specialization}
                        onChange={(e) => setFormData((prev) => ({ ...prev, specialization: e.target.value }))}
                        placeholder={locale === 'az' ? cmsText("karyera/page.085") : cmsText("karyera/page.086")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="englishLevel">{locale === 'az' ? cmsText("karyera/page.087") : cmsText("karyera/page.088")}</Label>
                      <select
                        id="englishLevel"
                        value={formData.englishLevel}
                        onChange={(e) => setFormData((prev) => ({ ...prev, englishLevel: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="basic">{locale === 'az' ? cmsText("karyera/page.089") : cmsText("karyera/page.090")}</option>
                        <option value="intermediate">{locale === 'az' ? cmsText("karyera/page.091") : cmsText("karyera/page.092")}</option>
                        <option value="advanced">{locale === 'az' ? cmsText("karyera/page.093") : cmsText("karyera/page.094")}</option>
                        <option value="fluent">{locale === 'az' ? cmsText("karyera/page.095") : cmsText("karyera/page.096")}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2 xl:col-span-2">
                      <Label htmlFor="currentCompany">{locale === 'az' ? cmsText("karyera/page.097") : cmsText("karyera/page.098")}</Label>
                      <Input
                        id="currentCompany"
                        value={formData.currentCompany}
                        onChange={(e) => setFormData((prev) => ({ ...prev, currentCompany: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentRole">{locale === 'az' ? cmsText("karyera/page.099") : cmsText("karyera/page.100")}</Label>
                      <Input
                        id="currentRole"
                        value={formData.currentRole}
                        onChange={(e) => setFormData((prev) => ({ ...prev, currentRole: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedSalary">{locale === 'az' ? cmsText("karyera/page.101") : cmsText("karyera/page.102")}</Label>
                      <Input
                        id="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={(e) => setFormData((prev) => ({ ...prev, expectedSalary: e.target.value }))}
                        placeholder={cmsText("karyera/page.103")}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="availability">{locale === 'az' ? cmsText("karyera/page.104") : cmsText("karyera/page.105")}</Label>
                      <Input
                        id="availability"
                        type="date"
                        value={formData.availability}
                        onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employmentType">{locale === 'az' ? cmsText("karyera/page.106") : cmsText("karyera/page.107")}</Label>
                      <select
                        id="employmentType"
                        value={formData.employmentType}
                        onChange={(e) => setFormData((prev) => ({ ...prev, employmentType: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="full-time">{locale === 'az' ? cmsText("karyera/page.108") : cmsText("karyera/page.109")}</option>
                        <option value="part-time">{locale === 'az' ? cmsText("karyera/page.110") : cmsText("karyera/page.111")}</option>
                        <option value="contract">{locale === 'az' ? cmsText("karyera/page.112") : cmsText("karyera/page.113")}</option>
                        <option value="rotation">{locale === 'az' ? cmsText("karyera/page.114") : cmsText("karyera/page.115")}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="travelReady">{locale === 'az' ? cmsText("karyera/page.116") : cmsText("karyera/page.117")}</Label>
                      <select
                        id="travelReady"
                        value={formData.travelReady}
                        onChange={(e) => setFormData((prev) => ({ ...prev, travelReady: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="yes">{locale === 'az' ? cmsText("karyera/page.118") : cmsText("karyera/page.119")}</option>
                        <option value="no">{locale === 'az' ? cmsText("karyera/page.120") : cmsText("karyera/page.121")}</option>
                        <option value="partly">{locale === 'az' ? cmsText("karyera/page.122") : cmsText("karyera/page.123")}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shiftReady">{locale === 'az' ? cmsText("karyera/page.124") : cmsText("karyera/page.125")}</Label>
                      <select
                        id="shiftReady"
                        value={formData.shiftReady}
                        onChange={(e) => setFormData((prev) => ({ ...prev, shiftReady: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="yes">{locale === 'az' ? cmsText("karyera/page.126") : cmsText("karyera/page.127")}</option>
                        <option value="no">{locale === 'az' ? cmsText("karyera/page.128") : cmsText("karyera/page.129")}</option>
                        <option value="if-needed">{locale === 'az' ? cmsText("karyera/page.130") : cmsText("karyera/page.131")}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="drivingLicense">{locale === 'az' ? cmsText("karyera/page.132") : cmsText("karyera/page.133")}</Label>
                      <select
                        id="drivingLicense"
                        value={formData.drivingLicense}
                        onChange={(e) => setFormData((prev) => ({ ...prev, drivingLicense: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="yes">{locale === 'az' ? cmsText("karyera/page.134") : cmsText("karyera/page.135")}</option>
                        <option value="no">{locale === 'az' ? cmsText("karyera/page.136") : cmsText("karyera/page.137")}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hseTraining">{locale === 'az' ? cmsText("karyera/page.138") : cmsText("karyera/page.139")}</Label>
                      <select
                        id="hseTraining"
                        value={formData.hseTraining}
                        onChange={(e) => setFormData((prev) => ({ ...prev, hseTraining: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="yes">{locale === 'az' ? cmsText("karyera/page.140") : cmsText("karyera/page.141")}</option>
                        <option value="no">{locale === 'az' ? cmsText("karyera/page.142") : cmsText("karyera/page.143")}</option>
                        <option value="expired">{locale === 'az' ? cmsText("karyera/page.144") : cmsText("karyera/page.145")}</option>
                      </select>
                    </div>
                    <div className="space-y-2 xl:col-span-2">
                      <Label htmlFor="cvUpload">{locale === 'az' ? cmsText("karyera/page.146") : cmsText("karyera/page.147")}</Label>
                      <label className="flex h-10 cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 text-sm text-muted-foreground">
                        <span>{formData.cvFileName || (locale === 'az' ? cmsText("karyera/page.148") : cmsText("karyera/page.149"))}</span>
                        <span className="inline-flex items-center gap-2 text-foreground">
                          <FileText className="h-4 w-4" />
                          {locale === 'az' ? cmsText("karyera/page.150") : cmsText("karyera/page.151")}
                        </span>
                        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCvUpload} />
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="softwareSkills">{locale === 'az' ? cmsText("karyera/page.152") : cmsText("karyera/page.153")}</Label>
                      <Textarea
                        id="softwareSkills"
                        rows={4}
                        value={formData.softwareSkills}
                        onChange={(e) => setFormData((prev) => ({ ...prev, softwareSkills: e.target.value }))}
                        placeholder={locale === 'az' ? cmsText("karyera/page.154") : cmsText("karyera/page.155")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certifications">{locale === 'az' ? cmsText("karyera/page.156") : cmsText("karyera/page.157")}</Label>
                      <Textarea
                        id="certifications"
                        rows={4}
                        value={formData.certifications}
                        onChange={(e) => setFormData((prev) => ({ ...prev, certifications: e.target.value }))}
                        placeholder={locale === 'az' ? cmsText("karyera/page.158") : cmsText("karyera/page.159")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectExperience">{locale === 'az' ? cmsText("karyera/page.160") : cmsText("karyera/page.161")}</Label>
                    <Textarea
                      id="projectExperience"
                      rows={5}
                      value={formData.projectExperience}
                      onChange={(e) => setFormData((prev) => ({ ...prev, projectExperience: e.target.value }))}
                      placeholder={locale === 'az' ? cmsText("karyera/page.162") : cmsText("karyera/page.163")}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="languages">{locale === 'az' ? cmsText("karyera/page.164") : cmsText("karyera/page.165")}</Label>
                      <Textarea
                        id="languages"
                        rows={4}
                        value={formData.languages}
                        onChange={(e) => setFormData((prev) => ({ ...prev, languages: e.target.value }))}
                        placeholder={locale === 'az' ? cmsText("karyera/page.166") : cmsText("karyera/page.167")}
                      />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="references">{locale === 'az' ? cmsText("karyera/page.168") : cmsText("karyera/page.169")}</Label>
                      <Textarea
                        id="references"
                        rows={4}
                        value={formData.references}
                        onChange={(e) => setFormData((prev) => ({ ...prev, references: e.target.value }))}
                        placeholder={locale === 'az' ? cmsText("karyera/page.170") : cmsText("karyera/page.171")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">{locale === 'az' ? cmsText("karyera/page.172") : cmsText("karyera/page.173")}</Label>
                    <Textarea
                      id="coverLetter"
                      rows={6}
                      value={formData.coverLetter}
                      onChange={(e) => setFormData((prev) => ({ ...prev, coverLetter: e.target.value }))}
                      placeholder={locale === 'az' ? cmsText("karyera/page.174") : cmsText("karyera/page.175")}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-border/50 bg-card p-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <p className="text-sm font-medium text-foreground">{locale === 'az' ? cmsText("karyera/page.176") : cmsText("karyera/page.177")}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {locale === 'az'
                          ? cmsText("karyera/page.178")
                          : cmsText("karyera/page.179")}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card p-4">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <p className="text-sm font-medium text-foreground">{locale === 'az' ? cmsText("karyera/page.180") : cmsText("karyera/page.181")}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {locale === 'az'
                          ? cmsText("karyera/page.182")
                          : cmsText("karyera/page.183")}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card p-4">
                      <div className="flex items-center gap-3">
                        <CalendarClock className="h-5 w-5 text-primary" />
                        <p className="text-sm font-medium text-foreground">{locale === 'az' ? cmsText("karyera/page.184") : cmsText("karyera/page.185")}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {locale === 'az'
                          ? cmsText("karyera/page.186")
                          : cmsText("karyera/page.187")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                      {copy.contactPrefix}{' '}
                      <Link href={cmsText("karyera/page.188")} className="text-primary underline">
                        {copy.contactLink}
                      </Link>{' '}
                      {copy.contactSuffix}
                    </p>
                    <Button type="submit" size="lg" className="group" disabled={submitting}>
                      {submitting ? copy.sending : copy.submit}
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
