import type {BookingFiltersDTO} from "#shared/types/dto.types";
import type {IListingResponse, ListingCatalogResponse} from "#shared/types/response.types";
import type {H3Error} from "h3";

export default () => {
    const listing = useState<IListingResponse>('listing');

    async function fetchListingData(listingId: number, bookingFilters: BookingFiltersDTO): Promise<void> {
        try {
            listing.value = await $fetch<IListingResponse>(`/api/listing/${listingId}`, {
                query: bookingFilters,
            })
        } catch (e: H3Error | any) {
            throw e
        }
    }

    return {
        fetchListingData,
        listing
    }
}