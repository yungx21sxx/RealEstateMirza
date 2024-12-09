<template>
	
	<div class="gallery">
		<UCarousel v-slot="{ item }" arrows :items="listing.photos" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden" indicators>
			<div class="relative w-full">
				<img :src="item.urlFull" class="w-full max-[640px]:h-[300px] max-[960px]:h-[500px] h-[450px] object-cover" draggable="false" loading="lazy">
			</div>
		</UCarousel>
		
<!--		<swiper-container-->
<!--			:spaceBetween="16"-->
<!--			:navigation="true"-->
<!--			:style="{-->
<!--		      '&#45;&#45;swiper-navigation-color': '#fff',-->
<!--		      '&#45;&#45;swiper-pagination-color': '#fff',-->
<!--            }"-->
<!--			:pagination="{-->
<!--                 type: 'fraction',-->
<!--             }"-->
<!--			@swiper="getSwiperInstance"-->
<!--			:modules="[Pagination, Navigation, Scrollbar, Thumbs, FreeMode]"-->
<!--			class="swiper-multiply"-->
<!--		>-->
<!--			<swiper-slide-->
<!--				v-for="photo of listing.photos"-->
<!--				class="swiper-multiply__slide"-->
<!--				@click="openGalleryModal(photo.id)"-->
<!--			>-->
<!--				<img :src="photo.urlFull" class="swiper-multiply__img object-cover" :alt="listing.title">-->
<!--&lt;!&ndash;				<v-card>&ndash;&gt;-->
<!--&lt;!&ndash;					<v-img cover :alt="listing.title"  class="swiper-multiply__img" :src="photo.urlFull" >&ndash;&gt;-->
<!--&lt;!&ndash;						<v-btn color="#FFFF" @click="openGalleryModal(photo.id)" variant="flat"  class="gallery__btn1" :icon="mdiFullscreen"></v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;					</v-img>&ndash;&gt;-->
<!--&lt;!&ndash;				</v-card>&ndash;&gt;-->
<!--			</swiper-slide>-->
<!--		</swiper-container>-->
	
	</div>

	
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
	import useGallery from "~/modules/listing/composables/useGallery";
	import useListing from "~/modules/listing/composables/useListing";
	
	const {currentPhoto} = useGallery()
	
	function openGalleryModal(index: number) {
		currentPhoto.value.index = index;
		currentPhoto.value.modal = true;
	}
	
	const {listing} = useListing();
	
	
	const swiperController = ref();
	//@ts-ignore
	const getSwiperInstance = (swiper) => {
		swiperController.value = swiper;
	}


	// //Срабаьывает в момент открытия и закрытия модального окна
	// watch(currentPhoto, () => {
	// 	swiperController.value.slideTo(currentPhoto.value.index, 0)
	// }, {
	// 	deep: true
	// })


	
</script>


<style lang="scss">

	.swiper-button-next:after, .swiper-button-prev:after {
	    color: #FFFFFF !important;
		padding: 16px;
	}
	.swiper-pagination-fraction {
		color: #FFFFFF !important;
	}
	.actions {
		position: relative;
		height: 100%;
		
	}
	.gallery {
		display: grid;
		margin-bottom: 16px;
		position: relative;
		&__btn1 {
			position: absolute;
			right: 16px;
			top: 16px;
			z-index: 10;
		}
	}
	.swiper-multiply {
		width: 100%;
		height: 450px;
		@media screen and (max-width: 900px) {
			height: 550px;
		}
		@media screen and (max-width: 500px) {
			height: 300px;

			&__img {
				height: 300px !important;
			}
		}
		
		&__slide {
			width: 100%;
			cursor: zoom-in;
		}

		&__img {
			width: 100%;
			height: 450px;
			border-radius: 10px;
			@media screen  and (max-width: 630px){
				border-radius: 0;
			}
		}
		
		
	}
	//.swiper-slide-thumb-active .thumbs__img {
	//	border: 2px solid $accent-blue;
	//}
	
	.thumbs {
		margin-top: 16px;
		width: 100%;
		box-sizing: border-box;
	}

	.swiper-pagination-fraction {
		color: #FFFFFF;
	}
	
	.thumbs__slide {
		width: 90px;
		height: 65px;
	}
	.thumbs__img {
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