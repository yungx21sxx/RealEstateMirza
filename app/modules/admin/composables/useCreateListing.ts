import type {ListingCreateDTO} from "#shared/types/dto.types";
import type {ListingSuccessCreateResponse} from "#shared/types/response.types";
import type {H3Error} from "h3";

export default () => {
    async function submitListingData(dto: ListingCreateDTO): Promise<ListingSuccessCreateResponse> {
        try {
            return await $fetch<ListingSuccessCreateResponse>('/api/admin/listing/create', {
                method: 'POST',
                body: dto
            });
        } catch (e: H3Error | any) {
            throw e;
        }
    }

    return {
        submitListingData
    }
}