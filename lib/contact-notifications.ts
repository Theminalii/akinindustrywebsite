export interface ContactGmailChannelConfig {
  enabled: boolean
  recipientEmail: string
  senderEmail: string
  appPassword: string
  subjectPrefix: string
}

export interface ContactWhatsAppChannelConfig {
  enabled: boolean
  accessToken: string
  phoneNumberId: string
  recipientPhone: string
  apiVersion: string
}

export interface ContactNotificationSettings {
  gmail: ContactGmailChannelConfig
  whatsapp: ContactWhatsAppChannelConfig
}

export interface ContactFormPayload {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

export const defaultContactNotificationSettings: ContactNotificationSettings = {
  gmail: {
    enabled: true,
    recipientEmail: '',
    senderEmail: '',
    appPassword: '',
    subjectPrefix: 'Akin Contact',
  },
  whatsapp: {
    enabled: false,
    accessToken: '',
    phoneNumberId: '',
    recipientPhone: '',
    apiVersion: 'v23.0',
  },
}
