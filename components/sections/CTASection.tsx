'use client'

import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { PAWLOUR_WHATSAPP, WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-forest-green to-forest-green/90 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Content */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6 animate-fade-in-down">
              Ready to Pamper Your Furkid?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Book your appointment today and give your pet the boutique grooming experience 
              they deserve. Our cage-free environment and certified professionals are waiting to welcome you.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <WhatsAppButton
              variant="primary"
              size="lg"
              phoneNumber={PAWLOUR_WHATSAPP}
              message={WHATSAPP_MESSAGES.general}
              className="bg-soft-gold hover:bg-soft-gold/90 text-gray-800 font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Book on WhatsApp
            </WhatsAppButton>
            
            <WhatsAppButton
              variant="secondary"
              size="lg"
              phoneNumber={PAWLOUR_WHATSAPP}
              message={WHATSAPP_MESSAGES.inquiry}
              className="border-2 border-white text-white hover:bg-white hover:text-forest-green font-semibold px-8 py-4 text-lg transition-all duration-300"
            >
              Ask Questions
            </WhatsAppButton>
          </div>

          {/* Trust Reinforcement */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80">
            {[
              { icon: 'check', label: 'Instant Response' },
              { icon: 'check', label: 'Easy Booking' },
              { icon: 'heart', label: 'Stress-Free Experience' }
            ].map((item, index) => (
              <div 
                key={item.label}
                className="flex items-center justify-center animate-fade-in-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <svg className="w-6 h-6 text-soft-gold mr-3" fill="currentColor" viewBox="0 0 20 20">
                  {item.icon === 'check' ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  )}
                </svg>
                <span className="font-medium hover:text-white transition-colors duration-300">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-white/20 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <p className="text-white/70 text-sm hover:text-white/90 transition-colors duration-300">
              Located in Hougang • Open 7 days a week • Call us at{' '}
              <a href="tel:+6586689078" className="text-soft-gold hover:underline transition-all duration-300">
                +65 1234 5678
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}