'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  imageUrl: string
  href?: string
  isPreview?: boolean
  features?: string[]
  price?: string
}

export default function ServiceCard({
  title,
  description,
  imageUrl,
  href,
  isPreview = false,
  features = [],
  price
}: ServiceCardProps) {
  const CardContent = () => (
    <div className="card group cursor-pointer hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {price && (
          <div className="absolute top-3 right-3 bg-soft-gold text-gray-800 px-3 py-1 rounded-full text-sm font-semibold animate-pulse-soft">
            {price}
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-playfair font-semibold text-gray-800 group-hover:text-terracotta transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
          {description}
        </p>
        
        {features.length > 0 && (
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                <svg 
                  className="w-4 h-4 text-forest-green mr-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        )}
        
        {href && (
          <div className="pt-2">
            <span className="inline-flex items-center text-terracotta font-medium group-hover:text-forest-green transition-colors duration-300">
              {isPreview ? 'View Services' : 'Learn More'}
              <svg 
                className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </span>
          </div>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}