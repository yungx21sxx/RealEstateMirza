<script setup lang="ts">
import type { ListingCreateDTO } from '#shared/types/dto.types'
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
import FileUploader from '~/modules/admin/components/FileUploader.vue'
import PeriodsCreater from '~/modules/admin/components/PeriodsCreater.vue'
import SetLocation from '~/modules/admin/components/SetLocation.vue'
import useCreateListing from '~/modules/admin/composables/useCreateListing'
import { transformFormToDTO } from '~/modules/admin/composables/useTransformToDTO'
import useUpdateListing from '~/modules/admin/composables/useUpdateListing'
import {
  amenitiesProperties,
  appliancesProperties,
  balconyProperties,
  internetAndTVProperties,
  parkingProperties
} from '~/modules/admin/constants/properties'
import useListingFormData from '~/modules/admin/state/useListingFormData'

const { updateMode = false } = defineProps<{
  updateMode: boolean
}>()

const listingFormValidationSchema = z.object({
  title: z.string({ message: 'Поле \'Название\' обязательно для заполнения.' }),
  description: z.string({ message: 'Поле \'Описание\' обязательно для заполнения.' }),
  minPrice: z.number({ message: 'Поле \'Минимальная цена\' должно быть больше 0.' }),

  roomCount: z.number({ message: 'Поле \'Количество комнат\' обязательно для заполнения.' }),
  bedDescription: z.string({
    message: 'Поле \'Описание спальных мест\' обязательно для заполнения.'
  }),
  area: z.number({ message: 'Поле \'Площадь\' обязательно для заполнения.' }),
  floor: z.number({ message: 'Поле \'Этаж\' обязательно для заполнения.' }),
  maxFloor: z.number({ message: 'Поле \'Этажность дома\' обязательно для заполнения.' }),
  balcony: z.string({ message: 'Поле \'Балкон\' обязательно для заполнения.' }),
  viewDescription: z.string({ message: 'Поле \'Описание вида\' обязательно для заполнения.' }),

  appliances: z.array(z.string()).refine(arr => arr.length > 0, {
    message: 'Выберите хотя бы одну опцию в поле \'Бытовая техника\'.'
  }),
  internetAndTV: z.array(z.string()).refine(arr => arr.length > 0, {
    message: 'Выберите хотя бы одну опцию в поле \'Интернет и ТВ\'.'
  }),
  amenities: z.array(z.string()).refine(arr => arr.length > 0, {
    message: 'Выберите хотя бы одну опцию в поле \'Удобства\'.'
  }),

  places: z.number({ message: 'Поле \'Количество мест\' обязательно для заполнения.' }),
  parkingDescription: z.string({
    message: 'Поле \'Описание парковки\' обязательно для заполнения.'
  })
})

type Schema = z.output<typeof listingFormValidationSchema>

const { listingFormData } = useListingFormData()

const loading = ref(false)
const route = useRoute()

const { fetchUpdateData, updateListing } = useUpdateListing()

if (updateMode) {
  try {
    listingFormData.value = await fetchUpdateData(parseInt(route.params.id as string))
  } catch (e) {
    console.log(e)
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const { submitListingData } = useCreateListing()

  const dto: ListingCreateDTO = transformFormToDTO(listingFormData.value)
  try {
    if (updateMode && route.params.id) {
      const { listingId } = await updateListing(parseInt(route.params.id as string), dto)
      await navigateTo(
        {
          path: `/listing/${listingId}`
        },
        {
          external: true
        }
      )
    } else {
      const { listingId } = await submitListingData(dto)
      await navigateTo(
        {
          path: `/listing/${listingId}`
        },
        {
          external: true
        }
      )
    }
  } catch (e: unknown) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm
    ref="form"
    :schema="listingFormValidationSchema"
    :state="listingFormData"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UCard class="-mx-4">
      <template #header>
        <h2 v-if="!updateMode" class="font-semibold text-xl">
          Создание объекта
        </h2>
        <h2 v-else class="font-semibold text-xl">
          Редактирование объекта
        </h2>
      </template>
      <div class="space-y-4">
        <UFormField label="Название" name="title">
          <UInput v-model="listingFormData.title" class="w-full" />
        </UFormField>
        <UFormField label="Описание" name="description">
          <UTextarea v-model="listingFormData.description" autoresize class="w-full" />
        </UFormField>
      </div>
    </UCard>

    <UCard class="-mx-4">
      <template #header>
        <h2 class="font-semibold text-xl mb-2">
          Цены
        </h2>
        <p>Укажите минимальную цену, после чего добавьте периоды цен.</p>
      </template>
      <div class="space-y-4">
        <UFormField label="Минимальная цена" name="minPrice">
          <UInput
            v-model="listingFormData.minPrice"
            :model-modifiers="{ number: true }"
            type="number"
            class="w-full"
          />
        </UFormField>
        <PeriodsCreater v-model="listingFormData.pricePeriods" />
      </div>
    </UCard>

    <UCard class="-mx-4">
      <h2 class="font-semibold text-xl mb-4">
        Правила проживания
      </h2>
      <div class="space-y-4">
        <UFormField label="Максимальная вместительность человек" name="places">
          <UInput
            v-model="listingFormData.places"
            :model-modifiers="{ number: true }"
            type="number"
            class="w-full"
          />
        </UFormField>
        <div class="flex gap-4">
          <USwitch v-model="listingFormData.monthlyRental" />
          <span>Возможна помесячная аренда?</span>
        </div>
        <div class="flex gap-4">
          <USwitch v-model="listingFormData.withAnimals" />
          <span>Можно с животными?</span>
        </div>
      </div>
    </UCard>
    <UCard class="-mx-4">
      <h2 class="font-semibold text-xl mb-4">
        Параметры объекта
      </h2>
      <div class="space-y-4">
        <UFormField label="Количество комнат (0 - если студия)" name="roomCount">
          <UInput
            v-model="listingFormData.roomCount"
            :model-modifiers="{ number: true }"
            type="number"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Какие кровати?" name="bedDescription">
          <UInput v-model="listingFormData.bedDescription" class="w-full" />
        </UFormField>
        <UFormField label="Площадь" name="area">
          <UInput
            v-model="listingFormData.area"
            :model-modifiers="{ number: true }"
            type="number"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Этаж" name="floor">
          <UInput
            v-model="listingFormData.floor"
            :model-modifiers="{ number: true }"
            type="number"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Этажей в доме" name="maxFloor">
          <UInput
            v-model="listingFormData.maxFloor"
            :model-modifiers="{ number: true }"
            type="number"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Балкон" name="balcony">
          <USelect v-model="listingFormData.balcony" class="w-full" :options="balconyProperties" />
        </UFormField>
        <UFormField label="Парковка" name="parkingDescription">
          <USelect
            v-model="listingFormData.parkingDescription"
            class="w-full"
            :options="parkingProperties"
          />
        </UFormField>
        <UFormField label="Описание вида" name="viewDescription">
          <UInput v-model="listingFormData.viewDescription" class="w-full" />
        </UFormField>
        <UFormField label="Техника" name="appliances">
          <USelectMenu
            v-model="listingFormData.appliances"
            class="w-full"
            placeholder="Выбери технику"
            multiple
            :items="appliancesProperties"
          />
        </UFormField>
        <UKbd v-for="i of listingFormData.appliances" class="mr-2">
          {{ i }}
        </UKbd>
        <UFormField label="Интернет и тв" name="internetAndTV">
          <USelectMenu
            v-model="listingFormData.internetAndTV"
            placeholder="Выбери Интернет и тв"
            multiple
            class="w-full"
            :items="internetAndTVProperties"
          />
        </UFormField>
        <UKbd v-for="i of listingFormData.internetAndTV" class="mr-2">
          {{ i }}
        </UKbd>
        <UFormField label="Удобства" name="amenities">
          <USelectMenu
            v-model="listingFormData.amenities"
            placeholder="Выбери Удобства"
            multiple
            class="w-full"
            :items="amenitiesProperties"
          />
        </UFormField>
        <UKbd v-for="i of listingFormData.amenities" class="mr-2">
          {{ i }}
        </UKbd>
      </div>
    </UCard>
    <FileUploader v-model="listingFormData.photos" />
    <SetLocation />
    <UButton v-if="!updateMode" type="submit" :loading="loading">
      Загрузить объект
    </UButton>
    <UButton v-else type="submit" :loading="loading">
      Обновить объект
    </UButton>
  </UForm>
</template>

<style scoped lang="scss"></style>
