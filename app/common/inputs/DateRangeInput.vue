<script setup lang="ts">
import {beautifyDate, calculateDaysBetweenDates} from "../utils/dates.utils";
import type {BookingFiltersDTO} from "#shared/types/dto.types";
import {DatePicker} from "v-calendar";

const bookingData = defineModel<BookingFiltersDTO>({required: true});
const {isMobile} = useDevice();

const dates = ref<{ start: Date | null; end: Date | null }>({
	start: bookingData.value.checkIn,
	end: bookingData.value.checkOut,
});

const dateInputOpen = defineModel('open', {default: false});

watch(dates, (newValue) => {
	const {start, end} = newValue;
	
	bookingData.value.checkIn = start;
	bookingData.value.checkOut = end;
});

watch(
	() => bookingData.value,
	(newValue) => {
		dates.value.start = newValue.checkIn;
		dates.value.end = newValue.checkOut;
	},
	{ deep: true }
)

withDefaults(
	defineProps<{
		block?: boolean,
		target?: 'listing-page' | 'catalog'
	}>(),
	{
		block: false,
		target: 'catalog'
	}
)

const datesSelectModal = ref(false);

</script>

<template>
	<div>
		<span class="btn-label" v-if="target === 'listing-page'">
		Заселение и выезд
	</span>
		<UPopover v-if="!isMobile" :popper="{ placement: 'bottom-start' }" v-model:open="dateInputOpen">
			<UButton :class="[target === 'listing-page' ? 'listing-page_btn' : 'catalog_btn']" :block="block" icon="i-heroicons-calendar-days-20-solid" v-if="!dates.start && !dates.end">
				Выберите даты
			</UButton>
			<UButton :class="[target === 'listing-page' ? 'listing-page_btn' : 'catalog_btn']" :block="block" icon="i-heroicons-calendar-days-20-solid" v-else>
				{{beautifyDate(dates.start || new Date())}} - {{beautifyDate(dates.end || new Date())}}
			</UButton>
			
			<template #panel="{ close }">
				<div class="flex flex-col">
					<DatePicker
						v-model.range="dates"
						:min-date="new Date()"
						:rows="1"
						:columns="2"
						color="orange"
						borderless
					/>
					<div class="ml-auto pr-4 pb-4 -mt-4 z-10">
						<UButton @click="dateInputOpen = false">Сохранить</UButton>
					</div>
				</div>
				
			</template>
		</UPopover>
		
		<div v-else>
			<UButton :class="[target === 'listing-page' ? 'listing-page_btn' : 'catalog_btn']" :block="block" icon="i-heroicons-calendar-days-20-solid" v-if="!dates.start && !dates.end" @click="dateInputOpen = true">
				Выберите даты
			</UButton>
			<UButton :class="[target === 'listing-page' ? 'listing-page_btn' : 'catalog_btn']" :block="block" icon="i-heroicons-calendar-days-20-solid" v-else  @click="datesSelectModal = true">
				{{beautifyDate(dates.start || new Date())}} - {{beautifyDate(dates.end || new Date())}}
			</UButton>
			<UModal fullscreen v-model="dateInputOpen">
				<UCard>
					<div>
						<div class="flex items-center justify-between gap-4 mb-4">
							<h3 class="font-semibold text-xl">Выберите даты</h3>
							<button class="block p-0" @click="dateInputOpen = false">
								<UIcon class="h-7 w-7" name="i-material-symbols:close-rounded"/>
							</button>
						</div>
						<div v-if="!dates.start && !dates.end">
							<p class="mb-4">Введите даты поездки чтобы увидеть актуальные цены</p>
						</div>
						<div class="header__dates" v-else>
							<h2 class="font-semibold text-lg mb-2">
								{{beautifyDate(dates.start || new Date())}} - {{beautifyDate(dates.end || new Date())}}
							</h2>
							<p class="mb-4">{{calculateDaysBetweenDates(dates.start || new Date(), dates.end || new Date())}}</p>
						</div>
						<DatePicker
							v-model.range="dates"
							:min-date="new Date()"
							expanded
							:rows="12"
							:columns="1"
							color="orange"
						/>
					</div>
					<div class="fixed bottom-0 left-0 right-0 z-[1000] p-4">
						<UButton block @click="dateInputOpen = false">Сохранить</UButton>
					</div>
				</UCard>
			
			</UModal>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.listing-page_btn {
		@apply bg-block-gray text-main flex-row-reverse justify-between mt-1 hover:bg-gray-200 active:bg-gray-200 transition-all;
	}
	
	.btn-label {
		@apply text-sm text-secondary;
	}
</style>
