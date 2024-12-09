<script setup lang="ts">
	import useListing from "~/modules/listing/composables/useListing";
	import {parseQueryToBookingFilters} from "#shared/utils/booking.utils";
	import useBooking from "~/modules/listing/composables/useBooking";
	import type {LocationQuery} from "vue-router";
	import MenuMain from "~/modules/menu/components/MenuMain.vue";
	import ListingHeader from "~/modules/listing/components/ListingPage/ListingHeader.vue";
	import ListingParams from "~/modules/listing/components/ListingPage/ListingParams.vue";
	import ListingSetBookingInfo from "~/modules/listing/components/ListingBooking/ListingSetBookingInfo.vue";
	import GalleryMainSlider from "~/modules/listing/components/Gallery/GalleryMainSlider.vue";
	import GalleryFullScreenModal from "~/modules/listing/components/Gallery/GalleryFullScreenModal.vue";
	import ListingYMap from "~/modules/listing/components/ListingPage/ListingYMap.vue";
	import ListingDescription from "~/modules/listing/components/ListingPage/ListingDescription.vue";
	import ListingBookingConfirmModal from "~/modules/listing/components/ListingBooking/ListingBookingConfirmModal.vue";
	import RealtorContacts from "~/modules/listing/components/ListingPage/RealtorContacts.vue";
	
	const {fetchListingData, listing} = useListing();
	const {setBookingData, setPrices, bookingData} = useBooking();
	
	const route = useRoute();
	const id = parseInt(route.params.id as string, 10);
	const query = { ...route.query } as LocationQuery;
	
	const bookingFilters = parseQueryToBookingFilters(query);
	setBookingData(bookingFilters);
	
	if (!isNaN(id)) {
		await fetchListingData(id, bookingFilters);
		const {pricePeriods, minPrice} = listing.value;
		const prices = calculatePrices(pricePeriods, minPrice, bookingFilters.checkIn, bookingFilters.checkOut)
		setPrices(prices);
	} else {
		console.error('Invalid ID');
	}
	
	watch(bookingData, async (booking) => {
		const {checkIn, checkOut, ...guests} = booking;
		
		if (!checkIn && !checkOut) {
			return;
		}
		
		const {pricePeriods, minPrice} = listing.value;
		const prices = calculatePrices(pricePeriods, minPrice, checkIn, checkOut);
		setPrices(prices);
		await navigateTo({
			path: `/listing/${listing.value.id}`,
			query: {
				checkIn: checkIn?.toString(),
				checkOut: checkOut?.toString(),
				...guests
			}
		})
	}, {deep: true});

</script>

<template>
	<div class="bg-block-gray">
		<MenuMain/>
		<div class="listing-wrapper max-[960px]:block gap-6 grid grid-cols-[1fr_336px] items-start max-[960px]:py-6 py-8">
			<div class="space-y-6 max-[960px]:space-y-4">
				<ListingHeader/>
				<GalleryMainSlider/>
				<ListingParams/>
				<ListingYMap/>
				<ListingDescription/>
			</div>
			<div class="space-y-6 sticky top-16 max-[960px]:block">
				<RealtorContacts/>
				<ListingSetBookingInfo/>
			</div>
			
		</div>
	</div>
	<GalleryFullScreenModal/>
	<ListingBookingConfirmModal/>
</template>

<style lang="scss">
	.listing-card {
		background: #FFFFFF;
		padding: 16px;
		border-radius: 16px;
	}
	
	.listing-wrapper {
		margin: 0 auto;
		max-width: 1150px;
	}
	
	.listing-title {
		@apply font-semibold text-xl mb-4;
	}
</style>