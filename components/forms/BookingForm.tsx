'use client'

import { useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { buttonClass } from '@/components/ui/Button'
import { generateBookingMessage, generateWhatsAppURL } from '@/lib/whatsapp'

export interface BookingFormData {
  name: string
  phone: string
  petBreed: string
  preferredDate: string
  email?: string
  service?: string
  additionalNotes?: string
}

interface BookingFormProps {
  phoneNumber: string
  /** Service names offered in the dropdown, from the content source. */
  services?: string[]
  onSubmit?: (data: BookingFormData) => void
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FIELD =
  'w-full border border-line bg-paper-card px-4 py-3 text-ink transition-colors placeholder:text-ink-muted focus:border-ink'

const EMPTY: BookingFormData = {
  name: '',
  phone: '',
  petBreed: '',
  preferredDate: '',
  email: '',
  service: '',
  additionalNotes: '',
}

/**
 * Booking request, delivered to the salon's inbox through Brevo.
 *
 * The form used only to open WhatsApp with a prefilled message, so anyone who
 * did not then press send in WhatsApp was a lead the salon never saw. It now
 * posts to /api/booking first and confirms in place.
 *
 * WhatsApp is still offered, both as a faster alternative and as the fallback
 * when Brevo is not configured or is unreachable — a booking should never be
 * lost to a misconfigured API key.
 */
export default function BookingForm({ phoneNumber, services = [], onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>(EMPTY)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const statusRef = useRef<HTMLDivElement>(null)

  // Carry whatever has been typed into WhatsApp; fall back to a plain opener
  // while the form is still empty, rather than "My name is there."
  const hasDetails = Boolean(formData.name && formData.petBreed && formData.preferredDate)
  const whatsAppHref = generateWhatsAppURL(
    phoneNumber,
    hasDetails
      ? generateBookingMessage({
          name: formData.name,
          petBreed: formData.petBreed,
          preferredDate: formData.preferredDate,
          service: formData.service,
          additionalNotes: formData.additionalNotes,
        })
      : "Hello The Pawlour! I'd like to book a grooming appointment for my pet."
  )

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof BookingFormData, string>> = {}

    if (!formData.name.trim()) next.name = 'Please tell us your name.'
    if (!formData.phone.trim()) next.phone = 'Please give us a number we can reach you on.'
    if (!formData.petBreed.trim()) next.petBreed = "Please tell us your pet's breed."

    if (!formData.preferredDate) {
      next.preferredDate = 'Please pick a date.'
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (new Date(formData.preferredDate) < today) next.preferredDate = 'Please pick a date in the future.'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email))
      next.email = 'Please check that email address.'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  /** Last resort: hand the details to WhatsApp so the enquiry still lands. */
  const handOffToWhatsApp = () => {
    window.open(whatsAppHref, '_blank', 'noopener,noreferrer')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    if (!validate()) return

    setStatus('sending')

    const honeypot = new FormData(event.currentTarget).get('website')

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          petBreed: formData.petBreed,
          preferredDate: formData.preferredDate,
          email: formData.email,
          service: formData.service,
          notes: formData.additionalNotes,
          marketingConsent,
          website: honeypot,
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (response.ok && result.ok) {
        onSubmit?.(formData)
        setFormData(EMPTY)
        setMarketingConsent(false)
        setStatus('sent')
        statusRef.current?.focus()
        return
      }

      if (result.reason === 'invalid' && result.errors) {
        // The API calls the notes field `notes`; the form calls it
        // `additionalNotes`.
        const { notes, ...rest } = result.errors as Record<string, string>
        setErrors({ ...rest, ...(notes ? { additionalNotes: notes } : {}) })
        setStatus('idle')
        return
      }

      // Email is not set up, or Brevo is down: send them the way that works.
      if (result.reason === 'not-configured') {
        handOffToWhatsApp()
        setStatus('idle')
        return
      }

      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const describedBy = (field: keyof BookingFormData) => (errors[field] ? `${field}-error` : undefined)

  const errorText = (field: keyof BookingFormData) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-2 text-sm text-clay">
        {errors[field]}
      </p>
    ) : null

  if (status === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="py-4">
        <Icon name="check" className="h-7 w-7 text-clay" />
        <h3 className="mt-4 text-2xl">Request sent</h3>
        <p className="mt-3 max-w-prose leading-relaxed text-ink-soft">
          We have it. Expect a reply within a couple of hours during opening hours, with a time and a price
          for your pet&apos;s coat. Nothing is confirmed until you hear back from us.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass('whatsapp', 'md')}
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Message us as well
          </a>
          <button type="button" onClick={() => setStatus('idle')} className={buttonClass('secondary', 'md')}>
            Send another request
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-2 block">
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            className={`${FIELD} ${errors.name ? 'border-clay' : ''}`}
            placeholder="Jane Tan"
          />
          {errorText('name')}
        </div>

        <div>
          <label htmlFor="phone" className="eyebrow mb-2 block">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone')}
            className={`${FIELD} ${errors.phone ? 'border-clay' : ''}`}
            placeholder="8123 4567"
          />
          {errorText('phone')}
        </div>

        <div>
          <label htmlFor="petBreed" className="eyebrow mb-2 block">
            Pet breed
          </label>
          <input
            type="text"
            id="petBreed"
            name="petBreed"
            value={formData.petBreed}
            onChange={handleChange}
            aria-invalid={Boolean(errors.petBreed)}
            aria-describedby={describedBy('petBreed')}
            className={`${FIELD} ${errors.petBreed ? 'border-clay' : ''}`}
            placeholder="Shih Tzu, Persian cat…"
          />
          {errorText('petBreed')}
        </div>

        <div>
          <label htmlFor="preferredDate" className="eyebrow mb-2 block">
            Preferred date
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            min={today}
            aria-invalid={Boolean(errors.preferredDate)}
            aria-describedby={describedBy('preferredDate')}
            className={`${FIELD} ${errors.preferredDate ? 'border-clay' : ''}`}
          />
          {errorText('preferredDate')}
        </div>

        <div>
          <label htmlFor="email" className="eyebrow mb-2 block">
            Email <span className="normal-case tracking-normal text-ink-muted">(optional)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={`${FIELD} ${errors.email ? 'border-clay' : ''}`}
            placeholder="jane@example.com"
          />
          {errorText('email')}
        </div>

        <div>
          <label htmlFor="service" className="eyebrow mb-2 block">
            Service <span className="normal-case tracking-normal text-ink-muted">(optional)</span>
          </label>
          <select id="service" name="service" value={formData.service} onChange={handleChange} className={FIELD}>
            <option value="">Not sure yet</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="additionalNotes" className="eyebrow mb-2 block">
          Anything we should know{' '}
          <span className="normal-case tracking-normal text-ink-muted">(optional)</span>
        </label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          rows={3}
          className={`${FIELD} resize-none`}
          placeholder="Skin conditions, past grooming trouble, matted coat…"
        />
      </div>

      {/* Marketing is opt-in, and only possible with an email address: under the
          PDPA, sending a booking request is not consent to be marketed to. */}
      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          name="marketingConsent"
          checked={marketingConsent}
          onChange={(event) => setMarketingConsent(event.target.checked)}
          disabled={!formData.email}
          className="mt-1 h-4 w-4 flex-none accent-ink disabled:opacity-40"
        />
        <span className={formData.email ? '' : 'text-ink-muted'}>
          Email me occasional offers and grooming reminders. {!formData.email && '(Add an email above first.)'}
        </span>
      </label>

      {/*
        Honeypot: off-screen, skipped by the keyboard and by screen readers, and
        readOnly so no browser autofills it. A bot that sets the value anyway
        gets its submission dropped; a real customer can never trip it, which
        matters more here than catching every bot.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" readOnly />
      </div>

      <div className="border-t border-line pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={status === 'sending'} className={buttonClass('primary', 'lg')}>
            {status === 'sending' ? 'Sending…' : 'Send booking request'}
          </button>
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass('secondary', 'lg')}
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Send on WhatsApp instead
          </a>
        </div>

        <div role="status" aria-live="polite" className="mt-4 text-sm">
          {status === 'error' && (
            <p className="text-clay">
              We could not send that just now.{' '}
              <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className="link-underline">
                Message us on WhatsApp instead
              </a>{' '}
              and nothing is lost.
            </p>
          )}
          {status !== 'error' && (
            <p className="text-ink-muted">
              We reply within a couple of hours during opening hours. We never share your details.
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
