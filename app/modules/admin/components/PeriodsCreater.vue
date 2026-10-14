<script setup lang="ts">
import type { IListingPricePeriod } from '#shared/types/listing.types'
import { DatePicker } from 'v-calendar'
import { beautifyDate } from '~/common/utils/dates.utils'

const { isMobile } = useDevice()

const pricePeriods = defineModel<IListingPricePeriod[]>({
  required: true
})

const currentDatesRange = ref({
  start: null,
  end: null
})
const priceForRange = ref<number | null>(null)

const attrs = computed(() => [
  ...pricePeriods.value.map((pricePeriod: IListingPricePeriod) => ({
    highlight: 'green',
    dates: { start: pricePeriod.startDate, end: pricePeriod.endDate },
    popover: {
      label: `с ${beautifyDate(pricePeriod.startDate)} до ${beautifyDate(pricePeriod.endDate)}. Цена ${pricePeriod.price.toLocaleString('ru-RU')} руб.`,
      visibility: 'click'
    }
  }))
])

function isDateOverlap(period1: IListingPricePeriod, period2: IListingPricePeriod): boolean {
  const startDate1 = new Date(period1.startDate)
  const endDate1 = new Date(period1.endDate)
  const startDate2 = new Date(period2.startDate)
  const endDate2 = new Date(period2.endDate)

  return startDate1 <= endDate2 && endDate1 >= startDate2
}

function checkPriceOverlap(
  periods: IListingPricePeriod[],
  newPeriod: IListingPricePeriod
): boolean {
  for (const period of periods) {
    if (isDateOverlap(period, newPeriod)) {
      return true
    }
  }
  return false
}

function createPricePeriod() {
  if (
    currentDatesRange.value.start
    && currentDatesRange.value.end
    && priceForRange.value !== 0
    && pricePeriods.value
  ) {
    const tmp = {
      startDate: currentDatesRange.value.start,
      endDate: currentDatesRange.value.end,
      price: priceForRange.value
    }
    if (checkPriceOverlap(pricePeriods.value, tmp)) {
      return
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
      <ClientOnly>
        <DatePicker
          v-model.range="currentDatesRange"
          :min-date="new Date()"
          expanded
          :columns="isMobile ? 1 : 2"
          :attributes="attrs"
        />
      </ClientOnly>
      <UFormField label="Цена" class="mb-4 mt-4">
        <UInput
          v-model="priceForRange"
          class="w-full"
          :model-modifiers="{ number: true }"
          type="number"
        />
      </UFormField>
    </div>
    <UButton @click="createPricePeriod">
      Добавить период
    </UButton>

    <div class="prices">
      <div v-for="(pricePeriod, index) in pricePeriods" v-if="pricePeriods" class="price-period">
        <UIcon name="i-lucide-calendar-days" />
        <div>
          <div class="date">
            {{ beautifyDate(pricePeriod.startDate) }} - {{ beautifyDate(pricePeriod.endDate) }}
          </div>
          <div class="price">
            {{ pricePeriod.price.toLocaleString() }} руб. за ночь
          </div>
        </div>
        <UButton
          icon="i-lucide-x"
          class="mr-4"
          variant="ghost"
          @click="pricePeriods.splice(index, 1)"
        />
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
    background: #f1f3f9;
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
