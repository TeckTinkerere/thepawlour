'use client'

import { useState } from 'react'
import { generateBookingMessage, openWhatsApp, PAWLOUR_WHATSAPP } from '@/lib/whatsapp'

export interface BookingFormData {
  name: string
  petBreed: string
  preferredDate: string
  service?: string
  additionalNotes?: string
}

interface BookingFormProps {
  onSubmit?: (data: BookingFormData) => void
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    petBreed: '',
    preferredDate: '',
    service: '',
    additionalNotes: ''
  })
  
  const [errors, setErrors] = useState<Partial<BookingFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof BookingFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.petBreed.trim()) {
      newErrors.petBreed = 'Pet breed is required'
    }
    
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required'
    } else {
      const selectedDate = new Date(formData.preferredDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.preferredDate = 'Please select a future date'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Call onSubmit if provided
      if (onSubmit) {
        onSubmit(formData)
      }
      
      // Generate WhatsApp message and open WhatsApp
      const message = generateBookingMessage(formData)
      openWhatsApp(PAWLOUR_WHATSAPP, message)
      
      // Reset form after successful submission
      setFormData({
        name: '',
        petBreed: '',
        preferredDate: '',
        service: '',
        additionalNotes: ''
      })
      
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair font-bold text-gray-800 mb-4">
          Book Your Appointment
        </h2>
        <p className="text-gray-600">
          Fill out the form below and we'll contact you via WhatsApp to confirm your booking.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Pet Breed Field */}
        <div>
          <label htmlFor="petBreed" className="block text-sm font-semibold text-gray-700 mb-2">
            Pet Breed *
          </label>
          <input
            type="text"
            id="petBreed"
            name="petBreed"
            value={formData.petBreed}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent transition-colors ${
              errors.petBreed ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Golden Retriever, Persian Cat"
          />
          {errors.petBreed && (
            <p className="mt-1 text-sm text-red-600">{errors.petBreed}</p>
          )}
        </div>

        {/* Preferred Date Field */}
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Date *
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleInputChange}
            min={today}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent transition-colors ${
              errors.preferredDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.preferredDate && (
            <p className="mt-1 text-sm text-red-600">{errors.preferredDate}</p>
          )}
        </div>

        {/* Service Selection */}
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Service (Optional)
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent transition-colors"
          >
            <option value="">Select a service</option>
            <option value="Basic Grooming">Basic Grooming</option>
            <option value="Full Grooming">Full Grooming</option>
            <option value="Spa Treatment">Spa Treatment</option>
            <option value="Not sure - need consultation">Not sure - need consultation</option>
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="additionalNotes" className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent transition-colors resize-none"
            placeholder="Any special requirements or questions?"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-soft-gold hover:bg-soft-gold/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-800 font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              Book via WhatsApp
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
              </svg>
            </>
          )}
        </button>

        <p className="text-sm text-gray-500 text-center">
          By submitting this form, you'll be redirected to WhatsApp to complete your booking.
        </p>
      </form>
    </div>
  )
}