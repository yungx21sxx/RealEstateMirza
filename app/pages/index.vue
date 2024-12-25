<script setup lang="ts">
import HeroSection from "~/modules/mainPage/HeroSection.vue";
import type {ListingCatalogResponse} from "#shared/types/response.types";
import About from "~/modules/mainPage/About.vue";
import Advantages from "~/modules/mainPage/Advantages.vue";
import ContactsBlock from "~/modules/mainPage/ContactsBlock.vue";
import ListingsSlider from "~/modules/listing/components/shared/ListingsSlider.vue";

useSeoMeta({
	title: 'Сдать квартиру посуточно в Москве. Полное управление, высокая доходность',
	description: 'Сдача квартир посуточно в Москве с гарантией надежности и стабильного дохода. Обеспечу профессиональный подход, безопасное управление и высокую заполняемость.',
	ogTitle: 'Сдать квартиру посуточно в Москве. Полное управление, высокая доходность',
	ogDescription: 'Сдача квартир посуточно в Москве с гарантией надежности и стабильного дохода. Обеспечу профессиональный подход, безопасное управление и высокую заполняемость.',
	ogImage: '/hero.jpeg',
})

</script>

<template>
	<HeroSection/>
	<main>
		<ListingsSlider/>
		<About/>
		
		<Advantages/>
		<ContactsBlock class="mt-10"/>
	</main>
</template>

<style scoped>


</style>