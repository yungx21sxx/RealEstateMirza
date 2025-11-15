<script setup lang="ts">
  import useBooking from '~/modules/listing/composables/useBooking';
  import DateRangeInput from '~/common/inputs/DateRangeInput.vue';
  import GuestsInput from '~/common/inputs/GuestsInput.vue';
  import PhoneInput from '~/common/inputs/PhoneInput.vue';
  import { parsePhone } from '#shared/utils/booking.utils';
  import type { BookingCreateDTO } from '#shared/types/booking.types';
  import type { FormError, FormSubmitEvent } from '#ui/types';
  import useTelegram from '~/common/composables/useTelegram';
  import useListing from '~/modules/listing/composables/useListing';

  const { bookingConfirmModal, bookingData, calculatedPrices } = useBooking();
  const { listing } = useListing();
  const { isMobile } = useDevice();

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
    communication: 'По телефону',
  });

  async function validateState(state: any): Promise<FormError[]> {
    const errors = [];
    const formatedPhone = await parsePhone(state.userPhone);
    if (!state.userName) errors.push({ path: 'userName', message: 'Введите имя' });
    if (!state.userPhone || !formatedPhone)
      errors.push({ path: 'userPhone', message: 'Введите телефон в корректном формате' });
    return errors;
  }
  const loading = ref(false);
  async function onSubmit(event: FormSubmitEvent<BookingFormState>) {
    const { userPhone, ...formData } = state.value;
    const dto: BookingCreateDTO = {
      checkIn: bookingData.value.checkIn,
      checkOut: bookingData.value.checkOut,
      adults: bookingData.value.adults,
      childrenAges: bookingData.value.childrenAges,
      childrenCount: bookingData.value.childrenCount,
      userPhone,
      ...formData,
      ...calculatedPrices.value,
    };
    const { sendBookingInfo } = useTelegram();
    try {
      loading.value = true;
      await sendBookingInfo(dto, `https://sky-apartaments.ru/listing/${listing.value.id}`);
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
  <UModal v-model:open="bookingConfirmModal" :fullscreen="isMobile" title="Заявка на бронирование">
    <template #body>
      <UForm :validate="validateState" :state="state" class="space-y-4" @submit="onSubmit">
        <DateRangeInput v-model="bookingData" block target="listing-page" />
        <GuestsInput v-model="bookingData" block target="listing-page" />
        <UFormField name="userPhone" label="Номер телефона">
          <PhoneInput v-model="state.userPhone" />
        </UFormField>
        <UFormField name="userName" label="Как вас зовут?">
          <UInput v-model="state.userName" class="w-full" />
        </UFormField>
        <URadioGroup
          v-model="state.communication"
          legend="Как с вами связаться?"
          :items="methods"
        />
        <UFormField name="comment" label="Комментарий (необязательно)">
          <UTextarea v-model="state.comment" autoresize class="w-full" />
        </UFormField>
        <UButton block :loading="loading" type="submit">Оставить заявку</UButton>
        <p class="text-gray-500 mt-6 text-sm text-center max-md:text-xs">
          Нажимая кнопку "Оставить заявку", вы соглашаетесь с условиями
          <NuxtLink to="/obrabotka_personalnyh_dannyh" class="text-main"
            >обработки персональных данных</NuxtLink
          >
        </p>
      </UForm>
    </template>
  </UModal>
</template>

<style scoped lang="scss"></style>
