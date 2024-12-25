<script setup lang="ts">

import MenuMain from "~/modules/menu/components/MenuMain.vue";
import ListingItemCatalog from "~/modules/listing/components/shared/ListingItemCatalog.vue";
import GuestsInput from "~/common/inputs/GuestsInput.vue";
import DateRangeInput from "~/common/inputs/DateRangeInput.vue";
import type {LocationQuery} from "vue-router";
import type {BookingFiltersDTO} from "#shared/types/dto.types";
import type {ListingCatalogResponse} from "#shared/types/response.types";

useSeoMeta({
	title: 'Снять аппартаменты в Москве посуточно, цены на 2025 год',
	description: 'Удобное расположение, стильный интерьер и проверенные объекты для комфортного проживания в Москве',
	ogTitle: 'Снять аппартаменты в Москве посуточно, цены на 2025 год',
	ogDescription: 'Удобное расположение, стильный интерьер и проверенные объекты для комфортного проживания в Москве',
	ogImage: '/catalog.jpeg',
})
useHead({
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				"itemListElement": [
					{
						"@type": "ListItem",
						"position": 1,
						"name": "Главная",
						"item": "https://sky-apartaments.ru/"
					},
					{
						"@type": "ListItem",
						"position": 2,
						"name": "Каталог",
						"item": "https://sky-apartaments.ru/catalog"
					}
				]
			})
		}
	]
})

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
	
	await refresh();
	await navigateTo({
		path: `/catalog`,
		query: {
			checkIn: checkIn ? checkIn.toISOString() : null,
			checkOut: checkOut ? checkOut.toISOString() : null,
			...guests
		}
	})
}, {deep: true})

const {isMobile} = useDevice()
</script>

<template>
	<header class="hero relative bg-gradient-to-b from-black/60 to-black/40">
		<MenuMain variant="light" class="absolute z-10"/>
		<div class="z-10 wrapper w-full">
			<div class="text-white py-44 ">
				<h1 class="font-semibold max-w-xl text-5xl max-md:text-4xl mb-4 leading-[55px] max-md:leading-[45px]">Аппартаменты посуточно в Москве</h1>
				<div class="p-4 bg-gradient-to-r from-accent/50 backdrop-blur-md to-accent/0 max-w-xl rounded-md">
					<p class="text-xl max-md:text-base ">Просторные апартаменты бизнес-класса с современным дизайном и удобным расположением. Идеально подходят для длительного проживания, работы и отдыха.</p>
				</div>
<!--				<p class="text-xl max-md:text-base max-w-xl">Просторные апартаменты бизнес-класса с современным дизайном и удобным расположением. Идеально подходят для длительного проживания, работы и отдыха.</p>-->
				
			</div>
		</div>
		<NuxtImg fit="cover" alt="Сдача квартир посуточно с гарантией надежности и максимальной доходности" class="object-cover absolute -z-10 w-full h-full top-0 left-0 right-0 bottom-0" src="/catalog.jpeg" format="webp" quality="100"/>
	</header>
	<div class="bg-block-gray py-8" v-if="data">
		<div class="wrapper">
			<div class="flex gap-4 max-[430px]:flex-col">
				<DateRangeInput :block="isMobile" v-model="bookingFilters"/>
				<GuestsInput :block="isMobile" v-model="bookingFilters"/>
			</div>
			<div class="listings-grid mt-8">
				<ListingItemCatalog
					v-for="listing of data.listings"
					:booking-info="bookingFilters"
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

		@media screen and (min-width: 1000px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>