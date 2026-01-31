'use client'

import Image from 'next/image'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { PAWLOUR_WHATSAPP, WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg"
          alt="Professional pet grooming at The Pawlour"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight animate-fade-in-down">
            Premium Pet Grooming in{' '}
            <span className="text-soft-gold">Hougang</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-100 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Cage-free, stress-free grooming with SKC certified professionals. 
            Your furry friend deserves the boutique experience.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <svg className="w-5 h-5 text-soft-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Cage-Free Environment
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <svg className="w-5 h-5 text-soft-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              SKC Certified
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <svg className="w-5 h-5 text-soft-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              Premium Products
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <WhatsAppButton
              variant="primary"
              size="lg"
              phoneNumber={PAWLOUR_WHATSAPP}
              message={WHATSAPP_MESSAGES.general}
              className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl"
            >
              Book Your Appointment
            </WhatsAppButton>
            
            <button 
              onClick={() => {
                document.getElementById('services-preview')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
              className="text-white hover:text-soft-gold transition-colors duration-300 font-medium flex items-center group"
            >
              View Our Services
              <svg className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}