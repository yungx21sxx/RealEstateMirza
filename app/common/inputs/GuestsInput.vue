<script setup lang="ts">
import type { BookingFiltersDTO } from '#shared/types/dto.types';
import { describeGroup, getYearWord } from '#shared/utils/booking.utils';

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

const ageOptions = [
  'до года',
  ...Array.from({ length: 17 }, (_, i) => `${i + 1} ${getYearWord(i + 1)}`)
]

const guests = defineModel<BookingFiltersDTO>({ required: true })

function addChild() {
  guests.value.childrenCount++
  guests.value.childrenAges.push(0)
}

function removeChild(index?: number) {
  if (guests.value.childrenCount === 0)
    return

  if (index) {
    guests.value.childrenCount--
    guests.value.childrenAges.splice(index, 1)
    return
  }

  guests.value.childrenCount--
  guests.value.childrenAges.pop()
}

const options = computed(() => ageOptions.map((label, id) => ({ label, id })))

const isOpen = ref(false)
</script>

<template>
  <div>
    <span v-if="target === 'listing-page'" class="text-sm text-secondary"> Заселение и выезд </span>
    <UPopover v-model:open="isOpen">
      <UButton
        :block="block"
        :class="[
          target === 'listing-page'
            ? 'bg-block-gray text-main flex-row-reverse justify-between mt-1 hover:bg-gray-200 active:bg-gray-200 transition-all'
            : 'catalog_btn'
        ]"
        :variant="target === 'listing-page' ? 'solid' : 'outline'"
        icon="i-lucide-users"
      >
        {{ describeGroup(guests.adults, guests.childrenCount) }}
      </UButton>
      <template #content>
        <div class="p-4 overflow-visible w-[300px]">
          <div class="flex items-center justify-between gap-8">
            <div>
              <div class="font-semibold">
                Взрослые
              </div>
              <div class="text-secondary text-xs mt-1">
                От 18 лет
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UButton
                variant="ghost"
                icon="i-lucide-minus"
                :disabled="guests.adults === 1"
                @click="guests.adults -= 1"
              />
              <span>{{ guests.adults }}</span>
              <UButton variant="ghost" icon="i-lucide-plus" @click="guests.adults += 1" />
            </div>
          </div>
          <div class="flex items-center justify-between gap-8 mt-4">
            <div>
              <div class="font-semibold">
                Дети
              </div>
              <div class="text-secondary text-xs mt-1">
                от 0 до 17 лет
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UButton
                variant="ghost"
                icon="i-lucide-minus"
                :disabled="guests.childrenCount === 0"
                @click="removeChild()"
              />
              <span>{{ guests.childrenCount }}</span>
              <UButton variant="ghost" icon="i-lucide-plus" @click="addChild" />
            </div>
          </div>
          <div v-if="guests.childrenCount > 0" class="space-y-4">
            <div
              v-for="(age, index) in guests.childrenAges"
              :key="index"
              class="flex gap-2 items-center mt-4"
            >
              <USelectMenu
                v-model="guests.childrenAges[index]"
                :items="options"
                :popper="{ offsetDistance: 10, strategy: 'fixed' }"
                value-key="id"
                placeholder="Выберите возраст"
                class="w-full"
              />
              <UButton variant="soft" icon="i-lucide-x" @click="removeChild(index)" />
            </div>
          </div>
          <UButton class="mt-4" block @click="isOpen = false">
            Готово
          </UButton>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style scoped lang="scss"></style>
