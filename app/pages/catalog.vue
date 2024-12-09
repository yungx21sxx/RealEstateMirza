<script setup lang="ts">

import MenuMain from "~/modules/menu/components/MenuMain.vue";
import ListingItemCatalog from "~/modules/listing/components/shared/ListingItemCatalog.vue";
import GuestsInput from "~/common/inputs/GuestsInput.vue";
import DateRangeInput from "~/common/inputs/DateRangeInput.vue";
import type {LocationQuery} from "vue-router";
import type {BookingFiltersDTO} from "#shared/types/dto.types";
import type {ListingCatalogResponse} from "#shared/types/response.types";

const route = useRoute();
const query = { ...route.query } as LocationQuery;

const bookingFilters = useState<BookingFiltersDTO>('bookingFilters', () => parseQueryToBookingFilters(query));

const {data, error, refresh} = await useAsyncData<{
	listings: ListingCatalogResponse[],
	count: number
}>('listings', () => $fetch(`/api/listing/catalog`, {
	query: {
		...bookingFilters.value
	}
}));

watch(bookingFilters, async (booking) => {
	const {checkIn, checkOut, ...guests} = booking;
	
	if (!checkIn && !checkOut) {
		return;
	}
	await refresh();
	await navigateTo({
		path: `/catalog`,
		query: {
			checkIn: checkIn?.toISOString(),
			checkOut: checkOut?.toISOString(),
			...guests
		}
	})
}, {deep: true})




</script>

<template>
	<MenuMain/>
	<header class="flex justify-center py-12">
		<div class="max-w-xl text-center">
			<div class="uppercase font-semibold text-accent mb-1">Все объекты</div>
			<h1 class="font-semibold text-4xl mb-4">Бронируйте жилье быстро и выгодно</h1>
			<p class="text-secondary mb-8">Выберите даты поездки и количество гостей, чтобы увидеть актуальные цены или оставьте заявку, и я подберу Вам самое лучше предложение.</p>
			<div class="flex justify-center gap-4">
				<UButton>Оставить заявку</UButton>
				<UButton variant="soft">Смотреть жилье</UButton>
			</div>
		</div>
	</header>
	<div class="bg-block-gray py-12" v-if="data">
		<div class="wrapper">
			<div class="flex gap-4">
				<DateRangeInput v-model="bookingFilters"/>
				<GuestsInput v-model="bookingFilters"/>
			</div>
			<div class="listings-grid mt-8">
				<ListingItemCatalog
					v-for="listing of data.listings"
					:key="listing.id"
					:listing="listing"
				></ListingItemCatalog>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.listings-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 24px;
	}
</style>