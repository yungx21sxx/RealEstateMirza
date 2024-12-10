import type {IListingFormData} from "~/modules/admin/types/formData.types";
import type {ListingCreateDTO} from "#shared/types/dto.types";
import type {ListingSuccessCreateResponse} from "#shared/types/response.types";
import type {H3Error} from "h3";

export default () => {
    async function fetchUpdateData(id: number): Promise<IListingFormData> {
        const {pricePeriods, ...response} = await $fetch(`/api/admin/listing/${id}`);
        return {
            ...response,
            pricePeriods: pricePeriods.map(i => ({
                startDate: new Date(i.startDate),
                endDate: new Date(i.endDate),
                price: i.price
            }))
        }
    }

    async function updateListing(listingId: number, dto: ListingCreateDTO): Promise<ListingSuccessCreateResponse> {
        try {
            return await $fetch<ListingSuccessCreateResponse>(`/api/admin/listing/${listingId}`, {
                method: 'PUT',
                body: dto
            })
        } catch (e: H3Error | any) {
            throw e;
        }
    }

    return {
        fetchUpdateData,
        updateListing
    }
}