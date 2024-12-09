<script setup lang="ts">
	import { beautifyDate } from "~/common/utils/dates.utils";
	import type {IListingPricePeriod} from "#shared/types/listing.types";
	const {isMobile} = useDevice();
	
	const pricePeriods = defineModel<IListingPricePeriod[]>({
		required: true,
	});

	const currentDatesRange = ref({
		start: null,
		end: null,
	});
	const priceForRange = ref<number | null>(null);
	
	const attrs = computed(() => [
		...pricePeriods.value.map((pricePeriod: IListingPricePeriod) => (
			{
				highlight: 'green',
				dates: {start: pricePeriod.startDate, end: pricePeriod.endDate},
				popover: {
					label: `с ${beautifyDate(pricePeriod.startDate)} до ${beautifyDate(pricePeriod.endDate)}. Цена ${pricePeriod.price.toLocaleString('ru-RU')} руб.`,
					visibility: 'click',
				}
			}
	))])
	
	function isDateOverlap(period1: IListingPricePeriod, period2: IListingPricePeriod): boolean {
		const startDate1 = new Date(period1.startDate);
		const endDate1 = new Date(period1.endDate);
		const startDate2 = new Date(period2.startDate);
		const endDate2 = new Date(period2.endDate);
		
		return startDate1 <= endDate2 && endDate1 >= startDate2;
	}
	
	function checkPriceOverlap(periods: IListingPricePeriod[], newPeriod: IListingPricePeriod): boolean {
		for (let period of periods) {
			if (isDateOverlap(period, newPeriod)) {
				return true;
			}
		}
		return false;
	}

	
	const createPricePeriod = () => {
		if (currentDatesRange.value.start && currentDatesRange.value.end && priceForRange.value !== 0 && pricePeriods.value) {
			
			const tmp = {
				startDate: currentDatesRange.value.start,
				endDate: currentDatesRange.value.end,
				price: priceForRange.value
			}
			if (checkPriceOverlap(pricePeriods.value, tmp)) {
				return;
			}
			pricePeriods.value.push(tmp)
			
			currentDatesRange.value.start = null
			currentDatesRange.value.end = null
			priceForRange.value = 0
		}
	}
	
	
	
	
	
</script>

<template>

	<div>
			<div style="max-width: 700px">
				<DatePicker
					v-model.range="currentDatesRange"
					:min-date="new Date()"
					expanded
					:columns="isMobile ? 1 : 2"
					:attributes="attrs"
				/>
				<UFormGroup label="Цена" class="mb-4 mt-4">
					<UInput :model-modifiers="{number: true}" v-model="priceForRange" type="number"/>
				</UFormGroup>
			</div>
			<UButton @click="createPricePeriod">Добавить период</UButton>
			
			<div class="prices">
				<div
					v-if="pricePeriods"
					v-for="(pricePeriod, index) in pricePeriods"
					class="price-period"
				>
					<UIcon name="i-material-symbols:calendar-month-outline-rounded"/>
					<div>
						<div class="date">{{beautifyDate(pricePeriod.startDate)}} - {{beautifyDate(pricePeriod.endDate)}}</div>
						<div class="price">{{pricePeriod.price.toLocaleString()}} руб. за ночь</div>
					</div>
					<UButton icon="i-material-symbols:close-rounded" class="mr-4" variant="ghost" @click="pricePeriods.splice(index, 1)"/>
				</div>
			
			</div>
		</div>
</template>

<style scoped lang="scss">

.prices {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	margin-top: 24px;
	width: 100%;
}

.price-period {
	background: #F1F3F9;
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 8px 0 8px 16px;
	border-radius: 8px;
	
	.date {
		font-size: 18px;
		font-weight: 600;
		margin-bottom: 4px;
	}
}

</style>