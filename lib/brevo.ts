/**
 * Brevo (formerly Sendinblue) integration.
 *
 * Server-only: it reads BREVO_API_KEY and must never be imported into a client
 * component. The booking form posts to /api/booking, which calls in here.
 *
 * Everything is optional. With no API key configured the site behaves exactly
 * as it did before — the form hands off to WhatsApp — so a deploy is never
 * blocked on the salon having a Brevo account.
 */

const API = 'https://api.brevo.com/v3'
const TIMEOUT_MS = 10_000

export interface BrevoConfig {
  apiKey: string
  senderEmail: string
  senderName: string
  /** Where booking requests are delivered. */
  toEmail: string
  toName: string
  /** Optional marketing list, only used with explicit consent. */
  listId?: number
}

export interface BookingSubmission {
  name: string
  phone: string
  petBreed: string
  preferredDate: string
  email?: string
  service?: string
  notes?: string
  /** Explicit opt-in. Without it we never touch the marketing list. */
  marketingConsent?: boolean
}

export type BrevoResult =
  | { ok: true; contactStored: boolean }
  | { ok: false; reason: 'not-configured' | 'rejected' | 'unreachable'; detail?: string }

/**
 * Reads configuration from the environment.
 *
 * `toEmail` falls back to the sender so a half-finished setup still delivers
 * somewhere rather than silently dropping a booking.
 */
export function getBrevoConfig(): BrevoConfig | null {
  const apiKey = process.env.BREVO_API_KEY?.trim()
  const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim()

  if (!apiKey || !senderEmail) return null

  const listId = Number(process.env.BREVO_LIST_ID)

  return {
    apiKey,
    senderEmail,
    senderName: process.env.BREVO_SENDER_NAME?.trim() || 'The Pawlour website',
    toEmail: process.env.BREVO_TO_EMAIL?.trim() || senderEmail,
    toName: process.env.BREVO_TO_NAME?.trim() || 'The Pawlour',
    listId: Number.isInteger(listId) && listId > 0 ? listId : undefined,
  }
}

export function isBrevoConfigured(): boolean {
  return getBrevoConfig() !== null
}

/** Escapes user input before it goes anywhere near the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function brevoFetch(config: BrevoConfig, path: string, body: unknown) {
  return fetch(`${API}${path}`, {
    method: 'POST',
    headers: {
      'api-key': config.apiKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: 'no-store',
  })
}

/** The rows shown in the notification email, in the order the salon reads them. */
function summaryRows(submission: BookingSubmission): [string, string][] {
  return [
    ['Name', submission.name],
    ['Phone', submission.phone],
    ['Email', submission.email || '—'],
    ['Pet breed', submission.petBreed],
    ['Preferred date', submission.preferredDate],
    ['Service', submission.service || 'Not sure yet'],
    ['Notes', submission.notes || '—'],
  ]
}

export function buildEmailContent(submission: BookingSubmission) {
  const rows = summaryRows(submission)

  const textContent = [
    'New booking request from thepawlour.com',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    submission.marketingConsent
      ? 'This customer opted in to hear about offers.'
      : 'This customer did not opt in to marketing.',
  ].join('\n')

  const htmlContent = `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#1A1917;line-height:1.6">
<h2 style="font-weight:500">New booking request</h2>
<table cellpadding="6" style="border-collapse:collapse">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="color:#7B776E;vertical-align:top">${escapeHtml(label)}</td><td>${escapeHtml(
        value
      ).replace(/\n/g, '<br>')}</td></tr>`
  )
  .join('\n')}
</table>
<p style="color:#7B776E;font-size:13px">Sent from the booking form on thepawlour.com.</p>
</body></html>`

  // A subject the salon can scan in a full inbox.
  const subject = `Booking request — ${submission.name} (${submission.petBreed}) for ${submission.preferredDate}`

  return { subject, textContent, htmlContent }
}

/**
 * Sends the booking request to the salon, and stores the customer as a Brevo
 * contact only when they explicitly opted in.
 */
export async function sendBookingRequest(submission: BookingSubmission): Promise<BrevoResult> {
  const config = getBrevoConfig()
  if (!config) return { ok: false, reason: 'not-configured' }

  const { subject, textContent, htmlContent } = buildEmailContent(submission)

  try {
    const response = await brevoFetch(config, '/smtp/email', {
      sender: { name: config.senderName, email: config.senderEmail },
      to: [{ email: config.toEmail, name: config.toName }],
      // Replying in the inbox reaches the customer directly when they gave an
      // address; otherwise replies go back to the salon's own sender.
      ...(submission.email ? { replyTo: { email: submission.email, name: submission.name } } : {}),
      subject,
      htmlContent,
      textContent,
      tags: ['booking-request'],
    })

    if (!response.ok) {
      // Brevo returns a JSON body with a code and message; keep the code only,
      // never the submission itself.
      const detail = await response
        .json()
        .then((body: { code?: string }) => body?.code)
        .catch(() => undefined)
      console.error(`[brevo] email rejected (${response.status})`, detail ?? '')
      return { ok: false, reason: 'rejected', detail }
    }
  } catch (error) {
    console.error('[brevo] could not reach the API:', error instanceof Error ? error.message : error)
    return { ok: false, reason: 'unreachable' }
  }

  const contactStored = await storeContact(config, submission)
  return { ok: true, contactStored }
}

/**
 * Adds the customer to the marketing list.
 *
 * Only ever called with explicit consent: under Singapore's PDPA, a booking
 * form is not permission to market to someone. A failure here is logged and
 * swallowed — the booking itself has already been delivered, and the customer
 * should not see an error for it.
 */
async function storeContact(config: BrevoConfig, submission: BookingSubmission): Promise<boolean> {
  if (!submission.marketingConsent || !submission.email || !config.listId) return false

  try {
    const response = await brevoFetch(config, '/contacts', {
      email: submission.email,
      updateEnabled: true,
      listIds: [config.listId],
      attributes: {
        FIRSTNAME: submission.name,
        SMS: submission.phone,
        PET_BREED: submission.petBreed,
      },
    })

    if (!response.ok) {
      console.error(`[brevo] contact not stored (${response.status})`)
      return false
    }
    return true
  } catch (error) {
    console.error('[brevo] contact not stored:', error instanceof Error ? error.message : error)
    return false
  }
}
