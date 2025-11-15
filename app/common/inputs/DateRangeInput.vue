<script setup lang="ts">
  import type { BookingFiltersDTO } from '#shared/types/dto.types';
  import { DatePicker } from 'v-calendar';
  import { beautifyDate, calculateDaysBetweenDates } from '../utils/dates.utils';

  const bookingData = defineModel<BookingFiltersDTO>({ required: true });
  const { isMobile } = useDevice();

  // v-calendar expects undefined for empty range parts in v-model.range
  // Use a relaxed type for v-model.range to satisfy v-calendar typings
  const dates = ref<any>({
    start: bookingData.value.checkIn ?? undefined,
    end: bookingData.value.checkOut ?? undefined,
  });

  const dateInputOpen = defineModel<boolean>('open', { default: false });

  watch(dates, (newValue) => {
    const { start, end } = newValue;
    bookingData.value.checkIn = start ?? null;
    bookingData.value.checkOut = end ?? null;
  });

  watch(
    () => [bookingData.value.checkIn, bookingData.value.checkOut],
    ([checkIn, checkOut]) => {
      dates.value.start = checkIn || undefined;
      dates.value.end = checkOut || undefined;
    },
  );

  withDefaults(
    defineProps<{
      block?: boolean;
      target?: 'listing-page' | 'catalog';
    }>(),
    {
      block: false,
      target: 'catalog',
    },
  );

  const resetDates = () => {
    bookingData.value.checkIn = null;
    bookingData.value.checkOut = null;
    dateInputOpen.value = false;
  };

  const buttonLabel = computed(() => {
    if (!dates.value.start && !dates.value.end) {
      return 'Выберите даты';
    }
    return `${beautifyDate(dates.value.start || new Date())} - ${beautifyDate(
      dates.value.end || new Date(),
    )}`;
  });
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
            : 'catalog_btn',
        ]"
        :block="block"
        icon="i-heroicons-calendar-days-20-solid"
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
            <UButton variant="soft" @click="resetDates">Сбросить</UButton>
            <UButton class="ml-4" @click="dateInputOpen = false">Сохранить</UButton>
          </template>
        </UCard>
      </template>
    </UPopover>
    <div v-else>
      <UButton
        :class="[
          target === 'listing-page'
            ? 'bg-block-gray text-main flex-row-reverse justify-between mt-1 hover:bg-gray-200 active:bg-gray-200 transition-all'
            : 'catalog_btn',
        ]"
        :block="block"
        icon="i-heroicons-calendar-days-20-solid"
        @click="dateInputOpen = true"
      >
        {{ buttonLabel }}
      </UButton>
      <UModal v-model:open="dateInputOpen" fullscreen>
        <template #header>
          <div class="w-full">
            <div class="flex items-center justify-between gap-4 mb-4 w-full">
              <h3 class="font-semibold text-xl">Выберите даты</h3>
              <button class="block p-0" @click="dateInputOpen = false">
                <UIcon class="h-7 w-7" name="i-material-symbols:close-rounded" />
              </button>
            </div>
            <div v-if="!dates.start && !dates.end">
              <p class="mb-4">Введите даты поездки чтобы увидеть актуальные цены</p>
            </div>
            <div v-else class="header__dates">
              <h2 class="font-semibold text-lg mb-2">
                {{ beautifyDate(dates.start || new Date()) }} -
                {{ beautifyDate(dates.end || new Date()) }}
              </h2>
              <p class="mb-4">
                {{ calculateDaysBetweenDates(dates.start || new Date(), dates.end || new Date()) }}
              </p>
            </div>
          </div>
        </template>
        <template #body>
          <DatePicker
            v-model.range="dates"
            :min-date="new Date()"
            expanded
            :rows="12"
            :columns="1"
            color="orange"
          />
          <div class="fixed bottom-0 left-0 right-0 z-[1000] p-4">
            <UButton block @click="dateInputOpen = false">Сохранить</UButton>
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
