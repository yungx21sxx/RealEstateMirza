<script setup lang="ts">
import type { BookingFiltersDTO } from '#shared/types/dto.types'
import type { ListingCatalogResponse } from '#shared/types/response.types'
import AreaIcon from '~/modules/listing/icons/AreaIcon.vue'
import BedIcon from '~/modules/listing/icons/BedIcon.vue'
import DotIcon from '~/modules/listing/icons/DotIcon.vue'
import RoomIIcon from '~/modules/listing/icons/RoomIIcon.vue'
import { formatNights } from '../../../../common/utils/dates.utils'
import { getRoomLabel } from '../../../../common/utils/listing.utils'

const {
  bookingInfo = {
    checkIn: null,
    checkOut: null,
    adults: 2,
    childrenAges: [],
    childrenCount: 0
  }
} = defineProps<{
  listing: ListingCatalogResponse
  bookingInfo?: BookingFiltersDTO
  disableCarousel?: boolean
}>()

const defaultBookingInfo = {
  checkIn: null,
  checkOut: null,
  adults: 2,
  childrenAges: [] as number[],
  childrenCount: 0
}

const carouselRef = useTemplateRef('carouselRef')

async function goToListing(id: number) {
  const { checkIn, checkOut, ...guests } = bookingInfo
  const query = Object.entries(bookingInfo).reduce(
    (result, [key, value]) => {
      if (
        JSON.stringify(value)
        !== JSON.stringify(defaultBookingInfo[key as keyof typeof defaultBookingInfo])
      ) {
        result[key] = value
      }
      return result
    },
    {} as Record<string, any>
  )

  await navigateTo({
    path: `/listing/${id}`,
    query
  })
}
</script>

<template>
  <div
    class="listing rounded-2xl bg-white hover:shadow-card-active active:shadow-card-active transition-all cursor-pointer h-full flex flex-col overflow-hidden border border-black/5"
  >
    <div v-if="!disableCarousel" class="relative">
      <UCarousel
        ref="carouselRef"
        v-slot="{ item }"
        :items="listing.photos"
        :ui="{
          item: 'basis-[100%]'
        }"
        class="rounded-t-lg"
        wheel-gestures
      >
        <img
          loading="lazy"
          :alt="listing.title"
          :src="item"
          class="w-full h-[200px] rounded-t-lg object-cover"
          @click="goToListing(listing.id)"
        >
      </UCarousel>

      <div class="absolute inset-y-0 left-0 flex items-center">
        <UButton
          size="xl"
          icon="i-lucide-chevron-left"
          class="rounded-full h-10 w-10 ml-2 bg-accent-100 text-accent-400 hover:bg-accent-200 active:bg-accent-200"
          aria-label="Предыдущая фотография"
          @click.stop="carouselRef?.emblaApi?.scrollPrev()"
        />
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center">
        <UButton
          size="xl"
          icon="i-lucide-chevron-right"
          class="rounded-full h-10 w-10 mr-2 bg-accent-100 text-accent-400 hover:bg-accent-200 active:bg-accent-200"
          aria-label="Следующая фотография"
          @click.stop="carouselRef?.emblaApi?.scrollNext()"
        />
      </div>
    </div>
    <img
      v-else
      loading="lazy"
      :alt="listing.title"
      :src="listing.photos[0]"
      class="w-full h-[200px] rounded-t-lg"
      @click="goToListing(listing.id)"
    >
    <div class="p-4 block space-y-4" @click="goToListing(listing.id)">
      <p class="text-lg catalog-title">
        {{ listing.title }}
      </p>
      <div class="flex flex-wrap gap-2">
        <div class="chip">
          <BedIcon />
          <span>{{ listing.places }} мест</span>
        </div>
        <div class="chip">
          <AreaIcon />
          <span>{{ listing.area }} м<sup>2</sup></span>
        </div>
        <div class="chip">
          <RoomIIcon />
          <span>{{ getRoomLabel(listing.rooms) }}</span>
        </div>
      </div>
      <div v-if="!listing.calculatedPrices" class="flex items-center gap-2">
        <span class="font-semibold text-lg">от {{ listing.minPrice.toLocaleString('ru-RU') }} ₽</span>
        <DotIcon />
        <span class="text-secondary text-lg">в сутки</span>
      </div>
      <div v-else class="flex items-center gap-2">
        <span class="font-semibold text-lg">от {{ listing.calculatedPrices.totalPrice?.toLocaleString('ru-RU') }} ₽</span>
        <DotIcon />
        <span class="text-secondary text-lg">за {{ formatNights(listing.calculatedPrices.daysCount) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .listing {
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.08),
      0 1px 3px rgba(0, 0, 0, 0.06);
  }
  @media screen and (hover: hover) {
    .listing:hover {
      box-shadow:
        0 6px 16px rgba(0, 0, 0, 0.12),
        0 2px 6px rgba(0, 0, 0, 0.08);
    }
  }

  .catalog-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
  }

  .listing .chip,
  .listing span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .listing .chip {
    max-width: 100%;
    background: color-mix(in srgb, var(--color-secondary-50) 60%, white);
    border: 1px solid color-mix(in srgb, var(--color-primary-200) 40%, transparent);
    border-radius: 9999px;
    padding: 6px 10px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
</style>
