<script setup lang="ts">
  import {
    initYmaps,
    YandexMap,
    YandexMapControls,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    YandexMapMarker,
    YandexMapZoomControl,
  } from 'vue-yandex-maps';
  import type { Feature, YMap } from '@yandex/ymaps3-types';
  import useListingFormData from '~/modules/admin/state/useListingFormData';
  import { useDebounce } from '~/common/composables/useDebounce';
  const { listingFormData } = useListingFormData();

  interface IAddressSearchResponse {
    address: string | null;
    longitude: number | null;
    latitude: number | null;
  }

  const selectedAddress = ref<IAddressSearchResponse>({
    address: null,
    longitude: null,
    latitude: null,
  });
  const searchQuery = ref('');
  const searchedAddresses = ref<IAddressSearchResponse[]>([]);
  const loading = ref(false);
  const error = ref(false);
  const map = shallowRef<null | YMap>(null);

  const setAddress = (address: IAddressSearchResponse) => {
    listingFormData.value.address = address.address;
    listingFormData.value.longitude = address.longitude;
    listingFormData.value.latitude = address.latitude;
  };

  if (
    listingFormData.value.longitude &&
    listingFormData.value.latitude &&
    listingFormData.value.address
  ) {
    selectedAddress.value = {
      address: listingFormData.value.address,
      latitude: listingFormData.value.latitude,
      longitude: listingFormData.value.longitude,
    };
  }

  const fetchAddresses = async (query: string): Promise<void> => {
    loading.value = true;
    error.value = false;
    try {
      await initYmaps();
      const addresses = await ymaps3.search({ text: query });
      console.log(addresses);
      searchedAddresses.value = addresses.map((address) => ({
        address: address.properties.name,
        latitude: address.geometry?.coordinates[1] ?? null,
        longitude: address.geometry?.coordinates[0] ?? null,
      }));
    } catch (e) {
      console.log('dfgfdg', e);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  const { debounce } = useDebounce();

  watch(
    searchQuery,
    debounce(() => {
      fetchAddresses(searchQuery.value);
    }, 200),
  );

  watch(selectedAddress, () => {
    if (
      selectedAddress.value.address &&
      selectedAddress.value.longitude &&
      selectedAddress.value.latitude
    ) {
      setAddress(selectedAddress.value);
    }
  });
</script>

<template>
  <UCard class="address -mx-4">
    <template #header>
      <h2 class="text-xl font-semibold mb-2">Рассположение</h2>
      <p>
        Введите полный адрес, затем выберите его в выпадающем меню. Если объект не имеет
        адреса/номера дома, то введите приблизительный и укажите координаты.
      </p>
    </template>
    <UFormField :error="error ? 'Ошибка, нужно выключить VPN' : false">
      <UInputMenu
        v-model:search-term="searchQuery"
        v-model="selectedAddress"
        :items="searchedAddresses"
        placeholder="Поиск адреса..."
        :loading="loading"
        label-key="address"
        trailing
        class="w-full"
      />
    </UFormField>

    <div
      v-if="selectedAddress.address && selectedAddress.longitude && selectedAddress.latitude"
      class="map listingFormData-block"
    >
      <h2 class="mb-2 mt-4 font-semibold text-lg">Жилье на карте</h2>
      <p class="mb-4"><strong>Улица дом:</strong> {{ selectedAddress.address }}</p>

      <yandex-map
        v-model="map"
        class="map__canvas"
        :settings="{
          location: {
            center: [selectedAddress.longitude, selectedAddress.latitude],
            zoom: 17,
          },
        }"
        width="100%"
      >
        <yandex-map-default-scheme-layer />
        <yandex-map-default-features-layer />
        <yandex-map-controls :settings="{ position: 'right' }">
          <yandex-map-zoom-control />
        </yandex-map-controls>
        <yandex-map-marker
          v-if="selectedAddress.longitude && selectedAddress.latitude"
          position="top left-center"
          :settings="{
            coordinates: [selectedAddress.longitude, selectedAddress.latitude],
          }"
        >
          <div class="marker">
            <UIcon class="text-accent-50 h-6 w-6" name="i-material-symbols:house-outline"></UIcon>
          </div>
        </yandex-map-marker>
      </yandex-map>
    </div>
  </UCard>
</template>

<style scoped lang="scss">
  .marker {
    top: 50%;
    left: 100%;
    right: 100%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #fff;
    @apply bg-accent;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .map {
    &__canvas {
      height: 500px !important;

      @media screen and (max-width: 600px) {
        height: 350px !important;
      }
    }
  }
</style>
