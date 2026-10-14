<script setup lang="ts">
import type { BookingCreateDTO } from '#shared/types/booking.types'
import type { FormError } from '#ui/types'
import { parsePhone } from '#shared/utils/booking.utils'
import useTelegram from '~/common/composables/useTelegram'
import DateRangeInput from '~/common/inputs/DateRangeInput.vue'
import GuestsInput from '~/common/inputs/GuestsInput.vue'
import useBooking from '~/modules/listing/composables/useBooking'
import useListing from '~/modules/listing/composables/useListing'

const { bookingConfirmModal, bookingData, calculatedPrices } = useBooking()
const { listing } = useListing()
const { isMobile } = useDevice()

const methods = ['По телефону', 'Whats up', 'Telegram']

interface BookingFormState {
  userName?: string
  userPhone?: string
  comment?: string
  communication: string
  personalDataConsent: boolean
}

const state = ref<BookingFormState>({
  userName: undefined,
  userPhone: undefined,
  comment: undefined,
  communication: 'По телефону',
  personalDataConsent: false
})

watch(bookingConfirmModal, () => {
  state.value.personalDataConsent = false
})

async function validateState(state: BookingFormState): Promise<FormError[]> {
  const errors = []
  const formatedPhone = state.userPhone ? await parsePhone(state.userPhone) : null
  if (!state.userName)
    errors.push({ name: 'userName', message: 'Введите имя' })
  if (!state.userPhone || !formatedPhone)
    errors.push({ name: 'userPhone', message: 'Введите телефон в корректном формате' })
  if (!state.personalDataConsent)
    errors.push({ name: 'personalDataConsent', message: 'Необходимо согласие на обработку персональных данных' })
  return errors
}
const loading = ref(false)
async function onSubmit() {
  const { userPhone, userName, comment, communication, personalDataConsent } = state.value
  const { checkIn, checkOut } = bookingData.value
  const prices = calculatedPrices.value
  if (loading.value || !personalDataConsent || !userPhone || !userName || !checkIn || !checkOut || !prices || !listing.value) {
    return
  }
  const dto: BookingCreateDTO = {
    checkIn,
    checkOut,
    adults: bookingData.value.adults,
    childrenAges: bookingData.value.childrenAges,
    childrenCount: bookingData.value.childrenCount,
    userPhone,
    userName,
    comment: comment ?? '',
    communication,
    listingId: listing.value.id,
    ...prices
  }
  const { sendBookingInfo } = useTelegram()
  try {
    loading.value = true
    await sendBookingInfo(dto, `https://sky-apartaments.ru/listing/${listing.value.id}`)
    bookingConfirmModal.value = false
    const toast = useToast()
    toast.add({ title: 'Заявка успешно отправлена!' })
  } catch {
    useToast().add({ title: 'Не удалось отправить заявку', description: 'Попробуйте позже.', color: 'error' })
  } finally {
    loading.value = false
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
          <UInput v-model="state.userPhone" class="w-full" />
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
        <UFormField name="personalDataConsent">
          <UCheckbox v-model="state.personalDataConsent" :disabled="loading" required>
            <template #label>
              Я даю
              <NuxtLink to="/obrabotka_personalnyh_dannyh" target="_blank" rel="noopener noreferrer" class="text-accent-700 underline underline-offset-2" @click.stop>
                согласие на обработку персональных данных
              </NuxtLink>
              и ознакомлен(а) с
              <NuxtLink to="/politika_konfidencialnosti" target="_blank" rel="noopener noreferrer" class="text-accent-700 underline underline-offset-2" @click.stop>
                политикой конфиденциальности
              </NuxtLink>.
            </template>
          </UCheckbox>
        </UFormField>
        <UButton block :loading="loading" type="submit" :disabled="!state.personalDataConsent">
          Оставить заявку
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>

<style scoped lang="scss"></style>
