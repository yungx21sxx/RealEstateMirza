<script setup lang="ts">
	import useListing from "~/modules/listing/composables/useListing";
	import useBooking from "~/modules/listing/composables/useBooking";
	import {getDaysWord} from "~/common/utils/dates.utils";
	
	const {listing} = useListing();
	const {calculatedPrices} = useBooking()
	const breadCrumbs = [
		{
			label: 'Главная',
			to: '/'
		},
		{
			label: 'Каталог',
			to: '/catalog'
		}
	]
	
	const priceStr = computed(() => {
		if (calculatedPrices.value) {
			console.log(calculatedPrices.value)
			return `${calculatedPrices.value.dailyPrice.toLocaleString('ru-RU')} ₽ за сутки`
		}
		return `от ${listing.value.minPrice.toLocaleString('ru-RU')} ₽ за сутки`
	})
</script>

<template>
	<div class="listing-card">
		<UBreadcrumb :links="breadCrumbs"/>
		<div class="max-[640px]:flex-col gap-3 flex justify-between mt-3">
			<h1 class="font-semibold text-2xl">{{listing.title}}</h1>
			<div class="font-medium text-xl text-secondary">{{priceStr}}</div>
		</div>
		<div class="flex gap-4 flex-wrap mt-3">
			<div class="flex gap-2 items-center">
				<UIcon name="i-material-symbols:location-on-outline" class="text-secondary"/>
				<span class="text-secondary">{{listing.address}}</span>
			</div>
			<UButton variant="link" icon="material-symbols:map-outline">На карте</UButton>
		</div>
	</div>
	
</template>

<style scoped lang="scss">

</style>