'use client'

import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { PAWLOUR_WHATSAPP, WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export default function LoyaltyProgram() {
  const benefits = [
    {
      icon: '🎁',
      title: 'Earn Points',
      description: 'Earn 1 point for every dollar spent on grooming services'
    },
    {
      icon: '⭐',
      title: 'Exclusive Rewards',
      description: 'Redeem points for discounts, free services, and special treats'
    },
    {
      icon: '🎉',
      title: 'Birthday Surprises',
      description: 'Special birthday month offers and complimentary treats for your pet'
    },
    {
      icon: '🏆',
      title: 'VIP Status',
      description: 'Priority booking and exclusive access to new services'
    },
    {
      icon: '💝',
      title: 'Referral Bonuses',
      description: 'Get rewards when you refer friends and family'
    },
    {
      icon: '📱',
      title: 'Easy Tracking',
      description: 'Track your points and rewards through our mobile-friendly app'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-soft-gold/20 to-terracotta/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-left">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-6">
                The Pawlour Club
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Join our exclusive loyalty program and unlock amazing rewards for your furry friend. 
                Every visit brings you closer to exclusive perks and special privileges.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-3xl font-bold text-forest-green mb-1">1:1</div>
                <p className="text-sm text-gray-600">Points per Dollar</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold text-terracotta mb-1">50+</div>
                <p className="text-sm text-gray-600">Reward Options</p>
              </div>
            </div>

            {/* CTA */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <WhatsAppButton
                variant="primary"
                size="lg"
                phoneNumber={PAWLOUR_WHATSAPP}
                message="Hello! I'd like to join The Pawlour Club loyalty program."
                className="bg-forest-green hover:bg-forest-green/90 text-white font-semibold px-8 py-4 text-lg"
              >
                Join The Pawlour Club
              </WhatsAppButton>
            </div>
          </div>

          {/* Right Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="font-playfair font-semibold text-gray-800 mb-2 group-hover:text-forest-green transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 pt-20 border-t border-gray-200">
          <h3 className="text-3xl font-playfair font-bold text-gray-800 text-center mb-12 animate-fade-in-down">
            How It Works
          </h3>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Sign Up', description: 'Join The Pawlour Club for free' },
              { step: '2', title: 'Groom', description: 'Bring your pet for grooming' },
              { step: '3', title: 'Earn', description: 'Earn points with every visit' },
              { step: '4', title: 'Redeem', description: 'Enjoy exclusive rewards' }
            ].map((item, index) => (
              <div
                key={item.step}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-green text-white font-bold text-xl mb-4 group hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h4 className="font-playfair font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
