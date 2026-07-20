'use client'

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
import { translateJob } from '@/lib/site-translations'

const benefitsEn = [
  'Opportunity to contribute to major construction and industrial projects',
  'Growth environment alongside a professional technical team',
  'Work system aligned with safety and quality standards',
  'Career progression and rotation opportunities across new projects',
]

const processStepsEn = [
  'Choose a suitable vacancy and complete the application form.',
  'HR and the technical team review your experience and documents.',
  'Qualified candidates are invited to a technical and project-focused interview.',
  'At the final stage, an offer and onboarding plan are presented.',
]

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
  const { jobs } = useAdmin()
  const { locale } = useLanguage()
  const [formData, setFormData] = useState<ApplicationForm>(emptyForm)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const localizedJobs = useMemo(() => jobs.map((job) => translateJob(job, locale)), [jobs, locale])
  const benefits =
    locale === 'az'
      ? [
          'Böyük tikinti və sənaye layihələrinə töhfə vermək imkanı',
          'Peşəkar texniki komanda ilə birlikdə inkişaf mühiti',
          'Təhlükəsizlik və keyfiyyət standartlarına uyğun iş sistemi',
          'Yeni layihələr üzrə karyera inkişafı və rotasiya imkanları',
        ]
      : benefitsEn
  const processSteps =
    locale === 'az'
      ? [
          'Uyğun vakansiyanı seçin və müraciət formasını tamamlayın.',
          'HR və texniki komanda təcrübənizi və sənədlərinizi qiymətləndirir.',
          'Uyğun namizədlər texniki və layihə yönümlü müsahibəyə dəvət olunur.',
          'Son mərhələdə təklif və onboarding planı təqdim edilir.',
        ]
      : processStepsEn
  const copy =
    locale === 'az'
      ? {
          headerTitle: 'Karyera',
          headerDescription: 'Peşəkar komandamıza qoşulun',
          heroBadge: 'Tikinti komandamıza qoşulun',
          heroTitle: 'Sahə və ofis rolları üçün güclü peşəkarlar axtarırıq',
          heroText:
            'Mühəndislik, layihə idarəetməsi, HSE, BIM, satınalma və sahə icrası üzrə peşəkarlar üçün daha sistemli müraciət prosesi qurmuşuq.',
          processTitle: 'Müraciət Prosesi',
          apply: 'Bu vakansiyaya müraciət et',
          requirements: 'Tələblər:',
          formBadge: 'Ətraflı Müraciət Forması',
          formTitle: 'Layihələrimizə uyğunluğunuzu ətraflı paylaşın',
          formText:
            'Bu forma texniki bacarıqlarınızı, sahə təcrübənizi, təhlükəsizlik hazırlığınızı və ümumi uyğunluğunuzu daha düzgün qiymətləndirməyimiz üçün hazırlanıb.',
          successPrefix: 'Müraciət göndərildi. Aktiv kanallar:',
          success: 'Müraciət göndərildi.',
          submitError: 'Müraciət göndərilə bilmədi.',
          submitError2: 'Müraciət göndərilə bilmədi. Bildiriş ayarlarını yoxlayın.',
          sending: 'Göndərilir...',
          submit: 'Müraciəti göndər',
          contactPrefix: 'Təcili müraciətlər üçün',
          contactLink: 'əlaqə',
          contactSuffix: 'səhifəsi ilə də bizimlə əlaqə saxlaya bilərsiniz.',
        }
      : {
          headerTitle: 'Careers',
          headerDescription: 'Join our professional team',
          heroBadge: 'Join our construction team',
          heroTitle: 'We are looking for strong professionals for both site and office roles',
          heroText:
            'We have built a more structured application process for professionals in engineering, project management, HSE, BIM, procurement, and site execution.',
          processTitle: 'Application Process',
          apply: 'Apply for this role',
          requirements: 'Requirements:',
          formBadge: 'Detailed Application Form',
          formTitle: 'Share your fit for our construction projects in detail',
          formText:
            'This form is designed to help us better evaluate your technical skills, field experience, safety readiness, and overall suitability for our projects.',
          successPrefix: 'Application sent. Active channels:',
          success: 'Application sent.',
          submitError: 'Submission failed.',
          submitError2: 'Application could not be sent. Please check the notification settings.',
          sending: 'Sending...',
          submit: 'Submit application',
          contactPrefix: 'For urgent applications, you can also contact us through the',
          contactLink: 'contact',
          contactSuffix: 'page.',
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
    document.getElementById('career-application-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
                      <Label htmlFor="fullName">{locale === 'az' ? 'Ad soyad' : 'Full name'}</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{locale === 'az' ? 'E-poçt' : 'Email'}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{locale === 'az' ? 'Telefon' : 'Phone'}</Label>
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
                      <Label htmlFor="city">{locale === 'az' ? 'Şəhər / Region' : 'City / Region'}</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2 xl:col-span-2">
                      <Label htmlFor="position">{locale === 'az' ? 'Müraciət olunan vəzifə' : 'Position applied for'}</Label>
                      <select
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                        required
                      >
                        <option value="">{locale === 'az' ? 'Vakansiya seçin' : 'Select a vacancy'}</option>
                        {localizedJobs.map((job) => (
                          <option key={job.id} value={job.title}>
                            {job.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">{locale === 'az' ? 'Şöbə' : 'Department'}</Label>
                      <select
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="">{locale === 'az' ? 'Şöbə seçin' : 'Select a department'}</option>
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
                      <Label htmlFor="experienceYears">{locale === 'az' ? 'İş təcrübəsi (il)' : 'Years of experience'}</Label>
                      <Input
                        id="experienceYears"
                        value={formData.experienceYears}
                        onChange={(e) => setFormData((prev) => ({ ...prev, experienceYears: e.target.value }))}
                        placeholder={locale === 'az' ? 'Məsələn: 7' : 'Example: 7'}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education">{locale === 'az' ? 'Təhsil' : 'Education'}</Label>
                      <Input
                        id="education"
                        value={formData.education}
                        onChange={(e) => setFormData((prev) => ({ ...prev, education: e.target.value }))}
                        placeholder={locale === 'az' ? 'Məsələn: İnşaat mühəndisliyi' : 'Example: Civil engineering'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">{locale === 'az' ? 'İxtisaslaşma' : 'Specialization'}</Label>
                      <Input
                        id="specialization"
                        value={formData.specialization}
                        onChange={(e) => setFormData((prev) => ({ ...prev, specialization: e.target.value }))}
                        placeholder={locale === 'az' ? 'BIM, HSE, sahə icrası və s.' : 'BIM, HSE, site execution, etc.'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="englishLevel">{locale === 'az' ? 'İngilis dili səviyyəsi' : 'English level'}</Label>
                      <select
                        id="englishLevel"
                        value={formData.englishLevel}
                        onChange={(e) => setFormData((prev) => ({ ...prev, englishLevel: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="basic">{locale === 'az' ? 'Başlanğıc' : 'Basic'}</option>
                        <option value="intermediate">{locale === 'az' ? 'Orta' : 'Intermediate'}</option>
                        <option value="advanced">{locale === 'az' ? 'Yaxşı' : 'Advanced'}</option>
                        <option value="fluent">{locale === 'az' ? 'Sərbəst' : 'Fluent'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2 xl:col-span-2">
                      <Label htmlFor="currentCompany">{locale === 'az' ? 'Hazırkı şirkət' : 'Current company'}</Label>
                      <Input
                        id="currentCompany"
                        value={formData.currentCompany}
                        onChange={(e) => setFormData((prev) => ({ ...prev, currentCompany: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentRole">{locale === 'az' ? 'Hazırkı vəzifə' : 'Current role'}</Label>
                      <Input
                        id="currentRole"
                        value={formData.currentRole}
                        onChange={(e) => setFormData((prev) => ({ ...prev, currentRole: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedSalary">{locale === 'az' ? 'Gözlənilən əməkhaqqı' : 'Expected salary'}</Label>
                      <Input
                        id="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={(e) => setFormData((prev) => ({ ...prev, expectedSalary: e.target.value }))}
                        placeholder="AZN"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="availability">{locale === 'az' ? 'Başlama tarixi' : 'Availability date'}</Label>
                      <Input
                        id="availability"
                        type="date"
                        value={formData.availability}
                        onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employmentType">{locale === 'az' ? 'Məşğulluq növü' : 'Employment type'}</Label>
                      <select
                        id="employmentType"
                        value={formData.employmentType}
                        onChange={(e) => setFormData((prev) => ({ ...prev, employmentType: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="full-time">{locale === 'az' ? 'Tam ştat' : 'Full-time'}</option>
                        <option value="part-time">{locale === 'az' ? 'Yarım ştat' : 'Part-time'}</option>
                        <option value="contract">{locale === 'az' ? 'Müqavilə' : 'Contract'}</option>
                        <option value="rotation">{locale === 'az' ? 'Rotasiya / növbəli' : 'Rotation / shift'}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="travelReady">{locale === 'az' ? 'Ezamiyyətə hazırdır?' : 'Available for travel?'}</Label>
                      <select
                        id="travelReady"
                        value={formData.travelReady}
                        onChange={(e) => setFormData((prev) => ({ ...prev, travelReady: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="yes">{locale === 'az' ? 'Bəli' : 'Yes'}</option>
                        <option value="no">{locale === 'az' ? 'Xeyr' : 'No'}</option>
                        <option value="partly">{locale === 'az' ? 'Qismən' : 'Partly'}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shiftReady">{locale === 'az' ? 'Növbəli işə hazırdır?' : 'Available for shift work?'}</Label>
                      <select
                        id="shiftReady"
                        value={formData.shiftReady}
                        onChange={(e) => setFormData((prev) => ({ ...prev, shiftReady: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="yes">{locale === 'az' ? 'Bəli' : 'Yes'}</option>
                        <option value="no">{locale === 'az' ? 'Xeyr' : 'No'}</option>
                        <option value="if-needed">{locale === 'az' ? 'Lazım olduqda' : 'If needed'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="drivingLicense">{locale === 'az' ? 'Sürücülük vəsiqəsi' : 'Driving license'}</Label>
                      <select
                        id="drivingLicense"
                        value={formData.drivingLicense}
                        onChange={(e) => setFormData((prev) => ({ ...prev, drivingLicense: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="yes">{locale === 'az' ? 'Bəli' : 'Yes'}</option>
                        <option value="no">{locale === 'az' ? 'Xeyr' : 'No'}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hseTraining">{locale === 'az' ? 'HSE / təhlükəsizlik təlimi' : 'HSE / safety training'}</Label>
                      <select
                        id="hseTraining"
                        value={formData.hseTraining}
                        onChange={(e) => setFormData((prev) => ({ ...prev, hseTraining: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="yes">{locale === 'az' ? 'Tamamlanıb' : 'Completed'}</option>
                        <option value="no">{locale === 'az' ? 'Tamamlanmayıb' : 'Not completed'}</option>
                        <option value="expired">{locale === 'az' ? 'Vaxtı bitib' : 'Expired'}</option>
                      </select>
                    </div>
                    <div className="space-y-2 xl:col-span-2">
                      <Label htmlFor="cvUpload">{locale === 'az' ? 'CV / Resume' : 'CV / Resume'}</Label>
                      <label className="flex h-10 cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 text-sm text-muted-foreground">
                        <span>{formData.cvFileName || (locale === 'az' ? 'Kompüterinizdən fayl seçin' : 'Choose a file from your computer')}</span>
                        <span className="inline-flex items-center gap-2 text-foreground">
                          <FileText className="h-4 w-4" />
                          {locale === 'az' ? 'Fayl yüklə' : 'Upload file'}
                        </span>
                        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCvUpload} />
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="softwareSkills">{locale === 'az' ? 'Proqram bilikləri' : 'Software skills'}</Label>
                      <Textarea
                        id="softwareSkills"
                        rows={4}
                        value={formData.softwareSkills}
                        onChange={(e) => setFormData((prev) => ({ ...prev, softwareSkills: e.target.value }))}
                        placeholder={locale === 'az' ? 'AutoCAD, Revit, Primavera, MS Project, Excel və s.' : 'AutoCAD, Revit, Primavera, MS Project, Excel, etc.'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certifications">{locale === 'az' ? 'Sertifikat və lisenziyalar' : 'Certifications and licenses'}</Label>
                      <Textarea
                        id="certifications"
                        rows={4}
                        value={formData.certifications}
                        onChange={(e) => setFormData((prev) => ({ ...prev, certifications: e.target.value }))}
                        placeholder={locale === 'az' ? 'HSE, PMP, ISO, qaynaq sertifikatı və s.' : 'HSE, PMP, ISO, welding certification, etc.'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectExperience">{locale === 'az' ? 'İştirak etdiyiniz tikinti layihələri' : 'Construction projects you have worked on'}</Label>
                    <Textarea
                      id="projectExperience"
                      rows={5}
                      value={formData.projectExperience}
                      onChange={(e) => setFormData((prev) => ({ ...prev, projectExperience: e.target.value }))}
                      placeholder={locale === 'az' ? 'Layihə növünü, miqyasını, rolunuzu, komanda ölçüsünü və əsas nailiyyətləri yazın.' : 'Describe project type, scale, your role, team size, and key achievements.'}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="languages">{locale === 'az' ? 'Dil bilikləri' : 'Languages'}</Label>
                      <Textarea
                        id="languages"
                        rows={4}
                        value={formData.languages}
                        onChange={(e) => setFormData((prev) => ({ ...prev, languages: e.target.value }))}
                        placeholder={locale === 'az' ? 'Azərbaycan, ingilis, rus və s.' : 'Azerbaijani, English, Russian, etc.'}
                      />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="references">{locale === 'az' ? 'Referanslar' : 'References'}</Label>
                      <Textarea
                        id="references"
                        rows={4}
                        value={formData.references}
                        onChange={(e) => setFormData((prev) => ({ ...prev, references: e.target.value }))}
                        placeholder={locale === 'az' ? 'Əvvəlki rəhbər, layihə meneceri və ya HR əlaqəsi' : 'Previous manager, project manager, or HR contact'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">{locale === 'az' ? 'Özünüz və bu vəzifəyə uyğunluğunuz haqqında qısa məlumat verin' : 'Briefly describe yourself and your suitability for this role'}</Label>
                    <Textarea
                      id="coverLetter"
                      rows={6}
                      value={formData.coverLetter}
                      onChange={(e) => setFormData((prev) => ({ ...prev, coverLetter: e.target.value }))}
                      placeholder={locale === 'az' ? 'Texniki güclü tərəflərinizi, sahə təcrübənizi və niyə bu komandaya uyğun olduğunuzu paylaşın.' : 'Share your technical strengths, field experience, and why you are a fit for this team.'}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-border/50 bg-card p-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <p className="text-sm font-medium text-foreground">{locale === 'az' ? 'Komanda işi' : 'Teamwork'}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {locale === 'az'
                          ? 'Məktub hissəsində sahə və ofis koordinasiyası təcrübənizi qeyd edin.'
                          : 'Mention your experience with field and office coordination in the cover letter section.'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card p-4">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <p className="text-sm font-medium text-foreground">{locale === 'az' ? 'Təhlükəsizlik' : 'Safety'}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {locale === 'az'
                          ? 'HSE və təhlükəsizlik prosedurları ilə iş təcrübəsi bizim üçün vacibdir.'
                          : 'Experience working with HSE and safety procedures is important to us.'}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card p-4">
                      <div className="flex items-center gap-3">
                        <CalendarClock className="h-5 w-5 text-primary" />
                        <p className="text-sm font-medium text-foreground">{locale === 'az' ? 'Mövcudluq' : 'Availability'}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {locale === 'az'
                          ? 'Başlama tarixiniz və ezamiyyət imkanınız layihə planlamasında nəzərə alınır.'
                          : 'Your start date and travel availability are considered in project planning.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                      {copy.contactPrefix}{' '}
                      <Link href="/elaqe" className="text-primary underline">
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
