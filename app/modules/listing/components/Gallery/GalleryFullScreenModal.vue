<template>
	<UModal
		fullscreen
		v-model="currentPhoto.modal"
	>
		<div border="0" class="h-[80svh] bg-black">
			<div class="img-preview__wrapper">
				<client-only>
					<swiper
						:spaceBetween="16"
						:navigation="true"
						:zoom="true"
						:style="{
					        '--swiper-navigation-color': '#7059FF',
					        '--swiper-pagination-color': '#7059FF',
			            }"
						:pagination="{
	                        type: 'fraction',
	                    }"
						@swiper="getSwiperInstance"
						:thumbs="{ swiper: thumbsSwiper }"
						:modules="[Zoom, Pagination, Navigation, Scrollbar, Thumbs, FreeMode]"
						class="img-preview"
						@slide-change="onSlideChange"
					>
						<swiper-slide
							v-for="photo of photos"
							class="img-preview__slide"
						>
							<div class="swiper-zoom-container">
								<img loading="lazy" :alt="listing.title"  class="img-preview__img" :src="photo.urlFull" />
							</div>
						</swiper-slide>
					</swiper>
				</client-only>
				<swiper
					@swiper="setThumbsSwiper"
					:spaceBetween="10"
					:slides-per-view="'auto'"
					:modules="[Pagination, Navigation, Scrollbar, Thumbs, FreeMode]"
					:freeMode="true"
					:watchSlidesProgress="true"
					class="img-preview__thumbs"
				>
					<swiper-slide class="img-preview__thumbs__slide" v-for="photo of photos">
						<img :alt="listing.title"  class="thumbs__img" :src="photo.urlMin" />
					</swiper-slide>
				</swiper>
			</div>
		</div>
	</UModal>
</template>
<script setup lang="ts">
import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide  } from 'swiper/vue';
import { Scrollbar, FreeMode, Thumbs, Pagination, Navigation, Zoom, } from 'swiper/modules';
import useGallery from "~/modules/listing/composables/useGallery";
import useListing from "~/modules/listing/composables/useListing";

const {currentPhoto} = useGallery()

const {listing} = useListing();


const swiperController = ref();
const thumbsSwiper = ref();
//@ts-ignore
const getSwiperInstance = (swiper) => {
	swiperController.value = swiper;
}
//
// onMounted(() => {
// 	const swiper = useSwiper();
// 	//@ts-ignore
// 	swiper.on('zoomChange', (_,scale) => {
// 		if (scale > 1) {
// 			swiper.allowSlideNext = false;
// 			swiper.allowSlidePrev = false;
// 		} else {
// 			swiper.allowSlideNext = true;
// 			swiper.allowSlidePrev = true;
// 		}
// 	})
// })

const onZoomChange =  (swiper, scale) => {
	if (scale > 1) {
		swiper.allowSlideNext = false;
		swiper.allowSlidePrev = false;
	} else {
		swiper.allowSlideNext = true;
		swiper.allowSlidePrev = true;
	}
}


//@ts-ignore
const setThumbsSwiper = (swiper) => {
	thumbsSwiper.value = swiper;
};

const closeModal = () => {
	currentPhoto.value.modal = false;
}

//@ts-ignore
const onSlideChange = (swiper) => {
	currentPhoto.value.index = swiper.activeIndex
}


const photos = computed(() => {
	return listing.value.photos;
})

//Срабаьывает в момент открытия и закрытия модального окна
watch(currentPhoto, () => {
	setTimeout(() => {
		const currentPhotoIndex = currentPhoto.value.index;
		swiperController.value?.slideTo(currentPhotoIndex, 0)
	}, 100)
}, {
	deep: true
})




</script>


<style lang="scss">



.img-preview {
	height: calc(100svh - 62px - 100px);
	width: 100%;
	
	&__wrapper {
		display: flex;
		gap: 16px;
		flex-direction: column;
		height: 100%;
		flex-grow: 1;
	}
	
	&__img {
		
		height: 100%;

	}
	
	
}
.swiper-slide-thumb-active .thumbs__img {
	border: 2px solid orange;
}

.img-preview__thumbs {
	
	margin: 0 8px;
	box-sizing: border-box;
}


.swiper-pagination-fraction {
	color: #FFFFFF;
}

.img-preview__thumbs__slide {
	width: 90px;
	height: 65px;
}
.img-preview__thumbs__img {
	border-radius: 10px;
	border: 2px solid rgba(0,0,0,0);
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