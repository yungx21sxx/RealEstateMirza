import type { BookingFiltersDTO } from '#shared/types/dto.types'
import type { QueryObject } from 'ufo'
import { prisma } from '~~/server/service/prisma.service'

import { parseQueryToBookingFilters } from '#shared/utils/booking.utils'
import { calculatePrices } from '#shared/utils/prices.utils'

type BookingQueryValue = string | number | boolean | null | undefined | BookingQueryValue[]
type BookingQuery = Record<string, BookingQueryValue>

function fixQuery(query: QueryObject): BookingQuery {
  console.log(query)
  return Object.fromEntries(
    Object.entries(query).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value]
      }
      if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
        // Убираем лишние кавычки для дат
        return [key, value.slice(1, -1)]
      }
      if (typeof value === 'string' && value !== '' && !Number.isNaN(Number(value))) {
        // Преобразуем строки в числа
        return [key, Number.parseInt(value, 10)]
      }
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value == null) {
        return [key, value]
      }

      return [key, undefined]
    })
  )
}

export default defineEventHandler(async (event: any) => {
  try {
    const query: QueryObject = getQuery(event)

    const bookingFilters: BookingFiltersDTO = parseQueryToBookingFilters(
      fixQuery({ checkIn: query.checkIn, checkOut: query.checkOut })
    )

    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        photos: true,
        pricePeriods: true
      }
    })

    if (!listings) {
      throw createError({ statusCode: 404, message: 'Listings not found' })
    }

    return {
      count: listings.length,
      listings: listings.map(listing => ({
        id: listing.id,
        title: listing.title,
        photos: listing.photos
          .sort((a, b) => a.position - b.position)
          .map(photo => photo.urlMin)
          .slice(0, 5),
        rooms: listing.roomCount,
        area: listing.area,
        places: listing.places,
        minPrice: listing.minPrice,
        calculatedPrices:
          bookingFilters.checkIn && bookingFilters.checkOut
            ? calculatePrices(
                listing.pricePeriods,
                listing.minPrice,
                bookingFilters.checkIn,
                bookingFilters.checkOut
              )
            : null
      }))
    }
  } catch (e) {
    console.log(e)
    return e
  }
})
