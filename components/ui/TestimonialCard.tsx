'use client'

import Image from 'next/image'

interface TestimonialCardProps {
  name: string
  petName?: string
  petBreed?: string
  testimonial: string
  rating?: number
  avatarUrl?: string
  isPlaceholder?: boolean
}

export default function TestimonialCard({
  name,
  petName,
  petBreed,
  testimonial,
  rating = 5,
  avatarUrl,
  isPlaceholder = false
}: TestimonialCardProps) {
  return (
    <div className={`card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${isPlaceholder ? 'border-2 border-dashed border-gray-300 bg-gray-50' : ''}`}>
      {/* Rating Stars */}
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
              i < rating ? 'text-soft-gold' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Text */}
      <blockquote className={`text-gray-700 leading-relaxed mb-4 group-hover:text-gray-900 transition-colors duration-300 ${
        isPlaceholder ? 'italic text-gray-500' : ''
      }`}>
        "{testimonial}"
      </blockquote>

      {/* Customer Info */}
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 group-hover:ring-2 ring-terracotta transition-all duration-300">
          {avatarUrl && !isPlaceholder ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={48}
              height={48}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-terracotta text-white font-semibold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="ml-3">
          <p className={`font-semibold transition-colors duration-300 ${isPlaceholder ? 'text-gray-500' : 'text-gray-800 group-hover:text-terracotta'}`}>
            {name}
          </p>
          {(petName || petBreed) && (
            <p className={`text-sm transition-colors duration-300 ${isPlaceholder ? 'text-gray-400' : 'text-gray-600 group-hover:text-gray-800'}`}>
              {petName && petBreed ? `${petName} (${petBreed})` : petName || petBreed}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Placeholder testimonials for development
export const placeholderTestimonials = [
  {
    name: "Sarah Chen",
    petName: "Buddy",
    petBreed: "Golden Retriever",
    testimonial: "The Pawlour transformed my anxious dog into a happy, clean pup! The cage-free environment made all the difference.",
    rating: 5,
    isPlaceholder: true
  },
  {
    name: "Michael Tan",
    petName: "Luna",
    petBreed: "Poodle Mix",
    testimonial: "Professional service with genuine care. Luna always comes home looking and smelling amazing!",
    rating: 5,
    isPlaceholder: true
  },
  {
    name: "Jennifer Wong",
    petName: "Max",
    petBreed: "Shih Tzu",
    testimonial: "SKC certified groomers who really understand different breeds. Highly recommend for premium grooming.",
    rating: 5,
    isPlaceholder: true
  }
]