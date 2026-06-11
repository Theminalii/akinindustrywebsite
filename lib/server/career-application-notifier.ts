import nodemailer from 'nodemailer'

import type {
  CareerApplicationPayload,
  CareerNotificationSettings,
} from '@/lib/career-notifications'

type Attachment = {
  buffer: Buffer
  filename: string
  mimeType: string
}

type ChannelResult = {
  channel: 'gmail' | 'telegram' | 'whatsapp'
  success: boolean
  message: string
}

function normalizeText(value: string) {
  return value?.trim() || 'Qeyd edilməyib'
}

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 3)}...`
}

function formatApplicationLines(application: CareerApplicationPayload, attachment?: Attachment) {
  return [
    'Yeni vakansiya müraciəti',
    '',
    `Ad və soyad: ${normalizeText(application.fullName)}`,
    `Email: ${normalizeText(application.email)}`,
    `Telefon: ${normalizeText(application.phone)}`,
    `Şəhər / Region: ${normalizeText(application.city)}`,
    `Vakansiya: ${normalizeText(application.position)}`,
    `Şöbə: ${normalizeText(application.department)}`,
    `Təcrübə (il): ${normalizeText(application.experienceYears)}`,
    `Təhsil: ${normalizeText(application.education)}`,
    `İxtisaslaşma: ${normalizeText(application.specialization)}`,
    `Hazırkı şirkət: ${normalizeText(application.currentCompany)}`,
    `Hazırkı vəzifə: ${normalizeText(application.currentRole)}`,
    `Gözlənilən əməkhaqqı: ${normalizeText(application.expectedSalary)}`,
    `Başlama tarixi: ${normalizeText(application.availability)}`,
    `İş rejimi: ${normalizeText(application.employmentType)}`,
    `Sürücülük vəsiqəsi: ${normalizeText(application.drivingLicense)}`,
    `HSE təlimi: ${normalizeText(application.hseTraining)}`,
    `Ezamiyyətə hazırlıq: ${normalizeText(application.travelReady)}`,
    `Növbəli işə hazırlıq: ${normalizeText(application.shiftReady)}`,
    `İngilis dili: ${normalizeText(application.englishLevel)}`,
    '',
    `Proqram bilikləri: ${normalizeText(application.softwareSkills)}`,
    '',
    `Sertifikatlar: ${normalizeText(application.certifications)}`,
    '',
    `Dil bilikləri: ${normalizeText(application.languages)}`,
    '',
    `Referanslar: ${normalizeText(application.references)}`,
    '',
    `Layihə təcrübəsi: ${normalizeText(application.projectExperience)}`,
    '',
    `Cover letter: ${normalizeText(application.coverLetter)}`,
    '',
    `CV: ${attachment?.filename || normalizeText(application.cvFileName)}`,
  ]
}

function formatApplicationText(application: CareerApplicationPayload, attachment?: Attachment) {
  return formatApplicationLines(application, attachment).join('\n')
}

function formatApplicationHtml(application: CareerApplicationPayload, attachment?: Attachment) {
  const lines = formatApplicationLines(application, attachment)
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      ${lines
        .map((line) =>
          line
            ? `<p style="margin: 0 0 10px;">${line.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</p>`
            : '<div style="height: 8px;"></div>'
        )
        .join('')}
    </div>
  `
}

async function sendViaGmail(
  settings: CareerNotificationSettings,
  application: CareerApplicationPayload,
  attachment?: Attachment
): Promise<ChannelResult> {
  const { senderEmail, appPassword, recipientEmail, subjectPrefix } = settings.gmail

  if (!settings.gmail.enabled) {
    return { channel: 'gmail', success: false, message: 'Gmail deaktivdir.' }
  }

  if (!senderEmail || !appPassword || !recipientEmail) {
    return { channel: 'gmail', success: false, message: 'Gmail ayarları natamamdır.' }
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: senderEmail,
      pass: appPassword,
    },
  })

  await transporter.sendMail({
    from: `"Akin Career" <${senderEmail}>`,
    to: recipientEmail,
    replyTo: application.email,
    subject: `${subjectPrefix || 'Akin Career'}: ${application.position} - ${application.fullName}`,
    text: formatApplicationText(application, attachment),
    html: formatApplicationHtml(application, attachment),
    attachments: attachment
      ? [
          {
            filename: attachment.filename,
            content: attachment.buffer,
            contentType: attachment.mimeType,
          },
        ]
      : [],
  })

  return { channel: 'gmail', success: true, message: 'Gmail göndərişi tamamlandı.' }
}

async function sendViaTelegram(
  settings: CareerNotificationSettings,
  application: CareerApplicationPayload,
  attachment?: Attachment
): Promise<ChannelResult> {
  const { botToken, chatId } = settings.telegram

  if (!settings.telegram.enabled) {
    return { channel: 'telegram', success: false, message: 'Telegram deaktivdir.' }
  }

  if (!botToken || !chatId) {
    return { channel: 'telegram', success: false, message: 'Telegram ayarları natamamdır.' }
  }

  const text = formatApplicationText(application, attachment)

  const sendMessageResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: truncate(text, 4000),
    }),
  })

  if (!sendMessageResponse.ok) {
    const errorText = await sendMessageResponse.text()
    throw new Error(`Telegram message error: ${errorText}`)
  }

  if (attachment) {
    const telegramForm = new FormData()
    telegramForm.append('chat_id', chatId)
    telegramForm.append('caption', truncate(`CV - ${attachment.filename}`, 1000))
    telegramForm.append(
      'document',
      new Blob([attachment.buffer], { type: attachment.mimeType }),
      attachment.filename
    )

    const sendDocumentResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
      method: 'POST',
      body: telegramForm,
    })

    if (!sendDocumentResponse.ok) {
      const errorText = await sendDocumentResponse.text()
      throw new Error(`Telegram document error: ${errorText}`)
    }
  }

  return { channel: 'telegram', success: true, message: 'Telegram göndərişi tamamlandı.' }
}

async function uploadWhatsAppMedia(
  settings: CareerNotificationSettings,
  attachment: Attachment
) {
  const mediaForm = new FormData()
  mediaForm.append('messaging_product', 'whatsapp')
  mediaForm.append('type', attachment.mimeType || 'application/octet-stream')
  mediaForm.append(
    'file',
    new Blob([attachment.buffer], { type: attachment.mimeType }),
    attachment.filename
  )

  const uploadResponse = await fetch(
    `https://graph.facebook.com/${settings.whatsapp.apiVersion}/${settings.whatsapp.phoneNumberId}/media`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${settings.whatsapp.accessToken}`,
      },
      body: mediaForm,
    }
  )

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text()
    throw new Error(`WhatsApp media upload error: ${errorText}`)
  }

  const uploadJson = (await uploadResponse.json()) as { id?: string }
  if (!uploadJson.id) {
    throw new Error('WhatsApp media upload id qaytarmadı.')
  }

  return uploadJson.id
}

async function sendViaWhatsApp(
  settings: CareerNotificationSettings,
  application: CareerApplicationPayload,
  attachment?: Attachment
): Promise<ChannelResult> {
  const { accessToken, phoneNumberId, recipientPhone, apiVersion } = settings.whatsapp

  if (!settings.whatsapp.enabled) {
    return { channel: 'whatsapp', success: false, message: 'WhatsApp deaktivdir.' }
  }

  if (!accessToken || !phoneNumberId || !recipientPhone || !apiVersion) {
    return { channel: 'whatsapp', success: false, message: 'WhatsApp ayarları natamamdır.' }
  }

  const textResponse = await fetch(
    `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: recipientPhone,
        type: 'text',
        text: {
          body: truncate(formatApplicationText(application, attachment), 3500),
        },
      }),
    }
  )

  if (!textResponse.ok) {
    const errorText = await textResponse.text()
    throw new Error(`WhatsApp text error: ${errorText}`)
  }

  if (attachment) {
    const mediaId = await uploadWhatsAppMedia(settings, attachment)

    const documentResponse = await fetch(
      `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: recipientPhone,
          type: 'document',
          document: {
            id: mediaId,
            caption: truncate(`CV - ${attachment.filename}`, 900),
            filename: attachment.filename,
          },
        }),
      }
    )

    if (!documentResponse.ok) {
      const errorText = await documentResponse.text()
      throw new Error(`WhatsApp document error: ${errorText}`)
    }
  }

  return { channel: 'whatsapp', success: true, message: 'WhatsApp göndərişi tamamlandı.' }
}

export async function dispatchCareerApplication(
  settings: CareerNotificationSettings,
  application: CareerApplicationPayload,
  attachment?: Attachment
) {
  const channelAttempts = await Promise.allSettled([
    sendViaGmail(settings, application, attachment),
    sendViaTelegram(settings, application, attachment),
    sendViaWhatsApp(settings, application, attachment),
  ])

  const results: ChannelResult[] = channelAttempts.map((attempt, index) => {
    const channel: ChannelResult['channel'][] = ['gmail', 'telegram', 'whatsapp']

    if (attempt.status === 'fulfilled') {
      return attempt.value
    }

    return {
      channel: channel[index],
      success: false,
      message: attempt.reason instanceof Error ? attempt.reason.message : 'Naməlum xəta',
    }
  })

  const enabledCount = [
    settings.gmail.enabled,
    settings.telegram.enabled,
    settings.whatsapp.enabled,
  ].filter(Boolean).length

  const successCount = results.filter((result) => result.success).length

  return {
    results,
    enabledCount,
    successCount,
  }
}
