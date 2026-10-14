import { prisma } from '~~/server/service/prisma.service'

interface SitemapUrl {
  loc: string
  priority?: number
  lastmod?: Date | string
  changefreq?: string
  _sitemap?: string
}

export default defineEventHandler(async () => {
  const listings = await prisma.listing.findMany()

  return [
    ...listings.map(
      listing =>
        ({
          loc: `/listing/${listing.id}`,
          priority: 0.5,
          lastmod: listing.createdAt,
          changefreq: 'monthly',
          _sitemap: 'listings'
        }) satisfies SitemapUrl
    )
  ]
})
