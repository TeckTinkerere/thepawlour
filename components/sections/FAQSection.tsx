'use client'

import { useState } from 'react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'services' | 'booking' | 'care'
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'services' | 'booking' | 'care'>('all')

  const faqs: FAQItem[] = [
    {
      id: '1',
      category: 'general',
      question: 'What makes The Pawlour different from other grooming salons?',
      answer: 'We offer a cage-free, stress-free environment with SKC-certified groomers who treat every pet like family. Our boutique approach focuses on personalized care, premium products, and genuine compassion for your furry friend.'
    },
    {
      id: '2',
      category: 'services',
      question: 'What services do you offer?',
      answer: 'We provide Basic Grooming, Full Grooming, and Luxury Spa Treatments. Each service includes premium products and professional styling. We also offer add-on services like teeth brushing, de-shedding treatments, and aromatherapy.'
    },
    {
      id: '3',
      category: 'booking',
      question: 'How do I book an appointment?',
      answer: 'Simply click the WhatsApp button on our website or contact us directly. Our team will help you schedule the perfect time for your pet\'s grooming session. We offer flexible booking to accommodate your schedule.'
    },
    {
      id: '4',
      category: 'care',
      question: 'How should I prepare my pet for grooming?',
      answer: 'Please ensure your pet has eaten and had a bathroom break before arrival. Bring any special instructions or concerns about your pet\'s behavior or health. We recommend a light meal 2-3 hours before the appointment.'
    },
    {
      id: '5',
      category: 'services',
      question: 'Are your products safe for sensitive skin?',
      answer: 'Yes! We use premium, hypoallergenic products suitable for all skin types. If your pet has specific allergies or sensitivities, please inform us during booking so we can use appropriate products.'
    },
    {
      id: '6',
      category: 'booking',
      question: 'What is your cancellation policy?',
      answer: 'We require 24 hours notice for cancellations. Cancellations made within 24 hours may incur a 50% service fee. We understand emergencies happen, so please contact us as soon as possible.'
    },
    {
      id: '7',
      category: 'care',
      question: 'How often should my pet be groomed?',
      answer: 'It depends on your pet\'s breed and coat type. Generally, we recommend grooming every 4-8 weeks. During your consultation, our groomers can provide personalized recommendations for your pet\'s specific needs.'
    },
    {
      id: '8',
      category: 'general',
      question: 'Do you offer mobile grooming services?',
      answer: 'Currently, we operate from our boutique salon in Hougang. However, we\'re exploring mobile grooming options. Contact us to express interest or be added to our waitlist.'
    }
  ]

  const categories = [
    { value: 'all' as const, label: 'All Questions' },
    { value: 'general' as const, label: 'General' },
    { value: 'services' as const, label: 'Services' },
    { value: 'booking' as const, label: 'Booking' },
    { value: 'care' as const, label: 'Pet Care' }
  ]

  const filteredFaqs = activeCategory === 'all' ? faqs : faqs.filter(faq => faq.category === activeCategory)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our services, booking process, and pet care tips.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.value
                  ? 'bg-forest-green text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={faq.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full bg-warm-cream hover:bg-gray-100 transition-colors duration-300 rounded-xl p-6 text-left group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-playfair font-semibold text-gray-800 group-hover:text-forest-green transition-colors duration-300 pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-forest-green flex-shrink-0 transition-transform duration-300 ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openId === faq.id ? 'max-h-96 mt-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="https://wa.me/6586689078?text=Hello%20The%20Pawlour%21%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-forest-green text-white px-8 py-3 rounded-full font-semibold hover:bg-forest-green/90 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Contact Us on WhatsApp
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
