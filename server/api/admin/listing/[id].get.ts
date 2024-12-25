import {prisma} from "~~/server/service/prisma.service";
import {IListingFormData} from "~/modules/admin/types/formData.types";
import {H3Error} from "h3";

export default defineEventHandler<Promise<IListingFormData | H3Error>>(async event => {
    const id = getRouterParam(event, 'id');

    const listing = await prisma.listing.findUnique({
        where: {id: parseInt(<string>id)},
        include: {
            photos: true,
            pricePeriods: true,
            appliances: true,
            internetAndTV: true,
            amenities: true
        }
    })

    if (!listing) {
        return createError({
            statusCode: 404,
            message: 'Объект не найден'
        })
    }

    const {photos, pricePeriods, appliances, amenities, internetAndTV, ...listingUpdateData} = listing

    return {
        ...listingUpdateData,
        photos: photos
            .sort((a, b) => (a.position - b.position))
            .map(photo => ({
                photoId: photo.id,
                urlMin: photo.urlMin,
            })),
        pricePeriods: pricePeriods.map(i => ({
            startDate: i.startDate,
            endDate: i.endDate,
            price: i.price,
        })),
        appliances: appliances.map(i => i.label),
        amenities: amenities.map(i => i.label),
        internetAndTV: internetAndTV.map(i => i.label)
    }
})