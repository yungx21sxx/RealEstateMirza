<script setup lang="ts">
import useAuthUser from '~/modules/auth/composables/useAuthUser'
import useBooking from '~/modules/listing/composables/useBooking'
import useListing from '~/modules/listing/composables/useListing'

interface BreadcrumbLink {
  label: string
  to: string
  external?: boolean
}

const authUser = useAuthUser()

const isAdmin = computed(() => authUser.value && authUser.value.role === 'ADMIN')

const { listing } = useListing()
const { calculatedPrices, bookingData } = useBooking()
function objectToQueryString(params: Record<string, unknown>): string {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      // Если значение — массив, добавляем его элементы через запятую
      if (Array.isArray(value)) {
        query.append(key, value.join(','))
      } else {
        query.append(key, String(value))
      }
    }
  }

  return query.toString()
}

const defaultBookingData = {
  checkIn: null,
  checkOut: null,
  adults: 2,
  childrenAges: [] as number[],
  childrenCount: 0
}

const breadCrumbs = computed<BreadcrumbLink[]>(() => {
  const query = (Object.keys(defaultBookingData) as Array<keyof typeof defaultBookingData>).reduce(
    (result, key) => {
      const currentValue = bookingData.value[key]
      const defaultValue = defaultBookingData[key]

      if (JSON.stringify(currentValue) !== JSON.stringify(defaultValue)) {
        result[key] = currentValue
      }
      return result
    },
    {} as Record<string, unknown>
  )
  return [
    {
      label: 'Главная',
      to: '/'
    },
    {
      label: 'Каталог',
      to: `/catalog?${objectToQueryString(query)}`,
      external: true
    }
  ]
})

const priceStr = computed(() => {
  if (calculatedPrices.value) {
    console.log(calculatedPrices.value)
    return `${calculatedPrices.value.dailyPrice.toLocaleString('ru-RU')} ₽ за сутки`
  }
  return `от ${listing.value.minPrice.toLocaleString('ru-RU')} ₽ за сутки`
})

const toast = useToast()

const toastActions = [
  {
    label: 'Удалить',
    click: async () => {
      await $fetch(`/api/admin/listing/${listing.value.id}`, {
        method: 'DELETE'
      })
      alert('Объект удален')
      await navigateTo('/catalog')
    }
  },
  {
    label: 'Отмена',
    click: () => {
      toast.clear()
    }
  }
]
</script>

<template>
  <div class="listing-card">
    <UBreadcrumb :items="breadCrumbs" />
    <div class="mt-4">
      <h1 class="font-semibold text-2xl mb-3">
        {{ listing.title }}
      </h1>
      <div class="font-medium text-xl text-secondary">
        {{ priceStr }}
      </div>
    </div>
    <div class="flex gap-4 max-[370px]:gap-0 flex-wrap mt-4">
      <!--      <div class="flex gap-2 items-center"> -->
      <!--        <UIcon name="i-material-symbols:location-on-outline" class="text-secondary" /> -->
      <!--        <span class="text-secondary">{{ listing.address }}</span> -->
      <!--      </div> -->
      <UButton
        variant="link"
        icon="i-lucide-map-pin"
        class="text-secondary px-0"
      >
        {{ listing.address }}
      </UButton>
      <UButton to="#map" variant="link" icon="i-lucide-map" class="px-0">
        На карте
      </UButton>
    </div>

    <div v-if="isAdmin" class="flex gap-4 mt-4 max-md:flex-col">
      <UButton to="/admin/create-listing" class="bg-blue-400">
        Создать объект
      </UButton>
      <UButton :to="`/admin/update/${listing.id}`" class="bg-orange-400">
        Редактировать объект
      </UButton>
      <UButton
        class="bg-red-500"
        @click="toast.add({ title: 'Точно удалять?', actions: toastActions })"
      >
        Удалить объект
      </UButton>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
