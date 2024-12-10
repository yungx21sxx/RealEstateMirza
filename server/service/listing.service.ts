import {ListingCreateDTO} from "#shared/types/dto.types";
import {prisma} from "~~/server/service/prisma.service";
import {ListingSuccessCreateResponse} from "#shared/types/response.types";

export default class ListingService {
    async createListing(dto: ListingCreateDTO): Promise<ListingSuccessCreateResponse> {
        const {pricePeriods, photos, appliances, internetAndTV, amenities, ...createData} = dto;
        const createdListing = await prisma.listing.create({
            data: {
                ...createData,
                photos: {
                    connect: photos.map(photo => ({id: photo.photoId})),
                },
                pricePeriods: {
                    create: pricePeriods
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

        return {
            listingId: createdListing.id
        }
    }
}
