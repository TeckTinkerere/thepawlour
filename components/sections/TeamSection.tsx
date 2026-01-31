'use client'

import Image from 'next/image'

interface TeamMember {
  id: string
  name: string
  role: string
  specialization: string
  experience: string
  certifications: string[]
  image: string
}

export default function TeamSection() {
  const team: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Head Groomer & Founder',
      specialization: 'Breed-Specific Styling',
      experience: '8+ years',
      certifications: ['SKC Certified', 'Low-Stress Handling'],
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      name: 'Michael Tan',
      role: 'Senior Groomer',
      specialization: 'Spa Treatments & Wellness',
      experience: '6+ years',
      certifications: ['SKC Certified', 'Pet Health & Nutrition'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      name: 'Jennifer Lim',
      role: 'Grooming Specialist',
      specialization: 'Anxious & Senior Pets',
      experience: '5+ years',
      certifications: ['SKC Certified', 'Low-Stress Handling'],
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    }
  ]

  return (
    <section className="py-20 bg-warm-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our certified groomers are passionate about providing exceptional care for your beloved pets. 
            Each team member brings years of expertise and genuine love for animals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={member.id}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-1 group-hover:text-terracotta transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm text-forest-green font-semibold mb-3">{member.role}</p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Specialization</p>
                      <p className="text-sm text-gray-700">{member.specialization}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Experience</p>
                      <p className="text-sm text-gray-700">{member.experience}</p>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2">
                    {member.certifications.map((cert, certIndex) => (
                      <span
                        key={certIndex}
                        className="inline-flex items-center bg-forest-green/10 text-forest-green text-xs font-semibold px-2.5 py-1 rounded-full hover:bg-forest-green/20 transition-colors duration-300"
                      >
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
