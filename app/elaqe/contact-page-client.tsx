'use client'
import { useCmsText } from '@/lib/admin/page-content'

import { useState } from 'react'
import { Clock, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react'

import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'

type ContactFormState = {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

const emptyForm: ContactFormState = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

function getOfficeMapEmbedUrl(googleMapUrl: string, googleMapEmbedUrl: string) {
  if (googleMapUrl.includes('wh6PTpetRciTJjmS9')) {
    return 'https://www.google.com/maps?q=Arena%20Plaza%20Baku&output=embed'
  }

  if (googleMapEmbedUrl) return googleMapEmbedUrl
  if (googleMapUrl) return `https://www.google.com/maps?q=${encodeURIComponent(googleMapUrl)}&output=embed`
  return ''
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 8.5V7.1c0-.7.3-1.1 1.2-1.1H17V3.1C16.7 3 15.7 3 14.7 3 12.5 3 11 4.3 11 6.8v1.7H8.5v3.2H11V21h3.2v-9.3h2.5l.4-3.2H14Z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M16.8 7.2h.01" />
    </svg>
  )
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M15.7 3c.3 2 1.4 3.3 3.4 3.5v3.1c-1.2.1-2.3-.3-3.4-1v6.2c0 3.1-2 5.2-5 5.2-2.8 0-4.8-1.8-4.8-4.4 0-2.8 2.2-4.6 5.3-4.4v3.2c-1.3-.2-2.1.3-2.1 1.2 0 .8.6 1.3 1.5 1.3 1.1 0 1.8-.7 1.8-2.1V3h3.3Z" />
    </svg>
  )
}

export function ContactPageClient() {
  const cmsText = useCmsText()
  

  const { contact } = useAdmin()
  const { locale } = useLanguage()
  const [formData, setFormData] = useState<ContactFormState>(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const copy =
    locale === 'az'
      ? {
          headerTitle: cmsText("elaqe/contact-page-client.001"),
          headerDescription: cmsText("elaqe/contact-page-client.002"),
          phone: cmsText("elaqe/contact-page-client.003"),
          email: cmsText("elaqe/contact-page-client.004"),
          address: cmsText("elaqe/contact-page-client.005"),
          hours: cmsText("elaqe/contact-page-client.006"),
          formBadge: cmsText("elaqe/contact-page-client.007"),
          formTitle: cmsText("elaqe/contact-page-client.008"),
          formDescription: cmsText("elaqe/contact-page-client.009"),
          fullName: cmsText("elaqe/contact-page-client.010"),
          fullNamePlaceholder: cmsText("elaqe/contact-page-client.011"),
          emailLabel: cmsText("elaqe/contact-page-client.012"),
          phoneLabel: cmsText("elaqe/contact-page-client.013"),
          subject: cmsText("elaqe/contact-page-client.014"),
          subjectPlaceholder: cmsText("elaqe/contact-page-client.015"),
          message: cmsText("elaqe/contact-page-client.016"),
          messagePlaceholder: cmsText("elaqe/contact-page-client.017"),
          sending: cmsText("elaqe/contact-page-client.018"),
          send: cmsText("elaqe/contact-page-client.019"),
          locationBadge: cmsText("elaqe/contact-page-client.020"),
          locationTitle: cmsText("elaqe/contact-page-client.021"),
          locationDescription: cmsText("elaqe/contact-page-client.022"),
          follow: cmsText("elaqe/contact-page-client.023"),
          ctaTitle: cmsText("elaqe/contact-page-client.024"),
          ctaDescription: cmsText("elaqe/contact-page-client.025"),
          sent: cmsText("elaqe/contact-page-client.026"),
          sentChannels: cmsText("elaqe/contact-page-client.027"),
          sendError: cmsText("elaqe/contact-page-client.028"),
          notificationError: cmsText("elaqe/contact-page-client.029"),
        }
      : {
          headerTitle: cmsText("elaqe/contact-page-client.030"),
          headerDescription: cmsText("elaqe/contact-page-client.031"),
          phone: cmsText("elaqe/contact-page-client.032"),
          email: cmsText("elaqe/contact-page-client.033"),
          address: cmsText("elaqe/contact-page-client.034"),
          hours: cmsText("elaqe/contact-page-client.035"),
          formBadge: cmsText("elaqe/contact-page-client.036"),
          formTitle: cmsText("elaqe/contact-page-client.037"),
          formDescription: cmsText("elaqe/contact-page-client.038"),
          fullName: cmsText("elaqe/contact-page-client.039"),
          fullNamePlaceholder: cmsText("elaqe/contact-page-client.040"),
          emailLabel: cmsText("elaqe/contact-page-client.041"),
          phoneLabel: cmsText("elaqe/contact-page-client.042"),
          subject: cmsText("elaqe/contact-page-client.043"),
          subjectPlaceholder: cmsText("elaqe/contact-page-client.044"),
          message: cmsText("elaqe/contact-page-client.045"),
          messagePlaceholder: cmsText("elaqe/contact-page-client.046"),
          sending: cmsText("elaqe/contact-page-client.047"),
          send: cmsText("elaqe/contact-page-client.048"),
          locationBadge: cmsText("elaqe/contact-page-client.049"),
          locationTitle: cmsText("elaqe/contact-page-client.050"),
          locationDescription: cmsText("elaqe/contact-page-client.051"),
          follow: cmsText("elaqe/contact-page-client.052"),
          ctaTitle: cmsText("elaqe/contact-page-client.053"),
          ctaDescription: cmsText("elaqe/contact-page-client.054"),
          sent: cmsText("elaqe/contact-page-client.055"),
          sentChannels: cmsText("elaqe/contact-page-client.056"),
          sendError: cmsText("elaqe/contact-page-client.057"),
          notificationError: cmsText("elaqe/contact-page-client.058"),
        }

  const mapEmbedUrl = getOfficeMapEmbedUrl(contact.googleMapUrl, contact.googleMapEmbedUrl)
  const contactLinks = [
    { label: 'Telefon', href: `tel:${contact.phone1}`, icon: Phone, show: Boolean(contact.phone1) },
    { label: 'Mail', href: `mailto:${contact.email1}`, icon: Mail, show: Boolean(contact.email1) },
    { label: 'Google Map', href: contact.googleMapUrl || 'https://maps.app.goo.gl/wh6PTpetRciTJjmS9', icon: MapPin, show: Boolean(contact.googleMapUrl || contact.address) },
    { label: 'Facebook', href: contact.facebookUrl, icon: FacebookIcon, show: Boolean(contact.facebookUrl) },
    { label: 'Instagram', href: contact.instagramUrl, icon: InstagramIcon, show: Boolean(contact.instagramUrl) },
    { label: 'TikTok', href: contact.tiktokUrl, icon: TikTokIcon, show: Boolean(contact.tiktokUrl) },
    { label: 'LinkedIn', href: contact.linkedinUrl, icon: Linkedin, show: Boolean(contact.linkedinUrl) },
  ].filter((item) => item.show)

  const contactInfo = [
    {
      icon: Phone,
      title: copy.phone,
      details: [contact.phone1, contact.phone2].filter(Boolean),
      actionPrefix: cmsText("elaqe/contact-page-client.059"),
    },
    {
      icon: Mail,
      title: copy.email,
      details: [contact.email1, contact.email2].filter(Boolean),
      actionPrefix: cmsText("elaqe/contact-page-client.060"),
    },
    {
      icon: MapPin,
      title: copy.address,
      details: contact.address.split(',').map((item) => item.trim()).filter(Boolean),
      actionPrefix: null,
    },
    {
      icon: Clock,
      title: copy.hours,
      details: contact.workingHours.split(',').map((item) => item.trim()).filter(Boolean),
      actionPrefix: null,
    },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitted(false)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = (await response.json()) as {
        success: boolean
        message?: string
        results?: Array<{ channel: string; success: boolean; message: string }>
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || copy.sendError)
      }

      const successfulChannels = result.results
        ?.filter((item) => item.success)
        .map((item) => item.channel)
        .join(', ')

      setSubmitted(true)
      setSubmitMessage(
        successfulChannels
          ? cmsText("elaqe/contact-page-client.template1", { channels: successfulChannels })
          : result.message || copy.sent
      )
      setFormData(emptyForm)
    } catch (error) {
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : copy.notificationError
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{item.title}</h3>
                  <div className="space-y-1">
                    {item.details.map((detail, i) =>
                      item.actionPrefix ? (
                        <a
                          key={i}
                          href={`${item.actionPrefix}${detail}`}
                          className="block text-muted-foreground hover:text-primary transition-colors"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p key={i} className="text-muted-foreground">
                          {detail}
                        </p>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
                aria-label={item.label}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  {copy.formBadge}
                </span>
                <h2 className="text-3xl font-bold text-foreground mb-4">{copy.formTitle}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {copy.formDescription}
                </p>
              </div>

              <Card className="border-border/50">
                <CardContent className="p-8">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">{copy.fullName}</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                          placeholder={copy.fullNamePlaceholder}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{copy.emailLabel}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder={cmsText("elaqe/contact-page-client.063")}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{copy.phoneLabel}</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder={cmsText("elaqe/contact-page-client.064")}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">{copy.subject}</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                          placeholder={copy.subjectPlaceholder}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{copy.message}</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder={copy.messagePlaceholder}
                        rows={5}
                        required
                      />
                    </div>

                    {submitMessage && (
                      <p className={`text-sm ${submitted ? 'text-emerald-600' : 'text-red-600'}`}>
                        {submitMessage}
                      </p>
                    )}

                    <Button type="submit" size="lg" className="w-full group" disabled={submitting}>
                      {submitting ? copy.sending : copy.send}
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  {copy.locationBadge}
                </span>
                <h2 className="text-3xl font-bold text-foreground mb-4">{copy.locationTitle}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {copy.locationDescription}
                </p>
              </div>

              <Card className="border-border/50 overflow-hidden mb-8">
                {mapEmbedUrl ? (
                  <iframe
                    title={cmsText("elaqe/contact-page-client.065")}
                    src={mapEmbedUrl}
                    className="aspect-4/3 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="aspect-4/3 bg-primary/10 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">{contact.address}</p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {copy.ctaTitle}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            {copy.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={`tel:${contact.phone1}`}>
                <Phone className="mr-2 h-4 w-4" />
                {contact.phone1}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-white text-black hover:bg-white hover:text-black"
            >
              <a href={`mailto:${contact.email1}`}>
                <Mail className="mr-2 h-4 w-4" />
                {contact.email1}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
