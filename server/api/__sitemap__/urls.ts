import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrl } from '#sitemap/types'
import {prisma} from "~~/server/service/prisma.service";

export default defineSitemapEventHandler(async () => {
    const listings = await prisma.listing.findMany()

    return [...listings.map(listing => ({
        loc: `/listing/${listing.id}`,
        priority: 0.5,
        lastmod: listing.createdAt,
        changefreq:  'monthly',
        _sitemap: 'listings',
    } satisfies SitemapUrl))]
})