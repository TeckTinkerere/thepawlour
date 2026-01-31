'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function MiniAboutSection() {
  return (
    <section className="py-20 bg-warm-cream">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 animate-fade-in-left">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-6">
              Our Story
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p className="hover:text-gray-800 transition-colors duration-300">
                What started as a home-based passion project has blossomed into Singapore's 
                most trusted boutique pet grooming salon. We've never forgotten our roots - 
                the warmth, personal care, and genuine love for every furry friend that walks through our doors.
              </p>
              
              <p className="hover:text-gray-800 transition-colors duration-300">
                Today, we combine professional expertise with that same heartfelt approach. 
                Our SKC-certified team treats every pet like family, ensuring they feel safe, 
                comfortable, and pampered throughout their grooming experience.
              </p>
              
              <p className="font-semibold text-forest-green hover:text-forest-green/80 transition-colors duration-300">
                Because every pet deserves to look and feel their absolute best.
              </p>
            </div>

            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link 
                href="/about"
                className="inline-flex items-center text-forest-green font-semibold hover:text-forest-green/80 transition-colors duration-300 group"
              >
                Learn More About Our Journey
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 animate-fade-in-right">
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/4587967/pexels-photo-4587967.jpeg"
                  alt="Professional pet groomer at work at The Pawlour"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-soft-gold rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-float"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-terracotta rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-float" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}