<template>
	<section class="bg-light-gray">
		<div class="wrapper py-10">
			<h2 class="font-bold text-2xl md:text-3xl md:mb-8 mb-6">Объекты в управлении</h2>
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
				v-if="mounted"
			>
				<SwiperSlide
					v-for="listing of data.listings.slice(0, 8)"
					class="listings-swiper__slide"
					:style="{
				paddingBottom: '32px'
			}"
				>
					<ListingItemCatalog :key="listing.id" class="mr-4 w-[320px] max-w-[350px]:300px" :listing="listing"/>
				</SwiperSlide>
			</Swiper>
			<div v-else class="h-[380px] flex justify-center items-center">
				<UIcon  name="i-svg-spinners:bars-scale" class="text-accent h-10 w-10"/>
			</div>
			<div class="flex gap-4 mt-8">
				<div class="action">
					<UButton to="/catalog" title="Перейти в каталог для просмотра всех объектов" aria-label="Перейти в каталог">
						Смотреть все
					</UButton>
				</div>
				<div class="flex gap-4">
					<UButton
						@click="swiperController.slidePrev()"
						size="xl"
						variant="soft"
						icon="i-prime:arrow-circle-left"
						class="rounded-full h-10 w-10"
						aria-label="Перейти к предыдущему объекту"
					></UButton>
					<UButton
						@click="swiperController.slideNext()"
						size="xl"
						variant="soft"
						icon="i-prime:arrow-circle-right"
						class="rounded-full h-10 w-10"
						aria-label="Перейти к следующему объекту"
					></UButton>
				</div>
			</div>
		</div>
	</section>
	
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
	
	
	const modules = [Pagination, Navigation, FreeMode]
	
	const {data, error, refresh, status} = await useAsyncData<{
		listings: ListingCatalogResponse[],
		count: number
	}>('listings', () => $fetch(`/api/listing/catalog`));
	
	const mounted = ref(false)
	
	onMounted(() => {
		mounted.value = true
	})
	
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