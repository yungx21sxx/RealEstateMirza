import {prisma} from "~~/server/service/prisma.service";
import {BookingFiltersDTO} from "#shared/types/dto.types";
import {parseQueryToBookingFilters} from "#shared/utils/booking.utils";
import {IListingResponse} from "#shared/types/response.types";

export default defineEventHandler<Promise<IListingResponse>>(async event => {
    const id = parseInt(getRouterParam(event, 'id') as string, 10);
    if (isNaN(id)) {
        throw createError({
            statusCode: 404,
            message: 'dfgfdg'
        })
    }
    const query = getQuery(event);
    const bookingFilters: BookingFiltersDTO = parseQueryToBookingFilters(query);

    const listing = await prisma.listing.findUnique({
        where: {id},
        include: {
            pricePeriods: {
                select: {
                    price: true,
                    startDate: true,
                    endDate: true,
                }
            },
            photos: {
                select: {
                    id: true,
                    urlMin: true,
                    urlFull: true,
                    position: true
                }
            },
            amenities: true,
            internetAndTV: true,
            appliances: true
        }
    })

    if (!listing) {
        throw createError({
            statusCode: 404,
            message: 'dfgfdg'
        })
    }

    const {photos, amenities, internetAndTV, appliances, ...listingData} = listing

    return {
        ...listingData,
        photos: photos.sort((a, b) => (a.position - b.position)),
        amenities: amenities.map((i) => i.label),
        internetAndTV: internetAndTV.map((i) => i.label),
        appliances: appliances.map((i) => i.label)
    };
})