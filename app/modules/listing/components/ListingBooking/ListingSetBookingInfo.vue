<script setup lang="ts">
	import useBooking from "~/modules/listing/composables/useBooking";
	import DateRangeInput from "~/common/inputs/DateRangeInput.vue";
	import GuestsInput from "~/common/inputs/GuestsInput.vue";
	import {formatNights} from "../../../../common/utils/dates.utils";
	
	const {calculatedPrices, bookingData, bookingConfirmModal} = useBooking();
	
	const dateSelectOpen = ref(false)
	
	
</script>

<template>
	<div class="listing-card h-fit">
		<DateRangeInput v-model="bookingData" v-model:open="dateSelectOpen" block target="listing-page"/>
		<GuestsInput class="mt-4" v-model="bookingData" block target="listing-page"/>
		<div class="mt-4" v-if="!calculatedPrices">
			<UButton block @click="dateSelectOpen = true">Выбрать даты</UButton>
		</div>
		<div v-else class="mt-6">
			<div class="flex justify-between my-4">
				<div>За сутки</div>
				<div>{{calculatedPrices.dailyPrice.toLocaleString('RU-ru')}} ₽</div>
			</div>
			<UDivider/>
			<div class="flex justify-between my-4">
				<strong>За {{formatNights(calculatedPrices.daysCount)}}</strong>
				<strong>{{calculatedPrices.totalPrice.toLocaleString('RU-ru')}} ₽</strong>
			</div>
			<UButton block @click="bookingConfirmModal = true">Забронировать</UButton>
		</div>
	</div>
	
</template>

<style scoped lang="scss">

</style>