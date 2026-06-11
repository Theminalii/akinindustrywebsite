export interface GmailChannelConfig {
  enabled: boolean
  recipientEmail: string
  senderEmail: string
  appPassword: string
  subjectPrefix: string
}

export interface TelegramChannelConfig {
  enabled: boolean
  botToken: string
  chatId: string
}

export interface WhatsAppChannelConfig {
  enabled: boolean
  accessToken: string
  phoneNumberId: string
  recipientPhone: string
  apiVersion: string
}

export interface CareerNotificationSettings {
  gmail: GmailChannelConfig
  telegram: TelegramChannelConfig
  whatsapp: WhatsAppChannelConfig
}

export interface CareerApplicationPayload {
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

export const defaultCareerNotificationSettings: CareerNotificationSettings = {
  gmail: {
    enabled: true,
    recipientEmail: '',
    senderEmail: '',
    appPassword: '',
    subjectPrefix: 'Akin Career',
  },
  telegram: {
    enabled: false,
    botToken: '',
    chatId: '',
  },
  whatsapp: {
    enabled: false,
    accessToken: '',
    phoneNumberId: '',
    recipientPhone: '',
    apiVersion: 'v23.0',
  },
}
