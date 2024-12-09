<script setup lang="ts">
	import type {ListingCatalogResponse} from "#shared/types/response.types";
	import BedIcon from "~/modules/listing/icons/BedIcon.vue";
	import AreaIcon from "~/modules/listing/icons/AreaIcon.vue";
	import RoomIIcon from "~/modules/listing/icons/RoomIIcon.vue";
	import DotIcon from "~/modules/listing/icons/DotIcon.vue";
	import {formatNights} from "../../../../common/utils/dates.utils";
	
	defineProps<{
		listing: ListingCatalogResponse
	}>()

</script>

<template>
	<div class="shadow-card rounded-md bg-white hover:shadow-card-active transition-all">
		<div >
			<UCarousel v-slot="{ item }" :items="listing.photos" :ui="{ item: 'basis-full' }" class="rounded-t-lg overflow-hidden" arrows>
				<img :src="item" class="w-full h-[200px] object-cover" draggable="false">
			</UCarousel>
		</div>
		<NuxtLink :to="`/listing/${listing.id}`" class="p-4 block">
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
					<span>{{listing.rooms}} комнат</span>
				</div>
			</div>
			<div class="flex items-center gap-2 mt-4" v-if="!listing.calculatedPrices">
				<span class="font-semibold text-lg">от {{listing.minPrice.toLocaleString()}} ₽</span>
				<DotIcon/>
				<span class="text-secondary text-lg">в сутки</span>
			</div>
			<div class="flex items-center gap-2 mt-4" v-else>
				<span class="font-semibold text-lg">от {{listing.calculatedPrices.totalPrice?.toLocaleString()}} ₽</span>
				<DotIcon/>
				<span class="text-secondary text-lg">за {{formatNights(listing.calculatedPrices.daysCount)}}</span>
			</div>
		</NuxtLink>
		
	</div>

</template>

<style scoped lang="scss">

.chip {
	@apply flex rounded-full bg-block-gray px-2 py-1 gap-2 text-secondary items-center text-sm;
}

</style>