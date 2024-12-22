<template>
	<div class="bg-light-gray">
		<div class="wrapper py-10">
			<h2 class="font-bold text-2xl md:text-3xl mb-6">Объекты в управлении</h2>
			<Swiper
				:slidesPerView="'auto'"
				:spaceBetween="16"
				:pagination="{
                    dynamicBullets: true,
                }"
				:free-mode="true"
				:modules="modules"
				@swiper="getSwiperInstance"
				class="listings-swiper"
			>
				<SwiperSlide
					v-for="listing of listings"
					class="listings-swiper__slide"
					:style="{
				paddingBottom: '32px'
			}"
				>
					<ListingItemCatalog :key="listing.id" class="mr-4 w-[320px] max-w-[350px]:300px" :listing="listing"/>
				</SwiperSlide>
			</Swiper>
			<div class="flex gap-4 mt-8">
				<div class="action">
					<UButton to="/catalog">Смотреть все</UButton>
				</div>
				<div class="flex gap-4" >
					<UButton @click="swiperController.slidePrev()" size="xl" variant="soft" icon="i-prime:arrow-circle-left" class="rounded-full h-10 w-10"></UButton>
					<UButton @click="swiperController.slideNext()" size="xl" variant="soft" icon="i-prime:arrow-circle-right" class="rounded-full h-10 w-10"></UButton>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script setup lang="ts">
	import {Swiper, SwiperSlide, } from "swiper/vue";
	
// Import Swiper Vue.js components
	
	// Import Swiper styles
	import 'swiper/css';
	
	import 'swiper/css/pagination';
	import 'swiper/css/navigation'
	import {FreeMode, Navigation, Pagination} from "swiper/modules";
	import type {ListingCatalogResponse} from "#shared/types/response.types";
	import ListingItemCatalog from "~/modules/listing/components/shared/ListingItemCatalog.vue";
	
	// import required modules
	const {isMobile} = useDevice()
	
	const swiperController = ref();
	
	//@ts-ignore
	const getSwiperInstance = (swiper) => {
		swiperController.value = swiper;
	}
	
	defineProps<{
		listings: ListingCatalogResponse[]
	}>();
	
	const modules = [Pagination, Navigation, FreeMode]
</script>


<style lang="scss">

.swiper-button-next:after, .swiper-button-prev:after  {
	@apply text-accent;
	padding: 16px;
}

.listings-swiper {
	
	
	&__slide {
		width: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
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