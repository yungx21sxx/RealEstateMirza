import type { ListingCreateDTO } from '#shared/types/dto.types'
import type { ListingSuccessCreateResponse } from '#shared/types/response.types'

export default () => {
  async function submitListingData(dto: ListingCreateDTO): Promise<ListingSuccessCreateResponse> {
    try {
      return await $fetch<ListingSuccessCreateResponse>('/api/admin/listing/create', {
        method: 'POST',
        body: dto
      })
    } catch (e: unknown) {
      throw e
    }
  }

  return {
    submitListingData
  }
}
