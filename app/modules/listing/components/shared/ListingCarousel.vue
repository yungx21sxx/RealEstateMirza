<script setup lang="ts">

import ListingItemCatalog from "~/modules/listing/components/shared/ListingItemCatalog.vue";
import type {ListingCatalogResponse} from "#shared/types/response.types";
defineProps<{
	listings: ListingCatalogResponse[]
}>();
const carouselRef = ref();


</script>

<template>
	<div class="bg-light-gray">
		<div class="wrapper py-10">
			<h2 class="font-bold text-2xl md:text-3xl mb-6">Объекты в управлении</h2>
			<UCarousel
				ref="carouselRef"
				:items="listings"
				:ui="{
					item: 'snap-end',
					indicators: {
				        wrapper: 'relative bottom-0 mt-8 max-md:mt-4'
				    }
				}"
				indicators
			>
				<template #default="{ item }">
					<ListingItemCatalog :key="item.id" class="mr-4 w-[320px] max-w-[350px]:300px" :listing="item"/>
				</template>
				<template #indicator="{ onClick, page, active }">
					<div @click="onClick(page)" :class="['rounded-full h-2 transition-all ease cursor-pointer', active ? 'w-4 bg-accent' : 'w-2 bg-accent-200']" />
				</template>
			</UCarousel>
			
			<div class="flex gap-4 mt-8">
				<div class="action">
					<UButton to="/catalog">Смотреть все</UButton>
				</div>
				<div class="flex gap-4" >
					<UButton @click="carouselRef.prev()" size="xl" variant="soft" icon="i-prime:arrow-circle-left" class="rounded-full h-10 w-10"></UButton>
					<UButton @click="carouselRef.next()" size="xl" variant="soft" icon="i-prime:arrow-circle-right" class="rounded-full h-10 w-10"></UButton>
				</div>
			</div>
		</div>
	</div>

</template>

<style scoped lang="scss">

</style>