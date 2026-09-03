'use client'

import { useState } from 'react'
import Icon from '@/components/ui/Icon'
import { buttonClass } from '@/components/ui/Button'
import { generateBookingMessage, generateWhatsAppURL } from '@/lib/whatsapp'

export interface BookingFormData {
  name: string
  petBreed: string
  preferredDate: string
  service?: string
  additionalNotes?: string
}

interface BookingFormProps {
  phoneNumber: string
  /** Service names offered in the dropdown, from the content source. */
  services?: string[]
  onSubmit?: (data: BookingFormData) => void
}

const FIELD =
  'w-full border border-line bg-paper-card px-4 py-3 text-ink transition-colors placeholder:text-ink-muted focus:border-ink'

/**
 * Booking request that ends in a pre-filled WhatsApp message.
 *
 * This component already existed but was never rendered: the contact page
 * embedded a Google Form whose ID was still the placeholder
 * "1FAIpQLSfYourFormIDHere", so the form on the live site loaded nothing.
 * Routing to WhatsApp needs no backend, which suits a static deploy, and it
 * lands in the same inbox the salon already answers.
 */
export default function BookingForm({ phoneNumber, services = [], onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    petBreed: '',
    preferredDate: '',
    service: '',
    additionalNotes: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({})

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof BookingFormData, string>> = {}

    if (!formData.name.trim()) next.name = 'Please tell us your name.'
    if (!formData.petBreed.trim()) next.petBreed = "Please tell us your pet's breed."

    if (!formData.preferredDate) {
      next.preferredDate = 'Please pick a date.'
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (new Date(formData.preferredDate) < today) next.preferredDate = 'Please pick a date in the future.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) return

    onSubmit?.(formData)

    // Opened from inside the submit handler so the browser treats it as a
    // user gesture rather than a pop-up.
    const url = generateWhatsAppURL(phoneNumber, generateBookingMessage(formData))
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const today = new Date().toISOString().split('T')[0]

  const describedBy = (field: keyof BookingFormData) => (errors[field] ? `${field}-error` : undefined)

  const errorText = (field: keyof BookingFormData) =>
    errors[field] ? (
      <p id={`${field}-error`} role="alert" className="mt-2 text-sm text-clay">
        {errors[field]}
      </p>
    ) : null

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

      <div className="flex flex-wrap items-center gap-4 border-t border-line pt-6">
        <button type="submit" className={buttonClass('whatsapp', 'lg')}>
          <Icon name="whatsapp" className="h-5 w-5" />
          Send on WhatsApp
        </button>
        <p className="text-sm text-ink-muted">
          Opens WhatsApp with your details filled in. Nothing is sent until you press send there.
        </p>
      </div>
    </form>
  )
}
