import type { MetadataRoute } from 'next'
import { getDefaultContent } from '@/lib/content'

export default function robots(): MetadataRoute.Robots {
  const { business } = getDefaultContent()

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${business.url}/sitemap.xml`,
  }
}
