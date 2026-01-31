'use client'

import TrustSignalCard, { TrustSignalIcons } from '@/components/ui/TrustSignalCard'

export default function TrustSignalsSection() {
  const trustSignals = [
    {
      icon: <TrustSignalIcons.CageFree />,
      title: 'Cage-Free & Stress-Free',
      description: 'Your pet roams freely in our open, calming environment. No cages, no stress - just comfort and care.',
      highlight: true
    },
    {
      icon: <TrustSignalIcons.Certification />,
      title: 'SKC Certified Groomers',
      description: 'Our professional team holds Singapore Kennel Club certification, ensuring expert care for your furry friend.',
      highlight: false
    },
    {
      icon: <TrustSignalIcons.Premium />,
      title: 'Premium Products',
      description: 'We use only the finest grooming products, from gentle shampoos to therapeutic spa treatments.',
      highlight: false
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-6">
            Why Choose The Pawlour?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We've built our reputation on three core principles that make us Singapore's 
            most trusted boutique pet grooming salon.
          </p>
        </div>

        {/* Trust Signals Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {trustSignals.map((signal, index) => (
            <div 
              key={signal.title} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <TrustSignalCard
                icon={signal.icon}
                title={signal.title}
                description={signal.description}
                highlight={signal.highlight}
              />
            </div>
          ))}
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '500+', label: 'Happy Pets' },
              { value: '100%', label: 'Cage-Free' },
              { value: 'SKC', label: 'Certified' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${0.45 + index * 0.1}s` }}
              >
                <div className="text-3xl font-bold text-terracotta mb-2 hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}