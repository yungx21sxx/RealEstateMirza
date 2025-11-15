import ListingService from '~~/server/service/listing.service';
import type { ListingCreateDTO } from '#shared/types/dto.types';
import type { ListingSuccessCreateResponse } from '#shared/types/response.types';
import type { H3Error } from 'h3';

export default defineEventHandler<Promise<ListingSuccessCreateResponse | H3Error>>(
  async (event) => {
    const listingService = new ListingService();
    const dto = await readBody<ListingCreateDTO>(event);
    try {
      const { listingId } = await listingService.createListing(dto);

      return {
        listingId,
      };
    } catch (error) {
      throw createError({
        status: 404,
        message: `Ошибка создания объекта. Билиберда ебаная: ${error} `,
      });
    }
  },
);
