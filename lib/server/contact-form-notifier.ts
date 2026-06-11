import nodemailer from 'nodemailer'

import type {
  ContactFormPayload,
  ContactNotificationSettings,
} from '@/lib/contact-notifications'

type ChannelResult = {
  channel: 'gmail' | 'whatsapp'
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

function formatContactLines(payload: ContactFormPayload) {
  return [
    'Yeni əlaqə müraciəti',
    '',
    `Ad və soyad: ${normalizeText(payload.fullName)}`,
    `Email: ${normalizeText(payload.email)}`,
    `Telefon: ${normalizeText(payload.phone)}`,
    `Mövzu: ${normalizeText(payload.subject)}`,
    '',
    `Mesaj: ${normalizeText(payload.message)}`,
  ]
}

function formatContactText(payload: ContactFormPayload) {
  return formatContactLines(payload).join('\n')
}

function formatContactHtml(payload: ContactFormPayload) {
  const lines = formatContactLines(payload)
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
  settings: ContactNotificationSettings,
  payload: ContactFormPayload
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
    from: `"Akin Contact" <${senderEmail}>`,
    to: recipientEmail,
    replyTo: payload.email,
    subject: `${subjectPrefix || 'Akin Contact'}: ${payload.subject || payload.fullName}`,
    text: formatContactText(payload),
    html: formatContactHtml(payload),
  })

  return { channel: 'gmail', success: true, message: 'Gmail göndərişi tamamlandı.' }
}

async function sendViaWhatsApp(
  settings: ContactNotificationSettings,
  payload: ContactFormPayload
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
          body: truncate(formatContactText(payload), 3500),
        },
      }),
    }
  )

  if (!textResponse.ok) {
    const errorText = await textResponse.text()
    throw new Error(`WhatsApp text error: ${errorText}`)
  }

  return { channel: 'whatsapp', success: true, message: 'WhatsApp göndərişi tamamlandı.' }
}

export async function dispatchContactForm(
  settings: ContactNotificationSettings,
  payload: ContactFormPayload
) {
  const channelAttempts = await Promise.allSettled([
    sendViaGmail(settings, payload),
    sendViaWhatsApp(settings, payload),
  ])

  const results: ChannelResult[] = channelAttempts.map((attempt, index) => {
    const channels: ChannelResult['channel'][] = ['gmail', 'whatsapp']

    if (attempt.status === 'fulfilled') {
      return attempt.value
    }

    return {
      channel: channels[index],
      success: false,
      message: attempt.reason instanceof Error ? attempt.reason.message : 'Naməlum xəta',
    }
  })

  const enabledCount = [settings.gmail.enabled, settings.whatsapp.enabled].filter(Boolean).length
  const successCount = results.filter((result) => result.success).length

  return {
    results,
    enabledCount,
    successCount,
  }
}
