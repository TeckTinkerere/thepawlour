import Image from 'next/image'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import TestimonialCard from '@/components/ui/TestimonialCard'
import { PAWLOUR_WHATSAPP, WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const metadata = {
  title: 'About Us - The Pawlour | Premium Pet Grooming Singapore',
  description: 'Learn about The Pawlour\'s journey from home-based grooming to Singapore\'s most trusted boutique pet salon. SKC certified professionals, cage-free environment.',
  keywords: 'pet grooming singapore, about the pawlour, skc certified groomer, cage-free grooming, hougang pet salon'
}

export default function AboutPage() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      petName: 'Buddy',
      petBreed: 'Golden Retriever',
      rating: 5,
      comment: 'The Pawlour transformed Buddy from a nervous wreck to a happy, relaxed pup. The cage-free environment made all the difference!',
      date: '2024-01-15'
    },
    {
      name: 'Michael Tan',
      petName: 'Luna',
      petBreed: 'Poodle',
      rating: 5,
      comment: 'Professional service with genuine care. Luna always comes home looking and smelling amazing. Highly recommend!',
      date: '2024-01-10'
    },
    {
      name: 'Jennifer Lim',
      petName: 'Max',
      petBreed: 'Shih Tzu',
      rating: 5,
      comment: 'The team\'s SKC certification really shows. They know exactly how to handle Max\'s sensitive skin. Outstanding service!',
      date: '2024-01-05'
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-800 mb-6">
              About The Pawlour
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Where every pet is treated like family, and every grooming session is a stress-free, 
              boutique experience designed with love and professional expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-playfair font-bold text-gray-800 mb-8">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              To provide Singapore's most compassionate, professional, and stress-free pet grooming experience. 
              We believe every pet deserves to feel safe, comfortable, and loved while looking their absolute best.
            </p>
            <div className="bg-forest-green/10 rounded-2xl p-8">
              <p className="text-lg text-forest-green font-medium italic">
                "We don't just groom pets - we create positive experiences that pets and their families treasure."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-playfair font-bold text-gray-800 mb-8">
                Our Journey
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-forest-green mb-3">From Home to Heart</h3>
                  <p>
                    The Pawlour began as a simple dream in a home-based setup, where our founder discovered 
                    the profound joy of helping pets look and feel their best. What started with a few neighborhood 
                    dogs quickly grew into something special.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-forest-green mb-3">Building Trust</h3>
                  <p>
                    As word spread about our gentle approach and exceptional results, we realized we needed 
                    to expand. But growth never meant losing our core values - the warmth, personal attention, 
                    and genuine care that made us different.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-forest-green mb-3">Professional Excellence</h3>
                  <p>
                    Today, we combine that original heart with professional expertise. Our team holds 
                    Singapore Kennel Club certification, and our boutique salon offers a cage-free 
                    environment where pets can roam freely and feel at ease.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg"
                  alt="The Pawlour salon interior showing cage-free environment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Credentials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-gray-800 mb-8">
              Professional Credentials
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our team's expertise is backed by industry-leading certifications and years of hands-on experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-warm-cream rounded-2xl">
              <div className="w-16 h-16 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-3">
                SKC Certified
              </h3>
              <p className="text-gray-600">
                Singapore Kennel Club certification ensures our groomers meet the highest professional standards.
              </p>
            </div>

            <div className="text-center p-8 bg-warm-cream rounded-2xl">
              <div className="w-16 h-16 bg-terracotta rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-3">
                5+ Years Experience
              </h3>
              <p className="text-gray-600">
                Extensive experience handling pets of all sizes, breeds, and temperaments with care and expertise.
              </p>
            </div>

            <div className="text-center p-8 bg-warm-cream rounded-2xl">
              <div className="w-16 h-16 bg-soft-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-3">
                Continuous Learning
              </h3>
              <p className="text-gray-600">
                Regular training updates on the latest grooming techniques, products, and animal care practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-forest-green">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-playfair font-bold text-white mb-8">
              Our Vision
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              To be Singapore's most trusted and beloved pet grooming destination, where every visit 
              strengthens the bond between pets and their families through exceptional care and genuine compassion.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-white/80">
              <div>
                <h3 className="text-lg font-semibold text-soft-gold mb-2">Innovation</h3>
                <p>Continuously improving our techniques and environment for better pet experiences.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-soft-gold mb-2">Community</h3>
                <p>Building lasting relationships with pet families throughout Singapore.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-soft-gold mb-2">Excellence</h3>
                <p>Maintaining the highest standards in every aspect of our service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-warm-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-gray-800 mb-8">
              What Pet Parents Say
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Don't just take our word for it - hear from the families who trust us with their beloved pets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                petName={testimonial.petName}
                petBreed={testimonial.petBreed}
                rating={testimonial.rating}
                testimonial={testimonial.comment}
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">Ready to join our family of happy pet parents?</p>
            <WhatsAppButton
              variant="primary"
              size="lg"
              phoneNumber={PAWLOUR_WHATSAPP}
              message={WHATSAPP_MESSAGES.general}
              className="bg-forest-green hover:bg-forest-green/90 text-white px-8 py-4"
            >
              Book Your Pet's Appointment
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </main>
  )
}