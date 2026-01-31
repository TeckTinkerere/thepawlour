import type { Metadata } from 'next'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { PAWLOUR_WHATSAPP, WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contact The Pawlour - Premium Pet Grooming in Hougang, Singapore | Book Now',
  description: 'Contact The Pawlour for premium cage-free pet grooming in Hougang. Open 7 days a week. WhatsApp, call, or visit us. SKC certified groomers. Instant booking available.',
  keywords: 'pet grooming contact, Hougang grooming salon, book pet grooming, dog grooming Singapore, cat grooming, pet spa contact, grooming appointment booking, pet grooming hours',
  openGraph: {
    title: 'Contact The Pawlour - Premium Pet Grooming',
    description: 'Get in touch with The Pawlour for expert pet grooming services in Hougang. Open 7 days a week.',
    type: 'website',
    locale: 'en_SG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact The Pawlour - Pet Grooming Hougang',
    description: 'Book your pet grooming appointment. Open 7 days a week.',
  },
}

export default function Contact() {
  // Business hours data
  const businessHours = [
    { day: 'Monday - Friday', hours: '10:00 AM - 6:00 PM', status: 'open' },
    { day: 'Saturday', hours: '10:00 AM - 5:00 PM', status: 'open' },
    { day: 'Sunday', hours: '11:00 AM - 4:00 PM', status: 'open' },
  ]

  return (
    <main className="min-h-screen bg-warm-cream">
      {/* Structured Data for Local Business - SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'The Pawlour',
            description: 'Premium cage-free pet grooming salon in Hougang, Singapore with SKC certified groomers',
            url: 'https://thepawlour.com',
            telephone: '+6586689078',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Hougang',
              addressRegion: 'Singapore',
              addressCountry: 'SG',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '10:00',
                closes: '18:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '10:00',
                closes: '17:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Sunday',
                opens: '11:00',
                closes: '16:00',
              },
            ],
            priceRange: '$$',
            areaServed: 'Singapore',
            sameAs: ['https://wa.me/6586689078'],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              telephone: '+6586689078',
              availableLanguage: ['en', 'zh'],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              ratingCount: '500',
            },
          }),
        }}
      />

      {/* FAQ Schema for AI Optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are The Pawlour business hours?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Pawlour is open Monday-Friday 10 AM to 6 PM, Saturday 10 AM to 5 PM, and Sunday 11 AM to 4 PM. We are open 7 days a week for your convenience.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I book a pet grooming appointment at The Pawlour?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can book via WhatsApp at +65 8668 9078, call us directly at the same number, or fill out our contact form. We respond within 1-2 hours during business hours.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where is The Pawlour located?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Pawlour is located in Hougang, Singapore. We offer cage-free, stress-free grooming services with SKC certified groomers.',
                },
              },
              {
                '@type': 'Question',
                name: 'What services does The Pawlour offer?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We offer Basic Grooming, Full Grooming, and Luxury Spa Treatments. All services are performed in our cage-free environment with premium products.',
                },
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-forest-green to-forest-green/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 animate-fade-in-down">
            Get in Touch with The Pawlour
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Contact our SKC-certified groomers in Hougang for premium cage-free pet grooming services. 
            Available 7 days a week for your convenience.
          </p>
        </div>
      </section>

      {/* Prominent Business Hours Banner - STICKY */}
      <section className="py-6 bg-white border-b-4 border-forest-green sticky top-20 md:top-24 z-40 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Status Indicator */}
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Currently</p>
                <p className="text-xl font-bold text-green-600">OPEN</p>
              </div>
            </div>

            {/* Hours Display */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base">
              {businessHours.map((item) => (
                <div key={item.day} className="text-center">
                  <p className="font-semibold text-gray-700">{item.day}</p>
                  <p className="font-bold text-forest-green">{item.hours}</p>
                </div>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-2">
              <a
                href="tel:+6586689078"
                className="inline-flex items-center bg-terracotta hover:bg-terracotta/90 text-white font-semibold px-3 py-2 rounded-lg transition-all duration-300 text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.73 1.365a1 1 0 001.27-1.27l-1.365-2.73a1 1 0 00.756-.502l4.493-1.498a1 1 0 00.684-.948V5a2 2 0 00-2-2h-2.5a2.5 2.5 0 00-5 0v.006H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-2.5a2.5 2.5 0 00-5 0v.006H3V5z"/>
                </svg>
                Call
              </a>
              <a
                href={`https://wa.me/${PAWLOUR_WHATSAPP.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-2 rounded-lg transition-all duration-300 text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* WhatsApp Card */}
            <div className="bg-warm-cream rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                </svg>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Instant messaging for quick inquiries and bookings</p>
              <a href={`https://wa.me/${PAWLOUR_WHATSAPP.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-500 font-semibold hover:text-green-600 transition-colors">
                +65 8668 9078
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-warm-cream rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-terracotta rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.73 1.365a1 1 0 001.27-1.27l-1.365-2.73a1 1 0 00.756-.502l4.493-1.498a1 1 0 00.684-.948V5a2 2 0 00-2-2h-2.5a2.5 2.5 0 00-5 0v.006H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-2.5a2.5 2.5 0 00-5 0v.006H3V5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600 mb-4">Call us during business hours</p>
              <a href="tel:+6586689078" className="text-terracotta font-semibold hover:text-terracotta/80 transition-colors">
                +65 8668 9078
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-warm-cream rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600 mb-4">Visit us in Hougang</p>
              <p className="text-forest-green font-semibold">
                Hougang, Singapore
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-down">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-6">
                Send us a Message
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Fill out the form below and we'll get back to you as soon as possible. 
                For urgent inquiries, please use WhatsApp for faster response.
              </p>
            </div>

            {/* Google Form Embed */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfYourFormIDHere/viewform?embedded=true"
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full"
                title="The Pawlour Contact Form"
              >
                Loading…
              </iframe>
            </div>

            {/* Note about form */}
            <div className="mt-8 p-6 bg-white rounded-xl border-l-4 border-forest-green animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-gray-700">
                <span className="font-semibold text-forest-green">💡 Tip:</span> For faster response to booking inquiries, 
                we recommend using WhatsApp. Our team typically responds within 1-2 hours during business hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-playfair font-bold text-gray-800 mb-8 animate-fade-in-down">
              Prefer Direct Contact?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <WhatsAppButton
                variant="primary"
                size="lg"
                phoneNumber={PAWLOUR_WHATSAPP}
                message={WHATSAPP_MESSAGES.general}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 text-lg w-full justify-center"
              >
                Chat on WhatsApp
              </WhatsAppButton>

              <a
                href="tel:+6586689078"
                className="inline-flex items-center justify-center bg-terracotta hover:bg-terracotta/90 text-white font-semibold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.73 1.365a1 1 0 001.27-1.27l-1.365-2.73a1 1 0 00.756-.502l4.493-1.498a1 1 0 00.684-.948V5a2 2 0 00-2-2h-2.5a2.5 2.5 0 00-5 0v.006H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-2.5a2.5 2.5 0 00-5 0v.006H3V5z"/>
                </svg>
                Call Us Now
              </a>
            </div>

            {/* Enhanced Business Hours Section */}
            <div className="mt-12 p-8 bg-gradient-to-br from-forest-green/10 to-terracotta/10 rounded-2xl border-2 border-forest-green animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-3xl font-playfair font-bold text-gray-800 mb-8">📅 Business Hours</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left">
                  <div className="space-y-4">
                    {businessHours.map((item) => (
                      <div key={item.day} className="flex justify-between items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                        <span className="font-semibold text-gray-800">{item.day}</span>
                        <span className="text-forest-green font-bold">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-4 italic">
                    ✓ Open 7 days a week for your convenience
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 text-left">
                  <h4 className="text-xl font-playfair font-bold text-gray-800 mb-4">📍 Location</h4>
                  <p className="text-gray-700 font-medium mb-2">
                    Hougang, Singapore
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Cage-free grooming salon with SKC certified groomers
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <span className="font-semibold">✓</span> Premium grooming services
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">✓</span> Stress-free environment
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">✓</span> Professional team
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
