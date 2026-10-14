<script setup lang="ts">
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
  YandexMapZoomControl,
} from 'vue-yandex-maps'

import useListing from '~/modules/listing/composables/useListing'

type YMap = object

const { listing } = useListing()

const map = shallowRef<null | YMap | undefined>(null)
</script>

<template>
  <div class="map listing-card">
    <h2 class="listing-title">
      Жилье на карте
    </h2>
    <YandexMap
      v-model="map"
      class="map__canvas"
      :settings="{
        location: {
          center: [listing.longitude, listing.latitude],
          zoom: 17
        }
      }"
      width="100%"
    >
      <YandexMapDefaultSchemeLayer />
      <YandexMapDefaultFeaturesLayer />
      <YandexMapControls :settings="{ position: 'right' }">
        <YandexMapZoomControl />
      </YandexMapControls>
      <YandexMapMarker
        position="top left-center"
        :settings="{
          coordinates: [listing.longitude, listing.latitude]
        }"
      >
        <div class="marker">
          <UIcon name="i-lucide-house" class="h-5 w-5 text-white" />
        </div>
      </YandexMapMarker>
    </YandexMap>
  </div>
</template>

<style scoped lang="scss">
  .marker {
    top: 50%;
    left: 100%;
    right: 100%;
    width: 50px;
    height: 50px;
    background-color: var(--color-accent);
    border-radius: 50%;
    border: 2px solid #fff;
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
