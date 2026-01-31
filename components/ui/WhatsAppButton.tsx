'use client'

import { useState } from 'react'
import { formatPhoneNumber, generateWhatsAppURL } from '@/lib/whatsapp'

interface WhatsAppButtonProps {
  message?: string
  phoneNumber: string
  variant: 'primary' | 'secondary' | 'mobile'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

export default function WhatsAppButton({ 
  message = "Hello! I'd like to book a grooming appointment for my pet.",
  phoneNumber,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled = false
}: WhatsAppButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (disabled || isLoading) return

    try {
      setIsLoading(true)
      const url = generateWhatsAppURL(phoneNumber, message)
      
      // Track analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'whatsapp_click', {
          event_category: 'engagement',
          event_label: variant,
          value: 1
        })
      }

      // Open WhatsApp
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Error opening WhatsApp:', error)
    } finally {
      setTimeout(() => setIsLoading(false), 1000) // Prevent rapid clicking
    }
  }

  const getButtonClasses = (): string => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 hover:transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
    
    const variantClasses = {
      primary: 'bg-soft-gold text-gray-800 hover:bg-yellow-400 focus:ring-yellow-500 shadow-md hover:shadow-lg',
      secondary: 'bg-terracotta text-white hover:bg-orange-600 focus:ring-orange-500 shadow-md hover:shadow-lg',
      mobile: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 shadow-lg hover:shadow-xl'
    }
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg'
    }
    
    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  }

  const getIconSize = (): string => {
    switch (size) {
      case 'sm': return 'w-4 h-4'
      case 'lg': return 'w-6 h-6'
      default: return 'w-5 h-5'
    }
  }

  return (
    <button
      onClick={handleClick}
      className={getButtonClasses()}
      aria-label={`Contact us on WhatsApp: ${message}`}
      type="button"
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <svg 
          className={`${getIconSize()} mr-2 animate-spin`}
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <svg 
          className={`${getIconSize()} mr-2`}
          fill="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
        </svg>
      )}
      {children || (
        <>
          {isLoading ? 'Opening...' : (variant === 'mobile' ? 'Book on WhatsApp' : 'WhatsApp')}
        </>
      )}
    </button>
  )
}