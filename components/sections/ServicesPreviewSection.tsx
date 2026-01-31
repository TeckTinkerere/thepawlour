'use client'

import Link from 'next/link'
import ServiceCard from '@/components/ui/ServiceCard'

export default function ServicesPreviewSection() {
  const services = [
    {
      title: 'Basic Grooming',
      description: 'Essential care including bath, brush, nail trim, and ear cleaning. Perfect for regular maintenance.',
      imageUrl: 'https://images.pexels.com/photos/4587955/pexels-photo-4587955.jpeg',
      features: ['Bath & Blow Dry', 'Nail Trimming', 'Ear Cleaning', 'Basic Brush Out']
    },
    {
      title: 'Full Grooming',
      description: 'Complete grooming experience with styling, sanitary trim, and premium finishing touches.',
      imageUrl: 'https://images.pexels.com/photos/4587959/pexels-photo-4587959.jpeg',
      features: ['Everything in Basic', 'Professional Styling', 'Sanitary Trim', 'Cologne Spritz']
    },
    {
      title: 'Spa Treatments',
      description: 'Luxurious spa experience with therapeutic treatments for ultimate relaxation and wellness.',
      imageUrl: 'https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg',
      features: ['Microbubble Therapy', 'Ayurvedic Herb Spa', 'Aromatherapy', 'Deep Conditioning']
    }
  ]

  return (
    <section id="services-preview" className="py-20 bg-warm-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-6">
            Our Grooming Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From basic maintenance to luxurious spa treatments, we provide comprehensive care 
            tailored to your pet's needs in our cage-free environment.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                imageUrl={service.imageUrl}
                isPreview={true}
              />
              
              {/* Features List */}
              <div className="mt-4 p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-center text-sm text-gray-600 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.15 + featureIndex * 0.05}s` }}
                    >
                      <svg className="w-4 h-4 text-forest-green mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Services Page */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link 
            href="/services"
            className="inline-flex items-center bg-forest-green text-white px-8 py-4 rounded-full font-semibold hover:bg-forest-green/90 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
          >
            View All Services & Pricing
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}