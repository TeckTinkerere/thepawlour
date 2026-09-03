'use client'

import Image from 'next/image'
import { useState } from 'react'

interface FigureProps {
  src?: string
  alt: string
  /** Tailwind aspect ratio class, e.g. "aspect-[4/5]". */
  ratio?: string
  sizes?: string
  priority?: boolean
  className?: string
}

/**
 * Bordered photo frame with the logo mark behind it.
 *
 * The default photography is hotlinked stock, so the frame has to survive a URL
 * that is missing, blocked or taken down upstream: the mark shows through and
 * the failed image is removed, rather than leaving a browser broken-image icon
 * in the middle of the homepage.
 */
export default function Figure({
  src,
  alt,
  ratio = 'aspect-[4/5]',
  sizes = '(max-width: 1024px) 100vw, 45vw',
  priority = false,
  className = '',
}: FigureProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative ${ratio} w-full overflow-hidden border border-line bg-paper-shell ${className}`}>
      <Image
        src="/icons/transparent_logo.png"
        alt=""
        width={160}
        height={160}
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 opacity-[0.09]"
      />
      {src && !failed && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
