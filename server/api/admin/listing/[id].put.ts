import {IListingFormData} from "~/modules/admin/types/formData.types";
import {H3Error} from "h3";
import {ListingSuccessCreateResponse} from "#shared/types/response.types";
import {ListingCreateDTO} from "#shared/types/dto.types";
import {prisma} from "~~/server/service/prisma.service";

export default defineEventHandler<Promise<ListingSuccessCreateResponse | H3Error>>(async event => {
    const id = parseInt(getRouterParam(event, 'id') as string);
    const dto = await readBody<ListingCreateDTO>(event);

    const {pricePeriods, photos, appliances, internetAndTV, amenities, ...updateData} = dto;

    for (const [index, photo] of photos.entries()) {
        await prisma.photo.update({
            where: {
                id: photo.photoId
            },
            data: {
                position: index
            }
        })
    }

    if (pricePeriods.length > 0) {
        await prisma.pricePeriod.deleteMany({
            where: {
                listingId: id
            }
        })
        for (const period of pricePeriods) {
            await prisma.pricePeriod.create({
                data: {
                    listingId: id,
                    price: period.price,
                    startDate: new Date(period.startDate),
                    endDate: new Date(period.endDate),
                },
            });
        }
    }
    await prisma.amenity.deleteMany({
        where: {
            listingId: id,
        }
    })
    await prisma.appliances.deleteMany({
        where: {
            listingId: id,
        }
    })
    await prisma.internetAndTV.deleteMany({
        where: {
            listingId: id,
        }
    })



    const updatedListing = await prisma.listing.update({
        where: {id},
        data: {
            ...updateData,
            photos: {
                connect: photos.map(photo => ({id: photo.photoId})),
            },
            appliances: {
                create: appliances.map(applince => ({label: applince}))
            },
            internetAndTV: {
                create: internetAndTV.map(i => ({label: i}))
            },
            amenities: {
                create: amenities.map(i => ({label: i}))
            }
        }
    })

    return {
        listingId: updatedListing.id
    }
})