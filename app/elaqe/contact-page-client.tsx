'use client'

import { useState } from 'react'
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Youtube } from 'lucide-react'

import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAdmin } from '@/lib/admin/context'
import { useLanguage } from '@/lib/language-context'

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

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

export function ContactPageClient() {
  const { contact } = useAdmin()
  const { locale } = useLanguage()
  const [formData, setFormData] = useState<ContactFormState>(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const copy =
    locale === 'az'
      ? {
          headerTitle: 'Əlaqə',
          headerDescription: 'Layihənizi müzakirə etmək üçün bizimlə əlaqə saxlayın',
          phone: 'Telefon',
          email: 'E-poçt',
          address: 'Ünvan',
          hours: 'İş Saatları',
          formBadge: 'Əlaqə Formu',
          formTitle: 'Bizə Mesaj Göndərin',
          formDescription: 'Layihəniz haqqında məlumat verin, komandamız qısa zamanda sizinlə əlaqə saxlasın.',
          fullName: 'Ad Soyad *',
          fullNamePlaceholder: 'Ad və soyadınızı daxil edin',
          emailLabel: 'E-poçt *',
          phoneLabel: 'Telefon *',
          subject: 'Mövzu',
          subjectPlaceholder: 'Mesajın mövzusu',
          message: 'Mesaj *',
          messagePlaceholder: 'Layihəniz haqqında ətraflı məlumat paylaşın...',
          sending: 'Göndərilir...',
          send: 'Göndər',
          locationBadge: 'Məkan',
          locationTitle: 'Ofisimizi Ziyarət Edin',
          locationDescription: 'Baş ofisimiz Bakının mərkəzində yerləşir. Görüş üçün əvvəlcədən zəng etməyiniz xahiş olunur.',
          follow: 'Bizi izləyin:',
          ctaTitle: 'Layihəniz Haqqında Danışaq',
          ctaDescription: 'Ödənişsiz konsultasiya üçün bu gün bizimlə əlaqə saxlayın',
          sent: 'Mesaj göndərildi.',
          sentChannels: 'Mesaj göndərildi. Aktiv kanallar:',
          sendError: 'Mesaj göndərilə bilmədi.',
          notificationError: 'Mesaj göndərilə bilmədi. Bildiriş ayarlarını yoxlayın.',
        }
      : {
          headerTitle: 'Contact',
          headerDescription: 'Get in touch with us to discuss your project',
          phone: 'Phone',
          email: 'Email',
          address: 'Address',
          hours: 'Working Hours',
          formBadge: 'Contact Form',
          formTitle: 'Send Us a Message',
          formDescription: 'Tell us about your project and our team will get back to you shortly.',
          fullName: 'Full Name *',
          fullNamePlaceholder: 'Enter your full name',
          emailLabel: 'Email *',
          phoneLabel: 'Phone *',
          subject: 'Subject',
          subjectPlaceholder: 'Subject of your message',
          message: 'Message *',
          messagePlaceholder: 'Share details about your project...',
          sending: 'Sending...',
          send: 'Send',
          locationBadge: 'Location',
          locationTitle: 'Visit Our Office',
          locationDescription: 'Our main office is located in central Baku. Please call ahead to schedule a meeting.',
          follow: 'Follow us:',
          ctaTitle: 'Let’s Talk About Your Project',
          ctaDescription: 'Contact us today for a free consultation',
          sent: 'Message sent.',
          sentChannels: 'Message sent. Active channels:',
          sendError: 'Message could not be sent.',
          notificationError: 'Message could not be sent. Please check the notification settings.',
        }

  const contactInfo = [
    {
      icon: Phone,
      title: copy.phone,
      details: [contact.phone1, contact.phone2].filter(Boolean),
      actionPrefix: 'tel:',
    },
    {
      icon: Mail,
      title: copy.email,
      details: [contact.email1, contact.email2].filter(Boolean),
      actionPrefix: 'mailto:',
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
        headers: { 'Content-Type': 'application/json' },
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
          ? `Message sent. Active channels: ${successfulChannels}.`
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
                          placeholder="email@example.com"
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
                          placeholder="+994 XX XXX XX XX"
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
                {contact.googleMapEmbedUrl ? (
                  <iframe
                    title="Akin Industry map"
                    src={contact.googleMapEmbedUrl}
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

              <div className="flex items-center justify-center gap-4">
                <span className="text-foreground font-medium">{copy.follow}</span>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.label === 'LinkedIn' ? contact.linkedinUrl || '#' : social.href}
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
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
