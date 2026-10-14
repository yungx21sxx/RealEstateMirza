<script setup lang="ts">
import { parseQueryToBookingFilters } from '#shared/utils/booking.utils'
import { getRoomLabel } from '~/common/utils/listing.utils'
import GalleryFullScreenModal from '~/modules/listing/components/Gallery/GalleryFullScreenModal.vue'
import GalleryMainSlider from '~/modules/listing/components/Gallery/GalleryMainSlider.vue'
import ListingBookingConfirmModal from '~/modules/listing/components/ListingBooking/ListingBookingConfirmModal.vue'
import ListingSetBookingInfo from '~/modules/listing/components/ListingBooking/ListingSetBookingInfo.vue'
import ListingDescription from '~/modules/listing/components/ListingPage/ListingDescription.vue'
import ListingHeader from '~/modules/listing/components/ListingPage/ListingHeader.vue'
import ListingParams from '~/modules/listing/components/ListingPage/ListingParams.vue'
import ListingYMap from '~/modules/listing/components/ListingPage/ListingYMap.vue'
import RealtorContacts from '~/modules/listing/components/ListingPage/RealtorContacts.vue'
import useBooking from '~/modules/listing/composables/useBooking'
import useListing from '~/modules/listing/composables/useListing'
import MenuMain from '~/modules/menu/components/MenuMain.vue'

const { fetchListingData, listing } = useListing()
const { setBookingData, setPrices, bookingData } = useBooking()

const route = useRoute()
const id = parseInt(route.params.id as string, 10)
const query = { ...route.query } as Parameters<typeof parseQueryToBookingFilters>[0]

const bookingFilters = parseQueryToBookingFilters(query)
setBookingData(bookingFilters)

if (!isNaN(id)) {
  await fetchListingData(id, bookingFilters)
  const { pricePeriods, minPrice } = listing.value
  const prices = calculatePrices(
    pricePeriods,
    minPrice,
    bookingFilters.checkIn,
    bookingFilters.checkOut
  )
  setPrices(prices)
} else {
  console.error('Invalid ID')
}

watch(
  bookingData,
  async (booking: typeof bookingData.value) => {
    const { checkIn, checkOut, ...guests } = booking

    const { pricePeriods, minPrice } = listing.value
    const prices = calculatePrices(pricePeriods, minPrice, checkIn, checkOut)
    setPrices(prices)
    await navigateTo({
      path: `/listing/${listing.value.id}`,
      query: {
        checkIn: checkIn ? checkIn?.toISOString() : null,
        checkOut: checkOut ? checkOut?.toISOString() : null,
        ...guests
      }
    })
  },
  { deep: true }
)

useSeoMeta({
  title: `Sky apartments: ${listing.value.title}`,
  description: `Аренда квартиры в ${listing.value.address} с ${listing.value.roomCount} комнатами, ${listing.value.area} м². Цена от ${listing.value.minPrice} руб. в месяц. Уютная и удобная для ${listing.value.places} человек.`,
  ogTitle: `Sky apartments: ${listing.value.title}`,
  ogDescription: `Аренда квартиры: ${getRoomLabel(listing.value.roomCount)}, ${listing.value.address}, ${listing.value.area} м². Цена от ${listing.value.minPrice} руб. в месяц. Уютная и удобная для ${listing.value.places} человек.`,
  ogImage: listing.value.photos[0]?.urlFull ?? '/catalog.jpeg'
})
</script>

<template>
  <div class="bg-block-gray">
    <MenuMain />
    <div
      class="listing-wrapper max-[960px]:block gap-6 grid grid-cols-[1fr_336px] items-start max-[960px]:py-6 py-8"
    >
      <div class="space-y-6 max-[960px]:space-y-4">
        <ListingHeader />
        <GalleryMainSlider />
        <ListingSetBookingInfo class="max-[960px]:block hidden" />
        <ListingParams />
        <RealtorContacts class="max-[960px]:flex hidden" />
        <ListingYMap id="map" />
        <ListingDescription />
      </div>
      <div class="space-y-6 sticky top-16 max-[960px]:hidden z-[2]">
        <RealtorContacts />
        <ListingSetBookingInfo />
      </div>
    </div>
  </div>
  <GalleryFullScreenModal />
  <ListingBookingConfirmModal />
</template>

<style lang="scss">
  .listing-card {
    background: #ffffff;
    padding: 16px;
    border-radius: 16px;
  }

  .listing-wrapper {
    margin: 0 auto;
    max-width: 1150px;
  }

  .listing-title {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 16px;
  }
</style>
