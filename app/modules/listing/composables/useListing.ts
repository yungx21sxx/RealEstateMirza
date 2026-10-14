import type { BookingFiltersDTO } from '#shared/types/dto.types'
import type { IListingResponse } from '#shared/types/response.types'

export default () => {
  const listing = useState<IListingResponse>('listing')

  async function fetchListingData(
    listingId: number,
    bookingFilters: BookingFiltersDTO
  ): Promise<void> {
    try {
      listing.value = await $fetch<IListingResponse>(`/api/listing/${listingId}`, {
        query: bookingFilters
      })
    } catch (e: unknown) {
      throw e
    }
  }

  return {
    fetchListingData,
    listing
  }
}
