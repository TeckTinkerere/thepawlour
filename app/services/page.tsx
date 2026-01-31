import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { PAWLOUR_WHATSAPP, WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const metadata = {
  title: 'Services & Pricing - The Pawlour | Pet Grooming Singapore',
  description: 'Comprehensive pet grooming services in Singapore. Basic grooming, full grooming, spa treatments, and add-ons. Cage-free environment in Hougang.',
  keywords: 'pet grooming services singapore, dog grooming prices, spa treatments pets, hougang pet grooming, cage-free grooming'
}

export default function ServicesPage() {
  const groomingServices = [
    {
      category: 'Basic Grooming',
      description: 'Essential care for your pet\'s hygiene and comfort',
      services: [
        'Pre-grooming health check',
        'Gentle bath with premium shampoo',
        'Thorough blow dry',
        'Nail trimming',
        'Ear cleaning',
        'Basic brush out',
        'Sanitary trim'
      ],
      pricing: {
        small: 'From $45',
        medium: 'From $55',
        large: 'From $65'
      }
    },
    {
      category: 'Full Grooming',
      description: 'Complete grooming experience with professional styling',
      services: [
        'Everything in Basic Grooming',
        'Professional breed-specific styling',
        'Face and feet trimming',
        'Full body styling cut',
        'Nail filing and buffing',
        'Teeth brushing (optional)',
        'Premium cologne spritz',
        'Bow or bandana finishing touch'
      ],
      pricing: {
        small: 'From $65',
        medium: 'From $85',
        large: 'From $105'
      }
    }
  ]

  const spaServices = [
    {
      name: 'Microbubble Spa',
      description: 'Deep cleansing therapy that removes dirt, bacteria, and allergens while moisturizing the skin',
      benefits: ['Deep pore cleansing', 'Improved skin health', 'Reduced odor', 'Enhanced coat shine'],
      price: 'Add $25'
    },
    {
      name: 'Ayurvedic Herb Spa',
      description: 'Natural herbal treatment using traditional ingredients for therapeutic benefits',
      benefits: ['Soothes sensitive skin', 'Natural aromatherapy', 'Stress relief', 'Coat conditioning'],
      price: 'Add $30'
    }
  ]

  const addOnServices = [
    { name: 'Teeth Brushing', price: '$8', description: 'Gentle dental care for fresh breath' },
    { name: 'De-shedding Treatment', price: '$15', description: 'Reduces shedding for up to 6 weeks' },
    { name: 'Mud Mask Therapy', price: '$20', description: 'Detoxifying treatment for healthy skin' },
    { name: 'Nail Art', price: '$12', description: 'Fun colored nail polish for special occasions' },
    { name: 'Flea & Tick Treatment', price: '$18', description: 'Specialized shampoo for pest control' },
    { name: 'Aromatherapy Add-on', price: '$10', description: 'Calming essential oils during grooming' }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-800 mb-6">
              Services & Pricing
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive grooming services tailored to your pet's needs. 
              All services performed in our cage-free, stress-free environment.
            </p>
          </div>
        </div>
      </section>

      {/* Grooming Services Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-playfair font-bold text-gray-800 text-center mb-16">
              Grooming Packages
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {groomingServices.map((service, index) => (
                <div key={service.category} className="bg-warm-cream rounded-2xl p-8">
                  <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">
                    {service.category}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  {/* Services List */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-800 mb-4">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.services.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-forest-green mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing Table */}
                  <div className="bg-white rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Pricing by Size:</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Small</div>
                        <div className="text-lg font-bold text-forest-green">{service.pricing.small}</div>
                        <div className="text-xs text-gray-500">Up to 15kg</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Medium</div>
                        <div className="text-lg font-bold text-forest-green">{service.pricing.medium}</div>
                        <div className="text-xs text-gray-500">15-30kg</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Large</div>
                        <div className="text-lg font-bold text-forest-green">{service.pricing.large}</div>
                        <div className="text-xs text-gray-500">30kg+</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spa Treatments */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-playfair font-bold text-gray-800 mb-6">
                Luxury Spa Treatments
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Enhance your pet's grooming experience with our therapeutic spa treatments, 
                designed for ultimate relaxation and skin health.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {spaServices.map((spa, index) => (
                <div key={spa.name} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-playfair font-bold text-gray-800">
                      {spa.name}
                    </h3>
                    <span className="text-xl font-bold text-terracotta bg-terracotta/10 px-4 py-2 rounded-full">
                      {spa.price}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{spa.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      {spa.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center">
                          <svg className="w-4 h-4 text-terracotta mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add-on Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-playfair font-bold text-gray-800 mb-6">
                Add-on Services
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Customize your pet's grooming experience with our additional services.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addOnServices.map((addon, index) => (
                <div key={addon.name} className="bg-warm-cream rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {addon.name}
                    </h3>
                    <span className="text-lg font-bold text-forest-green">
                      {addon.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{addon.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Disclaimer */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Important Pricing Information
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Prices may vary based on your pet's breed, coat condition, size, and temperament. 
                We'll provide a personalized quote during consultation. All services include our 
                signature cage-free experience and premium products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-forest-green">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-playfair font-bold text-white mb-6">
              Ready to Book Your Pet's Spa Day?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Contact us on WhatsApp for personalized pricing and to schedule your appointment. 
              Our team is ready to pamper your furry friend!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton
                variant="primary"
                size="lg"
                phoneNumber={PAWLOUR_WHATSAPP}
                message={WHATSAPP_MESSAGES.pricing}
                className="bg-soft-gold hover:bg-soft-gold/90 text-gray-800 font-semibold px-8 py-4"
              >
                Get Pricing Quote
              </WhatsAppButton>
              
              <WhatsAppButton
                variant="secondary"
                size="lg"
                phoneNumber={PAWLOUR_WHATSAPP}
                message={WHATSAPP_MESSAGES.general}
                className="border-2 border-white text-white hover:bg-white hover:text-forest-green font-semibold px-8 py-4"
              >
                Book Appointment
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}