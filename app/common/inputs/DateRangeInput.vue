<script setup lang="ts">
import type { BookingFiltersDTO } from '#shared/types/dto.types'
import { DatePicker } from 'v-calendar'
import { beautifyDate, calculateDaysBetweenDates } from '../utils/dates.utils'

withDefaults(
  defineProps<{
    block?: boolean
    target?: 'listing-page' | 'catalog'
  }>(),
  {
    block: false,
    target: 'catalog'
  }
)
const bookingData = defineModel<BookingFiltersDTO>({ required: true })
const { isMobile } = useDevice()

interface DateRangeValue {
  start: Date | null | any
  end: Date | null | any
}

const dates = ref<DateRangeValue>({
  start: bookingData.value.checkIn ?? null,
  end: bookingData.value.checkOut ?? null
})

const dateInputOpen = defineModel<boolean>('open', { default: false })

watch(dates, (newValue: DateRangeValue) => {
  const { start, end } = newValue
  bookingData.value.checkIn = start ?? null
  bookingData.value.checkOut = end ?? null
})

watch(
  () => [bookingData.value.checkIn, bookingData.value.checkOut] as const,
  ([checkIn, checkOut]) => {
    dates.value.start = checkIn ?? null
    dates.value.end = checkOut ?? null
  }
)

function resetDates() {
  bookingData.value.checkIn = null
  bookingData.value.checkOut = null
  dateInputOpen.value = false
}

const buttonLabel = computed(() => {
  if (!dates.value.start && !dates.value.end) {
    return 'Выберите даты'
  }
  return `${beautifyDate(dates.value.start || new Date())} - ${beautifyDate(
    dates.value.end || new Date()
  )}`
})
</script>

<template>
  <div>
    <span v-if="target === 'listing-page'" class="text-sm text-secondary"> Заселение и выезд </span>
    <UPopover
      v-if="!isMobile"
      v-model:open="dateInputOpen"
      :content="{ side: 'bottom', align: 'start' }"
    >
      <UButton
        :class="[
          target === 'listing-page'
            ? 'bg-block-gray text-main flex-row-reverse justify-between mt-1 hover:bg-gray-200 active:bg-gray-200 transition-all'
            : 'catalog_btn'
        ]"
        :block="block"
        icon="i-lucide-calendar-days"
      >
        {{ buttonLabel }}
      </UButton>
      <template #content>
        <UCard>
          <template #header>
            <div v-if="!dates.start && !dates.end">
              <p>Введите даты поездки чтобы увидеть актуальные цены</p>
            </div>
            <div v-else class="header__dates">
              <h2 class="font-semibold text-lg mb-2">
                {{ beautifyDate(dates.start || new Date()) }} -
                {{ beautifyDate(dates.end || new Date()) }}
              </h2>
              <p>
                {{ calculateDaysBetweenDates(dates.start || new Date(), dates.end || new Date()) }}
              </p>
            </div>
          </template>
          <template #default>
            <DatePicker
              v-model.range="dates"
              :min-date="new Date()"
              :rows="1"
              :columns="2"
              color="orange"
              borderless
            />
          </template>
          <template #footer>
            <UButton variant="soft" @click="resetDates">
              Сбросить
            </UButton>
            <UButton class="ml-4" @click="dateInputOpen = false">
              Сохранить
            </UButton>
          </template>
        </UCard>
      </template>
    </UPopover>
    <div v-else>
      <UButton
        :class="[
          target === 'listing-page'
            ? 'bg-block-gray text-main flex-row-reverse justify-between mt-1 hover:bg-gray-200 active:bg-gray-200 transition-all'
            : 'catalog_btn'
        ]"
        :block="block"
        icon="i-lucide-calendar-days"
        @click="dateInputOpen = true"
      >
        {{ buttonLabel }}
      </UButton>
      <UDrawer
        v-model:open="dateInputOpen"
        title="Выберите даты"
        :close="{ 'aria-label': 'Закрыть выбор дат', 'square': true }"
        :ui="{
          content: 'mt-0 h-[90dvh] max-h-[calc(100dvh-1rem)] overflow-hidden rounded-t-3xl',
          handle: 'mt-3',
          container: 'min-h-0 flex-1 gap-0 overflow-hidden p-0',
          header: 'shrink-0 items-start gap-3 border-b border-gray-100 px-5 py-4',
          title: 'text-xl leading-10 tracking-tight',
          description: 'mt-1 text-sm leading-5 text-secondary',
          body: 'min-h-0 overflow-x-hidden overflow-y-auto overscroll-contain px-3 py-3',
          footer: 'shrink-0 border-t border-gray-100 bg-white px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]'
        }"
      >
        <template #description>
          <span v-if="!dates.start && !dates.end">
            Укажите даты поездки, чтобы увидеть актуальные цены
          </span>
          <span v-else class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span class="font-medium text-main">
              {{ beautifyDate(dates.start || new Date()) }} —
              {{ beautifyDate(dates.end || new Date()) }}
            </span>
            <span>
              · {{ calculateDaysBetweenDates(dates.start || new Date(), dates.end || new Date()) }}
            </span>
          </span>
        </template>
        <template #body>
          <DatePicker
            v-model.range="dates"
            :min-date="new Date()"
            expanded
            :rows="12"
            :columns="1"
            color="orange"
            borderless
          />
        </template>
        <template #footer>
          <UButton block @click="dateInputOpen = false">
            Сохранить
          </UButton>
        </template>
      </UDrawer>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
