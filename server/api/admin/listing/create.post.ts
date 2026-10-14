import type { ListingCreateDTO } from '#shared/types/dto.types'
import type { ListingSuccessCreateResponse } from '#shared/types/response.types'
import ListingService from '~~/server/service/listing.service'

export default defineEventHandler<Promise<ListingSuccessCreateResponse>>(
  async (event: any) => {
    const listingService = new ListingService()
    const dto = await readBody<ListingCreateDTO>(event)
    try {
      const { listingId } = await listingService.createListing(dto)

      return {
        listingId
      }
    } catch (error) {
      throw createError({
        status: 404,
        message: `Ошибка создания объекта. Билиберда ебаная: ${error} `
      })
    }
  }
)
