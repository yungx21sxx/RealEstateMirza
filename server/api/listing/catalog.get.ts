import {BookingFiltersDTO} from "#shared/types/dto.types";
import {prisma} from "~~/server/service/prisma.service";
import {ListingCatalogResponse} from "#shared/types/response.types";

import {calculatePrices} from "#shared/utils/prices.utils";
import {parseQueryToBookingFilters} from "#shared/utils/booking.utils";
import {QueryObject} from "ufo";

function fixQuery(query: QueryObject) {
    return Object.fromEntries(
        Object.entries(query).map(([key, value]) => {
            if (value?.startsWith('"') && value?.endsWith('"')) {
                // Убираем лишние кавычки для дат
                return [key, value.slice(1, -1)];
            }
            if (!isNaN(value)) {
                // Преобразуем строки в числа
                return [key, Number(value)];
            }
            return [key, value];
        })
    );
}

export default defineEventHandler(async event => {
    const query: QueryObject = getQuery(event);

    const bookingFilters: BookingFiltersDTO = parseQueryToBookingFilters(fixQuery(query));

    const listings = await prisma.listing.findMany(
        {
            orderBy: {createdAt: 'desc'},
            include: {
                photos: true,
                pricePeriods: true
            }
        },
    );

    if (!listings) {
        throw createError({ statusCode: 404, message: 'Listings not found' });
    }

    return {
        count: listings.length,
        listings: listings.map(listing => ({
            id: listing.id,
            title: listing.title,
            photos: listing.photos.map(photo => photo.urlMin),
            rooms: listing.roomCount,
            area: listing.area,
            places: listing.places,
            minPrice: listing.minPrice,
            calculatedPrices: (bookingFilters.checkIn && bookingFilters.checkOut) ?
                calculatePrices(listing.pricePeriods, listing.minPrice, bookingFilters.checkIn, bookingFilters.checkOut)
                : null
        }))
    }
})