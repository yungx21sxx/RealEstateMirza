<template>
  <section class="bg-light-gray">
    <div class="wrapper py-10">
      <h2 class="font-bold text-2xl md:text-3xl md:mb-8 mb-6">Объекты в управлении</h2>
      <Swiper
        v-if="listings && !loadingError"
        :slides-per-view="'auto'"
        :space-between="16"
        :scrollbar="{
          el: '.listings-swiper .swiper-scrollbar',
          draggable: true,
        }"
        :mousewheel="{ forceToAxis: true, releaseOnEdges: true }"
        :modules="[Scrollbar, Mousewheel]"
        class="listings-swiper"
        @swiper="getSwiperInstance"
      >
        <SwiperSlide
          v-for="listing of listings.slice(0, 10)"
          :key="listing.id"
          class="listings-swiper__slide"
          :style="{
            paddingBottom: '16px',
          }"
        >
          <ListingItemCatalog
            :key="listing.id"
            class="mr-2 w-[320px] max-[390px]:w-[100%] max-[390px]:mr-0"
            :listing="listing"
            :disable-carousel="true"
          />
        </SwiperSlide>
        <template #container-end>
          <div class="swiper-scrollbar" />
        </template>
      </Swiper>
      <div v-else class="h-[380px] flex justify-center items-center">
        <UIcon name="i-svg-spinners:bars-scale" class="text-accent h-10 w-10" />
      </div>
      <div class="flex gap-4 mt-8">
        <div class="action">
          <UButton
            to="/catalog"
            title="Перейти в каталог для просмотра всех объектов"
            aria-label="Перейти в каталог"
          >
            Смотреть все
          </UButton>
        </div>
        <div class="flex gap-4">
          <UButton
            size="xl"
            variant="soft"
            icon="i-prime:arrow-circle-left"
            class="rounded-full h-10 w-10"
            aria-label="Перейти к предыдущему объекту"
            @click="swiperController.slidePrev()"
          ></UButton>
          <UButton
            size="xl"
            variant="soft"
            icon="i-prime:arrow-circle-right"
            class="rounded-full h-10 w-10"
            aria-label="Перейти к следующему объекту"
            @click="swiperController.slideNext()"
          ></UButton>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper Vue.js components

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/scrollbar';
  import 'swiper/css/navigation';
  import { Mousewheel, Scrollbar } from 'swiper/modules';
  import type { ListingCatalogResponse } from '#shared/types/response.types';
  import ListingItemCatalog from '~/modules/listing/components/shared/ListingItemCatalog.vue';

  // import required modules
  const { isMobile } = useDevice();

  const swiperController = ref();

  //@ts-ignore
  const getSwiperInstance = (swiper) => {
    swiperController.value = swiper;
  };

  const listings = shallowRef<ListingCatalogResponse[] | null>(null);
  const loadingError = ref(false);

  onMounted(async () => {
    try {
      const data = await $fetch<{
        listings: ListingCatalogResponse[];
        count: number;
      }>(`/api/listing/catalog`);
      listings.value = data.listings;
    } catch (e) {
      loadingError.value = true;
    }
  });
</script>

<style lang="scss">
  .listings-swiper {
    position: relative;
    padding-bottom: 24px !important;
  }
  .listings-swiper .swiper-wrapper {
    align-items: stretch !important;
  }

  .listings-swiper .swiper-scrollbar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 8px !important;
    border-radius: 9999px !important;
    background: var(--color-block-gray);
  }
  .listings-swiper .swiper-scrollbar-drag {
    background: var(--color-accent) !important;
    border-radius: 9999px !important;
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    @apply text-accent;
    padding: 16px;
  }

  .listings-swiper {
    &__slide {
      width: fit-content !important;
      height: auto !important;
      @media screen and (max-width: 390px) {
        width: 100% !important;
      }
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;

      > * {
        height: 100%;
      }
    }

    &__img {
      display: block;
      height: 400px;
    }

    &__footer {
      margin-top: 16px;
    }

    &__footer {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 16px;
    }
  }

  .btns {
    display: flex;
    align-items: center;
    gap: 16px;
  }
</style>
