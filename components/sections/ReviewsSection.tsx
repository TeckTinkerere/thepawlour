'use client'

export default function ReviewsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real reviews from pet parents who trust The Pawlour with their furry friends
          </p>
        </div>

        {/* Google Maps Embed with Reviews */}
        <div className="flex justify-center transition-all duration-700 opacity-100 scale-100">
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3095.383041413718!2d103.88747600915724!3d1.367710998613595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da164a16960a25%3A0x682d24e4c652d8b6!2sThe%20Pawlour%20(Hougang)!5e1!3m2!1sen!2ssg!4v1769756380738!5m2!1sen!2ssg"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Pawlour Location and Reviews"
              className="w-full"
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-5xl font-bold text-terracotta mb-2">4.8★</div>
            <p className="text-gray-600">Average Rating</p>
            <p className="text-sm text-gray-500 mt-1">Based on 100+ reviews</p>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-5xl font-bold text-terracotta mb-2">500+</div>
            <p className="text-gray-600">Happy Customers</p>
            <p className="text-sm text-gray-500 mt-1">Trusted by pet parents</p>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-5xl font-bold text-terracotta mb-2">5 Yrs</div>
            <p className="text-gray-600">Experience</p>
            <p className="text-sm text-gray-500 mt-1">Professional grooming</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-600 mb-6">
            Ready to give your pet the best grooming experience?
          </p>
          <a
            href="https://wa.me/6586689078?text=Hello!%20I'd%20like%20to%20book%20a%20grooming%20appointment%20for%20my%20pet."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-terracotta text-white px-8 py-3 rounded-lg font-semibold hover:bg-terracotta/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Book Now on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
