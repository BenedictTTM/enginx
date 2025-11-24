import { MetadataRoute } from 'next'

const SITE_URL = (process.env.SITE_URL || 'https://www.cilcahair.com').replace(/\/$/, '')

function fullUrl(path: string) {
  if (!path.startsWith('/')) path = `/${path}`
  return `${SITE_URL}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: fullUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: fullUrl('/contact'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}