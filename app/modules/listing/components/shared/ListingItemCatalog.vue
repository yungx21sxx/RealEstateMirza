<script setup lang="ts">
	import type {ListingCatalogResponse} from "#shared/types/response.types";
	import BedIcon from "~/modules/listing/icons/BedIcon.vue";
	import AreaIcon from "~/modules/listing/icons/AreaIcon.vue";
	import RoomIIcon from "~/modules/listing/icons/RoomIIcon.vue";
	import DotIcon from "~/modules/listing/icons/DotIcon.vue";
	import {formatNights} from "../../../../common/utils/dates.utils";
	import {getRoomLabel} from "../../../../common/utils/listing.utils";
	import type {BookingFiltersDTO} from "#shared/types/dto.types";
	
	const defaultBookingInfo = {
		checkIn: null,
		checkOut: null,
		adults: 2,
		childrenAges: [] as number[],
		childrenCount: 0,
	};
	
	const {bookingInfo = {
		checkIn: null,
		checkOut: null,
		adults: 2,
		childrenAges: [],
		childrenCount: 0
	}} = defineProps<{
		listing: ListingCatalogResponse,
		bookingInfo?: BookingFiltersDTO
	}>();
	
	const goToListing = async (id: number) => {
		const {checkIn, checkOut, ...guests} = bookingInfo
		const query = Object.entries(bookingInfo).reduce((result, [key, value]) => {
			if (JSON.stringify(value) !== JSON.stringify(defaultBookingInfo[key as keyof typeof defaultBookingInfo])) {
				result[key] = value;
			}
			return result;
		}, {} as Record<string, any>);
		
		await navigateTo({
			path: `/listing/${id}`,
			query,
		});
	}

</script>

<template>
	<div class="shadow-card rounded-md bg-white hover:shadow-card-active transition-all cursor-pointer"
	>
		<div class="relative">
			<UCarousel v-slot="{ item }" :items="listing.photos" :ui="{ item: 'basis-full' }" class="rounded-t-lg overflow-hidden" arrows>
				<img loading="lazy" :alt="listing.title" @click="goToListing(listing.id)" :src="item" class="z-5  w-full h-[200px] object-cover">
			</UCarousel>
		</div>
		<div class="p-4 block" @click="goToListing(listing.id)">
			<p class="text-lg">{{listing.title}}</p>
			<div class="flex flex-wrap gap-2 mt-4">
				<div class="chip">
					<BedIcon/>
					<span>{{listing.places}} мест</span>
				</div>
				<div class="chip">
					<AreaIcon/>
					<span>{{listing.area}} м<sup>2</sup></span>
				</div>
				<div class="chip">
					<RoomIIcon/>
					<span>{{getRoomLabel(listing.rooms)}}</span>
				</div>
			</div>
			<div class="flex items-center gap-2 mt-4" v-if="!listing.calculatedPrices">
				<span class="font-semibold text-lg">от {{listing.minPrice.toLocaleString('ru-RU')}} ₽</span>
				<DotIcon/>
				<span class="text-secondary text-lg">в сутки</span>
			</div>
			<div class="flex items-center gap-2 mt-4" v-else>
				<span class="font-semibold text-lg">от {{listing.calculatedPrices.totalPrice?.toLocaleString('ru-RU')}} ₽</span>
				<DotIcon/>
				<span class="text-secondary text-lg">за {{formatNights(listing.calculatedPrices.daysCount)}}</span>
			</div>
		</div>
		
	</div>

</template>

<style scoped lang="scss">

.chip {
	@apply flex rounded-full bg-block-gray px-2 py-1 gap-2 text-secondary items-center text-sm;
}

</style>