'use client'

interface TrustSignalCardProps {
  icon: React.ReactNode
  title: string
  description: string
  highlight?: boolean
}

export default function TrustSignalCard({
  icon,
  title,
  description,
  highlight = false
}: TrustSignalCardProps) {
  return (
    <div className={`card text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${highlight ? 'ring-2 ring-terracotta' : ''}`}>
      <div className="flex justify-center mb-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
          highlight ? 'bg-terracotta text-white' : 'bg-forest-green text-white'
        }`}>
          {icon}
        </div>
      </div>
      
      <h3 className="text-lg font-playfair font-semibold text-gray-800 mb-2 group-hover:text-terracotta transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
        {description}
      </p>
    </div>
  )
}

// Pre-built trust signal icons
export const TrustSignalIcons = {
  CageFree: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  
  Certification: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  
  Premium: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 16L3 5l5.5 1L12 4l3.5 2L21 5l-2 11H5zm2.7-2h8.6l.9-5.4-2.1-.4L12 6l-3.1 2.2-2.1.4L7.7 14z"/>
    </svg>
  ),
  
  Heart: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  
  Shield: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
    </svg>
  )
}