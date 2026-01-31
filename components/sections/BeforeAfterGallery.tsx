'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BeforeAfterPair {
  id: string
  petName: string
  breed: string
  before: string
  after: string
}

export default function BeforeAfterGallery() {
  const [activeSlider, setActiveSlider] = useState<string | null>(null)
  const [sliderPosition, setSliderPosition] = useState<{ [key: string]: number }>({})

  const transformations: BeforeAfterPair[] = [
    {
      id: '1',
      petName: 'Buddy',
      breed: 'Golden Retriever',
      before: 'https://images.pexels.com/photos/4587955/pexels-photo-4587955.jpeg',
      after: 'https://images.pexels.com/photos/4587959/pexels-photo-4587959.jpeg'
    },
    {
      id: '2',
      petName: 'Luna',
      breed: 'Poodle',
      before: 'https://images.pexels.com/photos/4587967/pexels-photo-4587967.jpeg',
      after: 'https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg'
    },
    {
      id: '3',
      petName: 'Max',
      breed: 'Shih Tzu',
      before: 'https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg',
      after: 'https://images.pexels.com/photos/4587959/pexels-photo-4587959.jpeg'
    }
  ]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const container = e.currentTarget
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition({ ...sliderPosition, [id]: Math.max(0, Math.min(100, percentage)) })
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-6">
            Transformations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See the magic of our grooming expertise. Drag the slider to compare before and after photos 
            of our happy clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {transformations.map((pair, index) => (
            <div
              key={pair.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div
                className="relative h-80 rounded-2xl overflow-hidden cursor-col-resize group shadow-lg hover:shadow-2xl transition-shadow duration-300"
                onMouseMove={(e) => handleMouseMove(e, pair.id)}
                onMouseEnter={() => setActiveSlider(pair.id)}
                onMouseLeave={() => setActiveSlider(null)}
              >
                {/* Before Image */}
                <div className="absolute inset-0">
                  <Image
                    src={pair.before}
                    alt={`${pair.petName} before grooming`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* After Image */}
                <div
                  className="absolute inset-0 overflow-hidden transition-all duration-75"
                  style={{ width: `${sliderPosition[pair.id] ?? 50}%` }}
                >
                  <Image
                    src={pair.after}
                    alt={`${pair.petName} after grooming`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white transition-all duration-75 group-hover:w-2"
                  style={{ left: `${sliderPosition[pair.id] ?? 50}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg">
                    <svg className="w-4 h-4 text-forest-green" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.5 15a.5.5 0 01-.5-.5v-11a.5.5 0 011 0v11a.5.5 0 01-.5.5zm3 0a.5.5 0 01-.5-.5v-11a.5.5 0 011 0v11a.5.5 0 01-.5.5z" />
                    </svg>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Before
                </div>
                <div className="absolute top-4 right-4 bg-forest-green/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  After
                </div>
              </div>

              {/* Pet Info */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-playfair font-semibold text-gray-800">{pair.petName}</h3>
                <p className="text-sm text-gray-600">{pair.breed}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
