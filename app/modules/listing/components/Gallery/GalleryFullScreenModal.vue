<script setup lang="ts">
import { FreeMode, Navigation, Pagination, Scrollbar, Thumbs, Zoom } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/vue'
import useGallery from '~/modules/listing/composables/useGallery'
import useListing from '~/modules/listing/composables/useListing'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

const { currentPhoto } = useGallery()

const { listing } = useListing()

interface SwiperLike {
  activeIndex: number
  allowSlideNext: boolean
  allowSlidePrev: boolean
  slideTo: (index: number, speed?: number) => void
}

const swiperController = ref<SwiperLike | null>(null)
const thumbsSwiper = ref<SwiperLike | null>(null)

function getSwiperInstance(swiper: SwiperLike) {
  swiperController.value = swiper
  const currentPhotoIndex = currentPhoto.value.index
  swiperController.value?.slideTo(currentPhotoIndex, 0)
}

function onZoomChange(swiper: SwiperLike, scale: number) {
  if (scale > 1) {
    swiper.allowSlideNext = false
    swiper.allowSlidePrev = false
  } else {
    swiper.allowSlideNext = true
    swiper.allowSlidePrev = true
  }
}

function setThumbsSwiper(swiper: SwiperLike) {
  thumbsSwiper.value = swiper
}

function closeModal() {
  currentPhoto.value.modal = false
}

function onSlideChange(swiper: SwiperLike) {
  currentPhoto.value.index = swiper.activeIndex
}

const photos = computed(() => {
  return listing.value.photos
})

// Срабаьывает в момент открытия и закрытия модального окна
// watch(currentPhoto, () => {
// 	console.log(swiperController.value?.slideTo)
// 	const currentPhotoIndex = currentPhoto.value.index;
// 	swiperController.value?.slideTo(currentPhotoIndex, 0)
//
// }, {
// 	deep: true
// })
</script>

<template>
  <UModal
    v-model:open="currentPhoto.modal"
    fullscreen
    :close="{
      color: 'primary',
      variant: 'soft',
      class: 'rounded-full h-10 w-10 justify-center items-center flex'
    }"
  >
    <template #body>
      <div class="img-preview__wrapper">
        <client-only>
          <Swiper
            :space-between="16"
            :navigation="true"
            :zoom="true"
            :style="{
              '--swiper-navigation-color': '#7059FF',
              '--swiper-pagination-color': '#7059FF'
            }"
            :pagination="{
              type: 'fraction'
            }"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="[Zoom, Pagination, Navigation, Scrollbar, Thumbs, FreeMode]"
            class="img-preview"
            @swiper="getSwiperInstance"
            @slide-change="onSlideChange"
          >
            <SwiperSlide v-for="photo of photos" class="img-preview__slide">
              <div class="swiper-zoom-container">
                <img
                  draggable="false"
                  loading="lazy"
                  :alt="listing.title"
                  class="img-preview__img"
                  :src="photo.urlFull"
                >
              </div>
            </SwiperSlide>
          </Swiper>
        </client-only>
      </div>
    </template>
    <template #footer>
      <Swiper
        :space-between="10"
        slides-per-view="auto"
        :modules="[Pagination, Navigation, Scrollbar, Thumbs, FreeMode]"
        :free-mode="true"
        :watch-slides-progress="true"
        class="img-preview__thumbs"
        @swiper="setThumbsSwiper"
      >
        <SwiperSlide v-for="photo of photos" class="img-preview__thumbs__slide">
          <img :alt="listing.title" class="thumbs__img" :src="photo.urlMin">
        </SwiperSlide>
      </Swiper>
    </template>
  </UModal>
</template>

<style lang="scss">
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--color-accent) !important;
  }
  .img-preview {
    width: 100%;

    &__wrapper {
      display: flex;
      //gap: 16px;
      flex-direction: column;
      //max-width: 1200px;
      width: 100%;
      //margin: 0 auto;
      height: 100%;
      flex-grow: 1;
    }

    &__img {
      height: 100%;
    }
  }
  .swiper-slide-thumb-active .thumbs__img {
    border: 2px solid var(--color-accent);
  }

  .thumbs__img {
    object-fit: cover;
  }
  .img-preview__thumbs {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  .swiper-pagination-fraction {
    color: var(--color-accent) !important;
  }

  .img-preview__thumbs__slide {
    width: 90px;
    height: 65px;
  }
  .img-preview__thumbs__img {
    border-radius: 10px;
    border: 2px solid rgba(0, 0, 0, 0);
    width: 85px;
    height: 60px;
    //object-fit: cover;
  }

  .btns {
    display: flex;
    align-items: center;
    gap: 16px;
  }
</style>
