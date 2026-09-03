import type { MetadataRoute } from 'next'
import { getDefaultContent } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const { business } = getDefaultContent()
  const lastModified = new Date()

  return [
    { url: business.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${business.url}/services`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${business.url}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${business.url}/about`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
  ]
}
