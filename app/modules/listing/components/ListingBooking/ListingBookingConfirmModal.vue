<script setup lang="ts">
	import useBooking from "~/modules/listing/composables/useBooking";
	import DateRangeInput from "~/common/inputs/DateRangeInput.vue";
	import GuestsInput from "~/common/inputs/GuestsInput.vue";
	import PhoneInput from "~/common/inputs/PhoneInput.vue";
	import {parsePhone} from "#shared/utils/booking.utils";
	import type {BookingCreateDTO} from "#shared/types/booking.types";
	import type {FormError, FormSubmitEvent} from "#ui/types";
	import useTelegram from "~/common/composables/useTelegram";
	import useListing from "~/modules/listing/composables/useListing";
	
	const {bookingConfirmModal, bookingData, calculatedPrices} = useBooking();
	const {listing} = useListing();
	const {isMobile} = useDevice();
	
	const methods = ['По телефону', 'Whats up', 'Telegram'];
	
	interface BookingFormState {
		userName?: string;
		userPhone?: string;
		comment?: string;
		communication: string;
	}
	
	
	const state = ref<BookingFormState>({
		userName: undefined,
		userPhone: undefined,
		comment: undefined,
		communication: 'По телефону'
	})
	
	async function validateState(state: any): Promise<FormError[]> {
		const errors = [];
		const formatedPhone = await parsePhone(state.userPhone);
		if (!state.userName) errors.push({ path: 'userName', message: 'Введите имя' });
		if (!state.userPhone || !formatedPhone) errors.push({ path: 'userPhone', message: 'Введите телефон в корректном формате' });
		return errors;
	}
	const loading = ref(false)
	async function onSubmit(event: FormSubmitEvent<BookingFormState>) {
		const {userPhone, ...formData} = state.value;
		const formatedPhone = await parsePhone(userPhone);
		const dto: BookingCreateDTO = {
			checkIn: bookingData.value.checkIn,
			checkOut: bookingData.value.checkOut,
			adults: bookingData.value.adults,
			childrenAges: bookingData.value.childrenAges,
			childrenCount: bookingData.value.childrenCount,
			userPhone: formatedPhone,
			...formData,
			...calculatedPrices.value
		};
		const {sendBookingInfo} = useTelegram();
		try {
			await sendBookingInfo(dto, `https://sky-apartments.ru/listing/${listing.value.id}`);
			bookingConfirmModal.value = false;
			const toast = useToast();
			toast.add({ title: 'Заявка успешно отправлена!' });
		} catch (e) {
		
		} finally {
			loading.value = false;
		}
		
		
	}

</script>

<template>
	<UModal v-model="bookingConfirmModal"  :fullscreen="isMobile">
		<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						Заявка на бронирование
					</h3>
					<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="bookingConfirmModal = false" />
				</div>
			</template>
			<UForm :validate="validateState" :state="state" class="space-y-4" @submit="onSubmit">
				<DateRangeInput  block target="listing-page" v-model="bookingData"/>
				<GuestsInput block target="listing-page" v-model="bookingData"/>
				<UFormGroup name="userPhone" label="Номер телефона">
					<PhoneInput v-model="state.userPhone"/>
				</UFormGroup>
				<UFormGroup name="userName" label="Как вас зовут?">
					<UInput v-model="state.userName"/>
				</UFormGroup>
				<URadioGroup v-model="state.communication" legend="Как с вами связаться?" :options="methods" />
				<UFormGroup name="comment" label="Комментарий (необязательно)">
					<UTextarea v-model="state.comment" autoresize/>
				</UFormGroup>
				<UButton type="submit">Оставить заявку</UButton>
			</UForm>
			
		</UCard>
	</UModal>
</template>

<style scoped lang="scss">

</style>