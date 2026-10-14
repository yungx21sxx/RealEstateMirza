import type { ListingCreateDTO } from '#shared/types/dto.types'
import type { ListingSuccessCreateResponse } from '#shared/types/response.types'
import type { IListingFormData } from '~/modules/admin/types/formData.types'

export default () => {
  async function fetchUpdateData(id: number): Promise<IListingFormData> {
    const response = await $fetch<IListingFormData>(`/api/admin/listing/${id}`)
    const { pricePeriods, ...rest } = response
    return {
      ...rest,
      pricePeriods: pricePeriods.map((i) => ({
        startDate: new Date(i.startDate),
        endDate: new Date(i.endDate),
        price: i.price
      }))
    }
  }

  async function updateListing(
    listingId: number,
    dto: ListingCreateDTO
  ): Promise<ListingSuccessCreateResponse> {
    try {
      return await $fetch<ListingSuccessCreateResponse>(`/api/admin/listing/${listingId}`, {
        method: 'PUT',
        body: dto
      })
    } catch (e: unknown) {
      throw e
    }
  }

  return {
    fetchUpdateData,
    updateListing
  }
}
