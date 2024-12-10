<script setup lang="ts">
import HeroSection from "~/modules/mainPage/HeroSection.vue";
import type {ListingCatalogResponse} from "#shared/types/response.types";
import About from "~/modules/mainPage/About.vue";
import Advantages from "~/modules/mainPage/Advantages.vue";
import ContactsBlock from "~/modules/mainPage/ContactsBlock.vue";
import ReviewsWidget from "~/modules/mainPage/ReviewsWidget.vue";


const isLoading = ref(true);
const isIntersecting = ref(false);

const ListingCarousel = defineAsyncComponent(() => import('@/modules/Listing/components/shared/ListingCarousel.vue'))

const componentContainer = ref(null)
const showComponent = ref(false)

const {data, error, refresh} = await useAsyncData<{
	listings: ListingCatalogResponse[],
	count: number
}>('listings', () => $fetch(`/api/listing/catalog`));

onMounted(() => {
	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			setTimeout(() => {
				showComponent.value = true
			}, 100)
			observer.disconnect()
		}
	})
	
	if (componentContainer.value) {
		observer.observe(componentContainer.value)
	}
})


</script>

<template>
	<HeroSection/>

	<ListingCarousel :listings="data.listings.slice(0, 8)"/>

	<About/>
	<ReviewsWidget/>
	<Advantages/>
	<ContactsBlock class="mt-10"/>
</template>

<style scoped>


</style>